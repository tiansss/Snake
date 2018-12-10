/* GLOBAL CONSTANTS AND VARIABLES */
var isTexture;
var isTextureULoc;
var foodPos = [17,10,0];
var inputTriangles = 
[
    //grass background
    {
      "material": {"ambient": [0.1,0.1,0.1], "diffuse": [0.6,0.65,0.5], "specular": [0.1,0.1,0.1], "n":17, "alpha": 1.0, "texture": undefined}, 
      "vertices": [[1, 19, 0],[19, 19, 0],[19,1,0],[1,1,0]],
      "normals": [[0, 0, 1],[0, 0, 1],[0, 0, 1],[0, 0, 1]],
      "uvs": [[0,1], [1,1], [1,0],[0,0]],
      "triangles": [[0,1,2],[2,3,0]]
    },

    //left wall
    {
        "material": {"ambient": [0.1,0.1,0.1], "diffuse": [0.7,0.4,0.4], "specular": [0.3,0.3,0.3], "n":17, "alpha": 1.0, "texture": undefined}, 
        "vertices": [[0, 20, 1],[1, 20, 1],[1,0,1],[0,0,1],
                     [1,20,1],[1,20,0],[1,0,0],[1,0,1],
                     [0,20,0],[1,20,0],[1,0,0],[0,0,0],
                     [0,20,1],[0,0,1],[0,0,0],[0,20,0],
                     [0,20,1],[0,20,0],[1,20,0],[1,20,1],
                     [0,0,1],[1,0,1],[1,0,0],[0,0,0]],
        "normals": [[0, 0, 1],[0, 0, 1],[0, 0, 1],[0, 0, 1],
                    [1,0,0],[1,0,0],[1,0,0],[1,0,0],
                    [0,0,-1],[0,0,-1],[0,0,-1],[0,0,-1],
                    [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0],
                    [0,1,0],[0,1,0],[0,1,0],[0,1,0],
                    [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0]],
        "uvs": [[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0]],
        "triangles": [[0,1,2],[2,3,0],[4,5,6],[6,7,4],[8,9,10],[10,11,8],[12,13,14],[14,15,12],[16,17,18],[18,19,16],[20,21,22],[22,23,20]]
    },

    //upper wall
    {
        "material": {"ambient": [0.1,0.1,0.1], "diffuse": [0.7,0.4,0.4], "specular": [0.3,0.3,0.3], "n":17, "alpha": 1.0, "texture": undefined}, 
        "vertices": [[1,20,1],[19,20,1],[19,19,1],[1,19,1],
                    [19,19,1],[19,20,1],[19,20,0],[19,19,0],
                    [1,20,0],[19,20,0],[19,19,0],[1,19,0],
                    [1,19,1],[1,19,0],[1,20,0],[1,20,1],
                    [19,20,1],[19,20,0],[1,20,0],[1,20,1],
                    [1,19,1],[19,19,1],[19,19,0],[1,19,0]],
        "normals": [[0, 0, 1],[0, 0, 1],[0, 0, 1],[0, 0, 1],
                    [1,0,0],[1,0,0],[1,0,0],[1,0,0],
                    [0,0,-1],[0,0,-1],[0,0,-1],[0,0,-1],
                    [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0],
                    [0,1,0],[0,1,0],[0,1,0],[0,1,0],
                    [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0]],
        "uvs": [[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0]],
        "triangles": [[0,1,2],[2,3,0],[4,5,6],[6,7,4],[8,9,10],[10,11,8],[12,13,14],[14,15,12],[16,17,18],[18,19,16],[20,21,22],[22,23,20]]
    },

    //right wall
    {
        "material": {"ambient": [0.1,0.1,0.1], "diffuse": [0.7,0.4,0.4], "specular": [0.3,0.3,0.3], "n":17, "alpha": 1.0, "texture": undefined}, 
        "vertices": [[19,20,1],[20,20,1],[20,0,1],[19,0,1],
                     [20,0,1],[20,20,1],[20,20,0],[20,0,0],
                     [20,20,0],[19,20,0],[19,0,0],[20,0,0],
                     [19,20,1],[19,0,1],[19,0,0],[19,20,0],
                     [20,20,1],[19,20,1],[19,20,0],[20,20,0],
                     [19,0,1],[20,0,1],[19,0,0],[20,0,0]],
        "normals": [[0, 0, 1],[0, 0, 1],[0, 0, 1],[0, 0, 1],
                    [1,0,0],[1,0,0],[1,0,0],[1,0,0],
                    [0,0,-1],[0,0,-1],[0,0,-1],[0,0,-1],
                    [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0],
                    [0,1,0],[0,1,0],[0,1,0],[0,1,0],
                    [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0]],
        "uvs": [[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0]],
        "triangles": [[0,1,2],[2,3,0],[4,5,6],[6,7,4],[8,9,10],[10,11,8],[12,13,14],[14,15,12],[16,17,18],[18,19,16],[20,21,22],[22,23,20]]
    },

    //down wall
    {
        "material": {"ambient": [0.1,0.1,0.1], "diffuse": [0.7,0.4,0.4], "specular": [0.3,0.3,0.3], "n":17, "alpha": 1.0, "texture": undefined}, 
        "vertices": [[1,1,1],[19,1,1],[19,0,1],[1,0,1],
                    [19,0,1],[19,1,1],[19,1,0],[19,0,0],
                    [1,0,0],[19,0,0],[19,1,0],[1,1,0],
                    [1,1,1],[1,0,1],[1,0,0],[1,1,0],
                    [1,1,1],[1,1,0],[19,1,0],[19,1,1],
                    [1,0,1],[19,0,1],[19,0,0],[1,0,0]],
        "normals": [[0, 0, 1],[0, 0, 1],[0, 0, 1],[0, 0, 1],
                    [1,0,0],[1,0,0],[1,0,0],[1,0,0],
                    [0,0,-1],[0,0,-1],[0,0,-1],[0,0,-1],
                    [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0],
                    [0,1,0],[0,1,0],[0,1,0],[0,1,0],
                    [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0]],
        "uvs": [[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0]],
        "triangles": [[0,1,2],[2,3,0],[4,5,6],[6,7,4],[8,9,10],[10,11,8],[12,13,14],[14,15,12],[16,17,18],[18,19,16],[20,21,22],[22,23,20]]
    },
  ]

