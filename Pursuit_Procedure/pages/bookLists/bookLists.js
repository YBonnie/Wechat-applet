const util = require('../../utils/util.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

		navList01: [
			{ title: '本周最热', path: 'https://novel.juhe.im/booklists?sort=collectorCount&duration=last-seven-days&start=0' },
			{ title: '最新发布', path: 'https://novel.juhe.im/booklists?sort=created&duration=all' },
			{ title: '最多收藏', path: 'https://novel.juhe.im/booklists?sort=collectorCount&duration=all' }
		],
		navList02: ['全部', '言情', '男生', '女生', '玄幻', '都市'],
		navList03: [
			{ title: '性别', childs: ['男生', '女生'] },
			{ title: '情感', childs: ['纯爱', '热血', '言情', '现言', '古言', '情有独钟', '搞笑', '青春', '欢喜冤家', '爽文', '虐文'] },
			{ title: '流派', childs: ['变身', '悬疑', '系统', '网友', '推理', '玄幻', '武侠', '仙侠', '恐怖', '奇幻', '洪荒', '犯罪', '百合', '种田', '惊悚', '轻小说', '技术流', '耽美', '竞技', '无限'] },
			{ title: '人设', childs: ['同人', '娱乐明星', '女强', '帝王', '职场', '女配', '网配', '火影', '金庸', '豪门', '扮猪吃虎', '谋士', '特种兵', '教师'] }
		],
		activeIndex01: 0,
		activeIndex02: '全部',
		downActive: true,
		bookLists: [],
		winHeight: 0,
		showActive: true,
		showSelect: false,
		navOnePath: 'https://novel.juhe.im/booklists?sort=collectorCount&duration=last-seven-days&start=0',
		selsActiveIndex: '',
		hidden: false,

	},
	//nav-one
	choice01(event) {
		var that = this
		var activeIndex01 = event.currentTarget.dataset.index
		var title = event.currentTarget.dataset.title
		var path = event.currentTarget.dataset.path
		console.log('title==>', title)
		console.log('path==>', path)
		that.setData({
			activeIndex01: activeIndex01,
			navOnePath: path,
			activeIndex02: '全部'
		})

		wx.request({
			url: path, // 仅为示例，并非真实的接口地址
			method: 'GET',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				//				console.log('res.data.bookLists ==>',res.data.bookLists)

				var bookLists = res.data.bookLists
				for(var i = 0; i < bookLists.length; i++) {
					for(var key in bookLists[i]) {
						if(key == 'covers') {
							for(var j = 0; j < bookLists[i][key].length; j++) {
								bookLists[i][key][j] = util.formaImg(bookLists[i][key][j])
							}
						}
					}
				}
				console.log('bookLists ==>', bookLists)
				that.setData({
					bookLists: bookLists

				})
			}
		})

	},

	//nav-one
	choice02(event) {
		var that = this
		var activeIndex02 = event.currentTarget.dataset.name
		var name = event.currentTarget.dataset.name
		
		that.setData({selsActiveIndex:name})

		if(name == "男生") {
			name = 'male'
		} else if(name == "女生") {
			name = 'female'
		}

		var result = ''
		if(name == '全部') {
			result = ''
		} else if(name == 'male' || name == "female") {
			result = '&gender=' + name
		} else {
			result = '&tag=' + name
		}

		that.setData({
			activeIndex02: activeIndex02,
			hidden:false,
			showActive:true
			

		})

		wx.request({
			url: that.data.navOnePath + result, // 仅为示例，并非真实的接口地址
			method: 'GET',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				var bookLists = res.data.bookLists
				console.log('bookLists ==>', bookLists)

				for(var i = 0; i < bookLists.length; i++) {
					for(var key in bookLists[i]) {
						if(key == 'covers') {
							for(var j = 0; j < bookLists[i][key].length; j++) {
								bookLists[i][key][j] = util.formaImg(bookLists[i][key][j])
							}
						}
					}
				}
				that.setData({
					bookLists: bookLists
				})
			}
		})

	},

	choice03(event) {
		var that = this
		var name = event.currentTarget.dataset.name
		var navList02 = that.data.navList02
		var activeIndex02 = ''
		for(var i = 0; i < navList02.length; i++) {
			if(name == navList02[i]) {
				activeIndex02 = name
				that.setData({
					selsActiveIndex: name,

					activeIndex02: activeIndex02,

				})

				if(name == "男生") {
					name = 'male'
				} else if(name == "女生") {
					name = 'female'
				}

				var result = ''
				if(name == '全部') {
					result = ''
				} else if(name == 'male' || name == "female") {
					result = '&gender=' + name
				} else {
					result = '&tag=' + name
				}

				wx.request({
					url: that.data.navOnePath + result, // 仅为示例，并非真实的接口地址
					method: 'GET',
					header: {
						'content-type': 'application/json' // 默认值
					},
					success(res) {
						var bookLists = res.data.bookLists
						console.log('bookLists ==>', bookLists)

						for(var i = 0; i < bookLists.length; i++) {
							for(var key in bookLists[i]) {
								if(key == 'covers') {
									for(var j = 0; j < bookLists[i][key].length; j++) {
										bookLists[i][key][j] = util.formaImg(bookLists[i][key][j])
									}
								}
							}
						}
						that.setData({
							bookLists: bookLists
						})
					}
				})
				that.clickDown()
				return
			}
		}

		navList02.splice(1, 0, name)
		if(navList02.length >= 6) {
			navList02.pop()
			activeIndex02 = name
		}

		that.setData({
			selsActiveIndex: name,
			navList02: that.data.navList02,
			activeIndex02: activeIndex02,

		})

		if(name == "男生") {
			name = 'male'
		} else if(name == "女生") {
			name = 'female'
		}

		var result = ''
		if(name == '全部') {
			result = ''
		} else if(name == 'male' || name == "female") {
			result = '&gender=' + name
		} else {
			result = '&tag=' + name
		}

		wx.request({
			url: that.data.navOnePath + result, // 仅为示例，并非真实的接口地址
			method: 'GET',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {

				var bookLists = res.data.bookLists

				if(bookLists.length == 0) {
					that.setData({
						hidden: true,
						showSelect: false,

					})

					return
				} else {
					for(var i = 0; i < bookLists.length; i++) {
						for(var key in bookLists[i]) {
							if(key == 'covers') {
								for(var j = 0; j < bookLists[i][key].length; j++) {
									bookLists[i][key][j] = util.formaImg(bookLists[i][key][j])
								}
							}
						}
					}
					that.setData({
						bookLists: bookLists,
						downActive: true,
						showActive: true,
						showSelect: false
					})
					console.log('bookLists ==>', bookLists)
				}
			}
		})

	},

	//展开
	clickDown() {
		var that = this
		that.setData({
			showSelect: false,
			showActive: true,

		})

		that.setData({
			downActive: !that.data.downActive,
			showActive: !that.data.showActive,
			showSelect: !that.data.showSelect
		})
	},

	goDetailPage(event) {
//		console.log('event ==>', event.currentTarget.dataset.id)
		var bookid = event.currentTarget.dataset.id
		wx.navigateTo({
			url: '../../pages/booksDetails/booksDetails?bookid=' + bookid 
		})
		
		
	},
	//刷新数据
	upDateSource(){
		var that = this
		wx.request({
			url: 'https://novel.juhe.im/booklists?sort=collectorCount&duration=last-seven-days&start=0', // 仅为示例，并非真实的接口地址
			method: 'GET',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {

				var bookLists = res.data.bookLists
				for(var i = 0; i < bookLists.length; i++) {
					for(var key in bookLists[i]) {
						if(key == 'covers') {
							for(var j = 0; j < bookLists[i][key].length; j++) {
								bookLists[i][key][j] = util.formaImg(bookLists[i][key][j])
							}
						}
					}
				}
//				console.log('bookLists ==>', bookLists)
				that.setData({
					bookLists: bookLists

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
					winHeight: res.windowHeight + 400
				});
			}
		});

		wx.request({
			url: 'https://novel.juhe.im/booklists?sort=collectorCount&duration=last-seven-days&start=0', // 仅为示例，并非真实的接口地址
			method: 'GET',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {

				var bookLists = res.data.bookLists
				for(var i = 0; i < bookLists.length; i++) {
					for(var key in bookLists[i]) {
						if(key == 'covers') {
							for(var j = 0; j < bookLists[i][key].length; j++) {
								bookLists[i][key][j] = util.formaImg(bookLists[i][key][j])
							}
						}
					}
				}
//				console.log('bookLists ==>', bookLists)
				that.setData({
					bookLists: bookLists

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