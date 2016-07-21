$(document).ready(function() {

  var serverURL = 'https://project3pockety.herokuapp.com/'

  // populate resource cards
  $('#submit').click(function() {
    $.ajax({
      url: serverURL + 'allresources',
      type: 'GET',
      success: function (response) {

        var all_tags = {}
        //loop through all responses, then tags - arrays within arrays
        for (var i=0; i<response.length; i++)
          for(var j=0; j<response[i].tags.length; j++) {
            var key = response[i].tags[j]
            if( all_tags.hasOwnProperty(key) ) {
              all_tags[key] += 1
            } else {
              all_tags[key] = 1
            }
          }            

          //transform from object to array
          var tags = [];
          for (var key in all_tags) {
              if (all_tags.hasOwnProperty(key)) {
                  tags.push([key, all_tags[key]]);
              }
          }

         //adjust relative value/size of each tag
         var list = tags.map(function(word) {
          return [word[0], Math.round(word[1]*20)]
        })

        WordCloud(document.getElementById("cloud"), {list: list})

      }, // end success action
      error: function (xhr, ajaxOptions, thrownError) {
        console.log("Error in ajax call")
      }
    }) // end ajax call
  }) // end function

  //other listeners
  $('#cloud').click(function(event) {
    if(event.target.nodeName === "SPAN"){
      var tag = event.target.textContent
      var client = algoliasearch('WKDTL1UBEY', '43e9aa33004f1d6800bc160e9144a9df');
      var index = client.initIndex('stash');
      
      //search for articles in algoria
      index.search(tag, function searchDone(err, content) {
        let hit_count = content.hits.length
        $('#details').text('')
        for(var i=0; i< hit_count; i++) {
            $('#details').append('<li><a href="' + content.hits[i].url + '">' + content.hits[i].title + '</a></li>') 
        }
      })
    }
  })


}) // end document ready