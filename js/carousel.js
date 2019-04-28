$(function(){
  var index=0;
  function play(){
    index++
    if(index>4) index=0
      $('.btn li').eq(index).css('background-color','#fff').siblings().css('background-color','#ccc')
      $('.swiper a').eq(index).fadeIn(1000).siblings().fadeOut(1000)
  }
    clearInterval(timer)
  var timer=setInterval(play,3000)
    $('.swiper,.btn').hover(function(){
      clearInterval(timer)
    },function(){
      timer=setInterval(play,3000)
      console.log(index)
    })

    function selectItem(){
      $('.rightBar .btn li').click(function(){
        var itemIndex=$(this).index();
            index=itemIndex
        $(this).css('background-color','#fff').siblings().css('background-color','#ccc')
        $('.rightBar .swiper a').eq(itemIndex).fadeIn(1000).siblings().fadeOut(1000)

      })
    }
    selectItem()
  console.log(index)
})
