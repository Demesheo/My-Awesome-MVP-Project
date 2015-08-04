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

 map.setContextMenu({
  control: 'map',
  options: [{
    title: 'Show Location',
    name: 'show_location',
    action: function(e) {
      alert(""+e.latLng.lat()+", "+e.latLng.lng()+"");
    }
  }]
});



//Random post generator, only for demo purposes
var randomElement = function(array){
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};
var opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
var verbs = ['drank', 'drunk', 'deployed', 'got', 'developed', 'built', 'invented', 'experienced', 'fought off', 'hardened', 'enjoyed', 'developed', 'consumed', 'debunked', 'drugged', 'doped', 'made', 'wrote', 'saw'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
var nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];

var randomMessage = function(){
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns)].join(' ');
};

//Defining our random post generator function
var randomPostGenerator = function(){
  var latitude = chance.floating({min: 37.876088776, max: 37.879891125, fixed: 9});
  var longitude = chance.floating({min: -122.273454666, max: -122.264356613, fix: 9});
  var rndmmsg = randomMessage();

  map.addMarker({
    lat: latitude,
    lng: longitude,
    title: 'One of your posts.',
    infoWindow: {
      content: '<p>'+rndmmsg+'</p>'
    }
  });
  $("#postarea").append("<div>"+'<p>'+rndmmsg+'</p>'+"Sent from: ("+latitude+", "+longitude+")"+"</div>");
}; 

//Invoking it a short period of time after our geolocation and past posts loads
setTimeout(function(){
  for(var i = 0; i < 16; i++){
    randomPostGenerator();  
  }}, 1500);

//End of Random post generator

var pastPosts;

var getPosts = function(){
 if(Lockr.get('posts') !== undefined){	
 	pastPosts = Lockr.get('posts');


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