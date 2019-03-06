// pages/签到列表/签到列表.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ListArray: []
  },

  Create: function(){ 
    wx.navigateTo({
      url: '../../pages/签到/签到',
    })
  },

  Home: function () {
    wx.navigateTo({
      url: '../../pages/课程列表/课程列表',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var that = this
    const address = getApp().globalData.address
    wx.request({
      url: address + '/course/checkin/list',
      data: {
        course_id: getApp().globalData.currentCourse,
      },
      header: {
        'cookie': getApp().globalData.cookie
      },
      method: "GET",
      success: function (res) {
        console.log(res)
        var LA = []
        console.log(LA)
        console.log(that.data.ListArray)
        var getDateLength = res.data.info.length;
        for (var i = 0; i < getDateLength; i++) {
          if (res.data.info[i].create_at.length > 10) {
            res.data.info[i].create_at = res.data.info[i].create_at.substring(0, 10);
          }
        }
        console.log(LA)
        console.log(res.data.info)
        LA.push(res.data.info);
        console.log(LA)
        that.setData({
          ListArray: LA[0],
        });

      }
    })

    wx.setNavigationBarTitle({
      title: '签到列表'
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