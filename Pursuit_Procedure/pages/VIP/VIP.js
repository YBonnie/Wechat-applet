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

		isActive1: true,
		isActive2: false,

		//bookList
		booksList: [],
		
		currentGender:'male',

	},
	
	goPath(){
		wx.navigateTo({
			url: '../../pages/search/search'
		})
	},
	
	//查看更多
	checkMore(event){
		var that = this
//		console.log('event =>',event.currentTarget.dataset.name)
		var name = event.currentTarget.dataset.name
		var gender = that.data.currentGender
		
		wx.navigateTo({
			url: '../../pages/VIPcheckMore/VIPcheckMore?name=' + name +'&gender='+gender
		})
		
	},
	
	//点击跳转该书的详情
	toBooksDetail(event){
		
//		console.log('event ===>',event)
		var bookid = event.currentTarget.dataset.bookid
		var bookname = event.currentTarget.dataset.bookname
		wx.navigateTo({
			url: '../../pages/booksDetailPage/booksDetailPage?bookid=' + bookid + '&bookname='+bookname
		})
	},
	
	//gender的选择
	changeActive(event) {
		var that = this
		var gender = event.currentTarget.dataset.gender
		that.setData({
			isActive1: !that.data.isActive1,
			isActive2: !that.data.isActive2,
			currentGender:gender
		})
		var bookListArr = []
		
		//获取书的数据
		wx.request({
			url: 'http://novel.juhe.im/rank-category',
			method: 'GET',
			header: {
				'content-type': 'application/json'
			},
			success(res) {
				var res = res.data
				//				console.log('res =>', res)
				var listName = []
				var listId = []
				for(var key in res) {
					if(key == gender) {
						//						console.log('res[key] ==>', res[key])
						for(var i = 0; i < res[key].length; i++) {
							listName.push(res[key][i].title)
							listId.push(res[key][i]._id)
						}
//						console.log('listName ==>', listName)
//						console.log('listId ==>', listId)

						for(let j = 0; j < listName.length; j++) {

							wx.request({
								url: 'http://novel.juhe.im/rank/' + listId[j], // 仅为示例，并非真实的接口地址
								method: 'GET',
								header: {
									'content-type': 'application/json' // 默认值
								},
								success(res) {

//									console.log('listName[j] ==>', listName[j])
									//										console.log(res.data.ranking.books)
									var books = res.data.ranking.books.slice(0, 4)
									//										console.log('books ==>', books)

									for(var i = 0; i < books.length; i++) {

										for(var key in books[i]) {
											if(key == 'cover') {
												books[i][key] = util.formaImg(books[i][key])
											}
										}

									}

									var list = {
										name: listName[j],
										books: books
									}
									bookListArr.push(list)
									that.setData({
										booksList: bookListArr
									})
//									console.log('that.data.booksList ==>', that.data.booksList)
								}
							})
						}

					}
				}

			}
		})
		
		
	},
	//下拉刷新
	upDateSource(){
		var that = this

		var bookListArr = []

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

		//获取书的数据
		wx.request({
			url: 'http://novel.juhe.im/rank-category',
			method: 'GET',
			header: {
				'content-type': 'application/json'
			},
			success(res) {
				var res = res.data
				//				console.log('res =>', res)
				var listName = []
				var listId = []
				for(var key in res) {
					if(key == 'male') {
						//						console.log('res[key] ==>', res[key])
						for(var i = 0; i < res[key].length; i++) {
							listName.push(res[key][i].title)
							listId.push(res[key][i]._id)
						}
//						console.log('listName ==>', listName)
//						console.log('listId ==>', listId)

						for(let j = 0; j < listName.length; j++) {

							wx.request({
								url: 'http://novel.juhe.im/rank/' + listId[j], // 仅为示例，并非真实的接口地址
								method: 'GET',
								header: {
									'content-type': 'application/json' // 默认值
								},
								success(res) {

//									console.log('listName[j] ==>', listName[j])
									//										console.log(res.data.ranking.books)
									var books = res.data.ranking.books.slice(0, 4)
									//										console.log('books ==>', books)

									for(var i = 0; i < books.length; i++) {

										for(var key in books[i]) {
											if(key == 'cover') {
												books[i][key] = util.formaImg(books[i][key])
											}
										}

									}

									var list = {
										name: listName[j],
										books: books
									}
									bookListArr.push(list)
									that.setData({
										booksList: bookListArr
									})
//									console.log('that.data.booksList ==>', that.data.booksList)
								}
							})
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

		var bookListArr = []

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

		//获取书的数据
		wx.request({
			url: 'http://novel.juhe.im/rank-category',
			method: 'GET',
			header: {
				'content-type': 'application/json'
			},
			success(res) {
				var res = res.data
				//				console.log('res =>', res)
				var listName = []
				var listId = []
				for(var key in res) {
					if(key == 'male') {
						//						console.log('res[key] ==>', res[key])
						for(var i = 0; i < res[key].length; i++) {
							listName.push(res[key][i].title)
							listId.push(res[key][i]._id)
						}
//						console.log('listName ==>', listName)
//						console.log('listId ==>', listId)

						for(let j = 0; j < listName.length; j++) {

							wx.request({
								url: 'http://novel.juhe.im/rank/' + listId[j], // 仅为示例，并非真实的接口地址
								method: 'GET',
								header: {
									'content-type': 'application/json' // 默认值
								},
								success(res) {

//									console.log('listName[j] ==>', listName[j])
									//										console.log(res.data.ranking.books)
									var books = res.data.ranking.books.slice(0, 4)
									//										console.log('books ==>', books)

									for(var i = 0; i < books.length; i++) {

										for(var key in books[i]) {
											if(key == 'cover') {
												books[i][key] = util.formaImg(books[i][key])
											}
										}

									}

									var list = {
										name: listName[j],
										books: books
									}
									bookListArr.push(list)
									that.setData({
										booksList: bookListArr
									})
//									console.log('that.data.booksList ==>', that.data.booksList)
								}
							})
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