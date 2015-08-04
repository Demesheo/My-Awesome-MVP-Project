$(document).ready(function(){
 //Creating our new map at Telegraph Academy's coordinates	
 var map = new GMaps({
      div: '#map',
      lat: 37.878012, 
      lng: -122.269621,
      width: '1000px',
      height: '500px'
  });

 //We want to perform a GET request to get all of our old geolocs and messages from the server
 //We then want to addMarkers for each geoloc from the GET response with corresponding messages

 //Geolocate will run each time the page is opened or on the click of a button
 //With each time we run geolocate, we want to open a text box to input a message
 //When we submit our text box, we want to post our location and message to the server
 	//On success we want an alert to inform user that post was saved 
 	//Then we will perform a GET request to repopulate our map with the new post


 //Use Gmaps geolocate function to show our current location
 GMaps.geolocate({
    success: function(position){
      map.setCenter(position.coords.latitude, position.coords.longitude);


      map.addMarker({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        title: 'You are here.',
        infoWindow: {
          content: '<p>You are here!</p>'
        }
      });
    },
    error: function(error){
      alert('Geolocation failed: '+error.message);
    },
    not_supported: function(){
      alert("Your browser does not support geolocation");
    }
  });
//End of map functions





});