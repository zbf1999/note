// pages/moduleList/moduleList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
        url: '/pages/empty/empty?title=智能考勤',
      },
      {
        key: 'examService',
        title: '考试服务',
        url: '/pages/examService/list/list',
      },
      {
        key: 'library',
        title: '智慧图书馆',
        url: '/pages/empty/empty?title=智慧图书馆',
      },
      {
        key: 'carTrip',
        title: '校车出行',
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
        url: '/pages/empty/empty?title=食堂点餐',
      },
      {
        key: 'secondaryMarket',
        title: '二手市场',
        url: '/pages/empty/empty?title=二手市场',
      },
      {
        key: 'create',
        title: '创新模块',
        url: '/pages/empty/empty?title=创新模块',
      },
    ],
  },
  bindModuleTap: function(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    });
  }
})