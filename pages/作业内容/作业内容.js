// pages/作业内容/作业内容.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Home: "Return To Home",
    Input: "",
    TitleInput:"",
    Deadline : ""
  },

  Home: function () {
    wx.navigateTo({
      url: '../../pages/课程列表/课程列表',
      success: function () {
        console.log("called switchetab");
      }
    });
  },

  UserInput: function (e) {
    this.setData({
      Input: e.detail.value
    })
  },

  TitleInput: function (e) {
    this.setData({
      TitleInput: e.detail.value
    })
  },

  DeadlineInput: function(e){
    this.setData({
      Deadline: e.detail.value
    })
  },

  Upload: function () {
    var that = this
    const address = getApp().globalData.address
    console.log(this.data.Input)
    var courseid = getApp().globalData.currentCourse
    wx.request({
      url: address + '/course/homework/create',
      data: {
        course_id: getApp().globalData.currentCourse,
        title: this.data.TitleInput,
        content: this.data.Input,
        deadline: this.data.Deadline+"T23:59:59Z" 
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': getApp().globalData.cookie
      },
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {

      },
      complete: function (res) {

      }
    })
  },

  // toDate: function(days) {
  //   var myDate = new Date();
  //   var y = myDate.getFullYear();
  //   var m = myDate.getMonth() + 1
  //   console.log(m)
  //   var t1 = Date.parse(m + "/28/" + y);
  //   console.log(t1)
  //   var t2 = Date.parse(m + 1 + "/1/" + y);
  //   console.log(t2)
  //   var thisMonthDays = 27 + (t2 - t1) / (60 * 60 * 24 * 1000);
  //   console.log(thisMonthDays)
  //   var nowDay = myDate.getDate();
  //   var overDay = nowDay + days - thisMonthDays;
  //   console.log(overDay)
  //   if(overDay >= 0) {
  //     m++;
  //     nowDay = overDay;
  //   } 
  //   else {
  //     nowDay++;
  //   }
  // if (m == 12) {
  //   y++;
  //   m = 1;
  // }
  // return(y + '-' + m + '-' + nowDay);
  // },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '作业内容'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})