dynamicTriangles = [
        //snake1
        {
            "material": {"ambient": [0.1,0.1,0.1], "diffuse": [0,1,0], "specular": [0.3,0.3,0.3], "n":17, "alpha": 1.0, "texture": undefined}, 
            "vertices": [[0, 1, 1],[1, 1, 1],[1,0,1],[0,0,1],
                         [1,1,1],[1,1,0],[1,0,0],[1,0,1],
                         [0,1,0],[1,1,0],[1,0,0],[0,0,0],
                         [0,1,1],[0,0,1],[0,0,0],[0,1,0],
                         [0,1,1],[0,1,0],[1,1,0],[1,1,1],
                         [0,0,1],[1,0,1],[1,0,0],[0,0,0]],
            "normals": [[0, 0, 1],[0, 0, 1],[0, 0, 1],[0, 0, 1],
                        [1,0,0],[1,0,0],[1,0,0],[1,0,0],
                        [0,0,-1],[0,0,-1],[0,0,-1],[0,0,-1],
                        [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0],
                        [0,1,0],[0,1,0],[0,1,0],[0,1,0],
                        [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0]],
            "uvs": [[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0]],
            "triangles": [[0,1,2],[2,3,0],[4,5,6],[6,7,4],[8,9,10],[10,11,8],[12,13,14],[14,15,12],[16,17,18],[18,19,16],[20,21,22],[22,23,20]]
        },
    
        //snake2
        {
            "material": {"ambient": [0.1,0.1,0.1], "diffuse": [1,0,0], "specular": [0.3,0.3,0.3], "n":17, "alpha": 1.0, "texture": undefined}, 
            "vertices": [[0, 1, 1],[1, 1, 1],[1,0,1],[0,0,1],
                         [1,1,1],[1,1,0],[1,0,0],[1,0,1],
                         [0,1,0],[1,1,0],[1,0,0],[0,0,0],
                         [0,1,1],[0,0,1],[0,0,0],[0,1,0],
                         [0,1,1],[0,1,0],[1,1,0],[1,1,1],
                         [0,0,1],[1,0,1],[1,0,0],[0,0,0]],
            "normals": [[0, 0, 1],[0, 0, 1],[0, 0, 1],[0, 0, 1],
                        [1,0,0],[1,0,0],[1,0,0],[1,0,0],
                        [0,0,-1],[0,0,-1],[0,0,-1],[0,0,-1],
                        [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0],
                        [0,1,0],[0,1,0],[0,1,0],[0,1,0],
                        [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0]],
            "uvs": [[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0]],
            "triangles": [[0,1,2],[2,3,0],[4,5,6],[6,7,4],[8,9,10],[10,11,8],[12,13,14],[14,15,12],[16,17,18],[18,19,16],[20,21,22],[22,23,20]]
        },
    
    
    
        //food
        {
            "material": {"ambient": [0.1,0.1,0.1], "diffuse": [1,1,0], "specular": [0.3,0.3,0.3], "n":17, "alpha": 1.0, "texture": undefined}, 
            "vertices": [[0, 1, 1],[1, 1, 1],[1,0,1],[0,0,1],
                         [1,1,1],[1,1,0],[1,0,0],[1,0,1],
                         [0,1,0],[1,1,0],[1,0,0],[0,0,0],
                         [0,1,1],[0,0,1],[0,0,0],[0,1,0],
                         [0,1,1],[0,1,0],[1,1,0],[1,1,1],
                         [0,0,1],[1,0,1],[1,0,0],[0,0,0]],
            "normals": [[0, 0, 1],[0, 0, 1],[0, 0, 1],[0, 0, 1],
                        [1,0,0],[1,0,0],[1,0,0],[1,0,0],
                        [0,0,-1],[0,0,-1],[0,0,-1],[0,0,-1],
                        [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0],
                        [0,1,0],[0,1,0],[0,1,0],[0,1,0],
                        [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0]],
            "uvs": [[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0],[0,0], [0,1], [1,1], [1,0]],
            "triangles": [[0,1,2],[2,3,0],[4,5,6],[6,7,4],[8,9,10],[10,11,8],[12,13,14],[14,15,12],[16,17,18],[18,19,16],[20,21,22],[22,23,20]]
        }
];

var snakes = [
    //player control snake
    {
        "body": [[4,6,0],[4,5,0],[4,4,0]],
        "direction": ["up","up"]
    },

    //computer snake
    {
        "body": [[6,8,0], [5,8,0], [4,8,0]],
        "direction": ["right", "right"]
    }
];

/* assignment specific globals */
const INPUT_TRIANGLES_URL = "https://ncsucgclass.github.io/prog4/triangles.json"; // triangles file loc
var defaultEye = vec3.fromValues(10,10,15); // default eye position in world space
var defaultCenter = vec3.fromValues(10,10,-1); // default view direction in world space
var defaultUp = vec3.fromValues(0,1,0); // default view up vector
var lightAmbient = vec3.fromValues(1,1,1); // default light ambient emission
var lightDiffuse = vec3.fromValues(1,1,1); // default light diffuse emission
var lightSpecular = vec3.fromValues(1,1,1); // default light specular emission
var lightPosition = vec3.fromValues(5,5,10); // default light position
var rotateTheta = Math.PI/50; // how much to rotate models by with each key press
var Modulate = true;
/* webgl and geometry data */
var gl = null; // the all powerful gl object. It's all here folks!
var numTriangleSets = 0; // how many triangle sets in input scene
var inputEllipsoids = []; // the ellipsoid data as loaded from input files
var numEllipsoids = 0; // how many ellipsoids in the input scene
var vertexBuffers = []; // this contains vertex coordinate lists by set, in triples
var normalBuffers = []; // this contains normal component lists by set, in triples
var uvBuffers = [];
var triSetSizes = []; // this contains the size of each triangle set
var triangleBuffers = []; // lists of indices into vertexBuffers by set, in triples
var viewDelta = 0; // how much to displace view with each key press
var transparent = [];

var dynamicVertexBuffers = []; // this contains vertex coordinate lists by set, in triples
var dynamicNormalBuffers = []; // this contains normal component lists by set, in triples
var dynamicUvBuffers = [];
var dynamicTriangleBuffers = []; // lists of indices into vertexBuffers by set, in triples

