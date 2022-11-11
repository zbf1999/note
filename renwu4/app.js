import 'weapp-cookie'; // 实现小程序cookie机制
import { request } from './utils/request';
//app.js
App({
  getUserInfo() {
    wx.getUserInfo({
      success: res => {
        console.log('res::', res);
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userAvator = res.userInfo;
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res);
        }
      },
    });
  },
  onLaunch: function() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });

    // // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.getUserInfo();
          // wx.authorize({
          //   scope: 'scope.userInfo',
          //   success() {
          //     // 用户同意信息授权，用于获取用户头像
          //     getUserInfo();
          //   }
          // })
        }
      },
    });

    // 获取用户登录信息
    request(
      {
        method: 'GET',
        url: 'getUser',
      },
      false,
    )
      .then(data => {
        this.globalData.userInfo = data;
      })
      .catch(e => {
        console.log('getUser err::', e);
      });
  },
  globalData: {
    userInfo: null,
    userAvator: null,
  },
});
