const ajaxUtil = require('../../api/ajax-util.js');



Component({
  /**
   * 组件的属性列表
   */
  properties: {
    province:String,
    city: String,
    area:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    multiArray: [],
    multiIndex: [0, 0, 0]
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.getCityInfo()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取数据库数据
    getCityInfo: function () {
      wx.showLoading({
        title: 'Loading...',
      })
      //因为数据库只存有一个总的数据字典，所以指定它的ID直接获取数据
      var that = this
      ajaxUtil.getProvinceList({}).then((res) => {
        wx.hideLoading();
        var temp = [];

        if (res.data.code=='0000') {
          //获取云数据库数据
          temp = res.data.data;
          //初始化更新数据
        }
        var provinceIndex = 0;
        var cityIndex = 0;
        var areaIndex = 0;
        var type = this.data.province.substring(0,1);
        if (type >= 0 && type <= 9){
          if (this.data.province != null && this.data.city != null || this.data.area != null) {
            for (var i = 0; i < temp.length; i++) {
              if (temp[i].code == this.data.province) {
                provinceIndex = i;
                for (var j = 0; j < temp[i].citys.length; j++) {
                  if (temp[i].citys[j].code == this.data.city) {
                    cityIndex = j;
                    for (var k = 0; k < temp[i].citys[j].citys.length; k++) {
                      if (temp[i].citys[j].citys[k].code == this.data.area) {
                        areaIndex = k;
                        break;
                      }
                    }
                    break;
                  }
                }
                break;
              }
            }
          }
        }else{
          if (this.data.province != null && this.data.city != null || this.data.area != null) {
            for (var i = 0; i < temp.length; i++) {
              if (temp[i].name == this.data.province) {
                provinceIndex = i;
                for (var j = 0; j < temp[i].citys.length; j++) {
                  if (temp[i].citys[j].name == this.data.city) {
                    cityIndex = j;
                    for (var k = 0; k < temp[i].citys[j].citys.length; k++) {
                      if (temp[i].citys[j].citys[k].name == this.data.area) {
                        areaIndex = k;
                        break;
                      }
                    }
                    break;
                  }
                }
                break;
              }
            }
          }
        }
        
        console.log(areaIndex)
        that.setData({
          provinces: temp,
          multiArray: [temp, temp[provinceIndex].citys, temp[provinceIndex].citys[cityIndex].citys],
          multiIndex: [provinceIndex, cityIndex, areaIndex]
        })
      
      })
      if (this.data.multiArray.length>0){
        var province = this.data.multiArray[0][0].name
        var city = this.data.multiArray[1][0].name
        var area = this.data.multiArray[2][0].name
        var provinceCode = this.data.multiArray[0][0].code
        var cityCode = this.data.multiArray[1][0].code
        var areaCode = this.data.multiArray[2][0].code
        this.triggerEvent('getSelectCity', { 'city': [province, city, area], 'code': [provinceCode, cityCode, areaCode] }, {})
      }

    },
    //点击确定
    bindMultiPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      if (this.data.multiArray.length > 0) {
        var province = this.data.multiArray[0][e.detail.value[0]].name
        var city = this.data.multiArray[1][e.detail.value[1]].name
        var area = this.data.multiArray[2][e.detail.value[2]].name
        var provinceCode = this.data.multiArray[0][e.detail.value[0]].code
        var cityCode = this.data.multiArray[1][e.detail.value[1]].code
        var areaCode = this.data.multiArray[2][e.detail.value[2]].code
        console.log(province + city + area)
        this.triggerEvent('getSelectCity', { 'city': [province, city, area], 'code': [provinceCode, cityCode, areaCode] }, {})
      }
      this.setData({
        multiIndex: e.detail.value
      })
    },
    //滑动
    bindMultiPickerColumnChange: function (e) {
      console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      var data = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex
      };
      //更新滑动的第几列e.detail.column的数组下标值e.detail.value
      data.multiIndex[e.detail.column] = e.detail.value;
      //如果更新的是第一列“省”，第二列“市”和第三列“区”的数组下标置为0
      if (e.detail.column == 0) {
        data.multiIndex = [e.detail.value, 0, 0];
      } else if (e.detail.column == 1) {
        //如果更新的是第二列“市”，第一列“省”的下标不变，第三列“区”的数组下标置为0
        data.multiIndex = [data.multiIndex[0], e.detail.value, 0];
      } else if (e.detail.column == 2) {
        //如果更新的是第三列“区”，第一列“省”和第二列“市”的值均不变。
        data.multiIndex = [data.multiIndex[0], data.multiIndex[1], e.detail.value];
      }
      var temp = this.data.provinces;
      data.multiArray[0] = temp;
      if ((temp[data.multiIndex[0]].citys).length > 0) {
        //如果第二列“市”的个数大于0,通过multiIndex变更multiArray[1]的值
        data.multiArray[1] = temp[data.multiIndex[0]].citys;
        var areaArr = (temp[data.multiIndex[0]].citys[data.multiIndex[1]]).citys;
        //如果第三列“区”的个数大于0,通过multiIndex变更multiArray[2]的值；否则赋值为空数组
        data.multiArray[2] = areaArr.length > 0 ? areaArr : [];
      } else {
        //如果第二列“市”的个数不大于0，那么第二列“市”和第三列“区”都赋值为空数组
        data.multiArray[1] = [];
        data.multiArray[2] = [];
      }
      //data.multiArray = [temp, temp[data.multiIndex[0]].citys, temp[data.multiIndex[0]].citys[data.multiIndex[1]].citys];
      //setData更新数据
      this.setData(data);
    }
  }
})