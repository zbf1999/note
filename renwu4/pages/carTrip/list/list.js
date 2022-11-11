// pages/carTrip/list/list.js
const { request } = require('../../../utils/request');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaName: '全部校区', // 所选校区
    timeName: '全部时间', // 所选时间
    lineList: [], // 路线列表
    lineCount: 0 ,// 当前路线数量
    selectTime: false,
    times: [
      {
        mytext: '上午（06:00-12:00）',
        myxuan: false,
        myvalue: '上午'
      },
      {
        mytext: '中午（12:00-14:00）',
        myxuan: false,
        myvalue: '中午'
      },
      {
        mytext: '下午（14:00-16:00）',
        myxuan: false,
        myvalue: '下午'
      },
      {
        mytext: '晚上（19:00-21:00）',
        myxuan: false,
        myvalue: '晚上'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onShow() {
    this.getSchoolBusList();
  },

  // 获取路线列表
  getSchoolBusList() {

    const place = '';
    const time = '';
    request({
      url: 'getSchoolBusList',
      method: 'POST',
      data: {
        place,
        time
      }
    }).then(data => {
      this.setData({
        lineList: data.list,
        lineCount: data.favoriteCount,
      })
    })
    .catch(e => {
      console.log('getSchoolBusList error::', e);
      wx.showToast({ title: e.message, icon: 'none' });
    });
  },

  // 收藏事件
  favoriteSchoolBus(busNo, title) {
    request({
      url: 'favoriteSchoolBus',
      method: 'POST',
      data: {
        busNo,
      }
    }).then(() => {
      wx.showToast({ title, icon: 'none' });
      this.getSchoolBusList();
    })
    .catch(e => {
      console.log('favoriteSchoolBus error::', e);
      wx.showToast({ title: e.message, icon: 'none' });
    });
  },

  // 添加收藏
  addCollect(busNo) {
    this.favoriteSchoolBus(busNo, '已收藏');
  },

  // 取消收藏
  cancelCollect(busNo) {
    wx.showModal({
      title: '是否确认从收藏夹中移除？',
      cancelColor: '#989898',
      confirmColor: '#2C70F8',
      success: (res) => {
        if (res.confirm) this.favoriteSchoolBus(busNo, '已取消');
      }
    })
  },

  // 收藏与取消
  collectHandle(e) {
    const { busno: busNo, favorite } = e.currentTarget.dataset;

    if (favorite === 0) this.addCollect(busNo);
    else this.cancelCollect(busNo);
  },

  // 跳转详情
  goDetail(e) {
    const url = e.currentTarget.dataset.url;

    // wx.
    wx.navigateTo({
      url,
    })
  },

  showTime: function() {
    this.setData({
      selectTime: !this.data.selectTime
    })
  },

  selectTime: function (e) {
    console.log(e.currentTarget.dataset.time, e.currentTarget.dataset.index);
    // this.setData({:this.data.times[i].myxuan})
    var i = e.currentTarget.dataset.index
    if (this.data.times[i].myxuan) {
      this.data.times[i].myxuan = false
    } else {
      this.data.times[i].myxuan = true
    }

    this.setData({
      ["times[" + i + "]"]: this.data.times[i]
    });


  },

  hideTimeOK: function () {
    console.log("==========")
    var s = ''
    var sss=''
    for (var i = 0; i < this.data.times.length; i++) {
      console.log(this.data.times[i])
      if (this.data.times[i].myxuan == true) {
        sss=this.data.times[i].mytext;
        s = s + this.data.times[i].myvalue + ","
      }
    }

    if (s.length > 0) {
      var ss = ''
      for (var i = 0; i < s.length - 1; i++) {
        ss = ss + s[i]
      }
      var place = '新校区(西门),南山校区(东门)';
      var time = ss;
      var timeTitle=''
      if (ss.search(',')==-1){
        timeTitle=sss
      }else{
        timeTitle='时间(多选)'
      }
      request({
        url: 'getSchoolBusList',
        method: 'POST',
        data: {
          place,
          time
        }
      }).then(data => {
        this.setData({
          lineList: data.list,
          lineCount: data.favoriteCount,
          selectTime: false,
          timeName:timeTitle
        })

      })
        .catch(e => {
          console.log('getSchoolBusList error::', e);
          wx.showToast({ title: e.message, icon: 'none' });
        });
    }


  },
  hideTimeClear: function () {
    this.setData({
      times:[
        {
          mytext: '上午（06:00-12:00）',
          myxuan: false,
          myvalue: '上午'
        },
        {
          mytext: '中午（12:00-14:00）',
          myxuan: false,
          myvalue: '中午'
        },
        {
          mytext: '下午（14:00-16:00）',
          myxuan: false,
          myvalue: '下午'
        },
        {
          mytext: '晚上（19:00-21:00）',
          myxuan: false,
          myvalue: '晚上'
        }
      ]})
  }
})