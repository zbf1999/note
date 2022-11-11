const { login } = require('../../utils/request');
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    studentID: '',
    password: '',
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
      },
      () => {
        this.setData({
          disabled: !this.data.studentID || !this.data.password,
        });
      },
    );
  },

  loginTap: function() {
    this.setData({
      submitting: true,
    });

    login({
      studentID: this.data.studentID,
      password: this.data.password,
    })
      .then(data => {
        console.log('data::', data);
        app.globalData.userInfo = data;
        this.setData(
          {
            submitSucc: true,
            submitting: false,
          },
          () => {
            wx.navigateBack({ delta: 1 });
            // wx.redirectTo({
            //   url: '/pages/index/index',
            // });
          },
        );
      })
      .catch(err => {
        console.log('login err::', err);
        this.setData({
          submitSucc: false,
          submitting: false,
        });
      });
  },
});
