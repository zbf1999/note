const { request } = require('../../../utils/request');
const crypto = requirePlugin('crypto');
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    pwd: '',
    newPwd: '',
    pwdConfirm: '',
    newPwdInvalid: false,
    pwdConfirmInvalid: false,
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
        newPwdInvalid: false,
        pwdConfirmInvalid: false,
      },
      () => {
        const { pwd, newPwd, pwdConfirm } = this.data;
        this.setData({
          disabled: !pwd || !newPwd || !pwdConfirm,
        });
      },
    );
  },

  formSubmit: function(e) {
    const values = e.detail.value;

    console.log('value', values);
    // 检验每个输入的合法性
    // 校验新密码
    const checkResult = {};
    if (!/^[\d_A-Za-z]{8,20}$/.test(values.newPwd)) {
      checkResult.newPwdInvalid = true;
    }
    if (values.newPwd !== values.pwdConfirm) {
      checkResult.pwdConfirmInvalid = true;
    }

    if (Object.keys(checkResult).length) {
      this.setData({ ...checkResult, disabled: true });
      return;
    }

    // 提交
    this.setData({
      submitting: true,
    });
    request({
      url: 'resetPassword',
      data: {
        oldPwd: new crypto['MD5'](values.pwd).toString(),
        newPwd: new crypto['MD5'](values.newPwd).toString(), // 对密码加密传输
      },
    })
      .then(res => {
        this.setData(
          {
            submitSucc: true,
            submitting: false,
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
          submitSucc: false,
          submitting: false,
        });
      });
  },
});
