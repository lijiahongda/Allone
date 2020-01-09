// pages/movie/movie.js
const api = require('../../utils/requst.js')
const apid = require('../../utils/requuu.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: null,
    pageCount: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _self = this
    let _pageCount = this.data.pageCount
    this.getmovieList(_pageCount)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  onPullDownRefresh: function () {

    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    this.onLoad()
    setTimeout(function () {

      // complete
      wx.hideNavigationBarLoading() //完成停止加载

      wx.stopPullDownRefresh() //停止下拉刷新

    }, 1500);

  },
  //影片详情
  goMoviedetail: function(event) {
    let _id = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/moviedetail/moviedetail?id=' + _id,
    })
  },
  //影片库列表
  getmovieList: function(pageCount) {
    let params = {
      pageCount: pageCount,
      pageSize: 100,
      status: 0
    }
    // api._get('ticket-trade/movie/findMovieList', params)
    apid._get(':8336/movie/findMovieList', params)
    .then(res => {
      if (res.status == 200) {
        this.setData({
          movieList: res.data
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