function preloadImages(array) {
  var list = preloadImages.list || [];
  for (var i = 0; i < array.length; i++) {
    var img = new Image();
    img.onload = function() {
        var index = list.indexOf(this);
        if (index !== -1) {
            // remove image from the array once it's loaded
            // for memory consumption reasons
            list.splice(index, 1);
        }
    };
    img.src = array[i];
    list.push(img);
  }
}
