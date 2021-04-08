$(document).ready(function(){
	var dataCareer = [];
		$.ajax({
		url: '../data/career.json',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			dataCareer = data;
			var addhtmlStr = function(num){
				console.log(dataCareer)
				var data = dataCareer[num];
				$("#PathID4 a").text(data.name);
				var htmlStr = "";//定义空的htmlStrl
				htmlStr += "<h4>"+data.name+"</h4>"
				if(data.maxEducationBackground){//需要判断是否存在该字段,最高 学历
					htmlStr += "<div class='ry-foot'><p class='em2'><em>最高学历</em></p><div id='InfraredVideoIDExperience'><p>"+data.maxEducationBackground+"</p></div></div>"
				}
				if(data.regularSpecialty){//需要判断是否存在该字段，本科专业
					htmlStr += "<div class='ry-foot'><p class='em2'><em>本科院校及专业</em></p><div id='InfraredVideoIDExperience'><p>"+data.regularSpecialty+"</p></div></div>"
				}
				if(data.graduateSpecialty){//研究生专业
					htmlStr += "<div class='ry-foot'><p class='em2'><em>研究生院校及专业</em></p><div id='InfraredVideoIDExperience'><p>"+data.graduateSpecialty+"</p></div></div>"
				}
				if(data.aptitude){
					htmlStr += "<div class='ry-foot'><p class='em2'><em>职称或其他资质</em></p><div id='InfraredVideoIDExperience'><p>"+data.aptitude+"</p></div></div>"
				}
				if(data.speciality){
					htmlStr += "<div class='ry-foot'><p class='em2'><em>专长</em></p><div id='InfraredVideoIDExperience'><p>"+data.speciality+"</p></div></div>"
				}
				if(data.vicariousExperience){
					htmlStr += "<div class='ry-foot'><p class='em2'><em>代理经验</em></p><div id='InfraredVideoIDExperience'><p>"+data.vicariousExperience+"</p></div></div>"
				}
				if(data.graduate){
					htmlStr += "<div class='ry-foot'><p class='em2'><em>研究方向</em></p><div id='InfraredVideoIDExperience'><p>"+data.graduate+"</p></div></div>"
				}
				if(data.examine){
					htmlStr += "<div class='ry-foot'><p class='em2'><em>审查和代理领域</em></p><div id='InfraredVideoIDExperience'><p>"+data.examine+"</p></div></div>"
				}
				if(data.workExperience){
					htmlStr += "<div class='ry-foot'><p class='em2'><em>工作经历</em></p><div id='InfraredVideoIDExperience'>"+data.workExperience+"</div></div>"
				}
				if(data.praise){
					htmlStr += "<div class='ry-foot'><p class='em2'><em>获奖情况</em></p><div id='InfraredVideoIDExperience'>"+data.praise+"</div></div>"
				}
				if(data.case){
					htmlStr += "<div class='ry-foot'><p class='em2'><em>代理案例</em></p><div id='InfraredVideoIDExperience'><p>"+data.case+"</p></div></div>"
				}
				if(data.publish){
					htmlStr += "<div class='ry-foot'><p class='em2'><em>发表文章</em></p><div id='InfraredVideoIDExperience'><p>"+data.publish+"</p></div></div>"
				}
				if(data.caseExperience){
					htmlStr += "<div class='ry-foot'><p class='em2'><em>项目经验</em></p><div id='InfraredVideoIDExperience'>"+data.caseExperience+"</div></div>"
				}
				if(data.cultivate){
					htmlStr += "<div class='ry-foot'><p class='em2'><em>培训经历</em></p><div id='InfraredVideoIDExperience'><p>"+data.cultivate+"</p></div></div>"
				}
				$("#Content3 .ry-cont").html(htmlStr);
			}
			addhtmlStr(0);
			var listName = function(){
			specialtyList = dataCareer;
			var html_ = '';
				for(var i in dataCareer){
					html_ += '<li><a class="NodeTitle">' + dataCareer[i].name +'</a></li>';
				}
				$('#specialty_list').html(html_);
					// 初始化
					$('#specialty_list li').eq(0).addClass('CurrentlyNode');
					// getListHtmlFn(specialtyList[0].list, 'list_right');
					$('#CurrentlyNode, #select_specialty>a').text(specialtyList[0].name);
					// 点击左边切换右边内容
					$('#specialty_list li').click(function() {
						$("#specialty_list").find('li').removeClass('CurrentlyNode');
						$(this).addClass('CurrentlyNode');
						addhtmlStr($(this).index())
					});
			}
			listName();
		},
		error:function(err){
			console.log(err)
		}
		})
		
	// 公共头部导航
	$('#pub_header').load('./pubHeader.html');
	// 公共底部
	$('#pub_footer').load('./pubFooter.html');

})
