
const app = getApp()
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		
		listNav:[
		{title:'联系客服',imageurl:'../../Chasing_books_picture/mine_04.png'},
		{title:'我的下载',imageurl:'../../Chasing_books_picture/mine_05.png'},
		{title:'自动购买',imageurl:'../../Chasing_books_picture/mine_06.png'},
		{title:'每日签到',imageurl:'../../Chasing_books_picture/mine_07.png'},
		{title:'兑换书券',imageurl:'../../Chasing_books_picture/mine_08.png'},
		{title:'充值记录',imageurl:'../../Chasing_books_picture/mine_09.png'},
		{title:'消费记录',imageurl:'../../Chasing_books_picture/mine_10.png'},
		{title:'用户协议',imageurl:'../../Chasing_books_picture/mine_11.png'},
		{title:'用户隐私保护政策',imageurl:'../../Chasing_books_picture/mine_12.png'},
		{title:'侵权申述指引',imageurl:'../../Chasing_books_picture/mine_13.png'}
		]
  },
  
  //刷新页面
  upDateSource(){
  	 var that = this
    //获取的登录信息
		if(app.globalData.userInfo) {
			that.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			})
		} else if(that.data.canIUse) {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				that.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				})
			}
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo
					that.setData({
						userInfo: res.userInfo,
						hasUserInfo: true
					})
				}
			})
		}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取的登录信息
		if(app.globalData.userInfo) {
			that.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			})
		} else if(that.data.canIUse) {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				that.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				})
			}
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo
					that.setData({
						userInfo: res.userInfo,
						hasUserInfo: true
					})
				}
			})
		}
	
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
		wx.showNavigationBarLoading() //在标题栏中显示加载
		that.upDateSource()
		//模拟加载
		setTimeout(function() {
			// complete
			wx.hideNavigationBarLoading() //完成停止加载
			wx.stopPullDownRefresh() //停止下拉刷新
		}, 1500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})