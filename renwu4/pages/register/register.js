const { register } = require('../../utils/request');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    studentID: '',
    phone: '',
    pwd: '',
    pwdConfirm: '',
    nameInvalid: false,
    studentIDInvalid: false,
    phoneInvalid: false,
    pwdInvalid: false,
    disabled: true,
    submitting: false,
    submitResult: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  inputChange: function(e) {
    const key = e.target.dataset.id;
    const value = e.detail.value;
    this.setData(
      {
        [key]: value,
        nameInvalid: false,
        studentIDInvalid: false,
        phoneInvalid: false,
        pwdInvalid: false,
      },
      () => {
        const { name, studentID, phone, pwd, pwdConfirm } = this.data;
        this.setData({
          disabled: !name || !studentID || !phone || !pwd || !pwdConfirm,
        });
      },
    );
  },
  closeModal: function() {
    const that = this;
    setTimeout(() => {
      that.setData({
        submitResult: '',
      });
    }, 2000);
  },

  formSubmit: function(e) {
    const values = e.detail.value;
    console.log('value', e.detail.value);
    // 检验每个输入的合法性
    const regMap = {
      name: /^[\u4e00-\u9fa5A-Za-z]+$/,
      studentID: /^\d{12}$/,
      phone: /^1[3-9]\d{9}$/,
      pwd: /^[\d_A-Za-z]{8,20}$/,
    };
    const data = {};
    const checkResult = {};
    Object.keys(regMap).forEach(key => {
      let value = values[key];
      if (key !== 'pwd') {
        value = value.replace(/(^\s*)|(\s*$)/g, '');
      }
      if (!regMap[key].test(value) || (key === 'pwd' && value !== values.pwdConfirm)) {
        checkResult[`${key}Invalid`] = true;
      }
      data[key] = value;
    });
    if (Object.keys(checkResult).length) {
      this.setData({ ...checkResult, disabled: true });
      return;
    }
    // 提交
    this.setData({
      submitting: true,
    });
    register(data)
      .then(res => {
        this.setData(
          {
            submitting: false,
            submitResult: 'success',
          },
          () => {
            wx.navigateBack({
              delta: 1,
            });
          },
        );
      })
      .catch(e => {
        this.setData(
          {
            submitting: false,
            submitResult: 'warn',
          },
          () => {
            this.closeModal();
          },
        );
      });
  },
});
