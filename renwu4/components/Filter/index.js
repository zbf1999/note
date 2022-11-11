// components/courseFilter/index.js
Component({
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.init();
    },
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached: function() {
    // 在组件实例进入页面节点树时执行
    this.init();
  },

  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
    title: String,
    list: Array,
    selected: Array,
  },

  /**
   * 组件的初始数据
   */
  data: {},
  /**
   * 组件的方法列表
   */
  methods: {
    init() {
      const selected = this.data.selected;
      if (!selected.length) {
        return;
      }
      const list = this.data.list;
      list.forEach(item => {
        if (selected.includes(item.value)) {
          item.selected = true;
        }
      });
      this.setData({
        list,
      });
    },
    selectedTap(e) {
      const current = e.currentTarget.dataset.value;
      // console.log("e::", current);
      const list = this.data.list;
      const selected = this.data.selected;
      const index = list.findIndex(item => item.value === current);

      if (selected.includes(current)) {
        list[index].selected = false;
        selected.splice(selected.indexOf(current), 1);
      } else {
        list[index].selected = true;
        selected.push(current);
      }
      console.log('select::', selected);
      // console.log("list::", list)
      this.setData({
        selected,
        list,
      });
    },
    clear() {
      if (!this.data.selected.length) {
        return;
      }
      this.setData({
        selected: [],
        list: this.data.list.map(item => ({ ...item, selected: false })),
      });
    },
    confirm() {
      this.setData({
        visible: false,
      });
      this.triggerEvent('confirm', this.data.selected);
    },
  },
});