/* shader parameter locations */
var vPosAttribLoc; // where to put position for vertex shader
var tPosAttribLoc; // where to put position for vertex shader
var vNormAttribLoc;
var mMatrixULoc; // where to put model matrix for vertex shader
var pvmMatrixULoc; // where to put project model view matrix for vertex shader
var ambientULoc; // where to put ambient reflecivity for fragment shader
var diffuseULoc; // where to put diffuse reflecivity for fragment shader
var specularULoc; // where to put specular reflecivity for fragment shader
var shininessULoc; // where to put specular exponent for fragment shader
var alphaULoc;//where to put transparency alpha for fragment shader
var ModulateULoc;
/* interaction variables */
var Eye = vec3.clone(defaultEye); // eye position in world space
var Center = vec3.clone(defaultCenter); // view direction in world space
var Up = vec3.clone(defaultUp); // view up vector in world space

// ASSIGNMENT HELPER FUNCTIONS



// does stuff when keys are pressed
function handleKeyDown(event) {
    
    const modelEnum = {TRIANGLES: "triangles", ELLIPSOID: "ellipsoid"}; // enumerated model type
    const dirEnum = {NEGATIVE: -1, POSITIVE: 1}; // enumerated rotation direction
    
    function highlightModel(modelType,whichModel) {
        if (handleKeyDown.modelOn != null)
            handleKeyDown.modelOn.on = false;
        handleKeyDown.whichOn = whichModel;
        if (modelType == modelEnum.TRIANGLES)
            handleKeyDown.modelOn = inputTriangles[whichModel]; 
        else
            handleKeyDown.modelOn = inputEllipsoids[whichModel]; 
        handleKeyDown.modelOn.on = true; 
    } // end highlight model
    
    function translateModel(offset) {
        if (handleKeyDown.modelOn != null)
            vec3.add(handleKeyDown.modelOn.translation,handleKeyDown.modelOn.translation,offset);
    } // end translate model

    function rotateModel(axis,direction) {
        if (handleKeyDown.modelOn != null) {
            var newRotation = mat4.create();

            mat4.fromRotation(newRotation,direction*rotateTheta,axis); // get a rotation matrix around passed axis
            vec3.transformMat4(handleKeyDown.modelOn.xAxis,handleKeyDown.modelOn.xAxis,newRotation); // rotate model x axis tip
            vec3.transformMat4(handleKeyDown.modelOn.yAxis,handleKeyDown.modelOn.yAxis,newRotation); // rotate model y axis tip
        } // end if there is a highlighted model
    } // end rotate model
    
    // set up needed view params
    var lookAt = vec3.create(), viewRight = vec3.create(), temp = vec3.create(); // lookat, right & temp vectors
    lookAt = vec3.normalize(lookAt,vec3.subtract(temp,Center,Eye)); // get lookat vector
    viewRight = vec3.normalize(viewRight,vec3.cross(temp,lookAt,Up)); // get view right vector
    
    // highlight static variables
    handleKeyDown.whichOn = handleKeyDown.whichOn == undefined ? -1 : handleKeyDown.whichOn; // nothing selected initially
    handleKeyDown.modelOn = handleKeyDown.modelOn == undefined ? null : handleKeyDown.modelOn; // nothing selected initially

    switch (event.code) {
        case "ArrowUp": 
            if (snakes[0].direction[0] == "left" || snakes[0].direction[0] == "right" )
                snakes[0].direction[1] = "up";
            break;
        case "ArrowDown":
            if (snakes[0].direction[0] == "left" || snakes[0].direction[0] == "right" )
                snakes[0].direction[1] = "down";
            break;
        case "ArrowRight": 
            if (snakes[0].direction[0] == "up" || snakes[0].direction[0] == "down" )
                snakes[0].direction[1] = "right";
            break;
        case "ArrowLeft": 
            if (snakes[0].direction[0] == "up" || snakes[0].direction[0] == "down" )
                snakes[0].direction[1] = "left";
            break;
            
    } // end switch
} // end handleKeyDown

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

