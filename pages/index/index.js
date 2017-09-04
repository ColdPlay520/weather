//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    district:'北京',
    street:'朝阳区',
    weatherData:{},
    day:3,
  },
  //当页面加载完成会调用这个函数
  onLoad: function () {
    var that = this;

    var d = new Date();//获得今天此时的时间
    d.setDate(d.getDate()+2);//加上2代表后天

    console.log(d.getDay());//获得后天是周几，0-6
    that.setData({
      day:d.getDay()
    });

    wx.getLocation({//获得地理位置
      type:'gcj02',//坐标类型
      success: function(res) {
        var lat = res.latitude;//纬度
        var lng = res.longitude;//经度
        // console.log(lat+"------------------"+lng);
        that.getCityInfo(lat,lng);
      },
    })
  },
  //通过请求百度api获得详细位置信息
  getCityInfo:function(lat,lng){
    var that = this;
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/',
      data:{
        ak:'C8sGtkjtMNynUKb2hvia2eTTS5vfuUO8',
        output:'json',
        location:lat+','+lng,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res){
        // console.log(res.data);
        that.setData({
          district: res.data.result.addressComponent.district,
          street: res.data.result.addressComponent.street
        });
        that.getWeatherInfo(res.data.result.addressComponent.district);
      }
    })
  },
  //获取天气信息函数
  getWeatherInfo:function(district){
    var that = this;
    //发出请求
    wx.request({
      url: "https://free-api.heweather.com/v5/weather",
      data:{
        key: "2aa8697712b642e8acf7a5717b60f30b",
        output:"json",
        city:district
      },
      header: {
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res.data);
        that.setData({
          weatherData:res.data.HeWeather5[0],
        });
      }
    })
  }
})

