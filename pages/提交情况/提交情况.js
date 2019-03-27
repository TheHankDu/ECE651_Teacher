// pages/提交情况/提交情况.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SectionArray: [],
    AttendArray: [], 
    SubmitArray: [],
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
  test: function(event){
    console.log(event);
    
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
        //'content-type': 'application/x-www-form-urlencoded',
        'cookie': getApp().globalData.cookie
      },
      method: "GET",
      success: function (res){
        var secA = res.data.users;
        var stu;
        for(stu in secA) {
          secA[stu]['sub_status'] = 0;
          secA[stu]['sub_id'] = null;
        }
        wx.request({
          url: address + '/course/homework/submission/get_students',
          data: {
            course_id: getApp().globalData.currentCourse,
            homework_id: getApp().globalData.currentHomework
          },
          header:{
            //'content-type': 'application/x-www-form-urlencoded',
            'cookie': getApp().globalData.cookie
          },
          method: "GET",
          success: function(res){
            console.log(res)
            var submitA = []
            submitA = res.data.submissions;
            console.log(submitA)
            var sub_stu;
            var all_stu;
            for (sub_stu in submitA) {
              for (all_stu in secA) {
                if (secA[all_stu].user_id == submitA[sub_stu].student_info.user_id) {
                  secA[all_stu]['sub_id'] = submitA[sub_stu].submission_id;
                  // find user that submit
                  if (submitA[sub_stu].after_deadline == 0) {
                    // before deadline
                    secA[all_stu]['sub_status'] = 1;
                  } else {
                    // after deadline
                    secA[all_stu]['sub_status'] = 2;
                  }
                }
              }
            }
            console.log(secA)
            that.setData({
              SectionArray: secA
            });
          }
        })
        
        
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