// read models in, load them into webgl buffers
function loadModels() {

    try {
        if (inputTriangles == String.null)
            throw "Unable to load triangles file!";
        else {
            var whichSetVert; // index of vertex in current triangle set
            var whichSetTri; // index of triangle in current triangle set
            var vtxToAdd; // vtx coords to add to the coord array
            var uvToAdd;
            var normToAdd; // vtx normal to add to the coord array
            var triToAdd; // tri indices to add to the index array
            var maxCorner = vec3.fromValues(Number.MIN_VALUE,Number.MIN_VALUE,Number.MIN_VALUE); // bbox corner
            var minCorner = vec3.fromValues(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE); // other corner
        
            // process each triangle set to load webgl vertex and triangle buffers
            numTriangleSets = inputTriangles.length; // remember how many tri sets
            for (var whichSet=0; whichSet<numTriangleSets; whichSet++) { // for each tri set
                // set up hilighting, modeling translation and rotation
                inputTriangles[whichSet].center = vec3.fromValues(0,0,0);  // center point of tri set
                inputTriangles[whichSet].on = false; // not highlighted
                inputTriangles[whichSet].translation = vec3.fromValues(0,0,0); // no translation
                inputTriangles[whichSet].xAxis = vec3.fromValues(1,0,0); // model X axis
                inputTriangles[whichSet].yAxis = vec3.fromValues(0,1,0); // model Y axis 

                // set up the vertex and normal arrays, define model center and axes
                inputTriangles[whichSet].glVertices = []; // flat coord list for webgl
                inputTriangles[whichSet].glNormals = []; // flat normal list for webgl
                inputTriangles[whichSet].glUVs = []; // flat uv list for webgl
                inputTriangles[whichSet].imageReady = false; // whether its image is loaded or not
                var numVerts = inputTriangles[whichSet].vertices.length; // num vertices in tri set
                for (whichSetVert=0; whichSetVert<numVerts; whichSetVert++) { // verts in set
                    vtxToAdd = inputTriangles[whichSet].vertices[whichSetVert]; // get vertex to add
                    normToAdd = inputTriangles[whichSet].normals[whichSetVert]; // get normal to add
                    //if (inputTriangles[whichSet].texture != undefined)
                        uvToAdd = inputTriangles[whichSet].uvs[whichSetVert];//get uv coordinates to add
                    inputTriangles[whichSet].glVertices.push(vtxToAdd[0],vtxToAdd[1],vtxToAdd[2]); // put coords in set coord list
                    inputTriangles[whichSet].glNormals.push(normToAdd[0],normToAdd[1],normToAdd[2]); // put normal in set coord list
                    //console.log(inputTriangles[whichSet]);
                    //if (inputTriangles[whichSet].texture != undefined)
                        inputTriangles[whichSet].glUVs.push(uvToAdd[0],uvToAdd[1]); // put uvs in set coord list
                    vec3.max(maxCorner,maxCorner,vtxToAdd); // update world bounding box corner maxima
                    vec3.min(minCorner,minCorner,vtxToAdd); // update world bounding box corner minima
                    vec3.add(inputTriangles[whichSet].center,inputTriangles[whichSet].center,vtxToAdd); // add to ctr sum
                } // end for vertices in set
                vec3.scale(inputTriangles[whichSet].center,inputTriangles[whichSet].center,1/numVerts); // avg ctr sum

                // send the vertex coords and normals to webGL
                vertexBuffers[whichSet] = gl.createBuffer(); // init empty webgl set vertex coord buffer
                gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffers[whichSet]); // activate that buffer
                gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(inputTriangles[whichSet].glVertices),gl.STATIC_DRAW); // data in
                normalBuffers[whichSet] = gl.createBuffer(); // init empty webgl set normal component buffer
                gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffers[whichSet]); // activate that buffer
                gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(inputTriangles[whichSet].glNormals),gl.STATIC_DRAW); // data in
                uvBuffers[whichSet] = gl.createBuffer(); // init empty webgl set uv buffer
                gl.bindBuffer(gl.ARRAY_BUFFER,uvBuffers[whichSet]); // activate that buffer
                gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(inputTriangles[whichSet].glUVs),gl.STATIC_DRAW); // data in

                if(inputTriangles[whichSet].material.alpha != 1){
                    transparent.push(inputTriangles[whichSet]);
                }else{
                    transparent.push(1);
                }

                // set up the triangle index array, adjusting indices across sets
                inputTriangles[whichSet].glTriangles = []; // flat index list for webgl
                triSetSizes[whichSet] = inputTriangles[whichSet].triangles.length; // number of tris in this set
                for (whichSetTri=0; whichSetTri<triSetSizes[whichSet]; whichSetTri++) {
                    triToAdd = inputTriangles[whichSet].triangles[whichSetTri]; // get tri to add
                    inputTriangles[whichSet].glTriangles.push(triToAdd[0],triToAdd[1],triToAdd[2]); // put indices in set list
                } // end for triangles in set

                // send the triangle indices to webGL
                triangleBuffers.push(gl.createBuffer()); // init empty triangle index buffer
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleBuffers[whichSet]); // activate that buffer
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(inputTriangles[whichSet].glTriangles),gl.STATIC_DRAW); // data in

            } // end for each triangle set 
        	var temp = vec3.create();
        	viewDelta = vec3.length(vec3.subtract(temp,maxCorner,minCorner)) / 100; // set global
        } // end if triangle file loaded
    } // end try 
    
    catch(e) {
        console.log(e);
    } // end catch
} // end load models

function loadDnamicyModels() {

    try {
        if (dynamicTriangles == String.null)
            throw "Unable to load triangles file!";
        else {
            var whichSetVert; // index of vertex in current triangle set
            var whichSetTri; // index of triangle in current triangle set
            var vtxToAdd; // vtx coords to add to the coord array
            var uvToAdd;
            var normToAdd; // vtx normal to add to the coord array
            var triToAdd; // tri indices to add to the index array
            var maxCorner = vec3.fromValues(Number.MIN_VALUE,Number.MIN_VALUE,Number.MIN_VALUE); // bbox corner
            var minCorner = vec3.fromValues(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE); // other corner
        
            // process each triangle set to load webgl vertex and triangle buffers
            for (var whichSet=0; whichSet<dynamicTriangles.length; whichSet++) { // for each tri set
                // set up hilighting, modeling translation and rotation
                dynamicTriangles[whichSet].center = vec3.fromValues(0,0,0);  // center point of tri set
                dynamicTriangles[whichSet].on = false; // not highlighted
                dynamicTriangles[whichSet].translation = vec3.fromValues(0,0,0); // no translation
                dynamicTriangles[whichSet].xAxis = vec3.fromValues(1,0,0); // model X axis
                dynamicTriangles[whichSet].yAxis = vec3.fromValues(0,1,0); // model Y axis 

                // set up the vertex and normal arrays, define model center and axes
                dynamicTriangles[whichSet].glVertices = []; // flat coord list for webgl
                dynamicTriangles[whichSet].glNormals = []; // flat normal list for webgl
                dynamicTriangles[whichSet].glUVs = []; // flat uv list for webgl
                dynamicTriangles[whichSet].imageReady = false; // whether its image is loaded or not
                var numVerts = dynamicTriangles[whichSet].vertices.length; // num vertices in tri set
                for (whichSetVert=0; whichSetVert<numVerts; whichSetVert++) { // verts in set
                    vtxToAdd = dynamicTriangles[whichSet].vertices[whichSetVert]; // get vertex to add
                    normToAdd = dynamicTriangles[whichSet].normals[whichSetVert]; // get normal to add
                    //if (dynamicTriangles[whichSet].texture != undefined)
                    uvToAdd = dynamicTriangles[whichSet].uvs[whichSetVert];//get uv coordinates to add
                    dynamicTriangles[whichSet].glVertices.push(vtxToAdd[0],vtxToAdd[1],vtxToAdd[2]); // put coords in set coord list
                    dynamicTriangles[whichSet].glNormals.push(normToAdd[0],normToAdd[1],normToAdd[2]); // put normal in set coord list
                    //console.log(dynamicTriangles[whichSet]);
                    //if (dynamicTriangles[whichSet].texture != undefined)
                    dynamicTriangles[whichSet].glUVs.push(uvToAdd[0],uvToAdd[1]); // put uvs in set coord list
                    vec3.max(maxCorner,maxCorner,vtxToAdd); // update world bounding box corner maxima
                    vec3.min(minCorner,minCorner,vtxToAdd); // update world bounding box corner minima
                    vec3.add(dynamicTriangles[whichSet].center,dynamicTriangles[whichSet].center,vtxToAdd); // add to ctr sum
                } // end for vertices in set
                vec3.scale(dynamicTriangles[whichSet].center,dynamicTriangles[whichSet].center,1/numVerts); // avg ctr sum

                // send the vertex coords and normals to webGL
                dynamicVertexBuffers[whichSet] = gl.createBuffer(); // init empty webgl set vertex coord buffer
                gl.bindBuffer(gl.ARRAY_BUFFER,dynamicVertexBuffers[whichSet]); // activate that buffer
                gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(dynamicTriangles[whichSet].glVertices),gl.STATIC_DRAW); // data in
                dynamicNormalBuffers[whichSet] = gl.createBuffer(); // init empty webgl set normal component buffer
                gl.bindBuffer(gl.ARRAY_BUFFER,dynamicNormalBuffers[whichSet]); // activate that buffer
                gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(dynamicTriangles[whichSet].glNormals),gl.STATIC_DRAW); // data in
                dynamicUvBuffers[whichSet] = gl.createBuffer(); // init empty webgl set uv buffer
                gl.bindBuffer(gl.ARRAY_BUFFER,dynamicUvBuffers[whichSet]); // activate that buffer
                gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(dynamicTriangles[whichSet].glUVs),gl.STATIC_DRAW); // data in

                if(dynamicTriangles[whichSet].material.alpha != 1){
                    transparent.push(dynamicTriangles[whichSet]);
                }else{
                    transparent.push(1);
                }

                // set up the triangle index array, adjusting indices across sets
                dynamicTriangles[whichSet].glTriangles = []; // flat index list for webgl
                // triSetSizes[whichSet] = dynamicTriangles[whichSet].triangles.length; // number of tris in this set
                for (whichSetTri=0; whichSetTri<12; whichSetTri++) {
                    triToAdd = dynamicTriangles[whichSet].triangles[whichSetTri]; // get tri to add
                    dynamicTriangles[whichSet].glTriangles.push(triToAdd[0],triToAdd[1],triToAdd[2]); // put indices in set list
                } // end for triangles in set

                // send the triangle indices to webGL
                dynamicTriangleBuffers.push(gl.createBuffer()); // init empty triangle index buffer
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, dynamicTriangleBuffers[whichSet]); // activate that buffer
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(dynamicTriangles[whichSet].glTriangles),gl.STATIC_DRAW); // data in

            } // end for each triangle set 
        	// var temp = vec3.create();
        	// viewDelta = vec3.length(vec3.subtract(temp,maxCorner,minCorner)) / 100; // set global
        } // end if triangle file loaded
    } // end try 
    
    catch(e) {
        console.log(e);
    } // end catch
} // end load models

