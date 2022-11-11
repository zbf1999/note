// pages/carTrip/detail/detail.js
const { request } = require('../../../utils/request');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    detailItem:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const busNo = options.busNo
    request({
      url: 'getSchoolBusDetail',
      method: 'POST',
      data: {
        busNo
      }
    }).then(data => {
      this.setData({
        detailItem: data
      })
    }).catch(e => {
      console.log('getSchoolBusDetail::', e)
    })
  },



})