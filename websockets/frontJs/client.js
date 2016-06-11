var socket = io.connect();

preloadImages(imgArray);

socket.on('img', function (data) {
  changeImage(data);
});

var changeImage = function (list ) {
  var div = $('#image-div');
  var image = list;
  div.empty();
  div.prepend($('<img>',{id:'theImg',src: image}).width(screen.width));
};
