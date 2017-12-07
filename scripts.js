var maxRes = 7; 
   
var val1 = 'AIzaSyAFV5dB';
var val2 = '0CKCkb7L3ddrZYVL9bxr4lB31s';
var val = val1 + '-' + val2;
  
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
        
          var vid = response.items[i].id.videoId; 
      
          var channelTitle  =  response.items[i].snippet.channelTitle;
        
          var videodatetime = response.items[i].snippet.publishedAt; // date time published
          var videodate = videodatetime.substr(0, 10);
        
          var videolang = response.items[i].snippet.defaultAudioLanguage;
        //  console.log('Language: ' + videolang + 'channelTitle: ' + channelTitle);
         
         var video_details;
                      
         $.get("https://www.googleapis.com/youtube/v3/videos",
                   {
                        part: 'contentDetails, statistics',
                        id:   vid, 
                        key:  val
                    },

                    function(data) 
                    {
                      video_details = data.items[0];
                    //  var duration = video_details.contentDetails.duration; 

                       var viewCount = video_details.statistics.viewCount;
                    //  return viewCount;
                      $( "p" ).text(viewCount );
                      console.log(video_details);
                     } 
                  );
  
        
          if(typeof vid != 'undefined'){    
              stList += '<tr><td style="width:30%">'+
                '<a class="show" href="#" id="'+ vid + '" onclick="playVid(this);'+
                ' return false">'+ vid +'</a></td>'+
                '<td>'+ 'Published: ' + videodate + ' / Channel: ' + channelTitle + ' / Language: ' + videolang +
                ' / Views: ' + video_details.statistics.viewCount +
                '</td></tr>';
               }
   
      }               

      document.getElementById('list1').innerHTML = stList + '</tbody></table>';
  }
  
  function playVid(thi){
      var st = 'https://www.youtube.com/embed/'+thi.id+'?autoplay=1&showinfo=0';
      document.getElementById('player').src = st; 
  }
