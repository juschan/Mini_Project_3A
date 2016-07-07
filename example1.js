$(document).ready(function () {

console.clear()

function reload() {
  $.get('http://api.doughnuts.ga/doughnuts')
    .done(function(data){
      console.log("Received the data")
      $('#main').html('')
      data.forEach( function(datum) {
        $('#main').append('<li>' + datum.flavor + ' - '  + datum.style + '</li>')
      })
      
    }).fail(function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown)
    });
}


$('#refresh').click(function(){
  reload();
})

$("#myForm").on( "submit", function( event ) {
  event.preventDefault();
  var data = $( this ).serialize()
  console.log( data );
  
  $.ajax({
    type: "POST",
    url: 'http://api.doughnuts.ga/doughnuts',
    data: data
  }).done(function(response){
      console.log(response)
      $('#main').append('<li>' + response.myInput + ' - '  + response.myInput2 + ' <button>DELETE</button></li>')
  }).fail(function(jqXHR, textStatus, errorThrown){
    console.log(errorThrown)
  });
  
});

});