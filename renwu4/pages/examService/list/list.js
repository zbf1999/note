// pages/examService/list/list.js
const {
  request
} = require('../../../utils/request');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    list: [],
    curTab: 1,
    gradeList: [],
    termName: ''
  },

  onShow() {
    this.searchHandle();
  },

  checkTabHandle(e) {
    const tab = +e.currentTarget.dataset.tab;

    if (tab === this.data.curTab) return false;
    this.setData({
      curTab: tab,
      keyword: ''
    }, () => this.searchHandle());
  },

  inputHandle(e) {
    const val = e.detail.value;

    this.setData({
      keyword: val
    });
  },

  toTwoNum(num) {
    return num >= 10 ? num : `0${num}`;
  },

  getExamList() {
    request({
        url: 'getExamList',
        method: 'POST',
        data: {
          keyword: this.data.keyword
        }
      }).then(data => {
        const now = Date.now() / 1000;
        data = data || [];
        const d = new Date();
        const curYears = d.getFullYear();
        const curMonth = d.getMonth() + 1;
        const curDay = d.getDate();
        data = data.map(f => {
          if (f.startTime && f.endTime) {
            const start = new Date(f.startTime * 1000);
            const end = new Date(f.endTime * 1000);
            const year = start.getFullYear();
            const month = start.getMonth() + 1;
            const date = start.getDate();
            const hours = start.getHours();
            const mins = start.getMinutes();
            const endHours = end.getHours();
            const endMins = end.getMinutes();

            if (curYears === year && curMonth === month && curDay === date) {
              f.sign = '今天';
            } else if (curYears === year && curMonth === month && curDay + 1 === date) {
              f.sign = '明天';
            }
            f.showTime = `${year}年${this.toTwoNum(month)}月${this.toTwoNum(date)}日 ${this.toTwoNum(hours)}:${this.toTwoNum(mins)}-${this.toTwoNum(endHours)}:${this.toTwoNum(endMins)}`;
          }
          return f;
        })
        const startList = data.filter(f => +f.endTime > now).sort((r1, r2) => r1.startTime - r2.startTime);
        const endList = data.filter(f => +f.endTime <= now);

        this.setData({
          list: [{
              title: '未开始',
              children: startList
            },
            {
              title: '已结束',
              children: endList
            }
          ]
        })
      })
      .catch(e => {
        console.log('getExamList error::', e);
        wx.showToast({
          title: e.message,
          icon: 'none'
        });
      });
  },

  goToCreate() {
    wx.navigateTo({
      url: '/pages/examService/create/create',
    });
  },

  searchHandle() {
    this.data.curTab === 1 ? this.getExamList() : this.getMyAchievement();
  },

  getMyAchievement() {
    request({
        url: 'getMyAchievement',
        method: 'POST',
        data: {
          keyword: this.data.keyword
        }
      }).then(data => {
        data = data || [];
        this.setData({
          gradeList: data,
          termName: data[0] && data[0].term
        });
      })
      .catch(e => {
        console.log('getMyAchievement error::', e);
        wx.showToast({ title: e.message, icon: 'none' });
      });
  },

  removeExam(e) {
    const id = e.currentTarget.dataset.id;

    wx.showModal({
      title: '是否删除该考试安排',
      cancelColor: '#989898',
      confirmColor: '#2C70F8',
      success: (res) => {
        if (res.confirm) {
          request({
            url: 'removeExam',
            method: 'POST',
            data: { id }
          }).then(() => {
            wx.showToast({ title: '删除成功', icon: 'none' });
            this.searchHandle();
          })
          .catch(e => {
            console.log('removeExam error::', e);
            wx.showToast({ title: e.message, icon: 'none' });
          }); 
        }
      }
    });
  },
})