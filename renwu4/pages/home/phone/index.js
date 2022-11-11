// pages/home/phone/index.js
const { request } = require('../../../utils/request');
const crypto = requirePlugin('crypto');
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    pwd: '',
    phoneInvalid: false,
    disabled: true,
    submitting: false,
    submitSucc: null,
  },

  inputChange: function(e) {
    const key = e.target.dataset.id;
    const value = e.detail.value;
    this.setData(
      {
        [key]: value,
        phoneInvalid: false,
      },
      () => {
        const { phone, pwd } = this.data;
        this.setData({
          disabled: !phone || !pwd,
        });
      },
    );
  },
  formSubmit: function(e) {
    const values = e.detail.value;
    values.phone = values.phone.replace(/(^\s*)|(\s*$)/g, ''); // 去掉收尾空格
    console.log('value', values);
    // 检验每个输入的合法性
    // 校验手机号
    if (!/^1[3-9]\d{9}$/.test(values.phone)) {
      this.setData({
        disabled: true,
        phoneInvalid: true,
      });
      return;
    }

    // 提交
    this.setData({
      submitting: true,
    });
    request({
      url: 'resetPhone',
      data: {
        phone: values.phone,
        password: new crypto['MD5'](values.pwd).toString(), // 对密码加密传输
      },
    })
      .then(res => {
        // 更新全局user信息
        app.globalData.userInfo = { ...app.globalData.userInfo, phone: values.phone };
        this.setData(
          {
            submitting: false,
            submitSucc: true,
          },
          () => {
            setTimeout(() => {
              wx.navigateBack({
                delta: 1,
              });
            }, 500);
          },
        );
      })
      .catch(e => {
        this.setData({
          submitting: false,
          submitSucc: false,
        });
      });
  },
});
