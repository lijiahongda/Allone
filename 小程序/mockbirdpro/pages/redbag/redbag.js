// pages/redbag/redbag.js
const api = require('../../utils/requst.js')
// const apid = require('../../utils/requuu.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unickname: null,
    unickarvr: '',
    o_money: 0,
    activityId: null,
    isChary: false,
    redpacketlist: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    let _activityId = options.activityId
    this.setData({
      activityId: _activityId
    })
    this.getUserlist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  receiveRedPacket: function() {
    //获取邀请信息
    let _openid = wx.getStorageSync('openid');
    let _nickname = this.data.unickname
    let _headUrl = this.data.unickarvr
    let _activityId = this.data.activityId
    api._post('ticket-trade/redpacket/receiveRedPacket?openId=' + _openid + '&activityId=' + _activityId + '&headUrl=' + _headUrl + '&nickname=' + _nickname).then(res => {
      // console.log(res)
      if (res.status == 200) {
        let s_data = res.data
        let s_verst = {}
        s_data.map(val => {
          if (val.openId == _openid) {
            s_verst = val
          }
        })
        // console.log(s_verst)
        this.setData({
          redpacketlist: res.data,
          isChary: true,
          o_money: s_verst.packetAmt
        })
      }
    })
  },
  // 获取用户名
  getUserlist: function() {
    let _self = this
    wx.getUserInfo({
      success: function(res) {
        let userInfo = res.userInfo
        let nickName = userInfo.nickName
        let avatarUrl = userInfo.avatarUrl
        _self.setData({
          unickname: nickName,
          unickarvr: avatarUrl
        })
      }
    })
  }
})