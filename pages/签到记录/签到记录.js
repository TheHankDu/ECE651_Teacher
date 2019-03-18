// pages/签到/签到.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SectionArray: [],
    checkinStatus: {},
    //AttendArray: [],
    title: "",
  },

  bindtitleinput: function (e) {
    this.setData({
      title: e.detail.value
    })
  },

  checkboxChange: function (e) {
    console.log('checkbox 发生change事件，携带value值为：', e.detail)
  },

  formSubmit(e) { 
    //var content = {}
    console.log(e.detail)
    for (var k in e.detail.value) {
      if (e.detail.value[k].length == 0) {
        this.data.checkinStatus[k] = false
      }
      else {
        this.data.checkinStatus[k] = true
      }
    }
    var stg = JSON.stringify(this.data.checkinStatus)
    console.log(stg)

    var that = this
    const address = getApp().globalData.address
    wx.request({
      url: address + '/course/checkin/update',
      data: {
        content: stg,
        //title: this.data.title,
        //course_id: getApp().globalData.currentCourse,
        checkin_id: getApp().globalData.checkin_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': getApp().globalData.cookie
      },
      method: "POST",
      success: function (res) {

      }
    })
  },

  Home: function () {
    wx.navigateTo({
      url: '../../pages/课程列表/课程列表',
      success: function () {
        console.log("called switchetab");
      }
    });
  },

  // Save: function () {
  //   var dic = {}
  //   for (var i = 0; i < this.data.SectionArray.length; i++) {
  //     dic[this.data.SectionArray[i].student_id] = false
  //   }
  //   var str = JSON.stringify(dic)
  //   console.log(str)

  //   var that = this
  //   const address = getApp().globalData.address
  //   wx.request({
  //     url: address + '/course/checkin/update',
  //     data: {
  //       content: str,
  //       title: this.data.title, // 字符串，签到标题
  //       course_id: getApp().globalData.currentCourse // 字符串，课程ID
  //     },
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded',
  //       'cookie': getApp().globalData.cookie
  //     },
  //     method: "POST",
  //     success: function (res) {
  //       console.log(res)
  //       getApp().globalData.checkin_id = res.data.checkin_id
  //     },
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const address = getApp().globalData.address
    wx.request({
      url: address + '/course/checkin/get',
      data: {
        checkin_id: getApp().globalData.checkin_id,
      },
      header: {
        'cookie': getApp().globalData.cookie
      },
      method: "GET",
      // header: {
      //   'content-type': 'application/x-www-form-urlencoded',
      // },
      success: function (res) {
        console.log(res)
        var secA = []
        secA.push(res.data.info.students);
        that.setData({
           SectionArray: secA[0]
         });
        that.setData({
          title: res.data.info.title
        });
        console.log(that.data.SectionArray)

        for (var i = 0; i < that.data.SectionArray.length; i++) {
          that.data.checkinStatus[that.data.SectionArray[i].student_id] = that.data.SectionArray[i].status
        }
        console.log(that.data.checkinStatus)
      },
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
    wx.setNavigationBarTitle({
      title: '签到记录'
    })
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

  },
})