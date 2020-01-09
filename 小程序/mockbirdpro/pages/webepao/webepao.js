// pages/webepao/webepao.js
const apid = require('../../utils/requuu.js')
const api = require('../../utils/requst.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    epaoUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _mobile = options.phomob;
    api._get('ecard/card/getEToken?mobile=' + _mobile).then(res => {
      let _data = res.data
      let _url = "https://ypzh-qudao.epiaom.com/usercenter/userOrders.php?tel=" + _data.tel + "&channel_no=" + _data.channel_no + "&token=" + _data.token
      this.setData({
        epaoUrl: _url
      })
    })
  }
})