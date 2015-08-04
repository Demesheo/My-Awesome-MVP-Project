$(document).ready(function(){
 //Creating our new default map centered at Telegraph Academy's coordinates	
 var map = new GMaps({
      div: '#map',
      lat: 37.877, 
      lng: -122.27,
      zoom: 17,
      width: '960px',
      height: '500px'
  });

 var pastPosts;
 var allPosts = [];

 var getPosts = function(){
 if(Lockr.get('posts') !== undefined){	
 	pastPosts = Lockr.get('posts');
  console.log("past posts : ", pastPosts);

 for(var i = 0; i < pastPosts.length; i++){
  map.addMarker(pastPosts[i]);
  $("#postarea").append("<div>"+pastPosts[i].infoWindow.content+"Sent from: ("+pastPosts[i].lat+", "+pastPosts[i].lng+")"+"</div>");
 };
};
};
//When we submit our text box, we want to run geolocate and post our location and message to the local storage
//Then we will perform a GET request to repopulate our map with the new post
//Use Gmaps geolocate function to show our current location
setTimeout( 
 GMaps.geolocate({
    success: function(position){
      map.setCenter(position.coords.latitude, position.coords.longitude);
      getPosts();
    },
    error: function(error){
      alert('Geolocation failed: '+error.message);
    },
    not_supported: function(){
      alert("Your browser does not support geolocation");
    }
  }), 500);
//End of map functions
//Begin user post function
    $("button").click(function(){
	var message = $('input').val();
    GMaps.geolocate({
     success: function(position){
     	var newPost = {
     		lat: position.coords.latitude,
     		lng: position.coords.longitude,
     		title: 'One of your posts.',
     		infoWindow: {
     			content: '<p>'+message+'</p>'
     		}
     	};
     	pastPosts.push(newPost);
     	Lockr.set('posts', pastPosts);
     	getPosts();
     	map.addMarker({
     		lat: position.coords.latitude,
     		lng: position.coords.longitude,
     		title: 'One of your posts.',
     		infoWindow: {
     			content: '<p>'+message+'</p>'
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
	});
});