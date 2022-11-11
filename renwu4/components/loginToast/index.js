// components/loginToast/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
    showCancel: {
      type: Boolean,
      value: false,
    },
    showConfirm: {
      type: Boolean,
      value: false,
    },
    width: {
      type: Number,
      value: 586,
    },
    height: {
      type: Number,
      value: 348,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    clickMask() {
      this.setData({
        visible: false,
      });
    },

    cancel() {
      this.setData({
        visible: false,
      });
      this.triggerEvent('cancel');
    },

    confirm() {
      this.setData({
        visible: false,
      });
      this.triggerEvent('confirm');
    },
  },
});

