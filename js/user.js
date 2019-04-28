$(function(){
var uName=localStorage.getItem('authorName')
  $.ajax({
    type:'get',
    url:'https://cnodejs.org/api/v1/user/'+uName,
    dataType:'json',
    success:function(i){
        // topicAdd(i,'.topicCre')
    },
    error:function(){
      console.log('请求异常')
    }
  })
  topicAdd('.topicCre')
  topicAdd('.topicJoi')
  function topicAdd(el){
    var str ="<ul>"
        // arr=data.data
    // $.each(arr,function(index,item){
      // var title=item.recent_topics[index].title
      for(var i=0;i<5;i++){
      // console.log(title)
      str+=
          "<li>"
          +"<img id='authorImg' src='../img/8.jpg' alt=''>"
          +"<span id='title'>"+"<a  target='_self' href='../html/content.html'>"+"我是title"+"</a></span>"
          +"<span class='visitTime'>"+"2018"+"</span>"
          +"</li>"
    }
        str+="</ul>"
        $(el).html(str)
  }

})
