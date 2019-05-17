const util = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

		searchValue: '',

		imageBanner: [
			"http://statics.zhuishushenqi.com/recommendPage/155660588781147",
			"http://statics.zhuishushenqi.com/recommendPage/155660592562552",
			"http://statics.zhuishushenqi.com/recommendPage/155660596069151",
			"http://statics.zhuishushenqi.com/recommendPage/155660599369520"
		],

		//nav
		navList: [
			{ title: '排行榜', imageUrl: '../../Chasing_books_picture/paihang.png', bgColor: "#ecf8ea", path: '/pages/rankingList/rankingList' },
			{ title: 'VIP', imageUrl: '../../Chasing_books_picture/VIP.png', bgColor: "#FFF2CF", path: '/pages/VIP/VIP' },
			{ title: '分类', imageUrl: '../../Chasing_books_picture/fenlei.png', bgColor: "#E6F0FC", path: '/pages/classification/classification' },
			{ title: '书单', imageUrl: '../../Chasing_books_picture/shudan.png', bgColor: "#FCE7E4", path: '/pages/bookLists/bookLists' },
		],

		listName: [],

		listArr: []

	},

	//方法
	//跳转到查询页面方法
	searchPage: function(event) {
		//跳转页面
		wx.navigateTo({
			url: '/pages/search/search'
		});
	},

	//中部导航跳转
	goPath(event) {

		var currentUrl = event.currentTarget.dataset.url
		wx.navigateTo({
			url: currentUrl
		});
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

	//查看更多
	checkMore(event) {
		//		console.log('event =>',event.currentTarget.dataset.name)
		var name = event.currentTarget.dataset.name

		wx.navigateTo({
			url: '../../pages/checkMore/checkMore?name=' + name
		})

	},

	//刷新加载的函数
	upDateSource() {
		var _this = this
		var press = 'press'
		var listArrBox = []

		//拿到所有小说和漫画数据
		wx.request({
			url: 'http://novel.juhe.im/categories', //仅为示例，并非真实的接口地址
			method: 'GET',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success: function(res) {

				//				console.log('res.data =>', res.data.press)
				//				//把数据存在本地
				//				wx.setStorage({
				//					key: 'allSource',
				//					data: res.data.press
				//				})
				var listName = []
				for(var i = 0; i < res.data.press.length; i++) {
					listName.push(res.data.press[i].name)
				}
				//				console.log('listName =>', listName)
				for(let y = 0; y < listName.length; y++) {

					wx.request({
						url: 'http://novel.juhe.im/category-info?gender=press&type=hot&major=' + listName[y] + '&minor=&start=0&limit=4', //仅为示例，并非真实的接口地址
						method: 'GET',
						header: {
							'content-type': 'application/json' // 默认值
						},
						success: function(res) {
							var books = res.data.books
							for(var i = 0; i < books.length; i++) {

								for(var key in books[i]) {
									if(key == 'cover') {
										books[i][key] = util.formaImg(books[i][key])
									}
								}

							}

							var listbject = {
								name: listName[y],
								books: res.data.books
							}

							listArrBox.push(listbject)
							_this.setData({
								listArr: listArrBox
							})

							//														console.log('_this.data.listArr =>', _this.data.listArr)

						}
					})

				}

			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var _this = this
		var press = 'press'
		var listArrBox = []

		//拿到所有小说和漫画数据
		wx.request({
			url: 'http://novel.juhe.im/categories', //仅为示例，并非真实的接口地址
			method: 'GET',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success: function(res) {

				//				console.log('res.data =>', res.data.press)
				//				//把数据存在本地
				//				wx.setStorage({
				//					key: 'allSource',
				//					data: res.data.press
				//				})
				var listName = []
				for(var i = 0; i < res.data.press.length; i++) {
					listName.push(res.data.press[i].name)
				}
				//				console.log('listName =>', listName)
				for(let y = 0; y < listName.length; y++) {

					wx.request({
						url: 'http://novel.juhe.im/category-info?gender=press&type=hot&major=' + listName[y] + '&minor=&start=0&limit=4', //仅为示例，并非真实的接口地址
						method: 'GET',
						header: {
							'content-type': 'application/json' // 默认值
						},
						success: function(res) {
							var books = res.data.books
							for(var i = 0; i < books.length; i++) {

								for(var key in books[i]) {
									if(key == 'cover') {
										books[i][key] = util.formaImg(books[i][key])
									}
								}

							}

							var listbject = {
								name: listName[y],
								books: res.data.books
							}

							listArrBox.push(listbject)
							_this.setData({
								listArr: listArrBox
							})

							//														console.log('_this.data.listArr =>', _this.data.listArr)

						}
					})

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