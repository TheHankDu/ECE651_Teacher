// pages/作业信息/作业信息.js
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    Add: "Add-Assignment",
    AssignmentArray: [] 
  },

  Add: function () {
    wx.navigateTo({
      url: '../../pages/作业内容/作业内容',
      success: function () {
        console.log("called switchetab");
      }
    });
  },

  View: function(event) {
    console.log(event.currentTarget.dataset.assignment.id);
    getApp().globalData.currentHomework = event.currentTarget.dataset.assignment.id;
    wx.navigateTo({
      url: '../../pages/提交情况/提交情况',
      success: function () {
        console.log("called switchetab");
      }
    });
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
    var that = this;
    const address = getApp().globalData.address
    wx.request({
      url: address + '/course/homework/get_all',
      method: 'GET',
      data: {
        course_id: getApp().globalData.currentCourse
      },
      header: {
        //'content-type': 'application/x-www-form-urlencoded',
        'cookie': getApp().globalData.cookie
      },
      success: function(res){
        var AL = []
        var getHomeworkLength = res.data.homeworks.length;
        for (var i = 0; i < getHomeworkLength; i++){
          if (res.data.homeworks[i].deadline.length > 10) {
            res.data.homeworks[i].deadline = res.data.homeworks[i].deadline.substring(0, 10);
          }
        }
        AL.push(res.data.homeworks)
        console.log(AL)
        that.setData({
          AssignmentArray: AL[0]
        })
        console.log(that.data.AssignmentArray)
      }  
    })
    wx.setNavigationBarTitle({
      title: '作业信息'
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