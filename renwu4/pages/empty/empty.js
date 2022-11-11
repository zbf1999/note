// pages/empty/empty.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    desc: '当前功能暂未开通，敬请期待~'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title || '智慧教育',
    });

    if (options.desc) {
      this.setData({
        desc: options.desc
      });
    }
  }
})