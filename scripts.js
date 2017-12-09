var maxRes = 4; 
   
var val1 = 'AIzaSyAFV5dB';
var val2 = '0CKCkb7L3ddrZYVL9bxr4lB31s';
var val = val1 + '-' + val2;

var x = new Array(3);
var j = 0;

 function searchQ(){
 
      query = document.getElementById('queryText').value;
      email = 'https://www.googleapis.com/youtube/v3/search?part=snippet' +'&maxResults='+ maxRes +
      '&order=viewCount&date&q='+ query + '&key=' + val +
      '&callback=myPlan';
      var oldsearchS = document.getElementById('searchS');
      if(oldsearchS){
            oldsearchS.parentNode.removeChild(oldsearchS);
      }
      var s = document.createElement('script');
      s.setAttribute('src', email);
      s.setAttribute('id','searchS');
      s.setAttribute('type','text/javascript');
      document.getElementsByTagName('head')[0].appendChild(s);
  }
    
  function myPlan(response){
     
      var stList = '<table id="res1" border="1" cellspacing="0" width="100%"><tbody>'; 
      for (var i=0; i<response.items.length;i++){
         
          x[i] = new Array(3);

          var vid = response.items[i].id.videoId; 
      
          var channelTitle  =  response.items[i].snippet.channelTitle;
        
          var videodatetime = response.items[i].snippet.publishedAt; 
          var videodate = videodatetime.substr(0, 10);
          
          var videolang = response.items[i].snippet.defaultAudioLanguage;  
                 
            x[i][0]= vid ;
            x[i][1]= channelTitle ;
            x[i][2]= videodate;
      
          if(typeof vid != 'undefined'){ 
                 
              $.get("https://www.googleapis.com/youtube/v3/videos",
                   {
                        part: 'contentDetails, statistics',
                        id:   vid, 
                        key:  val
                    },

                    function(data) 
                    {
                        /*
                 var video = {
                                count: 0,           
                                get viewCount() {
                                      //     console.log('count has been requested: '+ this.count);
                                           return this.count;  
                                       },
                                    set viewCount(value) {
                                        //     console.log('value has been passed: '+ value);
                                             this.count = value;
                                       }
                                  };
                        */
                      video_details = data.items[0];
                    //  var duration = video_details.contentDetails.duration; 

                 //      video.viewCount = video_details.statistics.viewCount;
                       var vid2 = video_details.id;
                     //  debugger;
                     //  console.log('vid2 in data part= ' + vid2);
                     //   console.log('viewCount = ' +  video.viewCount);
                     
                       for (var k=0; k<x.length;k++){
                          console.log('vid = ' + x[k][0]);
                          if (x[k][0] == vid2) {
                             channelTitle = x[k][1];
                             videodate    = x[k][2];
                          }
                          console.log('channelTitle = ' + x[k][1]);
                          console.log('videodate= ' + x[k][2]);
                       }

                 
              stList += '<tr><td style="width:30%">'+
                '<a class="show" href="#" id="'+ vid2 + '" onclick="playVid(this);'+
                ' return false">'+ vid2 +'</a></td>'+
                '<td>'+ 
                'Published: ' + videodate + '<br>' + 
                'Duration: '  + moment.duration(video_details.contentDetails.duration).format('hh:mm:ss') + '<br>' + 
                'Channel: '   + channelTitle + '<br>' + 
                'Language: '  + videolang + '<br>' + 
                'Views: '     + video_details.statistics.viewCount; + '<br>' + 
                'Likes: '     + video_details.statistics.likeCount + '<br>' + 
                'Dislikes: '  + video_details.statistics.dislikeCount +
                '</td></tr>';
           
                 j = j + 1;
                 console.log('j = ' + j);
                 document.getElementById('list1').innerHTML = stList + '</tbody></table>';
                   });
              }
      }               
   //   document.getElementById('list1').innerHTML = stList + '</tbody></table>';
  }
  
  function playVid(thi){
      var st = 'https://www.youtube.com/embed/'+thi.id+'?autoplay=1&showinfo=0';
      document.getElementById('player').src = st; 
  }