// setup the webGL shaders
function setupShaders() {
    
    // define vertex shader in essl using es6 template strings
    var vShaderCode = `
        attribute vec3 aVertexPosition; // vertex position
        attribute vec3 aVertexNormal; // vertex normal
        
        uniform mat4 umMatrix; // the model matrix
        uniform mat4 upvmMatrix; // the project view model matrix
        
        varying vec3 vWorldPos; // interpolated world position of vertex
        varying vec3 vVertexNormal; // interpolated normal for frag shader

        attribute vec2 a_texcoord;
        varying vec2 v_texcoord;

        void main(void) {
            
            // vertex position
            vec4 vWorldPos4 = umMatrix * vec4(aVertexPosition, 1.0);
            vWorldPos = vec3(vWorldPos4.x,vWorldPos4.y,vWorldPos4.z);
            gl_Position = upvmMatrix * vec4(aVertexPosition, 1.0);

            // vertex normal (assume no non-uniform scale)
            vec4 vWorldNormal4 = umMatrix * vec4(aVertexNormal, 0.0);
            vVertexNormal = normalize(vec3(vWorldNormal4.x,vWorldNormal4.y,vWorldNormal4.z)); 
        
            v_texcoord = a_texcoord;
        }
    `;
    
    // define fragment shader in essl using es6 template strings
    var fShaderCode = `
        precision mediump float; // set float to medium precision

        // eye location
        uniform vec3 uEyePosition; // the eye's position in world
        
        // light properties
        uniform vec3 uLightAmbient; // the light's ambient color
        uniform vec3 uLightDiffuse; // the light's diffuse color
        uniform vec3 uLightSpecular; // the light's specular color
        uniform vec3 uLightPosition; // the light's position
        
        // material properties
        uniform vec3 uAmbient; // the ambient reflectivity
        uniform vec3 uDiffuse; // the diffuse reflectivity
        uniform vec3 uSpecular; // the specular reflectivity
        uniform float uShininess; // the specular exponent
        uniform float uAlpha;//the transparency alpha
        uniform bool Modulate;  
        uniform bool isTexture;
        // geometry properties
        varying vec3 vWorldPos; // world xyz of fragment
        varying vec3 vVertexNormal; // normal of fragment
      
        varying vec2 v_texcoord;

        //the texture
        uniform sampler2D u_texture;

        void main(void) {
            
            // diffuse term
            vec3 normal = normalize(vVertexNormal); 
            vec3 light = normalize(uLightPosition - vWorldPos);
            float lambert = max(0.0,dot(normal,light));
            
            
            // specular term
            vec3 eye = normalize(uEyePosition - vWorldPos);
            vec3 halfVec = normalize(light+eye);
            float ndotLight = 2.0*dot(normal, light);
            vec3 reflectVec = normalize(ndotLight*normal - light);
            float highlight = 0.0;
           	highlight = pow(max(0.0,dot(normal,halfVec)),uShininess); //Bling_Phong

            //replace
            vec3 ambient = uLightAmbient;
            vec3 diffuse = uLightDiffuse*lambert; // diffuse term
            vec3 specular = uLightSpecular*highlight; // specular term
            //modulate
            if (Modulate){
                ambient = uAmbient*uLightAmbient; // ambient term
                diffuse = uDiffuse*uLightDiffuse*lambert; // diffuse term
                specular = uSpecular*uLightSpecular*highlight; // specular term
            }
            
            
            // combine to output color
            vec3 colorOut = ambient + diffuse + specular; // no specular yet
            if (isTexture){
                gl_FragColor = vec4(texture2D(u_texture, v_texcoord).rgb * colorOut, uAlpha * texture2D(u_texture, v_texcoord).a);
            }
            else {
                gl_FragColor = vec4(colorOut, 1.0); 
            }
           
            
        }
    `;
    
    try {
        var fShader = gl.createShader(gl.FRAGMENT_SHADER); // create frag shader
        gl.shaderSource(fShader,fShaderCode); // attach code to shader
        gl.compileShader(fShader); // compile the code for gpu execution

        var vShader = gl.createShader(gl.VERTEX_SHADER); // create vertex shader
        gl.shaderSource(vShader,vShaderCode); // attach code to shader
        gl.compileShader(vShader); // compile the code for gpu execution
            
        if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) { // bad frag shader compile
            throw "error during fragment shader compile: " + gl.getShaderInfoLog(fShader);  
            gl.deleteShader(fShader);
        } else if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) { // bad vertex shader compile
            throw "error during vertex shader compile: " + gl.getShaderInfoLog(vShader);  
            gl.deleteShader(vShader);
        } else { // no compile errors
            var shaderProgram = gl.createProgram(); // create the single shader program
            gl.attachShader(shaderProgram, fShader); // put frag shader in program
            gl.attachShader(shaderProgram, vShader); // put vertex shader in program
            gl.linkProgram(shaderProgram); // link program into gl context

            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) { // bad program link
                throw "error during shader program linking: " + gl.getProgramInfoLog(shaderProgram);
            } else { // no shader program link errors
                gl.useProgram(shaderProgram); // activate shader program (frag and vert)
                
                // locate and enable vertex attributes
                vPosAttribLoc = gl.getAttribLocation(shaderProgram, "aVertexPosition"); // ptr to vertex pos attrib
                gl.enableVertexAttribArray(vPosAttribLoc); // connect attrib to array
                vNormAttribLoc = gl.getAttribLocation(shaderProgram, "aVertexNormal"); // ptr to vertex normal attrib
                gl.enableVertexAttribArray(vNormAttribLoc); // connect attrib to array
                tPosAttribLoc = gl.getAttribLocation(shaderProgram, "a_texcoord"); // ptr to vertex pos attrib
                gl.enableVertexAttribArray(tPosAttribLoc); // connect attrib to array
                
                // locate vertex uniforms
                mMatrixULoc = gl.getUniformLocation(shaderProgram, "umMatrix"); // ptr to mmat
                pvmMatrixULoc = gl.getUniformLocation(shaderProgram, "upvmMatrix"); // ptr to pvmmat
                
                // locate fragment uniforms
                var eyePositionULoc = gl.getUniformLocation(shaderProgram, "uEyePosition"); // ptr to eye position
                var lightAmbientULoc = gl.getUniformLocation(shaderProgram, "uLightAmbient"); // ptr to light ambient
                var lightDiffuseULoc = gl.getUniformLocation(shaderProgram, "uLightDiffuse"); // ptr to light diffuse
                var lightSpecularULoc = gl.getUniformLocation(shaderProgram, "uLightSpecular"); // ptr to light specular
                var lightPositionULoc = gl.getUniformLocation(shaderProgram, "uLightPosition"); // ptr to light position
                isTextureULoc = gl.getUniformLocation(shaderProgram, "isTexture");
                ambientULoc = gl.getUniformLocation(shaderProgram, "uAmbient"); // ptr to ambient
                diffuseULoc = gl.getUniformLocation(shaderProgram, "uDiffuse"); // ptr to diffuse
                specularULoc = gl.getUniformLocation(shaderProgram, "uSpecular"); // ptr to specular
                shininessULoc = gl.getUniformLocation(shaderProgram, "uShininess"); // ptr to shininess
                alphaULoc = gl.getUniformLocation(shaderProgram, "uAlpha"); //ptr to alpha
                ModulateULoc = gl.getUniformLocation(shaderProgram, "Modulate");
                // pass global constants into fragment uniforms
                gl.uniform3fv(eyePositionULoc,Eye); // pass in the eye's position
                gl.uniform3fv(lightAmbientULoc,lightAmbient); // pass in the light's ambient emission
                gl.uniform3fv(lightDiffuseULoc,lightDiffuse); // pass in the light's diffuse emission
                gl.uniform3fv(lightSpecularULoc,lightSpecular); // pass in the light's specular emission
                gl.uniform3fv(lightPositionULoc,lightPosition); // pass in the light's position
            } // end if no shader program link errors
        } // end if no compile errors
    } // end try 
    
    catch(e) {
        console.log(e);
    } // end catch
} // end setup shaders

