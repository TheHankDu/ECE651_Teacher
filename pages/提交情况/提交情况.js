// pages/提交情况/提交情况.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SectionArray: [],
    AttendArray: []
  },

  save_status: function (e) {
    console.log('status saved')
  },

  checkboxChange: function (e) {
    console.log('checkbox 发生change事件，携带value值为：', e.detail)
  },

  Home: function () {
    wx.navigateTo({
      url: '../../pages/课程列表/课程列表',
      success: function () {
        console.log("called switchetab");
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const address = getApp().globalData.address
    wx.request({
      url: address + '/course/get_all_students',
      data:{
        course_id: getApp().globalData.currentCourse,
      },
      header:{
        'cookie': getApp().globalData.cookie
      },
      method: "GET",
      // header: {
      //   'content-type': 'application/x-www-form-urlencoded',
      // },
      success: function (res){
        console.log(res)
        var secA = that.data.SectionArray
        secA.push(res.data.users);
        that.setData({
          SectionArray: secA[0]
        });
        console.log(that.data.SectionArray)
        
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
      title: '提交情况'
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

  }
})