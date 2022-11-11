const wxp = require('./wx-promise');
const config = require('../config/config');
const crypto = requirePlugin('crypto');

function login(options = {}) {
  const { studentID, password } = options;
  // 对密码加密
  const newPwd = new crypto['MD5'](password).toString();
  console.log('newPwd::', newPwd);

  return new Promise((resolve, reject) => {
    wxp
      .login()
      .then(({ code }) => {
        return wxp.request({
          url: `${config.domain}/api/login`,
          method: 'POST',
          data: {
            code,
            studentID,
            password: newPwd,
          },
        });
      })
      .then(({ data }) => {
        if (data.code === 0) {
          // 登录成功，存session_id，返回用户信息（手机号，学号）
          const { sessionId, name, phone } = data.data;
          wx.setStorageSync('wx-sessionid', sessionId); // 每次请求前带上sessionid，用于判断用户身份和session是否过期
          resolve({
            studentID,
            phone,
            name,
          });
        }
        reject({
          code: -1,
          messgae: '登录失败',
        });
      })
      .catch(err => {
        console.log('ex.login error::', err);
        reject({
          code: -1,
          messgae: '登录失败',
        });
      });
  });
}

function register(options = {}) {
  const { pwd, ...other } = options;
  // 对密码加密
  const newPwd = new crypto['MD5'](pwd).toString();
  console.log('newPwd::', newPwd);

  return new Promise((resolve, reject) => {
    wxp
      .login()
      .then(({ code }) => {
        return wxp.request({
          url: `${config.domain}/api/register`,
          method: 'POST',
          data: {
            code,
            password: newPwd,
            ...other,
          },
        });
      })
      .then(({ data }) => {
        // console.log("data::", data)
        if (data.code === 0) {
          // 注册账号成功
          resolve(data);
          return;
        }
        reject(data);
      })
      .catch(err => {
        console.log('ex.register error::', err);
        reject({
          code: -1,
          messgae: '注册失败',
        });
      });
  });
}

function request(options, showLoginModal = true) {
  const sessionId = wx.getStorageSync('wx-sessionid');
  console.log('storage sessionID::', sessionId);
  if (!sessionId) {
    // 当前未登录，请先登录
    if (showLoginModal) {
      wx.showModal({
        title: '温馨提示',
        content: '此弹窗与试题无关请勿修改',
        showCancel: false,
        confirmText: '返回首页',
        success() {
          wx.navigateTo({
            url: '/pages/index/index',
          });
        },
      });
    }

    return Promise.reject(null);
  }

  const { url, method = 'POST', timeout = 15000, header = {}, data = {}, ...other } = options;

  return new Promise((resolve, reject) => {
    wxp
      .request({
        url: `${config.domain}/api/${url}`,
        data,
        method,
        header: {
          sessionId,
          ...header,
        },
        timeout,
        ...other,
      })
      .then(({ data }) => {
        const { code } = data;
        console.log('data', data);
        if (code === 0) {
          return resolve(data.data);
        }
        if (code === -10000) {
          // session失效，提示用户重新登录
          wx.removeStorageSync('wx-sessionid');
          wx.showModal({
            title: '温馨提示',
            content: '登录状态已失效，请重新登录',
            showCancel: false,
            confirmText: '去登录',
            success() {
              wx.navigateTo({
                url: '/pages/login/login',
              });
            },
          });
          return reject({
            code: -10000,
            message: '登录状态失效',
          });
        }
        return reject(data);
      })
      .catch(err => {
        console.log('ex.request error::', err);
        reject({
          code: -1,
          message: '请求失败',
        });
      });
  });
}

module.exports = {
  login,
  register,
  request,
};
