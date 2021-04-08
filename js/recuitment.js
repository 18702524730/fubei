$(document).ready(function(){
	var dataCareer = [];
		$.ajax({
		url: '../data/recuitment.json',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			dataCareer = data;
			var listName = function(){
			specialtyList = dataCareer;
			var html_ = '';
				for(var i in dataCareer){
					html_ += '<h4>' + dataCareer[i].name +'</h4>';
					html_ += '<strong>工作内容：</strong>';
					for(var h in dataCareer[i].workInfo){
						html_ += '<p>' + dataCareer[i].workInfo[h] +'</p>'
					}
					html_ += '<strong>任职要求：</strong>';
					for(var r in dataCareer[i].demand){
						html_ += '<p>' + dataCareer[i].demand[r] +'</p>'
					}
					html_ += '<strong>职位参考月薪：</strong>';
					html_ += '<p>' + dataCareer[i].monthly +'</p>'
					html_ = '<div class="recuitment">'+html_+'</div>'
				}
				$("#recuitmentContent").html(html_);
			}
			listName();
		},
		error:function(err){
			console.log(err)
		}
		})

})
