/*公共JS文件*/ 
$(function(){
	// 公共头部导航
	$('#pub_header').load('pages/pubHeader.html');
	// 公共底部
	$('#pub_footer').load('pages/pubFooter.html');

	// serach参数转为对象
	var urlToObj = function (url) {
		 var reg_url = /^[^\?]+\?([\w\W]+)$/,
		  reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
		  arr_url = reg_url.exec(url),
		  ret = {};
		 if (arr_url && arr_url[1]) {
		  var str_para = arr_url[1], result;
		  while ((result = reg_para.exec(str_para)) != null) {
		   ret[result[1]] = result[2];
		  }
		 }
		 return ret;
	}

	// 获取右边list的Hml代码
	function getListHtmlFn (list, idName) {
		var str_ = '';
		for (var i = 0; i < list.length; i++) {
			str_ += '<li>'+ list[i].name +'</li>';
		}
		$('#'+idName+' .list_ul').html(str_);
	}
	// 专业领域页面数据
	var specialtyList = [];  
	$.ajax({
		url: '../data/specialty.json',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			specialtyList = data;
			var html_ = '';
			for(var i=0; i<data.length; i++){
				html_ += '<li><a class="NodeTitle">' + data[i].name +'</a></li>';
			}
			$('#specialty_list').html(html_);
			// 初始化
			var index_ = parseInt(urlToObj(location.href).type) || 0;
			$('#specialty_list li').eq(index_).addClass('CurrentlyNode');
			getListHtmlFn(specialtyList[index_].list, 'list_right');
			$('#list_right .currentlyNode, #select_specialty>a').text(specialtyList[index_].name);
			// 点击左边切换右边内容
			$('#specialty_list li').click(function() {
				var index_ = $(this).index();
				location.href = 'specialty.html?type='+index_;  
				// $('#specialty_list li').removeClass('CurrentlyNode');
				// $(this).addClass('CurrentlyNode')
				// getListHtmlFn(specialtyList[index_].list, 'list_right');
				// $('#CurrentlyNode, #select_specialty>a').text(specialtyList[index_].name);
			});
		}
	})

	// 合作对象
	var partnerList = [];  
	$.ajax({
		url: '../data/partner.json',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			partnerList = data;
			getListHtmlFn(partnerList[0].list, 'parner_list');
			$('#parner_list .currentlyNode').text(partnerList[0].name);
		}
	})
	

})