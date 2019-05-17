const util = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//当前的booksLists
		currentBooksLists: [],
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
	
	//点击跳转该书的详情
	toBooksDetail(event){
		
//		console.log('event ===>',event)
		var bookid = event.currentTarget.dataset.bookid
		var bookname = event.currentTarget.dataset.bookname
		wx.navigateTo({
			url: '../../pages/booksDetailPage/booksDetailPage?bookid=' + bookid + '&bookname='+bookname
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this
		var title = options.title
		wx.setNavigationBarTitle({
			title: "跟“" + title + "”有关的书籍"
		})
		if(that.data.currentBooksLists.length == 0) {
			console.log('555')
			this.changeHidden()
		}
		wx.request({
			url: 'http://novel.juhe.im/search?keyword=' + title,
			method: 'GET',
			header: {
				'content-type': 'application/json'
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
				console.log('books =>',books)
				
				that.setData({

					currentBooksLists: res.data.books
				})
//				console.log('that.data.currentBooksLists =>', that.data.currentBooksLists)
				that.changeHidden()
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