//index.js
//获取应用实例
const app = getApp();
const { request } = require('../../utils/request');
const compareVersion = require('../../utils/versionCompare');

Page({
  data: {
    // 头部导航栏自定义需要在sdk为2.5.2版本才设置有效，因此做低版本兼容
    isLowVersion: compareVersion(wx.getSystemInfoSync().SDKVersion, '2.5.2') < 0,
    barHeight: wx.getSystemInfoSync().statusBarHeight,
    logined: false,
    loginToastShow: false,
    list: [
      {
        key: 'cource',
        title: '课程管理',
        desc: '在线一键选择课表',
        url: '/pages/empty/empty?title=课程管理',
      },
      {
        key: 'attendance',
        title: '智能考勤',
        desc: '在线快速签到课程',
        url: '/pages/empty/empty?title=智能考勤',
      },
      {
        key: 'examService',
        title: '考试服务',
        desc: '在线查看考试安排与成绩',
        url: '/pages/examService/list/list',
      },
      {
        key: 'library',
        title: '智慧图书馆',
        desc: '在线图书馆座位预定',
        url: '/pages/empty/empty?title=智慧图书馆',
      },
      {
        key: 'carTrip',
        title: '校车出行',
        desc: '在线查看校车路线',
        url: '/pages/carTrip/list/list',
      },
      {
        key: 'activity',
        title: '活动管理',
        desc: '最新校园前沿活动',
        url: '/pages/empty/empty?title=活动管理',
      },
      {
        key: 'canteen',
        title: '食堂点餐',
        desc: '在线快速预订点餐',
        url: '/pages/empty/empty?title=食堂点餐',
      },
      {
        key: 'secondaryMarket',
        title: '二手市场',
        desc: '在线二手交易',
        url: '/pages/empty/empty?title=二手市场',
      },
      {
        key: 'more',
        title: '更多',
        url: '/pages/moduleList/moduleList',
      },
    ],
  },
  // 点击各个模块进行跳转
  bindModuleTap: function(e) {
    if (!app.globalData.userInfo || !wx.getStorageSync('wx-sessionid')) {
      this.setData({
        loginToastShow: true
      })
    }else {
      this.setData({
        loginToastShow:false
      })
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      });
    }
  },

  getUserInfo: function() {
    console.log('index userInfo::', app.globalData.userInfo);
    if (!app.globalData.userInfo || !wx.getStorageSync('wx-sessionid')) {
      wx.showLoading({
        title: '正在加载中...',
      });
      request(
        {
          method: 'GET',
          url: 'getUser',
        },
        false,
      )
        .then(data => {
          console.log('data::', data);
          app.globalData.userInfo = data;
          this.setData({
            logined: true,
          });
          wx.hideLoading();
        })
        .catch(e => {
          console.log('getUser err::', e);
          app.globalData.userInfo = null;
          this.setData({
            logined: false,
          });
          wx.hideLoading();
        });
    } else {
      this.setData({
        logined: true,
      });
    }
  },
  onShow: function() {
    console.log('index show::');
    this.getUserInfo();
  },
  bindHomeTap: function() {
    wx.navigateTo({
      url: '/pages/home/index/index',
    });
  },
  denglu: function() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
});
