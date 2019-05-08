$(function(){
    
         var token=localStorage.getItem('accesstoken'),
            authorId=localStorage.getItem('authorId'),
            isCollect=false,
            itemId=''
          function getUrlParam(url,param) {
             var id=url.split('?').length>0?url.split('?')[1]:url
                 arr=id.split('&')
                 for(var i=0;i<arr.length;i++){
                    var arr1=arr[i].split('=')                                   
                    if(arr1[0]==param){
                        return arr1[1]
                    }
                 }
               itemId=arr1[1]
               console.log(itemId)
          }
   
          getUrlParam(location.href,itemId);


        getContentApi()
        function getContentApi(){
          return $.ajax({
            type:'get',
            url:'https://cnodejs.org/api/v1/topic/'+itemId,
            dataType:'json',
            data:{
              mdrender:'true',

            },
            success:function(i){
              insertItem(i,'.artReply')
            },
            error:function(){

            }

          })
        }
        function getCollectApi(){
          return $.ajax({
            type:'post',
            url:'https://cnodejs.org/api/v1/topic_collect/collect',
            dataType:'json',
            data:{
              id:authorId,
              accesstoken:token
            },
            success:function(){
                $('.artBox .collect').css({'background-color':'#ccc'}).text('取消收藏')
                isCollect=true
            },
            error:function(){

            }

          })
        }
        function getDeCollectApi(){
          return $.ajax({
            type:'post',
            url:'https://cnodejs.org/api/v1/topic_collect/de_collect',
            dataType:'json',
            data:{
              id:authorId,
              accesstoken:token
            },
            success:function(){
                $('.artBox .collect').css('background-color','#80bd01').text('收藏')
                isCollect=false
            },
            error:function(){

            }

          })
        }
        $('.artBox .collect').click(function(){
          if(!isCollect){
             getCollectApi()
          }else{
             getDeCollectApi()
          }

        })
        function insertItem(data,el){
          var oData=data.data,
              reply=oData.replies,
              len=reply.length,
              str= "<div class='repHeader'>"+len+"回复</div>"
              $('.artBox .header').text(oData.title)
              $('header .time').text(oData.create_at)
              $('header .author').text(oData.author.loginname)
              $('header .visit').text(oData.visit_count)
              $('header .type').text(oData.tab)
              $('article').html(oData.content)
              $.each(reply,function(index,item){
                var create_at=item.create_at.slice(0,10)
                str+=
                  "<div class='reply'><img src='"+item.author.avatar_url+"'>"+
                  "<span class='repMsg'>"+item.author.loginname+"&nbsp&nbsp"+(index+1)+"楼"+"&nbsp&nbsp"+create_at+"</span>"+
                  "<br><span class='contentMsg'>"+item.content+"</span>"+
                  "</div>"

              })
              $(el).html(str)
        }

})
