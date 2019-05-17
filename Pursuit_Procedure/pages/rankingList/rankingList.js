const util = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		maleActive: true,

		femaleActive: false,
		//是否显示导航栏样式
		isActiveIndex: 0,
		//性别
		gender: '',

		choiceGenderList: [],

		bookList: [],

		listId: 0,

		//是否显示加载框
		hidden: false,
		//是否显示列表
		booksListShow: true,

		winHeight: 0,

		scrollLength: 0,

	},
	//loading的函数
	changeHidden: function() {
		this.setData({
			hidden: !this.data.hidden,
			booksListShow: !this.data.booksListShow
		});
	},
	changeActive(event) {
		var that = this
		this.setData({
			maleActive: !this.data.maleActive,
			femaleActive: !this.data.femaleActive,
			isActiveIndex: 0
		})

		//		console.log('event ==>',event.currentTarget.dataset.gender)
		var gender = event.currentTarget.dataset.gender

		wx.request({
			url: 'http://novel.juhe.im/rank-category', // 仅为示例，并非真实的接口地址
			method: 'GET',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				console.log(res.data)
				var choiceGender = res.data
				for(var key in choiceGender) {
					if(key == gender) {

						//						console.log('that.data.gender ==>', that.data.gender)
						//						console.log('choiceGender[key] ==>', choiceGender[key])
						var listId = choiceGender[key][0]._id
						console.log('listId =>', listId)

						that.setData({
							gender: key,
							choiceGenderList: choiceGender[key],
							listId: listId
						})

					}
				}

				console.log('that.data.listId ==>', that.data.listId)
				wx.request({
					url: 'http://novel.juhe.im/rank/' + that.data.listId, // 仅为示例，并非真实的接口地址
					method: 'GET',
					header: {
						'content-type': 'application/json' // 默认值
					},
					success(res) {
						//						console.log('res ==>',res.data.ranking.books)
						var booksList = res.data.ranking.books
						for(var i = 0; i < booksList.length; i++) {
							for(var key in booksList[i]) {
								if(key == 'cover') {
									booksList[i][key] = util.formaImg(booksList[i][key])
								}
								if(key == 'latelyFollower') {
									booksList[i][key] = util.changeNum(booksList[i][key])
								}
								if(key == 'retentionRatio') {
									booksList[i][key] = parseFloat(booksList[i][key]).toFixed(1);
								}
							}
						}
						that.setData({
							booksList: booksList
						})
						//						console.log('that.data.booksList ===>',that.data.booksList)

					}
				})
			}
		})

	},

	//点击激活样式
	clickActive(event) {
		var that = this

		//		console.log('index =>',event.currentTarget.dataset.index)
		var isActiveIndex = event.currentTarget.dataset.index
		that.data.isActiveIndex = isActiveIndex
		that.setData(that.data)

		var listId = event.currentTarget.dataset.listid
		//		console.log('listid =>',event.currentTarget.dataset.listid)
		that.setData({
			listId: listId
		})

		wx.request({
			url: 'http://novel.juhe.im/rank/' + that.data.listId, // 仅为示例，并非真实的接口地址
			method: 'GET',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				//						console.log('res ==>',res.data.ranking.books)
				var booksList = res.data.ranking.books
				for(var i = 0; i < booksList.length; i++) {
					for(var key in booksList[i]) {
						if(key == 'cover') {
							booksList[i][key] = util.formaImg(booksList[i][key])
						}
						if(key == 'latelyFollower') {
							booksList[i][key] = util.changeNum(booksList[i][key])
						}
						if(key == 'retentionRatio') {
							booksList[i][key] = parseFloat(booksList[i][key]).toFixed(1);
						}
					}
				}
				that.setData({
					booksList: booksList
				})
				console.log('that.data.booksList ===>', that.data.booksList)

			}
		})

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

		that.changeHidden()

		wx.getSystemInfo({
			success: function(res) {
				that.setData({
					winHeight: res.windowHeight
				});
			}
		});

		wx.request({
			url: 'http://novel.juhe.im/rank-category', // 仅为示例，并非真实的接口地址
			method: 'GET',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				console.log(res.data)
				var choiceGender = res.data

				for(var key in choiceGender) {
					if(key == 'male') {

						console.log('that.data.gender ==>', that.data.gender)
						console.log('choiceGender[key] ==>', choiceGender[key])
						var listId = choiceGender[key][0]._id
						that.setData({
							gender: key,
							choiceGenderList: choiceGender[key],
							listId: listId
						})

					}
				}

				//				console.log('that.data.listId ==>', that.data.listId)

				wx.request({
					url: 'http://novel.juhe.im/rank/' + that.data.listId, // 仅为示例，并非真实的接口地址
					method: 'GET',
					header: {
						'content-type': 'application/json' // 默认值
					},
					success(res) {
						if(res.data.ranking.books) {
							that.changeHidden()
						}

						//						console.log('res ==>',res.data.ranking.books)
						var booksList = res.data.ranking.books
						for(var i = 0; i < booksList.length; i++) {
							for(var key in booksList[i]) {
								if(key == 'cover') {
									booksList[i][key] = util.formaImg(booksList[i][key])
								}
								if(key == 'latelyFollower') {
									booksList[i][key] = util.changeNum(booksList[i][key])
								}
								if(key == 'retentionRatio') {
									booksList[i][key] = parseFloat(booksList[i][key]).toFixed(1);
								}
							}
						}
						that.setData({
							booksList: booksList
						})
						//						console.log('that.data.booksList ===>',that.data.booksList)

					}
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

		var that = this

		that.changeHidden()

		wx.getSystemInfo({
			success: function(res) {
				that.setData({
					winHeight: res.windowHeight
				});
			}
		});

		wx.request({
			url: 'http://novel.juhe.im/rank-category', // 仅为示例，并非真实的接口地址
			method: 'GET',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				console.log(res.data)
				var choiceGender = res.data

				for(var key in choiceGender) {
					if(key == 'male') {

						console.log('that.data.gender ==>', that.data.gender)
						console.log('choiceGender[key] ==>', choiceGender[key])
						var listId = choiceGender[key][0]._id
						that.setData({
							gender: key,
							choiceGenderList: choiceGender[key],
							listId: listId
						})

					}
				}

				//				console.log('that.data.listId ==>', that.data.listId)

				wx.request({
					url: 'http://novel.juhe.im/rank/' + that.data.listId, // 仅为示例，并非真实的接口地址
					method: 'GET',
					header: {
						'content-type': 'application/json' // 默认值
					},
					success(res) {
						if(res.data.ranking.books) {
							that.changeHidden()
						}

						//						console.log('res ==>',res.data.ranking.books)
						var booksList = res.data.ranking.books
						for(var i = 0; i < booksList.length; i++) {
							for(var key in booksList[i]) {
								if(key == 'cover') {
									booksList[i][key] = util.formaImg(booksList[i][key])
								}
								if(key == 'latelyFollower') {
									booksList[i][key] = util.changeNum(booksList[i][key])
								}
								if(key == 'retentionRatio') {
									booksList[i][key] = parseFloat(booksList[i][key]).toFixed(1);
								}
							}
						}
						that.setData({
							booksList: booksList
						})
						//						console.log('that.data.booksList ===>',that.data.booksList)

					}
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
	onShareAppMessage: function() {

	}
})