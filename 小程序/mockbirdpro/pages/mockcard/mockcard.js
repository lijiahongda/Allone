// pages/mockcard/mockcard.js
const apid = require('../../utils/requuu.js')
const api = require('../../utils/requst.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    code: "",
    ckey: "",
    sendAuthCode: true,
    auth_time: 0,
    isepao: false,
    epaoData: "",
    mobile: "",
    status: "",
    cardList: ""
    // omgard: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.checkBind()
  },
  onShow: function() {
    // 验证码倒计时
    let auth_time = 60;
    var auth_timetimer = setInterval(() => {
      auth_time--;
      this.setData({
        auth_time: auth_time
      })
      if (this.data.auth_time <= 0) {
        this.setData({
          sendAuthCode: true
        })
        clearInterval(auth_timetimer);
      }
    }, 1000);
  },
  // 获取验证码
  getCode: function() {
    let _phone = this.data.phone
    if (/^1[34578]\d{9}$/.test(_phone)) {
      api._post('ecard/notification/codes?phone=' + _phone)
        .then(res => {
          // console.log(res);
          if (res.status == 200) {
            this.setData({
              key: res.data.key,
              sendAuthCode: false
            })
            // this.sendAuthCode()
          } else {
            wx.showToast({
              title: "手机号格式不正确",
              icon: 'none',
              duration: 2000
            })
          }
        })
    } else {
      wx.showToast({
        title: "手机号格式不正确",
        icon: 'none',
        duration: 2000
      })
    }
  },

  // jiancha
  checkBind: function() {
    let _openid = wx.getStorageSync('openid');
    api._get('ecard/card/checkbind?openId=' + _openid).then(res => {
      if (res.status == 200) {
        this.setData({
          mobile: res.data.mobile,
          status: res.data.status
        })
        if (res.data.status == 1) {
          this.getEToken()
          this.queryMyCards()
        }
      } else {
        this.setData({
          status: res.status
        })
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // bangdphone
  bindMobile: function() {
    let _openid = wx.getStorageSync('openid');
    let _key = this.data.key
    let _code = this.data.code
    let _phone = this.data.phone
    api._post('ecard/card/bindMobile?openId=' + _openid + '&key=' + _key + '&code=' + _code + '&mobile=' + _phone).then(res => {
      console.log(res)
      if (res.status == 200) {
        wx.showToast({
          title: "绑定成功！",
          icon: 'none',
          duration: 2000
        })
        this.onLoad()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // cardget
  getEToken: function() {
    let _mobile = this.data.mobile;
    api._get('ecard/card/getEToken?mobile=' + _mobile).then(res => {
      let _data = res.data
      this.setData({
        etel: _data.tel,
        echannel_no: _data.channel_no,
        etoken: _data.token
      })
    })
  },
  // cardserch
  queryMyCards: function() {
    let _openid = wx.getStorageSync('openid');
    api._get('ecard/card/queryMyCards?openId=' + _openid).then(res => {
      let _data = res.data
      // console.log(_data)
      this.setData({
        cardList: _data
      })
    })
  },
  // shoujihao
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // code
  codeInput: function(e) {
    this.setData({
      code: e.detail.value
    })
  },

  goEa: function() {
    let _phomob = this.data.mobile
    wx.navigateTo({
      url: '/pages/webepae/webepae?phomob=' + _phomob,
    })
  },
  goEb: function() {
    let _phomob = this.data.mobile
    wx.navigateTo({
      url: '/pages/webepao/webepao?phomob=' + _phomob,
    })
  },
  goEc: function() {
    let _phomob = this.data.mobile
    wx.navigateTo({
      url: '/pages/webepar/webepar?phomob=' + _phomob,
    })
  },
  showomgard: function() {
    // console.log(this.data.mobile)
    let _phomob = this.data.mobile
    wx.navigateTo({
      url: '/pages/bindcard/bindcard?phomob=' + _phomob,
    })
  }
})