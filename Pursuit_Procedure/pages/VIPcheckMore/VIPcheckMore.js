const util = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		listId: '',
		
		booksList : [],
		
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

		var name = options.name
		var gender = options.gender

//		console.log('name ==>', name)
//		console.log('gender ==>', gender)

		wx.setNavigationBarTitle({
			title: name
		})
		that.changeHidden()

		wx.request({
			url: 'http://novel.juhe.im/rank-category', // 仅为示例，并非真实的接口地址
			method: 'GET',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				console.log(res.data)
				var res = res.data
				for(var key in res) {
					if(key == gender) {
						console.log('res[key] ==>', res[key])
						for(var i = 0; i < res[key].length; i++) {
							if(res[key][i].title == name) {
								var listId = res[key][i]._id
								that.setData({
									listId: listId
								})

							}
						}
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
						if(res){
							that.changeHidden()
						}
						
						console.log(res.data.ranking.books)
						var books = res.data.ranking.books
						for(var i = 0 ; i < books.length ; i++){
							for(var key in books[i]){
								if(key == 'cover'){
									books[i][key] = util.formaImg(books[i][key])
								}
							}
						}
						
						that.setData({
							booksList:books
						})
						console.log('booksList ==>',that.data.booksList)
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