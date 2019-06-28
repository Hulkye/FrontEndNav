(function () {
  //当浏览器窗口被调整大小时触发
  window.onresize = function () {
    ShowHideElement("i-link-box", "linkList-item", 845);
  }
  window.onload = function () {
    ShowHideElement("i-link-box", "linkList-item", 845);
  }

  function ShowHideElement(Element1, Element2, Vaule) {
    var Person = document.getElementsByClassName(Element1);
    var BoxHeight = document.getElementsByClassName(Element2);
    var WindowHeight = window.innerHeight || document.body.clientHeight;
    //遍历获取到的元素
    for (var i = 6; i < Person.length; i++) {
      if (WindowHeight <= Vaule && deviceVal === "pc") {
        Person[i].style.display = "none";
        BoxHeight[0].style.marginTop = "5px";
      } else {
        Person[i].style.display = "block";
        BoxHeight[0].style.marginTop = "0px";
      }
    }
  }
  window.ShowHideElement = ShowHideElement;
}());

var now = -1;
var resLength = 0;
var thisSearch = 'https://www.baidu.com/s?wd=';
var thisSearchIcon = './logo.jpg';
var storage = window.localStorage;
if (!storage.stopHot) {
  storage.stopHot = true
}
storage.stopHot == 'false' ? $('#hot-btn').attr('class', 'iconfont icon-kaiguanclose-copy') : $('#hot-btn').attr('class', 'iconfont icon-kaiguanguan');
var ssData = storage.searchEngine;
if (storage.searchEngine != undefined) {
  ssData = ssData.split(',');
  thisSearch = ssData[0];
  $('#search-icon').attr('class', ssData[1])
  $('#search-icon').attr('style', ssData[2])
}

// 按键松开时执行
$('#txt').keyup(function (e) {
  // 判断输入框是否有内容
  if ($('#txt').val() != '') {
    $('#search-clear').css('display', 'block');
    $('#search-clear').click(function () {
      $('#txt').val('');
      $('#box ul').html('');
      $('#search-clear').css('display', 'none')
    })
  } else {
    $('#search-clear').css('display', 'none')
  }

  if (e.keyCode == 38 || e.keyCode == 40 || storage.stopHot != 'true') {
    return
  };
  var dat = {
    wd: $('#txt').val()
  };
  if ($('#txt').val() != '') {
    $('#box ul').text('');
    $('#box').css('display', 'block');
    $.ajax({
      type: "GET",
      url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
      async: true,
      data: dat,
      dataType: 'jsonp',
      jsonp: 'cb',
      success: function (res) {
        for (var i = 0; i < res.s.length; i++) {
          resLength = res.s.length;
          oli_i = '<li>' + res.s[i] + '</li>';
          $('#box ul').append(oli_i);

          $('#box ul li').eq(i).click(function () {
            $('#txt').val(this.innerHTML);
            window.open(thisSearch + this.innerHTML);
            $('#box ul').html('');
            $('#box').css('display', 'none')
          })
        };
        //$('#box ul').html() === '' ? $('#box').css('height','0px') : $('#box').css('height','auto');
      },
      error: function (res) {
        console.log(res)
      }
    });
  } else {
    $('#box ul').html('')
    //$('#box ul').html() === '' ? $('#box').css('height','0px') : $('#box').css('height','auto');
  };
});

$('#txt').keydown(function (ev) {
  if (ev.keyCode == 40) {
    now++;
    if (now > resLength - 1) {
      now = 0;
    }
    $('#box ul li').eq(now).addClass('current').siblings().removeClass('current')
    $('#txt').val($('#box ul li').eq(now).text())
  };
  if (ev.keyCode == 38) {
    if (now == -1 || now == 0) {
      now = resLength
    }
    now--
    $('#box ul li').eq(now).addClass('current').siblings().removeClass('current');
    $('#txt').val($('#box ul li').eq(now).text())
  };
  if (ev.keyCode == 13) {
    window.open(thisSearch + $('#txt').val())
    // $('#txt').val('');
    $('#box ul').html('')
  }
})

