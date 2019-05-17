Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		navValue: '我的书架',
		navList: ['我的书架', '最近读的'],
		hidden: false,
		hidden1: false,
		navPageShow: true,
		recentShow: false,
		collectSource: [],
		length: 0,
		length1:0
	},
	changePage(event) {
		var that = this
		var item = event.currentTarget.dataset.item
		that.setData({
			navValue: item
		})

		if(item == '最近读的') {
				var recentReadSource = wx.getStorageSync('recentReadSource')
		console.log('recentReadSource ==>', recentReadSource)
		
		if(!recentReadSource || recentReadSource.length == 0){
				that.setData({
				hidden: false,
				hidden1: true,
				navPageShow: false,
				recentShow: false,
			})
		}else{
			that.setData({
					hidden: false,
					hidden1: false,
					navPageShow: false,
					recentReadSource: recentReadSource,
					length1: recentReadSource.length,
					recentShow: true,

				})
		}
			
			
		
		} else {
			var collectSource = wx.getStorageSync('collectSource')
			//			console.log('collectSource ==>', collectSource)
			if(!collectSource || collectSource.length == 0) {
				that.setData({
					hidden: true,
					navPageShow: false,
					recentShow: false,
				})
			} else {
				that.setData({
					hidden: false,
					navPageShow: true,
					collectSource: collectSource,
					length: collectSource.length,
					recentShow: false,

				})
			}
		}

	},

	goPath() {
		wx.navigateTo({
			url: '../../pages/index/index'
		})
	},
	
	//删除最近访问的书目
	delectBooks(event){
			var that = this
		var id = event.currentTarget.dataset.id
		var recentReadSource = wx.getStorageSync('recentReadSource')
	
		for(var i = 0 ; i < recentReadSource.length; i++){
			if(recentReadSource[i]._id == id){
				console.log('i==>',i)
				recentReadSource.splice(i,1)
				
			}
		}
		
		wx.setStorageSync('recentReadSource',recentReadSource)
	
		if(!recentReadSource || recentReadSource.length == 0){
				that.setData({
				hidden: false,
				hidden1: true,
				navPageShow: false,
				recentShow: false,
			})
		}else{
			that.setData({
					hidden: false,
					hidden1: false,
					navPageShow: false,
					recentReadSource: recentReadSource,
					length1: recentReadSource.length,
					recentShow: true,

				})
		}
		
	},

	//点击跳转该书的详情
	toBooksDetail(event) {

		//		console.log('event ===>',event)
		var bookid = event.currentTarget.dataset.bookid
		var bookname = event.currentTarget.dataset.bookname
		wx.navigateTo({
			url: '../../pages/booksDetailPage/booksDetailPage?bookid=' + bookid + '&bookname=' + bookname
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this
		var collectSource = wx.getStorageSync('collectSource')
		console.log('collectSource ==>', collectSource)
	
		
		if(!collectSource || collectSource.length == 0) {
			that.setData({
				hidden: true,
				navPageShow: false,
				recentShow: false,
			})
		} else {
			that.setData({
				hidden: false,
				navPageShow: true,
				collectSource: collectSource,
				length: collectSource.length,
				recentShow: false,
			})
		}
		
		
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})