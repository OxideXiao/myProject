var pageController = (function(){
	
	var index =0;
	var wth = $(window).width();
	
	var lib = {
		is_weixn:function(){  
		    var ua = navigator.userAgent.toLowerCase();  
		    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
		        return true;  
		    } else {  
		        return false;  
		    }  
		},
		
	};
	
	var widthAdjust = function(){
		
		$('.page').width(wth);
		$('.dsWrapper').width(wth*5);	
		
		return this;	
	};
	
	var pageSwitch = function(){
		
		$('.entryPage .btn-ep').on('click',function(){
			$(this).closest('.loadingBox').hide();
			$('.cartoonBox').show();
			if (window.DeviceOrientationEvent){
				$('.coverFront').eq(1).show();
				document.addEventListener("touchmove",function(e){			
				e.preventDefault();
				e.stopPropagation();
				},false);
			}else{
				$('.coverFront').eq(0).show();
			}
			
		});
			
		return this;	
	};
	
	var swiperControl = function(){
		
		touch.on('.dsWindow .bgI','swipeleft',function(e){
			if ($(e.target).closest('.page').hasClass('ctP')){			
				var ml = $('.dsWrapper').css('marginLeft');
				ml = parseInt(ml) - wth;
				$('.dsWrapper').animate({marginLeft:ml},300);
				index+=1;
			};
			setTimeout(function(){
				if (index==4){
					$('.moreEvent-icon').css('position','fixed')
				};
			},300);
			
		});
		
		var id_f = $('.dsWrapper').children('.motionPage:first').attr('id');
		touch.on('.dsWindow .bgI','swiperight',function(e){
			if ($(e.target).closest('.page').attr('id') != id_f){
				var ml = $('.dsWrapper').css('marginLeft');
				ml = parseInt(ml) + wth;
				$('.dsWrapper').animate({marginLeft:ml},300);
				index-=1;
			}
			if (index!=4){
				$('.moreEvent-icon').css('position','absolute')
			}
		});
		
		return this;
	}
	
	var motionControl = function(){
		var scrollLength;
		var initP;
		var setInit = function(e){
			initP = e.beta;
			window.removeEventListener('deviceorientation',setInit);
			window.addEventListener('deviceorientation',makeMove);
		}
		var makeMove = function(e){
			$('#con').html('sl:'+scrollLength/80+"::intiP:"+initP+"::"+(e.beta-initP));
				
			$('body').scrollTop(scrollLength-(e.beta-initP)*scrollLength/80);
			
			/*
			if ($('body').scrollTop()==0&&index<4){
				if (showCover){
					setTimeout(function(){
						showCover();
					},300);
				}				
			}
			*/
			
		}
		function showCover(){
			showCover =null;//这里笑掉了以后在后面的页面里就没法yong'le
			$('.coverI').eq(index).show().fadeIn(1000);
			setTimeout(function(){
				$('.coverI').eq(index).fadeOut(1000)
				setTimeout(function(){
					$('.coverI').eq(index).hide()
				},1000);
			},3000);
			
			/*
			touch.on($('.cartoonBox .bgI').eq(index)[0],'swipeleft',function(e){console.log(1)
				if ($(e.target).closest('.page').hasClass('ctP')){			
					var ml = $('.dsWrapper').css('marginLeft');
					ml = parseInt(ml) - wth;
					$('.dsWrapper').animate({marginLeft:ml},300);
					index+=1;
				}
			});
			*/
		}
		
		
		$('.entryPage').on('click',function(){
			setTimeout(function(){
				$('body').scrollTop($('.dsWindow').height());
				scrollLength = $('body').scrollTop();
			},1);
			window.addEventListener('deviceorientation',setInit);
		});
		
		return this;
	}
	
	var btnControl = function(){
		//share btn
		$('.share-btn').on('click',function(){
			if (lib.is_weixn()){
				$('.wec-scb').show()
			}else{
				$('.nol-scb').show()
			}
		});
		//btnBox
		$('.btnBox .discount').on('click',function(){
			$('.discountList').show();
		});
		$('.btnBox .doctors').on('click',function(){
			$('.doctorsList').show();
		});
		$('.btnBox .gift').on('click',function(){
			$('.giftsQuering').show();
		});
		$('.jumpCover .close-ic').on('click',function(){
			$(this).closest('.jumpCover').hide();
		});
		
		return this;
	}
	
	var sectionControl = function(){
		$('.coverFront').on('click',function(){
			$(this).hide().siblings('.coverFront[id="cf-2"]').show();			
		});
		
		$('.shareCoverBox').on('click',function(){
			$(this).hide()
		});
		
		//discounts submit
		$('.discountList').on('click',function(e){
			if ($(e.target).hasClass('discountTicket')){
				var idx = $(e.target).index();
				$(this).hide();
				$('.dsQuering').show()
				.children('.dsT').eq(idx).show().siblings().hide();
			}						
		});
		
		
		//doctors
		$('.doctorsList').children('.list').eq(0).show().siblings().hide()
		$('.doctorsList .head-img-d').on('click',function(){
			var idx =$(this).closest('.list').index();
			$('.doctorsList').children('.list').eq(idx).hide().siblings().show();		
		});
		
		return this;
	}
	
	var inputCheck = {
		nameCheck:function(val){
			if (val.length==0){
				alert('姓名不能为空');
				return false;
			}
			if (val.match(/[\u4E00-\u9FA5]/)){
				if (val.match(/[^\u4E00-\u9FA5]/)){
					alert('姓名只能为纯英文或纯中文')
					return false;
				}
			}else if (val.match(/[a-zA-Z]/)){
				if (val.match(/[^a-zA-Z]/)){
					alert('姓名只能为纯英文或纯中文')
					return false;
				}
			}else{
				alert('姓名只能为纯英文或纯中文')
				return false;
			}
			
			return true;
		},
		telCheck:function(val){
			if (val.length == 0){
				alert('电话号码不能为空');
				return false;
			}
			if (val.match(/^1[3|4|5|7|8]\d{9}$/)){
				return true;
			}else{
				alert('电话号码格式不对')
				return false;
			}
			
		},
		addCheck:function(val){
			if (val.length<2){
				alert('地址过短')
				return false;
			}
			if (val.match(/[^a-zA-Z\u4E00-\u9FA5\d]/)){
				alert('地址内不能有特殊符号')
				return false;
			}
			return true;
		}
	}
	//console.log(inputCheck.addCheck('复兴路1098acx*们'))
	var submitController = function(){
		var that =this;
		//gift submit
		$('.giftsQuering .submit-gf').on('click',function(e){
			e.preventDefault();
			
			if (!that.inputCheckControl(this,'name','tel','add')){
				return;
			}
			
			$(this).closest('.jumpCover').hide();
			//ajax
			$(this).closest('.jumpCover').siblings('.giftsSuccess').show();
		});
		//discount submit
		$('.dsQuering .submit-gf').on('click',function(e){
			e.preventDefault();
			
			if (!that.inputCheckControl(this,'name','tel')){
				return;
			}
			
			$(this).closest('.jumpCover').hide();
			//ajax
			$(this).closest('.jumpCover').siblings('.dsSuccess').show();
		});
		
		return this;
	}
	
	var inputCheckControl = function(obj){
		var $fm = $(obj).closest('form');
		var args = [].slice.call(arguments,1);
		var val;
		
		for (x in args){
			val = $fm.find('input[name='+args[x]+']').val();
			if (!this.inputCheck[''+args[x]+'Check'](val)){
				return false;
			}
		}
		return true;
	}
	
	return {
		widthAdjust:widthAdjust,
		
		pageSwitch:pageSwitch,
		
		swiperControl:swiperControl,
		
		motionControl: motionControl,
		
		btnControl:btnControl,
		
		sectionControl:sectionControl,
		
		submitController:submitController,
		
		inputCheck:inputCheck,
		
		inputCheckControl:inputCheckControl
	}
})()