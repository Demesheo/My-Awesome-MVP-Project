$(document).ready(function(){
 //Creating our new map at Telegraph Academy's coordinates	
 var map = new GMaps({
      div: '#map',
      lat: 37.878012, 
      lng: -122.269621,
      width: '1000px',
      height: '500px'
  });



 //We want to connect to our mongo database, using express
 var pastPosts;
 var allPosts = [];

 var getPosts = function(){

 if(Lockr.get('posts')!==undefined){	
 	pastPosts = Lockr.get('posts');
 	allPosts.push(pastPosts)
 //We want to perform a GET request to get all of our stored geolocs and messages from the server
 //We then want to addMarkers for each geoloc from the GET response with corresponding messages to populate our map
 if(pastPosts.length){
 	for(var i = 0; i < pastPosts.length; i++){
 		map.addMarker(pastPosts[i]);
 	};
 };
};
};


 //When we submit our text box, we want to run geolocate and post our location and message to the local storage
 	//Then we will perform a GET request to repopulate our map with the new post
 //Use Gmaps geolocate function to show our current location
 GMaps.geolocate({
    success: function(position){
      map.setCenter(position.coords.latitude, position.coords.longitude);
      getPosts();
      // map.addMarker({
      //   lat: position.coords.latitude,
      //   lng: position.coords.longitude,
      //   title: 'You are here.'
      //   // infoWindow: {
      //   //   content: '<p>You are here!</p>'
      //   // }
      // });
    },
    error: function(error){
      alert('Geolocation failed: '+error.message);
    },
    not_supported: function(){
      alert("Your browser does not support geolocation");
    }
  });
//End of map functions
//Begin user functions

    
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

     	allPosts.push(newPost);
     	Lockr.set('posts', allPosts);
     	getPosts();
     	// map.addMarker({
     	// 	lat: position.coords.latitude,
     	// 	lng: position.coords.longitude,
     	// 	title: 'One of your posts.',
     	// 	infoWindow: {
     	// 		content: '<p>'+message+'</p>'
     	// 	}
     	// });
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