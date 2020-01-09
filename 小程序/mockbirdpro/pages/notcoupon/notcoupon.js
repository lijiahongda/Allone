// pages/notcoupon/notcoupon.js
const api = require('../../utils/requst.js')
const apid = require('../../utils/requuu.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCouponList()
  },
  // 获取优惠券数据
  getCouponList: function () {
    let params = {
      pageCount: 1,
      pageSize: 100,
      openId: wx.getStorageSync('openid'),
      status: 3
    }
    // api._get('ticket-pay/coupon/getCouponsByStatus', params)
    apid._get(':9100/coupon/getCouponsByStatus', params)
      .then(res => {
        let _data = res.data
        if (res.status == 200) {
          _data.map(val => {
            val.createDate = val.createDate.substring(0, 10)
            val.validDate = val.validDate.substring(0, 10)
          })
          this.setData({
            couponList: _data
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }).catch(e => {
        console.log(e)
      })
  }
})