// render the loaded model
function renderModels() {
    
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);

    // construct the model transform matrix, based on model state
    function makeModelTransform(currModel) {
        var zAxis = vec3.create(), sumRotation = mat4.create(), temp = mat4.create(), negCtr = vec3.create();

        // move the model to the origin
        mat4.fromTranslation(mMatrix,vec3.negate(negCtr,currModel.center)); 
        
        // scale for highlighting if needed
        if (currModel.on)
            mat4.multiply(mMatrix,mat4.fromScaling(temp,vec3.fromValues(1.2,1.2,1.2)),mMatrix); // S(1.2) * T(-ctr)
        
        // rotate the model to current interactive orientation
        vec3.normalize(zAxis,vec3.cross(zAxis,currModel.xAxis,currModel.yAxis)); // get the new model z axis
        mat4.set(sumRotation, // get the composite rotation
            currModel.xAxis[0], currModel.yAxis[0], zAxis[0], 0,
            currModel.xAxis[1], currModel.yAxis[1], zAxis[1], 0,
            currModel.xAxis[2], currModel.yAxis[2], zAxis[2], 0,
            0, 0,  0, 1);
        mat4.multiply(mMatrix,sumRotation,mMatrix); // R(ax) * S(1.2) * T(-ctr)
        
        // translate back to model center
        mat4.multiply(mMatrix,mat4.fromTranslation(temp,currModel.center),mMatrix); // T(ctr) * R(ax) * S(1.2) * T(-ctr)

        // translate model to current interactive orientation
        mat4.multiply(mMatrix,mat4.fromTranslation(temp,currModel.translation),mMatrix); // T(pos)*T(ctr)*R(ax)*S(1.2)*T(-ctr)
        
    } // end make model transform
    
    // var hMatrix = mat4.create(); // handedness matrix
    var pMatrix = mat4.create(); // projection matrix
    var vMatrix = mat4.create(); // view matrix
    var mMatrix = mat4.create(); // model matrix
    var pvMatrix = mat4.create(); // hand * proj * view matrices
    var pvmMatrix = mat4.create(); // hand * proj * view * model matrices
    
    //window.requestAnimationFrame(renderModels); // set up frame render callback
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // clear frame/depth buffers
    
    // set up projection and view
    // mat4.fromScaling(hMatrix,vec3.fromValues(-1,1,1)); // create handedness matrix
    mat4.perspective(pMatrix,0.5*Math.PI,1,1,20); // create projection matrix
    mat4.lookAt(vMatrix,Eye,Center,Up); // create view matrix
    mat4.multiply(pvMatrix,pvMatrix,pMatrix); // projection
    mat4.multiply(pvMatrix,pvMatrix,vMatrix); // projection * view

    // render each triangle set with alpha==1
    var currSet; // the tri set and its material properties
    for (var whichTriSet=0; whichTriSet<numTriangleSets; whichTriSet++) {
        currSet = inputTriangles[whichTriSet];
        
        if (currSet.material.texture != undefined) 
            isTexture = true;
        else isTexture = false;

        gl.uniform1i(isTextureULoc, isTexture);
        // make model transform, add to view project
        makeModelTransform(currSet);
        mat4.multiply(pvmMatrix,pvMatrix,mMatrix); // project * view * model
        gl.uniformMatrix4fv(mMatrixULoc, false, mMatrix); // pass in the m matrix
        gl.uniformMatrix4fv(pvmMatrixULoc, false, pvmMatrix); // pass in the hpvm matrix
        
        // reflectivity: feed to the fragment shader
        gl.uniform3fv(ambientULoc,currSet.material.ambient); // pass in the ambient reflectivity
        gl.uniform3fv(diffuseULoc,currSet.material.diffuse); // pass in the diffuse reflectivity
        gl.uniform3fv(specularULoc,currSet.material.specular); // pass in the specular reflectivity
        gl.uniform1f(shininessULoc,currSet.material.n); // pass in the specular exponent
        gl.uniform1f(alphaULoc, currSet.material.alpha); //pass in the transparency alpha
        gl.uniform1i(ModulateULoc, Modulate);

        // vertex buffer: activate and feed into vertex shader
        gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffers[whichTriSet]); // activate
        gl.vertexAttribPointer(vPosAttribLoc,3,gl.FLOAT,false,0,0); // feed
        gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffers[whichTriSet]); // activate
        gl.vertexAttribPointer(vNormAttribLoc,3,gl.FLOAT,false,0,0); // feed
        gl.bindBuffer(gl.ARRAY_BUFFER,uvBuffers[whichTriSet]); // activate
        gl.vertexAttribPointer(tPosAttribLoc,2,gl.FLOAT,false,0,0); // feed


        if (isTexture){
            console.log(whichTriSet);
            //create a texture
            var texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);

            if(!currSet.imageReady) {
                //Fill the texture with a 1*1 grey pixel
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([127,127,127,255]));
            } else {
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, currSet.image);
                gl.generateMipmap(gl.TEXTURE_2D);
            }
        }
        
        
       
        // triangle buffer: activate and render
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,triangleBuffers[whichTriSet]); // activate
        gl.drawElements(gl.TRIANGLES,3*triSetSizes[whichTriSet],gl.UNSIGNED_SHORT,0); // render
        
    } // end for each triangle set
} // end render model


