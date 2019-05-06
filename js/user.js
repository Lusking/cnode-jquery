$(function(){
var uName=localStorage.getItem('authorName')


$('header .back img').click(function(){



})



  $.ajax({
    type:'get',
    url:'https://cnodejs.org/api/v1/user/alsotang',
    dataType:'json',
    success:function(i){
        topicAdd(i,'.topicCre')
        topicAdd2(i,'.topicJoi')
    },
    error:function(){
      console.log('请求异常')
    }
  })
  $.ajax({
    type:'get',
    url:'https://cnodejs.org/api/v1/topic_collect/alsotang',
    dataType:'json',
    success:function(i){
        topicAdd3(i,'.collect')
       
    },
    error:function(){
      console.log('请求异常')
    }
  })
  function topicAdd(data,el){
    var str ="<ul><p>创建的主题</p>",
        arr=data.data.recent_topics
        
       
    $.each(arr,function(index,item){
      var  title=item.title.length>25?item.title.toString().substr(0,25).concat('...'):item.title,
            last_reply_at=item.last_reply_at.slice(0,10)
      str+=
          "<li>"
          +"<img id='authorImg' src='"+item.author.avatar_url+"'>"
          +"<span id='title'>"+"<a  target='_self' href='../html/content.html'>"+title+"</a></span>"
          +"<span class='visitTime'>"+last_reply_at+"</span>"
          +"</li>"
    })
        str+="</ul>"
        $(el).html(str)
  }
  function topicAdd2(data,el){
    var str ="<ul><p>参与的主题</p>",
        arr=data.data.recent_replies
       
        
        
    $.each(arr,function(index,item){
      var title=item.title.length>25?item.title.toString().substr(0,25).concat('...'):item.title,
          last_reply_at=item.last_reply_at.slice(0,10)
      str+=
          "<li>"
          +"<img id='authorImg' src='"+item.author.avatar_url+"'>"
          +"<span id='title'>"+"<a  target='_self' href='../html/content.html'>"+title+"</a></span>"
          +"<span class='visitTime'>"+last_reply_at+"</span>"
          +"</li>"
    })
        str+="</ul>"
        $(el).html(str)
  }
  function topicAdd3(data,el){
    var str ="<ul>",
        arr=data.data
       
    $.each(arr,function(index,item){
      var  title=item.title.length>25?item.title.toString().substr(0,25).concat('...'):item.title;
      str+=
          "<li>"
          +"<span>"+(index+1)+".</span>"
          +"<span id='title'>"+"<a  target='_self' href='../html/content.html'>"+title+"</a></span>"
          +"</li>"
    })
        str+="</ul>"
        $(el).html(str)
  }

    



})
