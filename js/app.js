var firstRun 		= true;
var firstRunInner 	= true;

var animationQueue = [
	{'elem': '.illBottomLine', 	'effect': {"left":"49px","top":"400px"}, 	'easing': 'linear', 'duration': 800, 'delay': -600},
	{'elem': '.illBottomLine', 	'effect': {"left":"49px","top":"370px"}, 	'easing': 'easeOutBack', 'duration': 200, 'delay': -200},
	
	{'elem': '.illLeftCoins', 	'effect': {"left":"58px","top":"348px"}, 	'easing': 'linear', 'duration': 800, 'delay': -600},
	{'elem': '.illLeftCoins', 	'effect': {"left":"58px","top":"318px"}, 	'easing': 'easeOutBack', 'duration': 200, 'delay': -200},
	
	{'elem': '.illRightCoins', 	'effect': {"left":"334px","top":"353px"}, 	'easing': 'linear', 'duration': 800, 'delay': -600},
	{'elem': '.illRightCoins', 	'effect': {"left":"334px","top":"323px"}, 	'easing': 'easeOutBack', 'duration': 200, 'delay': -200},
	
	{'elem': '.illLeaves', 		'effect': {"left":"0px","top":"43px"}, 		'easing': 'linear', 'duration': 800, 'delay': -600},
	{'elem': '.illLeaves', 		'effect': {"left":"0px","top":"13px"}, 		'easing': 'easeOutBack', 'duration': 200, 'delay': -200},
	
	{'elem': '.illPortrait', 	'effect': {"left":"36px","top":"46px"}, 	'easing': 'linear', 'duration': 800, 'delay': -600},
	{'elem': '.illPortrait', 	'effect': {"left":"36px","top":"16px"}, 	'easing': 'easeOutBack', 'duration': 200, 'delay': -200},
	
	{'elem': '.illFixes', 		'effect': {"opacity":"1"}, 	'easing': 'linear', 'duration': 800, 'delay': 0},
	
	{'elem': 'p.lander', 		'effect': {"top":"50px"}, 	'easing': 'linear', 'duration': 800, 'delay': -200},
	{'elem': 'p.lander', 		'effect': {"top":"0px"}, 	'easing': 'easeOutBack', 'duration': 200, 'delay': -200},
	
	{'elem': 'img.lines', 		'effect': {"top":"50px"}, 	'easing': 'linear', 'duration': 800, 'delay': -600},
	{'elem': 'img.lines', 		'effect': {"top":"0px"}, 	'easing': 'easeOutBack', 'duration': 200, 'delay': -200},	
	
	{'elem': '#home #footer', 	'effect': {"top":"50px"}, 	'easing': 'linear', 'duration': 800, 'delay': -600},
	{'elem': '#home #footer', 	'effect': {"top":"0px"}, 	'easing': 'easeOutBack', 'duration': 200, 'delay': -200},	
	
	
	{'elem': '.illFont', 			'effect': {"left":"79px","top":"447px"}, 		'easing': 'linear', 'duration': 800, 'delay': -600},
	{'elem': '.illFont', 			'effect': {"left":"79px","top":"407px"}, 		'easing': 'easeOutBack', 'duration': 200, 'delay': -200},
	
	{'elem': '#home a.Vision', 		'effect': {"left":"50px", "opacity": "1"}, 		'easing': 'linear', 'duration': 500, 'delay': -100},
	{'elem': '#home a.Vision', 		'effect': {"left":"0px"}, 						'easing': 'easeOutBack', 'duration': 500, 'delay': -500},
	
	{'elem': '#home a.Projects', 	'effect': {"left":"50px", "opacity": "1"}, 		'easing': 'linear', 'duration': 500, 'delay': -500},	
	{'elem': '#home a.Projects', 	'effect': {"left":"0px"}, 						'easing': 'easeOutBack', 'duration': 500, 'delay': -500},	
	
	{'elem': '#home a.Founders', 	'effect': {"left":"-50px", "opacity": "1"}, 	'easing': 'linear', 'duration': 500, 'delay': -500},	
	{'elem': '#home a.Founders', 	'effect': {"left":"0px"}, 						'easing': 'easeOutBack', 'duration': 500, 'delay': -500},	
	
	{'elem': '#home a.About', 		'effect': {"left":"-50px", "opacity": "1"}, 	'easing': 'linear', 'duration': 500, 'delay': -500},
	{'elem': '#home a.About', 		'effect': {"left":"0px"}, 						'easing': 'easeOutBack', 'duration': 500, 'delay': -500}
];