$(function () {
  //$('#box ul').html() === '' ? $('#box').css('height','0px') : $('#box').css('height','auto');
  var search = {
    data: [{
      name: '百度',
      icon: 'icon-baidu',
      color: '#2319dc',
      url: 'https://www.baidu.com/s?wd='
    }, {
      name: '谷歌',
      icon: 'icon-gugegoogle114',
      color: '#4c8bf5',
      url: 'https://www.google.com/search?q='
    }, {
      name: '必应',
      color: '#0a8583',
      icon: 'icon-biying',
      url: 'https://cn.bing.com/search?q='
    }, {
      name: 'GitHub',
      icon: 'icon-github2',
      color: '#24292e',
      url: 'https://github.com/search?utf8=✓&q='
    }, {
      name: '好搜',
      icon: 'icon-sousuo',
      color: '#f8b616',
      url: 'https://www.so.com/s?q='
    }, {
      name: '搜狗',
      icon: 'icon-sougou',
      color: '#fe620d',
      url: 'https://www.sogou.com/web?query='
    }, {
      name: '淘宝',
      icon: 'icon-taobao',
      color: '#ec653b',
      url: 'https://s.taobao.com/search?q='
    }, {
      name: '京东',
      icon: 'icon-jingdong',
      color: '#e61a0f',
      url: 'http://search.jd.com/Search?keyword='
    }, {
      name: '天猫',
      icon: 'icon-tianmao',
      color: '#ff0030',
      url: 'https://list.tmall.com/search_product.htm?q='
    }, {
      name: '1688',
      icon: 'icon-icon-test',
      color: '#ff7300',
      url: 'https://s.1688.com/selloffer/offer_search.htm?keywords='
    }, {
      name: '知乎',
      icon: 'icon-icon-zhihu',
      color: '#0078d7',
      url: 'https://www.zhihu.com/search?type=content&q='
    }, {
      name: '微博',
      icon: 'icon-weibo',
      color: '#f3131b',
      url: 'https://s.weibo.com/weibo/'
    }, {
      name: 'B站',
      icon: 'icon-bilibili-s',
      color: '#f45a8d',
      url: 'http://search.bilibili.com/all?keyword='
    }, {
      name: '豆瓣',
      icon: 'icon-douban',
      color: '#03bc11',
      url: 'https://www.douban.com/search?source=suggest&q='
    }, {
      name: '优酷',
      icon: 'icon-youkuwang',
      color: '#148aff',
      url: 'https://so.youku.com/search_video/q_'
    }]
  }
  for (var i = 0; i < search.data.length; i++) {
    var addList = '<li><i class="iconfont ' + search.data[i].icon + '" style="color: ' + search.data[i].color + '"></i>' + search.data[i].name + '</li>'
    $('.search-engine-list').append(addList);
  }

  $('#search-icon, .search-engine').hover(function () {
    $('.search-engine').css('display', 'block')
  }, function () {
    $('.search-engine').css('display', 'none')
  });

  $('#hot-btn').on('click', function () {
    // $(this).toggleClass('icon-kaiguanclose-copy');
    if (storage.stopHot == 'true') {
      $(this).attr('class', 'iconfont icon-kaiguanclose-copy')
      storage.stopHot = false
    } else {
      storage.stopHot = true
      $(this).attr('class', 'iconfont icon-kaiguanguan')
    }
    console.log(storage.stopHot)
  });

  $('.search-engine-list li').click(function () {
    var _index = $(this).index();
    var thisIcon = $(this).children().attr('class');
    var thisColor = $(this).children().attr('style');
    $('#search-icon').attr('class', thisIcon)
    $('#search-icon').attr('style', thisColor)
    thisSearch = search.data[_index].url;
    $('.search-engine').css('display', 'none')

    storage.searchEngine = [thisSearch, thisIcon, thisColor]
  })
})
$("#search-btn").click(function () {
  var textValue = $('#txt').val();
  if (textValue != '') {
    $('body').attr('data-if') === 'true' ? window.location.href = '/?s=' + textValue : window.open('/?s=' + textValue)
  } else {
    new $.zui.Messager('请输入关键字', {
      icon: 'bell', // 定义消息图标
      type: 'danger',
      placement: 'top',
      close: false
    }).show();
  }
});