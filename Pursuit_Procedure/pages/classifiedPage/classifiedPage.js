const util = require('../../utils/util.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		navList01: ['热门', '新书', '好评', '完结', 'VIP'],
		navList02: [],
		activeIndex01: 0,
		activeIndex02: 0,
		firstBooksList: [],
		booksList: [],
		gender: '',
		name: ''

	},

	//nav-one
	choice01(event) {
		var that = this
		var activeIndex01 = event.currentTarget.dataset.index

		that.setData({
			activeIndex01: activeIndex01
		})

	},
	choice02(event) {
		var that = this
		var activeIndex02 = event.currentTarget.dataset.index

		that.setData({
			activeIndex02: activeIndex02
		})

		var item = event.currentTarget.dataset.item
		console.log('item ==>', item)

		var firstBooksList = that.data.firstBooksList
		console.log('firstBooksList ==>', firstBooksList)

		if(item === '全部') {
			that.setData({
				booksList: that.data.firstBooksList
			})
		} else {
			var booksLists = []
			for(var i = 0; i < firstBooksList.length; i++) {
				if(firstBooksList[i].minorCate == item) {

					booksLists.push(firstBooksList[i])
				}
			}
			that.setData({
				booksList: booksLists
			})
		}

	},
	//点击跳转该书的详情
	toBooksDetail(event) {

		console.log('event ===>', event)
		var bookid = event.currentTarget.dataset.bookid
		var bookname = event.currentTarget.dataset.bookname
		wx.navigateTo({
			url: '../../pages/booksDetailPage/booksDetailPage?bookid=' + bookid + '&bookname=' + bookname
		})
	},

	//下拉刷新
	upDateSource() {
		var that = this
		var name = that.data.name
		var gender = that.data.gender
		that.setData({
			name: name,
			gender: gender
		})
		wx.getSystemInfo({
			success: function(res) {
				that.setData({
					winHeight: res.windowHeight
				});
			}
		});

		wx.request({
			url: 'http://novel.juhe.im/category-info?gender=' + gender + '&type=hot&major=' + name + '&minor=&start=0', // 仅为示例，并非真实的接口地址
			method: 'GET',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {

				var books = res.data.books
				for(var i = 0; i < books.length; i++) {
					for(var key in books[i]) {
						if(key == 'cover') {
							books[i][key] = util.formaImg(books[i][key])
						}
						if(key == 'latelyFollower') {
							books[i][key] = util.changeNum(books[i][key])
						}
						if(key == 'retentionRatio') {
							books[i][key] = books[i][key].toFixed(1)
						}
					}
				}

				that.setData({
					booksList: books,
					firstBooksList: books
				})

				//				console.log('that.data.booksList ==>',that.data.booksList)
				//				console.log('that.data.firstBooksList ==>',that.data.firstBooksList)
			}
		})

		wx.request({
			url: 'http://novel.juhe.im/sub-categories', // 仅为示例，并非真实的接口地址
			method: 'GET',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				//				console.log(res.data)
				var res = res.data
				for(var key in res) {
					if(key == gender) {
						for(var i = 0; i < res[key].length; i++) {
							if(res[key][i].major == name) {
								var navList02 = res[key][i].mins
								navList02.unshift('全部')
								//								console.log('navList02==>',navList02)
								that.setData({
									navList02: navList02
								})
							}
						}
					}
				}
			}
		})

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this

		var name = options.name
		var gender = options.gender

		that.setData({
			name: name,
			gender: gender
		})
		wx.getSystemInfo({
			success: function(res) {
				that.setData({
					winHeight: res.windowHeight
				});
			}
		});

		wx.request({
			url: 'http://novel.juhe.im/category-info?gender=' + gender + '&type=hot&major=' + name + '&minor=&start=0', // 仅为示例，并非真实的接口地址
			method: 'GET',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {

				var books = res.data.books
				for(var i = 0; i < books.length; i++) {
					for(var key in books[i]) {
						if(key == 'cover') {
							books[i][key] = util.formaImg(books[i][key])
						}
						if(key == 'latelyFollower') {
							books[i][key] = util.changeNum(books[i][key])
						}
						if(key == 'retentionRatio') {
							books[i][key] = books[i][key].toFixed(1)
						}
					}
				}

				that.setData({
					booksList: books,
					firstBooksList: books
				})

				//				console.log('that.data.booksList ==>',that.data.booksList)
				//				console.log('that.data.firstBooksList ==>',that.data.firstBooksList)
			}
		})

		wx.request({
			url: 'http://novel.juhe.im/sub-categories', // 仅为示例，并非真实的接口地址
			method: 'GET',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				//				console.log(res.data)
				var res = res.data
				for(var key in res) {
					if(key == gender) {
						for(var i = 0; i < res[key].length; i++) {
							if(res[key][i].major == name) {
								var navList02 = res[key][i].mins
								navList02.unshift('全部')
								//								console.log('navList02==>',navList02)
								that.setData({
									navList02: navList02
								})
							}
						}
					}
				}
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