const util = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//查询的值
		searchVaule: '',

		historyValue: [],

		showView: true,
		//显示查询到的东西
		showSearchValueList: false,

		//搜索热词
		hotValue: [],
		//热门搜索
		newHotWords: [],
		//遍历的下标
		searchHotWordsStartIndex: 0,
		searchHotWordsEndIndex: 15,

		newHotWordsStartIndex: 0,
		newHotWordsEndIndex: 8,
		//查询到的结果
		searchResult: [],

	},

	//方法
	getHistoryVaule: function(event) {

		if(event.detail.value == '' || event.detail.value == undefined) {
			wx.showToast({
				title: '输入框不可为空',
				icon: 'none',
				duration: 2000
			})
			return
		}

		var historyValue = wx.getStorageSync('historyValue')

		if(!historyValue) {
			historyValue = []
			historyValue.unshift(event.detail.value)
			wx.setStorageSync('historyValue', historyValue)

		} else {

			if(historyValue.length >= 15) {
				//删除最后一个
				historyValue.pop()
			} else {
				historyValue.unshift(title)
				//去重
				historyValue = Array.from(new Set(historyValue))

				wx.setStorageSync('historyValue', historyValue)
			}

		}

		this.setData({
			historyValue: historyValue
		})

	},

	//换一批搜索热词
	getNextSearchHotWords() {
		var searchHotWords = wx.getStorageSync('searchHotWords')
		if(this.data.searchHotWordsEndIndex >= searchHotWords.length - 1) {
			this.setData({
				searchHotWordsStartIndex: 0,
				searchHotWordsEndIndex: 15
			})
		} else {
			var searchHotWords2 = searchHotWords.slice(this.data.searchHotWordsStartIndex, this.data.searchHotWordsEndIndex)
			this.setData({
				hotValue: searchHotWords2,
				searchHotWordsStartIndex: this.data.searchHotWordsEndIndex,
				searchHotWordsEndIndex: (this.data.searchHotWordsEndIndex += 15)
			})
		}

	},
	//换一批热门推荐
	getNextSearchHotWords() {
		var newHotWords = wx.getStorageSync('newHotWords')
		if(this.data.newHotWordsEndIndex >= newHotWords.length - 1) {
			this.setData({
				newHotWordsStartIndex: 0,
				newHotWordsEndIndex: 8
			})
		} else {
			var newHotWords2 = newHotWords.slice(this.data.newHotWordsStartIndex, this.data.newHotWordsEndIndex)
			this.setData({
				newHotWords: newHotWords2,
				newHotWordsStartIndex: this.data.newHotWordsEndIndex,
				newHotWordsEndIndex: (this.data.newHotWordsEndIndex += 8)
			})
		}

	},
	//删除历史记录
	delectHistorySearchValue() {
		var historyValue = wx.getStorageSync('historyValue')
		historyValue = []
		if(historyValue.length == 0) {
			wx.showToast({
				title: '历史查询记录已清空',
				icon: 'none',
				duration: 2000
			})
			this.setData({
				historyValue: historyValue
			})

		}

		wx.setStorageSync('historyValue', historyValue)
	},

	//输入框输入事件
	searchInputValue(event) {

		if(event.detail.value) {
			this.setData({
				showView: false,
				showSearchValueList: true,
			})

			var _this = this
			wx.request({
				url: "http://novel.juhe.im/search?keyword=" + event.detail.value,
				method: 'GET',
				header: {
					'content-type': 'application/json'
				},
				success: function(res) {
					var searchResult = res.data.books.slice(0, 10)
					_this.setData({
						searchResult: searchResult
					})

				}
			})
		} else {
			this.setData({
				showView: true,
				showSearchValueList: false,
			})
		}

	},

	//点击跳转小说查询详细列表
	goSearchResultPage(event) {

		var title = event.currentTarget.dataset.title

		var historyValue = wx.getStorageSync('historyValue')

		if(!historyValue) {
			historyValue = []
			historyValue.unshift(title)
			wx.setStorageSync('historyValue', historyValue)
		} else {
			if(historyValue.length >= 15) {
				//删除最后一个
				historyValue.pop()
			} else {
				historyValue.unshift(title)
				//去重
				historyValue = Array.from(new Set(historyValue))

				wx.setStorageSync('historyValue', historyValue)
			}

		}
		this.setData({
			historyValue: historyValue
		})

		wx.navigateTo({
			url: '../../pages/searchPage/searchPage?title=' + title
		})

	},
//下拉刷新
upDateSource(){
	var that = this
		wx.request({
			url: "https://novel.juhe.im/search-hotwords",
			method: 'GET',
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {

				wx.setStorageSync('searchHotWords', res.data.searchHotWords)

				var searchHotWords = res.data.searchHotWords.slice(that.data.searchHotWordsStartIndex, that.data.searchHotWordsEndIndex)

				that.setData({
					hotValue: searchHotWords,
					searchHotWordsStartIndex: that.data.searchHotWordsEndIndex,
					searchHotWordsEndIndex: (that.data.searchHotWordsEndIndex += 15)
				})

			}
		})

		wx.request({
			url: "https://novel.juhe.im/hot-books",
			method: 'GET',
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {
				wx.setStorageSync('newHotWords', res.data.newHotWords)
				var newHotWords = res.data.newHotWords.slice(that.data.newHotWordsStartIndex, that.data.newHotWordsEndIndex)

				that.setData({
					newHotWords: newHotWords,
					newHotWordsStartIndex: that.data.newHotWordsEndIndex,
					newHotWordsEndIndex: (that.data.newHotWordsEndIndex += 8)
				})

			}
		})

		var historyValue = wx.getStorageSync('historyValue')
		that.setData({
			historyValue: historyValue
		})
},
	/**
	 * 生命周期函数--监听页面加载
	 */

	onLoad: function(options) {

		var that = this
		wx.request({
			url: "https://novel.juhe.im/search-hotwords",
			method: 'GET',
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {

				wx.setStorageSync('searchHotWords', res.data.searchHotWords)

				var searchHotWords = res.data.searchHotWords.slice(that.data.searchHotWordsStartIndex, that.data.searchHotWordsEndIndex)

				that.setData({
					hotValue: searchHotWords,
					searchHotWordsStartIndex: that.data.searchHotWordsEndIndex,
					searchHotWordsEndIndex: (that.data.searchHotWordsEndIndex += 15)
				})

			}
		})

		wx.request({
			url: "https://novel.juhe.im/hot-books",
			method: 'GET',
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {
				wx.setStorageSync('newHotWords', res.data.newHotWords)
				var newHotWords = res.data.newHotWords.slice(that.data.newHotWordsStartIndex, that.data.newHotWordsEndIndex)

				that.setData({
					newHotWords: newHotWords,
					newHotWordsStartIndex: that.data.newHotWordsEndIndex,
					newHotWordsEndIndex: (that.data.newHotWordsEndIndex += 8)
				})

			}
		})

		var historyValue = wx.getStorageSync('historyValue')
		that.setData({
			historyValue: historyValue
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