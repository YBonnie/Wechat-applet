const util = require('../../utils/util.js')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

		//	书籍源id
		bookIdListId: '',
		//章节数下标
		articleIndex: 0,
		//当前文章内容
		articleContent: {},
		//目录
		catalog:[],
		//书的Id
		bookid:'',
		//书名
		title:'',
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

	//上一章
	prevArticle() {
		console.log('this.data.articleIndex ==>', this.data.articleIndex)

		console.log('cdskjbvkj')
		var that = this
			--that.data.articleIndex
		that.setData(that.data)

		console.log('this.data.articleIndex ==>', this.data.articleIndex)
		if(that.data.articleIndex < 0) {
			that.data.articleIndex = 0
			that.setData(that.data)
			wx.showToast({
				title: '这已经是第一章了，请查看！',
				icon: 'none',
				duration: 2000
			})
		} else {
			//书籍章节列表
			wx.request({
				url: 'http://novel.juhe.im/book-chapters/' + this.data.bookIdListId,
				method: "GET",
				header: {
					'content-type': 'application/json'
				},
				success: function(res) {

					//书籍列表
					var lists = res.data.chapters[that.data.articleIndex].link
					//						console.log('lists =>',lists)

					var lists1 = util.changeUrl(lists)
					//						console.log('lists =>',lists)
					//						详细内容
					wx.request({
						url: 'http://novel.juhe.im/chapters/' + lists1,
						method: "GET",
						header: {
							'content-type': 'application/json'
						},
						success: function(res) {
							var res1 = res.data.chapter

							that.setData({
								articleContent: res.data.chapter
							})

							console.log('articleContent ==>', that.data.articleContent.cpContent)
						}
					})
				}
			})
		}
	},

	//下一章
	nextArticle() {
		var that = this
			++this.data.articleIndex
		this.setData(this.data)
		console.log('this.data.articleIndex ==>', this.data.articleIndex)
		//书籍章节列表
		wx.request({
			url: 'http://novel.juhe.im/book-chapters/' + this.data.bookIdListId,
			method: "GET",
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {
				var length = res.data.chapters
				if(that.data.articleIndex >= length) {
					that.data.articleIndex = 0
					that.setData(that.data)
				}

				//书籍列表
				var lists = res.data.chapters[that.data.articleIndex].link
				//						console.log('lists =>',lists)

				var lists1 = util.changeUrl(lists)
				//						console.log('lists =>',lists)
				//						详细内容
				wx.request({
					url: 'http://novel.juhe.im/chapters/' + lists1,
					method: "GET",
					header: {
						'content-type': 'application/json'
					},
					success: function(res) {
						var res1 = res.data.chapter

						that.setData({
							articleContent: res.data.chapter
						})

						console.log('articleContent ==>', that.data.articleContent.cpContent)
					}
				})
			}
		})

	},

	//目录
	catalog(){
		var that= this
		
		console.log('this.data.bookid ==>',this.data.bookid)
		console.log('this.data.title ==>',this.data.title)
		
		//跳转页面
		wx.navigateTo({
			url: '../../pages/catalog/catalog?bookid=' + this.data.bookid + '&title='+this.data.title
		})
		
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this
		  var bookid = options.bookid
		  var title = options.title
		  var index = options.index
		  if(index){
		  	that.setData({
		  		articleIndex:index
		  	})
		  }
		
//		var bookid = '53115e30173bfacb4904897e'
//
//		var title = '超时空穿越'
		
		console.log('bookid =>', bookid)
		console.log('title =>', title)
		console.log('index =>', index)
		
		that.setData({
			bookid : bookid,
			title:title
			
		})
		that.changeHidden()
		
		//标题栏
		wx.setNavigationBarTitle({
			title: title
		})
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
						//						console.log('res1 ==>', res.data.chapters)
						
						that.setData({
							catalog:res.data.chapters
						})
						var articleIndex = that.data.articleIndex
						//书籍列表
						var lists = res.data.chapters[articleIndex].link
						//						console.log('lists =>',lists)

						var lists1 = util.changeUrl(lists)
						//						console.log('lists =>',lists)
						//						详细内容
						wx.request({
							url: 'http://novel.juhe.im/chapters/' + lists1,
							method: "GET",
							header: {
								'content-type': 'application/json'
							},
							success: function(res) {
								//								console.log('res1 ==>', res.data.chapter)
								var res1 = res.data.chapter
								//								for(var key in res1){
								//									if(key == 'cpContent'){
								//										res1[key] = util.changeTxtUrl(res1[key])
								//										
								//									}
								//								}
								
								if(res1){
									that.changeHidden()
								}

								that.setData({
									articleContent: res.data.chapter
								})

//								console.log('articleContent ==>', that.data.articleContent.cpContent)
							}
						})
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