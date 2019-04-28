$(function(){
    var value=$('form input[name="name"]').val(),
  $.ajax({
      type:'post',
      url:'https://cnodejs.org/api/v1/accesstoken',
      dataType:'json',
      data:{
        'accesstoken':value
      },
      async:true,
      success:function(){
        localStorage.setItem('accesstoken',value)
      }

  })
})
