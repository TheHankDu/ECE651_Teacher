// pages/用户中心/用户中心.js
Page({

  // data: {
  //   username: '',
  //   password: '',
  //   authcode: '',
  //  time: '获取验证码', //倒计时 
  //  currentTime: 60,//限制60s 
  //  isClick: false,//获取验证码按钮，默认允许点击
  // },

  bindUsernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },

  bindPasswordInput: function (e) {
    this.setData({
      password: e.detail.value
      
    })
  },

  forgetpassword: function (e) {
    wx.navigateTo({
      url: '../ForgotPassword/ForgotPassword',
    })
  },
  // authcodeInput: function (e) {
  //   // console.log("password==", event.detail.value)
  //   this.setData({ authcode: e.detail.value })
  // },

  login: function (e) {
    var that = this
    wx.showToast({
      title: '登陆请求中',
      icon: 'loading',
      duration: 1500
    });
    const address = 'https://dingziku.herokuapp.com'
    getApp().globalData.address = address
    wx.request({ //网络请求开始
      url: address + '/auth/login',
      data: {
        username: this.data.username,  
        password: this.data.password
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log('---访问成功---');
        console.log(res);
        wx.hideToast();
        if (res && res.data.success == 1 && res.header['Set-Cookie']) {
          getApp().globalData.cookie = res.header['Set-Cookie']
          wx.request({
            url: address + '/user/get_info',
            method: "GET",
            data:{
              username: that.data.username
            },
            header: {
              //'content-type': 'application/x-www-form-urlencoded',
              'cookie': getApp().globalData.cookie
            },
            success: function (res) {
              console.log('---登录成功---');
              getApp().globalData.user_id = res.data.user_id;
              if (res.data.success == 1) { //success=1,登录成功,访问老师
                wx.navigateTo({
                  url: '../课程列表/课程列表',
                })
              }
            },
            fail: function (res) {
              console.log('---Fail---');
              console.log(res);
            },
            complete: function (res) {
              console.log('---登录完成---');
            }
          });
        }
        else {
          wx.showModal({
            title: '登陆失败',
            content: '请检查您填写的用户信息',
            showCancel: false,
            // success: function(res){
            // //回调函数
            // }
          });
        }
      },
      fail: function (res) {
        console.log('---Fail---');
        console.log(res);
      },
      complete: function (res) {
        console.log('---访问请求完成---');
      }
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  // forgetpassword: function (e) {
  //   /*第一步：验证手机号码*/
  //   var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;// 判断手机号码的正则
  //   if (this.data.input.length == 0) {
  //     util.progressTips('手机号码不能为空')
  //     return;
  //   }

  //   if (that.data.Username.length < 11) {
  //     util.progressTips('手机号码长度有误！')
  //     return;
  //   }

  //   if (!myreg.test(that.data.Username)) {
  //     util.progressTips('错误的手机号码！')
  //     return;
  //   }
  //   /*第二步：设置计时器*/
  //   // 先禁止获取验证码按钮的点击
  //   that.setData({
  //     isClick: true,
  //   })
  //   // 60s倒计时 setInterval功能用于循环，常常用于播放动画，或者时间显示
  //   var currentTime = that.data.currentTime;
  //   interval = setInterval(function () {
  //     currentTime--;//减
  //     that.setData({
  //       time: currentTime + '秒后获取'
  //     })
  //     if (currentTime <= 0) {
  //       clearInterval(interval)
  //       that.setData({
  //         time: '获取验证码',
  //         currentTime: 60,
  //         isClick: false
  //       })
  //     }
  //   }, 1000);
  //   /*第三步：请求验证码接口，并记录服务器返回的验证码用于判断，这里服务器也可能不返回验证码，那验证码的判断交给后台*/
  //   // wx.request({})
  // },

  /**
   * 登录
   */
  // loginBtnClick: function () {
  //   let that = this;
  //   // 判断账户、密码、验证码
  //   // wx.request({})
  // }
})
