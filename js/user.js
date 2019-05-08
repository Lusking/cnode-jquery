$(function(){
          var userName='',
              topicCollect =0
          function getUrlParam(url) {
              var id=url.split('?').length>0?url.split('?')[1]:url
                  arr=id.split('=')
                userName=arr[1]            
                console.log(userName)
          }
          getUrlParam(location.href);
          $.ajax({
            type:'get',
            url:'https://cnodejs.org/api/v1/user/'+userName,
            dataType:'json',
            success:function(i){
                headerAdd(i)
                topicAdd(i,'.topicCre')
                topicAdd2(i,'.topicJoi')
               
            },
            error:function(error){
              document.write(error)
            }
          })
          $.ajax({
            type:'get',
            url:'https://cnodejs.org/api/v1/topic_collect/'+userName,
            dataType:'json',
            success:function(i){
                topicAdd3(i,'.collect')                        
            },
            error:function(){
              console.log('请求异常')
            }
          })


            function headerAdd(data){
              var odj=data.data,
                  create_at=odj.create_at.slice(0,10)
                  str="<img src='"+odj.avatar_url+"'>"+"<p>积分："+odj.score+"</p>"
                      +"<p><span>"+topicCollect+"</span>个话题收藏</p>"
                  str1="<p>账号创建于"+create_at+"<p>"
                  str2= "<li><i class='fa fa-lg fa-fw fa-github'></i> <a href='https://github.com/alsotang'>@"+odj.githubUsername+"</a></li>"

                $('.baseMsg ul').before(str)
                $('.baseMsg').append(str1)
                $('.baseMsg ul li:nth-child(3)').before(str2)


            }

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
                  topicCollect=arr.length
                  console.log(arr.length)
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
