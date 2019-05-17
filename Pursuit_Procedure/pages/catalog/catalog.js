
const util = require('../../utils/util.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		
		bookid:'',
		title:'',
		bookIdListId:'',
		chapters:[],
		//总数
		sum:'',
		//是否显示加载框
		hidden: false,
		//是否显示列表
		booksListShow: true
		
	},
//loading的函数
	changeHidden: function() {
		this.setData({
			hidden: !this.data.hidden,
			booksListShow: !this.data.booksListShow
		});
	},
	//做懒加载
scroll(event){
//	console.log('event ==>',event)
},

//跳转到详细页面
startRead(event) {
		
		console.log('cdskjv')
		var bookid = event.currentTarget.dataset.bookid
		var title = event.currentTarget.dataset.title
		var index = event.currentTarget.dataset.index
		
		wx.navigateTo({
			url: '../../pages/detailedArticles/detailedArticles?bookid=' + bookid + '&title='+title+ '&index='+index
		})
	},
	
	//下拉刷新
	upDateSource(){
		var that = this
		  var bookid = that.data.bookid
		  var title = that.data.title
		that.setData({
			bookid:bookid,
			title:title
		})
		//标题栏
		wx.setNavigationBarTitle({
			title: title
		})
		
		
		if(that.data.chapters.length == 0){
			
			that.changeHidden()
		}
		
		//获取书籍源
		wx.request({
			url: 'http://novel.juhe.im/book-sources?view=summary&book=' + bookid,
			method: "GET",
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {
//				console.log('res ==>', res.data)

				//				console.log('_id ==>', res.data[0]._id)

				that.data.bookIdListId = res.data[0]._id
				that.setData(that.data)
				//				console.log('that.data.bookIdListId =>', that.data.bookIdListId)

				//书籍章节列表
				wx.request({
					url: 'http://novel.juhe.im/book-chapters/' + that.data.bookIdListId,
					method: "GET",
					header: {
						'content-type': 'application/json'
					},
					success: function(res) {
						
						console.log('res1 ==>', res.data.chapters)
						var length = res.data.chapters.length
						
						that.setData({
							catalog:res.data.chapters,
							length:length
						})
						
						var catalog =that.data.catalog 
//						console.log('that.data.catalog ==>',that.data.catalog)
						for(var i = 0 ; i<catalog.length ; i++){
							for(var key in catalog[i]){
								if(key == 'link'){
									catalog[i][key] = util.changeUrl(catalog[i][key])
								}
							}
						}
//					console.log('that.data.catalog ==>',that.data.catalog)
					if(that.data.catalog.length != 0){
						that.changeHidden()
					}
						
						
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
		  var bookid = options.bookid
		  var title = options.title
//		var bookid = '53115e30173bfacb4904897e'
//		var title = '超时空穿越'

		
		
		that.setData({
			bookid:bookid,
			title:title
		})
		//标题栏
		wx.setNavigationBarTitle({
			title: title
		})
		
		
		if(that.data.chapters.length == 0){
			
			that.changeHidden()
		}
		
		//获取书籍源
		wx.request({
			url: 'http://novel.juhe.im/book-sources?view=summary&book=' + bookid,
			method: "GET",
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {
//				console.log('res ==>', res.data)

				//				console.log('_id ==>', res.data[0]._id)

				that.data.bookIdListId = res.data[0]._id
				that.setData(that.data)
				//				console.log('that.data.bookIdListId =>', that.data.bookIdListId)

				//书籍章节列表
				wx.request({
					url: 'http://novel.juhe.im/book-chapters/' + that.data.bookIdListId,
					method: "GET",
					header: {
						'content-type': 'application/json'
					},
					success: function(res) {
						
						console.log('res1 ==>', res.data.chapters)
						var length = res.data.chapters.length
						
						that.setData({
							catalog:res.data.chapters,
							length:length
						})
						
						var catalog =that.data.catalog 
//						console.log('that.data.catalog ==>',that.data.catalog)
						for(var i = 0 ; i<catalog.length ; i++){
							for(var key in catalog[i]){
								if(key == 'link'){
									catalog[i][key] = util.changeUrl(catalog[i][key])
								}
							}
						}
//					console.log('that.data.catalog ==>',that.data.catalog)
					if(that.data.catalog.length != 0){
						that.changeHidden()
					}
						
						
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