const ajaxUtil = require('../api/ajax-util.js')

const checkLogin = function(){
  return new Promise((resolve, reject) => {
    var token = wx.getStorageSync("token");
    var isLogin = wx.getStorageSync("isLogin");
    //console.log(token);
    if (token) {//还存在
      ajaxUtil.verify({'token':token}).then((data)=>{
        if (data.data.code=='0000') {
          wx.setStorageSync("isLogin", true);
          resolve({ isLogin: true })
        } else {
          wx.setStorageSync("isLogin", false);
          resolve({ isLogin: false })
        }
      })
      
    } else {
      //重新做授权
      wx.login({
        success: res => {
          if (res.code) {
            ajaxUtil.slientLogin({ "code": res.code}).then((result) => {
              if (result.data.code == '0000' && result.data.data.token != null) {
                wx.setStorageSync("token", result.data.data.token);
                if (result.data.data.isBind==1){
                  wx.setStorageSync("isLogin", true);
                  resolve({ isLogin: true })
                }else{
                  wx.setStorageSync("isLogin", false);
                  resolve({ isLogin: false })
                }
              } else {
                wx.setStorageSync("isLogin", false);
                resolve({ isLogin: false})
              }
            })
          } else {
            //console.log('获取用户登录态失败！' + res.errMsg)
            wx.setStorageSync("isLogin", false);
            resolve({ isLogin: false})
          }
        }
      })
    }
  })
}

module.exports = {
  checkLogin: checkLogin
}