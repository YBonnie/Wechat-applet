const util = require('../../utils/util.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//当前书的ID
		currentBookId: '',
		bookname: '',
		//星星
		stars: [{
				flag: 1,
				bgImg: "../../Chasing_books_picture/star.png",
				bgfImg: "../../Chasing_books_picture/starActive.png"
			},
			{
				flag: 1,
				bgImg: "../../Chasing_books_picture/star.png",
				bgfImg: "../../Chasing_books_picture/starActive.png"
			},
			{
				flag: 1,
				bgImg: "../../Chasing_books_picture/star.png",
				bgfImg: "../../Chasing_books_picture/starActive.png"
			},
			{
				flag: 1,
				bgImg: "../../Chasing_books_picture/star.png",
				bgfImg: "../../Chasing_books_picture/starActive.png"
			},
			{
				flag: 1,
				bgImg: "../../Chasing_books_picture/star.png",
				bgfImg: "../../Chasing_books_picture/starActive.png"
			}

		],

		starss: [{
				flag: 1,
				bgImg: "../../Chasing_books_picture/star.png",
				bgfImg: "../../Chasing_books_picture/starActive.png"
			},
			{
				flag: 1,
				bgImg: "../../Chasing_books_picture/star.png",
				bgfImg: "../../Chasing_books_picture/starActive.png"
			},
			{
				flag: 1,
				bgImg: "../../Chasing_books_picture/star.png",
				bgfImg: "../../Chasing_books_picture/starActive.png"
			},
			{
				flag: 1,
				bgImg: "../../Chasing_books_picture/star.png",
				bgfImg: "../../Chasing_books_picture/starActive.png"
			},
			{
				flag: 1,
				bgImg: "../../Chasing_books_picture/star.png",
				bgfImg: "../../Chasing_books_picture/starActive.png"
			}

		],

		//星星的index
		starIndex: 2,
		//是否显示简介
		showView: true,
		//当前书籍的所有内容
		currentBooksInfo: {},
		//		评价的内容
		evaluateList: [],

		//是否显示加载框
		hidden: false,
		//是否显示列表
		booksListShow: true,

	},

	//loading的函数
	changeHidden: function() {
		this.setData({
			hidden: !this.data.hidden,
			booksListShow: !this.data.booksListShow
		});
	},

	clickShow() {
		this.setData({
			showView: !this.data.showView

		})

	},

	startRead(event) {

		var bookid = event.currentTarget.dataset.bookid
		var title = event.currentTarget.dataset.title
		var item = event.currentTarget.dataset.item

		var recentReadSource = wx.getStorageSync('recentReadSource')
		if(recentReadSource.length == 0) {
			recentReadSource = []
			recentReadSource.unshift(item)
			wx.setStorageSync('recentReadSource', recentReadSource)
		} else {
			for(var i = 0; i < recentReadSource.length; i++) {
				for(var key in recentReadSource[i]) {
					console.log('recentReadSource[i]._id ===>', recentReadSource[i]._id)
					if(recentReadSource[i]._id == item._id) {
						wx.navigateTo({
							url: '../../pages/detailedArticles/detailedArticles?bookid=' + bookid + '&title=' + title
						})
						return
					}
				}
			}
			recentReadSource.unshift(item)
			wx.setStorageSync('recentReadSource', recentReadSource)
		}
		wx.navigateTo({
			url: '../../pages/detailedArticles/detailedArticles?bookid=' + bookid + '&title=' + title
		})

	},

	//加入自己的书架
	addBookshelf(event) {
//		console.log('event=====>', event.currentTarget.dataset.item)
		var collectSource = wx.getStorageSync('collectSource')
		var item = event.currentTarget.dataset.item
		if(collectSource.length == 0) {
			collectSource = []
			collectSource.unshift(item)
			wx.setStorageSync('collectSource', collectSource)
		} else {
			for(var i = 0; i < collectSource.length; i++) {
				for(var key in collectSource[i]) {
//					console.log('collectSource[i]._id ===>', collectSource[i]._id)
					if(collectSource[i]._id == item._id) {
						wx.showToast({
							title: '已经收藏过了',
							icon: 'none',
							duration: 3000
						})
						return
					}
				}
			}

			wx.showToast({
				title: '收藏成功',
				icon: 'none',
				duration: 3000
			})
			collectSource.unshift(item)
			wx.setStorageSync('collectSource', collectSource)

		}
		//		wx.setStorageSync('key', 'value')
	},

	//下拉刷新
	upDateSource() {
		var that = this
		var bookid = that.data.currentBookId

		var bookname = that.data.bookname

		that.setData({
			currentBookId: bookid
		})
		wx.setNavigationBarTitle({
			title: bookname
		})

		//假的ID
		//		var bookid = '574a53df542746bc2ed0f190'
		wx.request({
			url: 'http://novel.juhe.im/book-info/' + bookid,
			method: "GET",
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {

				var score = Math.floor(100 % res.data.rating.score / 2)

				//星星的显示
				var index = score
				for(var i = 0; i < that.data.stars.length; i++) {
					var item = 'stars[' + i + '].flag';
					that.setData({
						[item]: 1
					})
				}
				for(var i = 0; i <= index; i++) {
					var item = 'stars[' + i + '].flag';
					that.setData({
						[item]: 2
					})
				}

				var books = res.data
				for(var key in books) {
					if(key == 'cover') {
						books[key] = util.formaImg(books[key])

					}
					if(key == 'updated') {
						books[key] = util.upDateTime(books[key])
					}
					if(key == 'rating') {

						for(var k in books[key]) {
							if(k == 'score') {
								books[key][k] = books[key][k].toFixed(1)
							}
						}
					}
					if(key == 'wordCount') {
						books[key] = util.changeNum(books[key])
					}
				}

				that.setData({
					currentBooksInfo: books
				})

				//				console.log('currentBooksInfo =>', that.data.currentBooksInfo)

			}
		})

		wx.request({
			url: 'https://novel.juhe.im/book/reviews?book=' + bookid,
			method: "GET",
			header: {
				'content-type': 'application/json'
			},

			success: function(res) {
				console.log('res =>', res)
				var evaluateList = res.data.reviews.slice(0, 3)
				console.log('evaluateList =>', evaluateList)

				for(var i = 0; i < evaluateList.length; i++) {

					for(var key in evaluateList[i]) {
						if(key == 'author') {
							for(var k in evaluateList[i][key]) {
								if(k == 'avatar') {
									evaluateList[i][key][k] = 'http://statics.zhuishushenqi.com' + evaluateList[i][key][k]

								}
							}

						}
						if(key == 'updated') {
							evaluateList[i][key] = util.upDateTime(evaluateList[i][key])
						}
					}

				}

				var index = 4

				for(var i = 0; i < that.data.starss.length; i++) {
					var item = 'starss[' + i + '].flag';
					that.setData({
						[item]: 1
					})
				}
				for(var i = 0; i <= index; i++) {
					var item = 'starss[' + i + '].flag';
					that.setData({
						[item]: 2
					})
				}

				that.setData({
					evaluateList: evaluateList
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

		var bookname = options.bookname

		that.setData({
			currentBookId: bookid,
			bookname: bookname
		})
		wx.setNavigationBarTitle({
			title: bookname
		})
		that.changeHidden()

		//假的ID
		//		var bookid = '574a53df542746bc2ed0f190'
		wx.request({
			url: 'http://novel.juhe.im/book-info/' + bookid,
			method: "GET",
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {

				var score = Math.floor(100 % res.data.rating.score / 2)

				//星星的显示
				var index = score
				for(var i = 0; i < that.data.stars.length; i++) {
					var item = 'stars[' + i + '].flag';
					that.setData({
						[item]: 1
					})
				}
				for(var i = 0; i <= index; i++) {
					var item = 'stars[' + i + '].flag';
					that.setData({
						[item]: 2
					})
				}

				var books = res.data
				for(var key in books) {
					if(key == 'cover') {
						books[key] = util.formaImg(books[key])

					}
					if(key == 'updated') {
						books[key] = util.upDateTime(books[key])
					}
					if(key == 'rating') {

						for(var k in books[key]) {
							if(k == 'score') {
								books[key][k] = books[key][k].toFixed(1)
							}
						}
					}
					if(key == 'wordCount') {
						books[key] = util.changeNum(books[key])
					}
				}

				that.setData({
					currentBooksInfo: books
				})

				//				console.log('currentBooksInfo =>', that.data.currentBooksInfo)

			}
		})

		wx.request({
			url: 'https://novel.juhe.im/book/reviews?book=' + bookid,
			method: "GET",
			header: {
				'content-type': 'application/json'
			},

			success: function(res) {
				//				console.log('res =>', res)
				if(res) {
					that.changeHidden()
				}
				var evaluateList = res.data.reviews.slice(0, 3)
				//				console.log('evaluateList =>', evaluateList)

				for(var i = 0; i < evaluateList.length; i++) {

					for(var key in evaluateList[i]) {
						if(key == 'author') {
							for(var k in evaluateList[i][key]) {
								if(k == 'avatar') {
									evaluateList[i][key][k] = 'http://statics.zhuishushenqi.com' + evaluateList[i][key][k]

								}
							}

						}
						if(key == 'updated') {
							evaluateList[i][key] = util.upDateTime(evaluateList[i][key])
						}
					}
				}
				var index = 4
				for(var i = 0; i < that.data.starss.length; i++) {
					var item = 'starss[' + i + '].flag';
					that.setData({
						[item]: 1
					})
				}
				for(var i = 0; i <= index; i++) {
					var item = 'starss[' + i + '].flag';
					that.setData({
						[item]: 2
					})
				}
				that.setData({
					evaluateList: evaluateList
				})

			}
		})

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {
		//console.log(util.upDateTime("2017-04-29T11:20:18.966Z"))
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