const util = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		bookList: [],
		bookid: 0,
		//是否显示加载框
		hidden: false,
		//是否显示列表
		booksListShow: true
	},
//loading的函数
	changeHidden: function() {
		this.setData({
			hidden: !this.data.hidden,
			booksListShow: !this.data.booksListShow
		});
	},
	//点击跳转该书的详情
	toBooksDetail(event) {

		var bookid = event.currentTarget.dataset.bookid
		var bookname = event.currentTarget.dataset.bookname

		console.log('bookid ==>', bookid)
		console.log('bookname ==>', bookname)
		wx.navigateTo({
			url: '../../pages/booksDetailPage/booksDetailPage?bookid=' + bookid + '&bookname=' + bookname
		})
	},

	//刷新页面
	upDateSource() {
		var that = this
		var bookid = that.data.bookid
		wx.request({
			url: 'https://novel.juhe.im/booklists/' + bookid, // 仅为示例，并非真实的接口地址
			method: 'GET',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {

				var bookList = res.data.bookList
				bookList.author.avatar = 'http://statics.zhuishushenqi.com' + bookList.author.avatar
				bookList.updated = util.upDateTime(bookList.updated)
				var books = bookList.books
				//				console.log('books ==>',books)
				for(var i = 0; i < books.length; i++) {
					var book = books[i].book
					for(var key in book) {
						if(key == 'cover') {
							book[key] = util.formaImg(book[key])
						}
					}
				}
				console.log('bookList ==>', bookList)
				that.setData({
					bookList: bookList
				})

			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this
		var bookid = options.bookid

		that.setData({
			bookid: bookid
		})
		
		that.changeHidden()

		//		var bookid = '5cd402b8d71e825858f655aa'
		//		console.log('bookid ===》', bookid)

		wx.request({
			url: 'https://novel.juhe.im/booklists/' + bookid, // 仅为示例，并非真实的接口地址
			method: 'GET',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				if(res){
					that.changeHidden()
				}

				var bookList = res.data.bookList
				bookList.author.avatar = 'http://statics.zhuishushenqi.com' + bookList.author.avatar
				bookList.updated = util.upDateTime(bookList.updated)
				var books = bookList.books
				//				console.log('books ==>',books)
				for(var i = 0; i < books.length; i++) {
					var book = books[i].book
					for(var key in book) {
						if(key == 'cover') {
							book[key] = util.formaImg(book[key])
						}
					}
				}
				console.log('bookList ==>', bookList)
				that.setData({
					bookList: bookList
				})

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
	onShareAppMessage: function(res) {
		if(res.from === 'button') {}
		return {
			title: '分享',
			path: '/pages/booksDetails/booksDetails',
			success: function(res) {
				if(res.errMsg == 'shareAppMessage:ok') { //判断分享是否成功
					wx.showToast({
						title: '分享成功',
						icon: 'success',
						duration: 2000
					})

				}
			}
		}
	}

})