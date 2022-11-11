// pages/home/index.js
const app = getApp();
const { request } = require('../../../utils/request');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    logined: false,
    userInfo: {},
    list: [
      {
        title: '我的选课',
        key: 'course',
        url: '/pages/empty/empty?title=我的选课',
      },
      {
        title: '我的考勤',
        key: 'attendance',
        url: '/pages/empty/empty?title=我的考勤',
      },
      {
        title: '我的活动',
        key: 'activity',
        url: '/pages/empty/empty?title=我的活动',
      },
      {
        title: '修改密码',
        key: 'password',
        url: '/pages/empty/empty?title=修改密码',
      },
      {
        title: '小程序说明',
        key: 'introduction',
        url: '/pages/home/introduction/index',
      },
    ],
    loginoutConfirm: false,
    loginToast: false,
  },

  getUserInfo: function() {
    console.log('home userInfo::', app.globalData.userInfo);
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
          app.globalData.userInfo = data;
          this.setData({
            logined: true,
            userInfo: data,
          });
          wx.hideLoading();
        })
        .catch(e => {
          console.log('home getUser err::', e);
          app.globalData.userInfo = null;
          this.setData({
            logined: false,
          });
          wx.hideLoading();
        });
    } else {
      this.setData({
        logined: true,
        userInfo: app.globalData.userInfo,
      });
    }
  },

  onShow: function() {
    console.log('home onShow');
    this.getUserInfo();
  },

  // 编辑手记号
  bindEditPhone: function() {
    wx.navigateTo({
      url: '/pages/home/phone/index',
    });
  },

  showLoginoutConfirm: function() {
    this.setData({
      loginoutConfirm: true,
    });
  },
  // 退出登录
  bindLoginout: function() {
    // 清除sessionid和userinfo
    wx.removeStorageSync('wx-sessionid');
    app.globalData.userInfo = null;
    this.setData({
      logined: false,
    });
  },

  bindGoTo: function(e) {
    console.log('e:::', e);
    const { key, url } = e.currentTarget.dataset;
    if (!this.data.logined && key !== 'introduction') {
      this.setData({
        loginToast: true,
      });
      return;
    }
    // 跳转
    wx.navigateTo({
      url,
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},
});
