var socket = io.connect('http://localhost:3000');

preloadImages([
  'http://localhost:3000/img/DeathtoStock_NotStock.jpg',
  'http://localhost:3000/img/DeathtoStock_NotStock2.jpg',
  'http://localhost:3000/img/DeathtoStock_NotStock3.jpg',
  'http://localhost:3000/img/DeathtoStock_NotStock4.jpg',
  'http://localhost:3000/img/DeathtoStock_NotStock5.jpg',
  'http://localhost:3000/img/DeathtoStock_NotStock6.jpg',
  'http://localhost:3000/img/DeathtoStock_NotStock7.jpg',
  'http://localhost:3000/img/DeathtoStock_NotStock8.jpg'
]);


socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});


var list = preloadImages.list;

var changeImage = function (list) {
  var image = list[Math.floor(Math.random() * list.length)];
  $('#image-div').prepend($('<img>',{id:'theImg',src: image.src}).addClass('full'));
};

changeImage(list);