// render the dynamic model
function renderDynamicModels() {
    
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    // gl.enable(gl.BLEND);

    // Food   
    var pMatrix = mat4.create(); // projection matrix
    var vMatrix = mat4.create(); // view matrix
    var mMatrix = mat4.create(); // model matrix
    var pvMatrix = mat4.create(); // hand * proj * view matrices
    var pvmMatrix = mat4.create(); // hand * proj * view * model matrices
    if (dynamicTriangles[2].material.texture != undefined) 
        isTexture = true;
    else isTexture = false;

    gl.uniform1i(isTextureULoc, isTexture);
    // make model transform, add to view project
    mat4.fromTranslation(mMatrix, foodPos);
    mat4.perspective(pMatrix,0.5*Math.PI,1,1,20); // create projection matrix
    mat4.lookAt(vMatrix,Eye,Center,Up); // create view matrix
    mat4.multiply(pvMatrix,pvMatrix,pMatrix); // projection
    mat4.multiply(pvMatrix,pvMatrix,vMatrix); // projection * view
    mat4.multiply(pvmMatrix,pvMatrix,mMatrix); // project * view * model
    gl.uniformMatrix4fv(mMatrixULoc, false, mMatrix); // pass in the m matrix
    gl.uniformMatrix4fv(pvmMatrixULoc, false, pvmMatrix); // pass in the hpvm matrix
    
    // reflectivity: feed to the fragment shader
    gl.uniform3fv(ambientULoc,dynamicTriangles[2].material.ambient); // pass in the ambient reflectivity
    gl.uniform3fv(diffuseULoc,dynamicTriangles[2].material.diffuse); // pass in the diffuse reflectivity
    gl.uniform3fv(specularULoc,dynamicTriangles[2].material.specular); // pass in the specular reflectivity
    gl.uniform1f(shininessULoc,dynamicTriangles[2].material.n); // pass in the specular exponent
    gl.uniform1f(alphaULoc, dynamicTriangles[2].material.alpha); //pass in the transparency alpha
    gl.uniform1i(ModulateULoc, Modulate);

    // vertex buffer: activate and feed into vertex shader
    gl.bindBuffer(gl.ARRAY_BUFFER,dynamicVertexBuffers[2]); // activate
    gl.vertexAttribPointer(vPosAttribLoc,3,gl.FLOAT,false,0,0); // feed
    gl.bindBuffer(gl.ARRAY_BUFFER,dynamicNormalBuffers[2]); // activate
    gl.vertexAttribPointer(vNormAttribLoc,3,gl.FLOAT,false,0,0); // feed
    gl.bindBuffer(gl.ARRAY_BUFFER,dynamicUvBuffers[2]); // activate
    gl.vertexAttribPointer(tPosAttribLoc,2,gl.FLOAT,false,0,0); // feed

    // triangle buffer: activate and render
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,dynamicTriangleBuffers[2]); // activate
    gl.drawElements(gl.TRIANGLES,36,gl.UNSIGNED_SHORT,0); // render

    // render each triangle set with alpha==1
    var currSet; // the tri set and its material properties
    for (var i = 0; i <2; i++){
        for (var j = 0; j < snakes[i].body.length; j++) {
            currSet = dynamicTriangles[i];

            if (currSet.material.texture != undefined) 
                isTexture = true;
            else isTexture = false;
    
            var pMatrix = mat4.create(); // projection matrix
            var vMatrix = mat4.create(); // view matrix
            var mMatrix = mat4.create(); // model matrix
            var pvMatrix = mat4.create(); // hand * proj * view matrices
            var pvmMatrix = mat4.create(); // hand * proj * view * model matrices

            gl.uniform1i(isTextureULoc, isTexture);
            // make model transform, add to view project
            mat4.fromTranslation(mMatrix, snakes[i].body[j]);
            mat4.perspective(pMatrix,0.5*Math.PI,1,1,20); // create projection matrix
            mat4.lookAt(vMatrix,Eye,Center,Up); // create view matrix
            mat4.multiply(pvMatrix,pvMatrix,pMatrix); // projection
            mat4.multiply(pvMatrix,pvMatrix,vMatrix); // projection * view
            mat4.multiply(pvmMatrix,pvMatrix,mMatrix); // project * view * model
            gl.uniformMatrix4fv(mMatrixULoc, false, mMatrix); // pass in the m matrix
            gl.uniformMatrix4fv(pvmMatrixULoc, false, pvmMatrix); // pass in the hpvm matrix
            
            // reflectivity: feed to the fragment shader
            gl.uniform3fv(ambientULoc,currSet.material.ambient); // pass in the ambient reflectivity
            gl.uniform3fv(diffuseULoc,currSet.material.diffuse); // pass in the diffuse reflectivity
            gl.uniform3fv(specularULoc,currSet.material.specular); // pass in the specular reflectivity
            gl.uniform1f(shininessULoc,currSet.material.n); // pass in the specular exponent
            gl.uniform1f(alphaULoc, currSet.material.alpha); //pass in the transparency alpha
            gl.uniform1i(ModulateULoc, Modulate);
    
            // vertex buffer: activate and feed into vertex shader
            gl.bindBuffer(gl.ARRAY_BUFFER,dynamicVertexBuffers[i]); // activate
            gl.vertexAttribPointer(vPosAttribLoc,3,gl.FLOAT,false,0,0); // feed
            gl.bindBuffer(gl.ARRAY_BUFFER,dynamicNormalBuffers[i]); // activate
            gl.vertexAttribPointer(vNormAttribLoc,3,gl.FLOAT,false,0,0); // feed
            gl.bindBuffer(gl.ARRAY_BUFFER,dynamicUvBuffers[i]); // activate
            gl.vertexAttribPointer(tPosAttribLoc,2,gl.FLOAT,false,0,0); // feed
                    
            // triangle buffer: activate and render
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,dynamicTriangleBuffers[i]); // activate
            gl.drawElements(gl.TRIANGLES,36,gl.UNSIGNED_SHORT,0); // render
            
        } // end for each triangle set
    }
    
} // end render model


