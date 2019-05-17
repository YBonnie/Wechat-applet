Component({

	data: {
		tabbar: {},
		curRoute: ''
	},
	attached() {
		//拿到app.js里面tabbar的值
		this.data.tabbar = getApp().globalData.tabbar;
		//当前页面栈
		let pages = getCurrentPages();

		//当前页面
		this.data.curRoute = pages[pages.length - 1].route; // 'pages/index/index'

		//也可以这样一次性更新，这样写就好了
		this.setData(this.data)
	},
	methods: {
		redirectTo(e) {
			let taburl = e.currentTarget.dataset.taburl;
			//如果他是当前页面就不跳转
			if(taburl == this.data.curRoute) return
			//否则就跳转到传进来的路径页面
			wx.redirectTo({
				url: "/" + taburl
			})
		},
	}
}) 