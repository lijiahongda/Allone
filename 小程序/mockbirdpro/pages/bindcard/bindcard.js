// pages/bindcard/bindcard.js
const apid = require('../../utils/requuu.js')
const api = require('../../utils/requst.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardnum: "",
    cardsecret: "",
    mobile: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _mobile = options.phomob;
    this.setData({
      mobile: _mobile
    })
  },
  // bangdcard
  bindCards: function() {
    let _openid = wx.getStorageSync('openid');
    let _cardnum = this.data.cardnum
    let _cardsecret = this.data.cardsecret
    let _mobile = this.data.mobile
    // apid._post(':9800/ecard/card/bindCards?openId=' + _openid + '&cardnum=' + _cardnum + '&cardsecret=' + _cardsecret + '&mobile=' + _mobile)
    api._post('ecard/card/bindCards?openId=' + _openid + '&cardnum=' + _cardnum + '&cardsecret=' + _cardsecret + '&mobile=' + _mobile).then(res => {
      if (res.status == 200) {
        wx.showToast({
          title: "绑定成功",
          icon: 'none',
          duration: 2000
        })
        wx.navigateTo({
          url: '/pages/mockcard/mockcard',
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  //kahao
  cardnumInput: function(e) {
    this.setData({
      cardnum: e.detail.value
    })
  },
  //kami
  cardsecretInput: function(e) {
    this.setData({
      cardsecret: e.detail.value
    })
  },
})