function loadImage(i) {

    inputTriangles[i].image = new Image();
    inputTriangles[i].image.crossOrigin = "Anonymous";
    inputTriangles[i].image.src = "https://ncsucgclass.github.io/prog4/tree.png";
    
    inputTriangles[i].image.addEventListener('load', function(){
        inputTriangles[i].imageReady = true;
        renderModels();
    });
}

/* MAIN -- HERE is where execution begins after window load */

function resetSnake(i){
    if (i == 0){
        snakes[0] = {
            "body": [[4,6,0],[4,5,0],[4,4,0]],
            "direction": ["up","up"]
        }
    }
    else {
        snakes[1] = 
            {
                "body": [[6,8,0], [5,8,0], [4,8,0]],
                "direction": ["right", "right"]
            }
    }
}

function resetFood(){
    var x = Math.floor(Math.random()*18)+1;
    var y = Math.floor(Math.random()*18)+1;
    foodPos = [x,y,0];
}

function snakeMove(i){
    body = snakes[i].body;
    direction = snakes[i].direction;
    len = body.length;

    //update move
    lastBody = body[len-1];
    for (var l = len-1; l>0; l--){
        body[l]=body[l-1];
    }
    switch (direction[0]) {
        case "up": 
            body[0] = [body[0][0], body[0][1]+1, 0];
            break;
        case "down":
            body[0] = [body[0][0], body[0][1]-1, 0];
            break;
        case "left":
            body[0] = [body[0][0]-1, body[0][1], 0];
            break;
        case "right":
            body[0] = [body[0][0]+1, body[0][1], 0];
            break;
    }

    //hit wall
    if (body[0][0]<1 || body[0][0]>=19 || body[0][1]<1 || body[0][1]>=19) {
        resetSnake(i);
        console.log("hit wall");
    }
    
    //hit self
    for (var j = 1; j < len; j++){
        if (body[0][0] == body[j][0] && body[0][1] == body[j][1]){
            console.log("hit self");
            resetSnake(i);
            break;
        }
    }
  
    //hit the other snake
    body2 = snakes[1-i].body;
    for (var j = 1; j < body2.length; j++){
        if (body[0][0] == body2[j][0] && body[0][1] == body2[j][1]){
            console.log("hit other");
            resetSnake(i);
            break;
        }
    }
    
    
    //eat food
    if (body[0][0] == foodPos[0] && body[0][1] == foodPos[1]){
        body.push(lastBody);
        resetFood();
    }

    //update direction
    direction[0] = direction[1];

}

function snakeRandomChangeDirection(){
    var move = Math.floor(Math.random()*4);
    switch (move) {
        case 1: 
            if (snakes[1].direction[0] == "left" || snakes[1].direction[0] == "right" )
                snakes[1].direction[1] = "up";
            break;
        case 2:
            if (snakes[1].direction[0] == "left" || snakes[1].direction[0] == "right" )
                snakes[1].direction[1] = "down";
            break;
        case 3: 
            if (snakes[1].direction[0] == "up" || snakes[1].direction[0] == "down" )
                snakes[1].direction[1] = "right";
            break;
        case 4: 
            if (snakes[1].direction[0] == "up" || snakes[1].direction[0] == "down" )
                snakes[1].direction[1] = "left";
            break;
    }
}

function main() {
  document.onkeydown = handleKeyDown; // call this when key pressed
  setupWebGL(); // set up the webGL environment
  loadModels(); // load in the models from tri file
  loadDnamicyModels();
  setupShaders(); // setup the webGL shaders
//   for(var i = 0; i < inputTriangles.length; i ++) {
//       loadImage(i);
//   }
  renderModels(); // draw the triangles using webGL
  renderDynamicModels();
  
  var loop = setInterval(
      function(){
          snakeMove(0);
          snakeMove(1);
          snakeRandomChangeDirection();
          renderModels();
          renderDynamicModels();
      }, 150
  );
} // end main
