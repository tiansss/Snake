// set up the webGL environment
function setupWebGL() {
    // Get the image canvas, render an image in it
    var imageCanvas = document.getElementById("myImageCanvas"); // create a 2d canvas
     var cw = imageCanvas.width, ch = imageCanvas.height; 
     imageContext = imageCanvas.getContext("2d"); 
     var bkgdImage = new Image(); 
     bkgdImage.crossOrigin = "Anonymous";
     bkgdImage.src = "https://ncsucgclass.github.io/prog4/stars.jpg";
     bkgdImage.onload = function(){
         var iw = bkgdImage.width, ih = bkgdImage.height;
         imageContext.drawImage(bkgdImage,0,0,iw,ih,0,0,cw,ch);   
    } // end onload callback
   
    // create a webgl canvas and set it up
    var webGLCanvas = document.getElementById("myWebGLCanvas"); // create a webgl canvas
    gl = webGLCanvas.getContext("webgl"); // get a webgl object from it
    try {
      if (gl == null) {
        throw "unable to create gl context -- is your browser gl ready?";
      } else {
        //gl.clearColor(0.0, 0.0, 0.0, 1.0); // use black when we clear the frame buffer
        gl.clearDepth(1.0); // use max when we clear the depth buffer
        gl.enable(gl.DEPTH_TEST); // use hidden surface removal (with zbuffering)
      }
    } // end try
    
   
   catch(e) {
     console.log(e);
   } // end catch

} // end setupWebGL