$(document).ready(function() {	
	
	// floating sidebar
    $(window).scroll(function () {  
        var offset = parseInt($(document).scrollTop()) + "px";
        $(".sidebar").animate({top:offset},{duration:400,queue:false});  
    });
    
    // lightbox
    $("a.lightBox").lightBox();
	
	$(".nav a, .nav1 a").bind('click', function(){
		navigate($(this).attr('href'));		
	});
	
	
	if(window.location.hash != '' && window.location.hash != '#home') {
		navigate(window.location.hash);
	} else {
		if(firstRun == true) {	
			var middleDelay = 1000;
			if($.browser.msie == true) {
				//loadCssFile('css/rollback.css');
				//middleDelay = 1;
				loadCssFile('css/moved_ie.css');
			}
			$("#loader")		
			.delay(2000)
			.animate({'opacity':'0'}, {'queue':true, 'duration':300})
			.delay(100)
			.queue(function(){
				
					$("#home").show().animate({'opacity':'1'}, {'duration':1000});
								
				$(this).dequeue();
			})
			.delay(middleDelay)
			.queue(function(){
				animationSequence(animationQueue);
				$(".illustration img.illFixes").show();
				if($.browser.msie == true) {
					animationSequence([{'elem': '.illFixes', 'effect': {"left":"96px", "top": "75px"}, 'easing': 'linear', 'duration': 800, 'delay': 0}]);
				}				
				$(this).dequeue();
			});			
		}			
		firstRun = false;
	}	
});

function showProject(name){
	$('.projectItems:visible').slideUp('slow', function(){ $(name).slideDown('slow'); });
	var sideLinks = $("#projects .sidebar a");  
	sideLinks.bind('click', function(){
		sideLinks.each(function(){
			$(this).removeClass('active');
		});
		$(this).addClass('active');
	});
}

function animationSequence(queue) {		
	var cnt = 0;
	for(var i in queue) {
		var item = queue[i];
		cnt += item.duration + item.delay;
		animateElement(item, cnt);
	}
	setTimeout(
		function() { $("body").css("overflow", "auto"); }, 
		cnt + 3000
	);
}

function animateElement(item, delay) {	
	setTimeout(
		function() { $(item.elem).animate(item.effect,{ queue: true, easing: item.easing, duration: item.duration}); }, 
		delay
	);
};

function navigate(location){	
	if(validLocation(location) != true) { return false; }
	
	if(firstRunInner == true){				
		// hide rest of the elements
		$('.sections, #loader').hide();		
		$("body").css("overflow", "auto");
		
		// show requested section		
		$(location).slideDown(1000);
		$(location + ' .header').css('top','-999px');
		
		var elementAnimation = [
        	{'elem': location + ' .header', 'effect': {"top":"50px"}, 	'easing': 'linear', 		'duration': 800, 'delay': -200},
        	{'elem': location + ' .header', 'effect': {"top":"0px"}, 	'easing': 'easeOutBack', 	'duration': 200, 'delay': -200}
        ];
		animationSequence(elementAnimation);		
		loadCssFile('css/rollback.css');
	} else {
		$('.sections:visible')
		.slideUp(400, function(){
			$(location)		
			.slideDown(1000);
		});	
	}
	
	firstRun 		= false;
	firstRunInner 	= false;
};

function validLocation(test) {
	var locations = ['#home', '#projects', '#vision', '#founders', '#about'];
	    
	for(var i = 0; i < locations.length; i++) {
        if(locations[i] == test) { return true; }
    }
    return false;
}

function loadCssFile(file){
	// move elements by loading additional css file with new layout values
	if($("#home").size() > 0){
        if (document.createStyleSheet){
            document.createStyleSheet(file);
        }
        else {
        	$("head").append($("<link rel='stylesheet' href='" + file + "' type='text/css' media='screen' />"));
        }
    }    
}
