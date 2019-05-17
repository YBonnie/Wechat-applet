const util = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

		//当前的所有书籍
		booksList: [],
		//是否显示加载框
		hidden: false,
		//是否显示列表
		booksListShow: true,
		name: ''

	},

	//loading的函数
	changeHidden: function() {
		this.setData({
			hidden: !this.data.hidden,
			booksListShow: !this.data.booksListShow
		});
	},

	//跳转页面
	toBooksDetail(event) {
		var bookid = event.currentTarget.dataset.bookid
		var bookname = event.currentTarget.dataset.bookname
		wx.navigateTo({
			url: '../../pages/booksDetailPage/booksDetailPage?bookid=' + bookid + '&bookname=' + bookname
		})
	},

	//刷新页面
	upDateSource() {
		var that = this
		var name = that.data.name

		that.setData({
			name: name
		})
		that.changeHidden()
		wx.setNavigationBarTitle({
			title: name
		})

		wx.request({
			url: 'http://novel.juhe.im/category-info?gender=press&type=hot&major=' + name + '&minor=&start=0', // 仅为示例，并非真实的接口地址
			method: 'GET',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				if(res) {
					that.changeHidden()
				}

				
				var booksList = res.data.books
				for(var i = 0; i < booksList.length; i++) {
					for(var key in booksList[i]) {
						if(key == 'cover') {
							booksList[i][key] = util.formaImg(booksList[i][key])
						}
						if(key == 'tags') {
							console.log('tags == >', booksList[i][key])
							if(booksList[i][key].length >= 1) {
								booksList[i][key] = booksList[i][key].slice(1, 2)
							}
						}
					}
				}
				that.setData({
					booksList: booksList
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this
		var name = options.name
		//		console.log('name ==>', name)
		that.setData({
			name: name
		})
		that.changeHidden()
		wx.setNavigationBarTitle({
			title: name
		})

		wx.request({
			url: 'http://novel.juhe.im/category-info?gender=press&type=hot&major=' + name + '&minor=&start=0', // 仅为示例，并非真实的接口地址
			method: 'GET',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				if(res) {
					that.changeHidden()
				}

				//				console.log('res.data ==>',res.data.books)
				var booksList = res.data.books
				for(var i = 0; i < booksList.length; i++) {
					for(var key in booksList[i]) {
						if(key == 'cover') {
							booksList[i][key] = util.formaImg(booksList[i][key])
						}
						if(key == 'tags') {
							console.log('tags == >', booksList[i][key])
							if(booksList[i][key].length >= 1) {
								booksList[i][key] = booksList[i][key].slice(1, 2)
							}
						}
					}
				}

				that.setData({
					booksList: booksList
				})
				//				console.log('that.data.booksList ==>',that.data.booksList)
			}
		})
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
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})