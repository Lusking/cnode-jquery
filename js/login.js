$(function(){
    var value=$('form input[name="name"]').val()
    function postToken(){
      $.ajax({
        type:'post',
        url:'https://cnodejs.org/api/v1/accesstoken',
        dataType:'json',
        data:{
          accesstoken:value
        },
        success:function(rep){
          console.log(rep)
          localStorage.setItem('accesstoken',value)
          window.location.assign('./html/main.html')
        }
  
      })
    }
    $('form .login').click(function(){
      postToken()
    })
 
})
