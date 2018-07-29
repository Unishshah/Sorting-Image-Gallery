var thumbnailspacing = 15;

$(document).ready(function(){
    
     $('a.sortedlink').on('click',function(e){
        e.preventDefault();
        $('a.sortedlink').removeClass('selected');
        $(this).addClass('selected');
        var keyword = $(this).attr('data-keyword');
        sortthumbnails(keyword);
    }) 
    
    $('.gallery .sorting').css('margin-bottom', window.thumbnailspacing+ 'px');
    $('.thumbnailcontainer a.thumbnail').addClass('showMe');
    
    readytopos();
    setInterval('checkviewport()',750);
    
});

function checkviewport()
{
var photoswidth = $('.photos').width(); 
    var thumbnailcontainerwidth = $('.thumbnailcontainer').width();
    var thumbnail = $('.thumbnailcontainer a.thumbnail:first-child').outerWidth();

    if(photoswidth < thumbnailcontainerwidth)
        {
            readytopos();
        }
    if((photoswidth - thumbnail) > thumbnailcontainerwidth)
        {
            readytopos();
        }
}


function sortthumbnails(keyword)
{
$('.thumbnailcontainer a.thumbnail' ).each(function(){
    
var thumbnailkeywords= $(this).attr('data-keywords');
    
    if(keyword== 'all')
        {
            $(this).addClass('showMe').removeClass('hideMe');
        }
    else
        {
            if(thumbnailkeywords.indexOf(keyword) != -1)
               {
               $(this).addClass('showMe').removeClass('hideMe');
               }
               else
               {
                $(this).addClass('hideMe').removeClass('showMe');
               }
        }
});
        readytopos();
}

function readytopos(){
    
    $('.thumbnailcontainer a.thumbnail.hideMe').animate({opacity:0},500,function(){
        $(this).css({'display':'none','top':'0px','left':'0px'});
    });
    
    var containerwidth = $('.photos').width(); //width in my screen turns out to be 1092.8
    var R = 0; //initailizing the value of R to zero
    var C = 0; //initailizing the value of R to zero
    var thumbnailwidth = $('a.thumbnail img:first-child').outerWidth() + window.thumbnailspacing; //calculating the width of first image which turns out to be 92
    
    var thumbnailheight = $('a.thumbnail img:first-child').outerHeight() + window.thumbnailspacing;; //calculating the height of first image which turns out to be 92
     
    var maxc = Math.floor(containerwidth / thumbnailwidth); //value is 11
    
    $('.thumbnailcontainer a.thumbnail.showMe').each(function(index){
        //index value will be from 0,1,2 and so on.....till the number of images present
        var remainder = (index % maxc)/100; // r = 0 % 11/100 = 0, 1 % 11/100 = 0.01, ...., 11 % 11/100 =0
        
        var maxindex = 0;
        
        if(remainder == 0) // for index 0,11,22..we will enter in ths loop
            {
                if(index != 0)
                    {
                        R += thumbnailheight; //value of height of image ie 92 will be added to R for the next row it will be incremented again. (92+92 when index value is 11)
                    }
            C = 0;  // value of C is reset to 0 when it comes here
        }
                else{
                    C += thumbnailwidth; //value of width is added to C and it will be incremented for same row. (for 4th row we will have 92+92+92+92=364)
                }
            
        // logic values would be as follows index=0, C,R=0 index=1 R=0,C=92 index=2 R=0,C=184 index 11 R=92,C=0 index 12,R=92, C=92
        
      $(this).css('display','block').animate({
          'opacity':1,
          'top': R + 'px',        //value of R from above loop.
          'left': C + 'px'        //value of C from above loop.
      },500);  
        
     var newwidth = maxc * thumbnailwidth;
    var newheight = R + thumbnailheight;
        $('.thumbnailcontainer').css({'width':newwidth+ 'px','height':newheight+ 'px'})
  });
    
    var newwidth = $('.thumbnailcontainer').width()
    $('.sorting').css('width',newwidth+ 'px'); 
    
};