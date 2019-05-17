const util = require('../../utils/util.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		choiceGenderList: ['男生', '女生', '出版'],

		winHeight: 0,

		scrollLength: 0,

		isActiveIndex: 0,

		isActiveId: 0,

		gender: 'male',

		bookListArr: [],

		heightArr: [],
	},
	clickActive(event) {
		var that = this
		//		console.log('index =>',event.currentTarget.dataset.index)
		var isActiveIndex = event.currentTarget.dataset.index
		var isActiveId = event.currentTarget.dataset.id
		console.log('isActiveId ===>', isActiveId)

		that.data.isActiveIndex = isActiveIndex
		that.data.isActiveId = isActiveId
		that.setData(that.data)

	},
	//滚动事件
	scroll(e) {
		var that = this
		var scrollTop = e.detail.scrollTop * 2

		var heightArr = that.data.heightArr

		if(scrollTop <= heightArr[0]) {
			that.setData({
				isActiveIndex: 0
			})
		} else if(scrollTop >= heightArr[0] && scrollTop <= 1600) {
			that.setData({
				isActiveIndex: 1
			})
		} else if(scrollTop >= 1600) {
			that.setData({
				isActiveIndex: 2
			})
		}

	},

	goPath(event) {

		var gender = event.currentTarget.dataset.gender
		var name = event.currentTarget.dataset.name
		wx.navigateTo({
			url: '../../pages/classifiedPage/classifiedPage?gender=' + gender + '&name=' + name
		})
	},
	//下拉刷新
	upDateSource() {
		var that = this
		wx.request({
			url: 'http://novel.juhe.im/categories', // 仅为示例，并非真实的接口地址
			method: 'GET',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				console.log(res.data)
				var res = res.data
				var name = ''
				var arr = []
				var gender = ''
				var bookListArr = []
				for(var key in res) {
					if(key == 'female') {
						gender = key
						arr = res[key]
						key = '女生'
						name = key
						var list = {
							gender: gender,
							name: name,
							arr: arr
						}
						bookListArr.push(list)
					}
					if(key == 'male') {
						gender = key
						arr = res[key]
						key = '男生'
						name = key
						var list = {
							gender: gender,
							name: name,
							arr: arr
						}
						bookListArr.push(list)
					}

					if(key == 'press') {
						gender = key
						arr = res[key]
						key = '出版'
						name = key
						var list = {
							gender: gender,
							name: name,
							arr: arr
						}
						bookListArr.push(list)
					}
				}

				for(var i = 0; i < bookListArr.length; i++) {
					var arr = bookListArr[i].arr
					for(var j = 0; j < arr.length; j++) {
						for(var key in arr[j]) {
							if(key == 'bookCover') {
								var bookCover = arr[j][key]

								for(var z = 0; z < bookCover.length; z++) {
									bookCover[z] = util.formaImg(bookCover[z])
								}
							}
						}
					}
				}

				that.setData({
					bookListArr: bookListArr
				})
				console.log('bookListArr ==>', that.data.bookListArr)
				var length1 = []
				var heightArr = []
				for(var i = 0; i < that.data.bookListArr.length; i++) {

					var arr = that.data.bookListArr[i].arr

					length1.push(arr.length)
				}
				var height = 0

				for(var j = 0; j < length1.length; j++) {

					height = (length1[j] * 70)
					heightArr.push(height)

				}
				that.setData({
					heightArr: heightArr
				})

			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

		var that = this

		wx.getSystemInfo({
			success: function(res) {
				that.setData({
					winHeight: res.windowHeight + 600
				});
			}
		});

		wx.request({
			url: 'http://novel.juhe.im/categories', // 仅为示例，并非真实的接口地址
			method: 'GET',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				console.log(res.data)
				var res = res.data
				var name = ''
				var arr = []
				var gender = ''
				var bookListArr = []
				for(var key in res) {
					if(key == 'female') {
						gender = key
						arr = res[key]
						key = '女生'
						name = key

						var list = {
							gender: gender,
							name: name,
							arr: arr
						}
						bookListArr.push(list)
					}
					if(key == 'male') {
						gender = key
						arr = res[key]
						key = '男生'
						name = key

						var list = {
							gender: gender,

							name: name,
							arr: arr
						}
						bookListArr.push(list)
					}

					if(key == 'press') {
						gender = key
						arr = res[key]
						key = '出版'
						name = key

						var list = {
							gender: gender,

							name: name,
							arr: arr
						}
						bookListArr.push(list)
					}
				}

				for(var i = 0; i < bookListArr.length; i++) {
					// 			console.log(bookListArr[i].arr)
					var arr = bookListArr[i].arr
					//					console.log(arr)
					for(var j = 0; j < arr.length; j++) {
						for(var key in arr[j]) {
							if(key == 'bookCover') {
								var bookCover = arr[j][key]

								for(var z = 0; z < bookCover.length; z++) {
									bookCover[z] = util.formaImg(bookCover[z])
								}
							}
						}
					}
				}

				that.setData({
					bookListArr: bookListArr
				})
				console.log('bookListArr ==>', that.data.bookListArr)
				var length1 = []
				var heightArr = []
				for(var i = 0; i < that.data.bookListArr.length; i++) {

					var arr = that.data.bookListArr[i].arr

					length1.push(arr.length)
				}
				var height = 0

				for(var j = 0; j < length1.length; j++) {

					height = (length1[j] * 70)
					heightArr.push(height)
					//					console.log('heightArr ==>', heightArr)
				}
				that.setData({
					heightArr: heightArr
				})
				//				console.log('heightArr =>', that.data.heightArr)

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