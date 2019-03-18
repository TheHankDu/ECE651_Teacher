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
        console.log(res)
        var secA = []
        secA.push(res.data.users);
        var stu;
        for(stu in secA[0]) {
          secA[0][stu]['sub_status'] = 0;
        }
        console.log(secA[0]);
        that.setData({
          SectionArray: secA[0]
        });
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
            var submitA = []
            submitA.push(res.data.submissions);
            var sub_stu;
            var all_stu;
            for (sub_stu in submitA[0]) {
              for (all_stu in that.data.SectionArray) {
                if (that.data.SectionArray[all_stu].user_id == submitA[0][tmp].student_info.user_id) {
                  // find user that submit
                  if (submitA[0][tmp].after_deadline == 0) {
                    // before deadline
                    that.data.SectionArray[all_stu].sub_status = 1;
                  } else {
                    // after deadline
                    that.data.SectionArray[all_stu].sub_status = 2;
                  }
                }
              }
              
            }
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