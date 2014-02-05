(function($) {
  "use strict";

$(window).resize(function() {
    clearTimeout($.data(this, 'resizeTimer'));
    $.data(this, 'resizeTimer', setTimeout(function() {
        jQuery('#hometicker').vTicker();
    }, 200));
});
  
  jQuery(document).ready(function($) { 
    jQuery('#hometicker').vTicker();

$('.chart').on('animate',function(){
    $(this).easyPieChart({ 
        barColor: 'rgba(0,0,0,0.2)',
        trackColor: 'rgba(0,0,0,0.1)',
        scaleColor: false,
        lineWidth:15,
        lineCap:'butt',
        size: 180,
        animate: 2000,
        onStep: function(from, to, percent) {
          $(this.el).find('.percent').text(Math.round(percent));
          }
        });
      });    

jQuery('.percentage-counter').on('animate',function(){
  var dataval = parseInt(jQuery(this).attr('data-val'));
  var datadelay = parseInt(jQuery(this).attr('data-delay'));
  jQuery(this).find('.count').delay(1000).countTo({ 
          startNumber: 0,     
          endNumber: dataval,
          interval: datadelay
    });
});        

  $('.homeslider').flexslider({
    controlNav:false,
    prevText: '<div class="icon icon-left-open-big"></div>',           //String: Set the text for the "previous" directionNav item
    nextText: '<div class="icon icon-right-open-big"></div>', 
    slideshowSpeed: 7500,
    //slideshow:false,
    start: function(){
            $('.homeslider li').each(function(){
                var $bgobj = $(this);
                $(window).scroll(function(e) {
                    e.preventDefault();
                    var $window = jQuery(window);
                    var yPos = -Math.round(($window.scrollTop()/2));
                    var coords;
                    coords = '50% '+yPos + 'px';
                    // Move the background
                    $bgobj.css({backgroundPosition: coords});
                }); 
              });
    } 
  });

  $('.serviceslider').flexslider({
    controlNav:false,
    directionNav:false,
    slideshow:false,
  });

  $('#services-main li').click(function(){
      var i=$(this).index();
      $('#services-main').find('.active').removeClass('active');
      $(this).addClass('active');
       $('.serviceslider').flexslider(i);
  });

}); 




jQuery(document).ready(function($){    
     SidebarMenuEffects();      
    // cache container
    var $container = $('#filtercontainer');
    // initialize isotope
    $container.imagesLoaded( function(){
        $container.isotope({ 
          masonry: { columnWidth: $container.width() / 4 },
          filter: '.filteritem',
          animationOptions: {
               duration: 750,
               queue: false
             }
           });
     });

    $(window).smartresize(function(){
  $container.isotope({
    // update columnWidth to a percentage of container width
    masonry: { columnWidth: $container.width() / 4 }
  });
});

    // filter items when filter link is clicked
    $('#filters a').click(function(event){
    event.stopPropagation();
      $('#filters a').removeClass('active');
      $(this).addClass('active');
      var selector = $(this).attr('data-filter');
      $container.isotope({ 
        filter: selector ,
        animationOptions: {
             duration: 750,
             queue: false
           }  
        });
      
   
      return false;
    });
    
    $('#filters a:first').trigger('click');
    //$("a[class^='prettyPhoto']").prettyPhoto({theme : 'light_square'});
        
    });
			
jQuery(document).ready(function($) { 
 // Cache selectors
 var lastId;
 var topMenu = $(".scrollmenu"); 
 var topMenuHeight = 70;//topMenu.outerHeight()+15
     // All list items
 var menuItems = topMenu.find("a"),
     // Anchors corresponding to menu items
     scrollItems = menuItems.map(function(){
       var item = $($(this).attr("href"));
       
       if (item.length) { return item; }
     });
  

 // Bind click handler to menu items
 // so we can get a fancy scroll animation
menuItems.click(function(e){
  e.preventDefault();
   var href = $(this).attr("href"),
       offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
       
  
   $('html, body').stop().animate({ 
       scrollTop: offsetTop
   }, 400);
  //return false;
 });


        $(window).scroll( function ()
        {
            var fromTop = $(this).scrollTop()+topMenuHeight+20;
            var cur = scrollItems.map(function(){
              if ($(this).offset().top < fromTop)
                return this;
            });
            cur = cur[cur.length-1];
            var id = cur && cur.length ? cur[0].id : "";
            if (lastId !== id) {
                lastId = id;
                menuItems
                  .parent().removeClass("active");
                  menuItems.filter("[href=#"+id+"]").parent().addClass("active");               
                   }
                   
                 // Animation function  
                   $('.animate').not('.load').each(function(i){
                           var $this=$(this);
                           var ind = i * 100;
                           var docViewTop = $(window).scrollTop();
                           var docViewBottom = docViewTop + $(window).height();
                           var elemTop = $this.offset().top;      
                   
                               if (docViewBottom >= elemTop) { 
                                   setTimeout(function(){ 
                                        $this.addClass('load');
                                        $this.trigger('animate');
                                   	}, ind);
                                   }
                       });
                      //End function 
        });
    });
  jQuery(window).load(function() {    
    var screenheight=jQuery(window).height()-70;
    $('#home').css('height',screenheight+'px');
    $('#homecontent').css('height',screenheight+'px');
    $('.homeslider').css('height',screenheight+'px');
    jQuery(window).scroll(function(){
       var wtop= jQuery(window).scrollTop();
       
       if(wtop > screenheight){
        jQuery('header').addClass('fix');
       }else{
        jQuery('header').removeClass('fix');
       }
    });

    $('.parallax').each(function(){
        var $bgobj = $(this);
        $(window).scroll(function(e) {
            e.preventDefault();
            var $window = jQuery(window);
            var yPos = -Math.round(($window.scrollTop()/4));
            var coords;
            coords = '50% '+yPos + 'px';
            // Move the background
            $bgobj.css({backgroundPosition: coords});
        }); 
      });
});    


 $(window).resize(function() {
                clearTimeout($.data(this, 'resizeTimer'));
                $.data(this, 'resizeTimer', setTimeout(function(){

                    jQuery('#hometicker').each(function(){
                        jQuery(this).vTicker();
                      });

                }, 200)
              );
});  
    
    		
     
// Contact Form
  jQuery(document).ready(function($) {

    // Grab the Latest tweet from twitter
          twitterFetcher.fetch('426984938332639233', 'tweet', 1, true);       

      function send(name,mail,phone,content) {
      	jQuery.ajax({
              type: "POST",
              url: "php/mail.php",
              data: {	name: name,
              			email:mail,	 
              			content: content},
              cache: false,
              success: function (html) {
              
                  setTimeout(function(){
                  jQuery("#submit").removeClass("disabled");
                  jQuery("#submit").html(html);
                  setTimeout(function(){
                  		var val=jQuery("#submit").attr('data-value');
                  		jQuery("#submit").html(val);}, 2000);
                  }, 2000);
              }
          });
      }

          $("#submit").click(function (event) {
              event.preventDefault();
              var valid = "";
              var mail = $('#email').val();
              if (!mail.match(/^([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,4}$)/i)) {
                  valid += "Invalid&nbsp;email";
              }
              if (valid != "") {
                   $('#email').addClass('error_input');
              } else {
                  var content=$('#message').val();
                  var phone=$('#phone').val();
                  var name=$('#name').val();
                  
                  if($('#email').hasClass('error_input')){
                  		$('#email').removeClass('error_input');
                  };
                  
                  $("#submit").addClass('disabled');
                  $("#submit").html('Sending email...');
                  setTimeout(function(){send(name,mail,phone,content);}, 2000);
              }
              return false;
          });
          
          jQuery("#email").keypress(function(e) {
              if(e.keyCode == 13) {
                  jQuery("#submit").click();
                  return false;
              }

      });
      


      
});   

$('#filtercontainer').magnificPopup({
          delegate: '.gallery',
          type: 'image',
          tLoading: 'Loading image #%curr%...',
          mainClass: 'mfp-img-mobile',
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
          },
          image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
          }
        });

$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
          disableOn: 700,
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,

          fixedContentPos: false
        });

})(jQuery); 			