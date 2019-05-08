$ (function(){
      var tab1='',
          num=0,
          content='',
          pgNum=1,
          tempid='',
          authorId=''

          getAPI(tab1)
          changePage()
          clickNav()

      function clickNav(){
          $('.navBlock ul li:first-child').addClass('active')
          $('.navBlock ul li').click(function(){
            $(this).addClass('active').siblings().removeClass('active')
            num=$(this).index();
            switch (num) {
              case 0:
                tab1=''
                break;
              case 1:
                tab1='good'
                break;
              case 2:
                tab1='share'
                break;
              case 3:
                tab1='ask'
                break;
              default:
                tab1='ask'

            }
            getAPI(tab1)
          })
    }

    function getAPI(tab1,pgNum,limNum=20){
      return $.ajax({
        type:'get',
        url:'https://cnodejs.org/api/v1/topics',
        dataType:'json',
        data:{
          tab:tab1,
          page:pgNum,
          limit:limNum,
          mdrender:'true'
        },
        success:function(i){
          additem(i,'.content')

          localStorage.setItem('authorName',authorName)
        },
        error:function(err){
          console.log(err.statusTest)
          console.log('请求异常')
        }
      })
    }


    function changePage(){
        $('.changePage ul li:nth-child(2)').addClass('active')
        $('.changePage ul li').click(function(){
          $(this).addClass('active').siblings().removeClass('active')
          var num=$(this).index(),
              leg=  $('.changePage ul').children('li').length
          if(num<=0&&pgNum!=0){
              pgNum-=1
          }else if(num==leg-1){
              pgNum+=1
          }else{
              pgNum=num
          }
          console.log(pgNum)
          getAPI(tab1,pgNum)

        })
    }
    function additem(data,el){
      var str="<ul>",
          arr=data.data,
          iTab='',
          title='',
          visit_count,
          last_reply_at
      $.each(arr,function(n,item){
          if(item.good){
            iTab='精华'
            $('#tabtype').addClass('active')
          }else if(item.top){
            iTab='置顶'
            $('#tabtype').addClass('active')
          }else {
            iTab=item.tab=="ask"?'问答':'分享';
          }
          visit_count=item.visit_count>999?item.visit_count.toString().slice(0,1).concat('k+'):item.visit_count
          content=item.content
          localStorage.removeItem('id')
          localStorage['id']=item.id
          authorName=item.author.loginname
          last_reply_at=item.last_reply_at.slice(0,10)
          title=item.title.length>25?item.title.toString().substr(0,25).concat('...'):item.title;
          if(!item.author.avatar_url)
            item.author.avatar_url='../img/1.jpg'
          str+=
              "<li>"
              +"<a href='./html/user.html?userName="+item.author.loginname+"'><img id='authorImg' src='"+item.author.avatar_url+ "' alt=''></a>"
              // +"<p class='readCount'>"
              +"<span id='reply'>"+item.reply_count+"/"+visit_count+"</span>"
              // +"</p>"
              +"<span id='tabtype'>"+iTab+"</span>"
              +"<span id='title'>"+"<a  target='_self' href='./html/content.html?itemId="+item.id+"'>"+title+"</a>"+"</span>"
              // +"<img id='visitImg' src='' alt='无法查询'>"
              +"<span id='visitTime'>"+last_reply_at+"</span>"
              +"</li>"

            })
            str+="</ul>"
            $(el).html(str)
          }
      })
