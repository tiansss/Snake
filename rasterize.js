/*
    TT 3D Snake
    By Tian Shi
*/

// game setting variables
var point = 0;
var cpoint = 0;
var speed = 150;

// static background
var inputTriangles = [];
//snake and food
var dynamicTriangles = [];

//snakes movement information
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
var foodPos = [17,10,0];//food default position


var Eye = vec3.fromValues(10,10,15); // eye position in world space
var Center = vec3.fromValues(10,10,-1); // view direction in world space
var Up = vec3.fromValues(0,1,0); // view up vector
var lightAmbient = vec3.fromValues(1,1,1); // light ambient emission
var lightDiffuse = vec3.fromValues(1,1,1); // light diffuse emission
var lightSpecular = vec3.fromValues(1,1,1); // light specular emission
var lightPosition = vec3.fromValues(5,5,10); // light position


var gl = null; 
var vertexBuffers = []; // this contains vertex coordinate lists by set, in triples
var normalBuffers = []; // this contains normal component lists by set, in triples
var triSetSizes = []; // this contains the size of each triangle set
var triangleBuffers = []; // lists of indices into vertexBuffers by set, in triples

var dynamicVertexBuffers = []; // this contains vertex coordinate lists by set, in triples
var dynamicNormalBuffers = []; // this contains normal component lists by set, in triples
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

// does stuff when keys are pressed
function handleKeyDown(event) {
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

// read models in, load them into webgl buffers
function loadModels() {
    try {
        if (inputTriangles == String.null)
            throw "Unable to load triangles file!";
        else {
            var whichSetVert; // index of vertex in current triangle set
            var whichSetTri; // index of triangle in current triangle set
            var vtxToAdd; // vtx coords to add to the coord array
            var normToAdd; // vtx normal to add to the coord array
            var triToAdd; // tri indices to add to the index array
            var maxCorner = vec3.fromValues(Number.MIN_VALUE,Number.MIN_VALUE,Number.MIN_VALUE); // bbox corner
            var minCorner = vec3.fromValues(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE); // other corner
        
            // process each triangle set to load webgl vertex and triangle buffers
            for (var whichSet=0; whichSet<inputTriangles.length; whichSet++) { // for each tri set
                // set up hilighting, modeling translation and rotation
                inputTriangles[whichSet].center = vec3.fromValues(0,0,0);  // center point of tri set
                inputTriangles[whichSet].on = false; // not highlighted
                inputTriangles[whichSet].translation = vec3.fromValues(0,0,0); // no translation
                inputTriangles[whichSet].xAxis = vec3.fromValues(1,0,0); // model X axis
                inputTriangles[whichSet].yAxis = vec3.fromValues(0,1,0); // model Y axis 

                // set up the vertex and normal arrays, define model center and axes
                inputTriangles[whichSet].glVertices = []; // flat coord list for webgl
                inputTriangles[whichSet].glNormals = []; // flat normal list for webgl
                inputTriangles[whichSet].imageReady = false; // whether its image is loaded or not
                var numVerts = inputTriangles[whichSet].vertices.length; // num vertices in tri set
                for (whichSetVert=0; whichSetVert<numVerts; whichSetVert++) { // verts in set
                    vtxToAdd = inputTriangles[whichSet].vertices[whichSetVert]; // get vertex to add
                    normToAdd = inputTriangles[whichSet].normals[whichSetVert]; // get normal to add
                    inputTriangles[whichSet].glVertices.push(vtxToAdd[0],vtxToAdd[1],vtxToAdd[2]); // put coords in set coord list
                    inputTriangles[whichSet].glNormals.push(normToAdd[0],normToAdd[1],normToAdd[2]); // put normal in set coord list
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
                dynamicTriangles[whichSet].imageReady = false; // whether its image is loaded or not
                var numVerts = dynamicTriangles[whichSet].vertices.length; // num vertices in tri set
                for (whichSetVert=0; whichSetVert<numVerts; whichSetVert++) { // verts in set
                    vtxToAdd = dynamicTriangles[whichSet].vertices[whichSetVert]; // get vertex to add
                    normToAdd = dynamicTriangles[whichSet].normals[whichSetVert]; // get normal to add
                    dynamicTriangles[whichSet].glVertices.push(vtxToAdd[0],vtxToAdd[1],vtxToAdd[2]); // put coords in set coord list
                    dynamicTriangles[whichSet].glNormals.push(normToAdd[0],normToAdd[1],normToAdd[2]); // put normal in set coord list
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

                // set up the triangle index array, adjusting indices across sets
                dynamicTriangles[whichSet].glTriangles = []; // flat index list for webgl
                for (whichSetTri=0; whichSetTri<12; whichSetTri++) {
                    triToAdd = dynamicTriangles[whichSet].triangles[whichSetTri]; // get tri to add
                    dynamicTriangles[whichSet].glTriangles.push(triToAdd[0],triToAdd[1],triToAdd[2]); // put indices in set list
                } // end for triangles in set

                // send the triangle indices to webGL
                dynamicTriangleBuffers.push(gl.createBuffer()); // init empty triangle index buffer
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, dynamicTriangleBuffers[whichSet]); // activate that buffer
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(dynamicTriangles[whichSet].glTriangles),gl.STATIC_DRAW); // data in

            } // end for each triangle set 
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

        // geometry properties
        varying vec3 vWorldPos; // world xyz of fragment
        varying vec3 vVertexNormal; // normal of fragment
      
        varying vec2 v_texcoord;

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

            vec3 ambient = uAmbient*uLightAmbient; // ambient term
            vec3 diffuse = uDiffuse*uLightDiffuse*lambert; // diffuse term
            vec3 specular = uSpecular*uLightSpecular*highlight; // specular term
            
            
            // combine to output color
            vec3 colorOut = ambient + diffuse + specular; // no specular yet
            gl_FragColor = vec4(colorOut, 1.0); 
        
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
              
                ambientULoc = gl.getUniformLocation(shaderProgram, "uAmbient"); // ptr to ambient
                diffuseULoc = gl.getUniformLocation(shaderProgram, "uDiffuse"); // ptr to diffuse
                specularULoc = gl.getUniformLocation(shaderProgram, "uSpecular"); // ptr to specular
                shininessULoc = gl.getUniformLocation(shaderProgram, "uShininess"); // ptr to shininess
    
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

    var currSet; // the tri set and its material properties
    for (var whichTriSet=0; whichTriSet<inputTriangles.length; whichTriSet++) {
        currSet = inputTriangles[whichTriSet];

        // make model transform, add to view project
        mat4.multiply(pvmMatrix,pvMatrix,mMatrix); // project * view * model
        gl.uniformMatrix4fv(mMatrixULoc, false, mMatrix); // pass in the m matrix
        gl.uniformMatrix4fv(pvmMatrixULoc, false, pvmMatrix); // pass in the hpvm matrix
        
        // reflectivity: feed to the fragment shader
        gl.uniform3fv(ambientULoc,currSet.material.ambient); // pass in the ambient reflectivity
        gl.uniform3fv(diffuseULoc,currSet.material.diffuse); // pass in the diffuse reflectivity
        gl.uniform3fv(specularULoc,currSet.material.specular); // pass in the specular reflectivity
        gl.uniform1f(shininessULoc,currSet.material.n); // pass in the specular exponent

        // vertex buffer: activate and feed into vertex shader
        gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffers[whichTriSet]); // activate
        gl.vertexAttribPointer(vPosAttribLoc,3,gl.FLOAT,false,0,0); // feed
        gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffers[whichTriSet]); // activate
        gl.vertexAttribPointer(vNormAttribLoc,3,gl.FLOAT,false,0,0); // feed
        gl.vertexAttribPointer(tPosAttribLoc,2,gl.FLOAT,false,0,0); // feed
        
        // triangle buffer: activate and render
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,triangleBuffers[whichTriSet]); // activate
        gl.drawElements(gl.TRIANGLES,3*triSetSizes[whichTriSet],gl.UNSIGNED_SHORT,0); // render
        
    } // end for each triangle set


} // end render model


// render the dynamic model
function renderDynamicModels() {

    // Food   
    var pMatrix = mat4.create(); // projection matrix
    var vMatrix = mat4.create(); // view matrix
    var mMatrix = mat4.create(); // model matrix
    var pvMatrix = mat4.create(); // hand * proj * view matrices
    var pvmMatrix = mat4.create(); // hand * proj * view * model matrices

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

    // vertex buffer: activate and feed into vertex shader
    gl.bindBuffer(gl.ARRAY_BUFFER,dynamicVertexBuffers[2]); // activate
    gl.vertexAttribPointer(vPosAttribLoc,3,gl.FLOAT,false,0,0); // feed
    gl.bindBuffer(gl.ARRAY_BUFFER,dynamicNormalBuffers[2]); // activate
    gl.vertexAttribPointer(vNormAttribLoc,3,gl.FLOAT,false,0,0); // feed
    gl.vertexAttribPointer(tPosAttribLoc,2,gl.FLOAT,false,0,0); // feed

    // triangle buffer: activate and render
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,dynamicTriangleBuffers[2]); // activate
    gl.drawElements(gl.TRIANGLES,36,gl.UNSIGNED_SHORT,0); // render

    var currSet; // the tri set and its material properties
    for (var i = 0; i <2; i++){
        for (var j = 0; j < snakes[i].body.length; j++) {
            currSet = dynamicTriangles[i];
    
            var pMatrix = mat4.create(); // projection matrix
            var vMatrix = mat4.create(); // view matrix
            var mMatrix = mat4.create(); // model matrix
            var pvMatrix = mat4.create(); // hand * proj * view matrices
            var pvmMatrix = mat4.create(); // hand * proj * view * model matrices

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
    
            // vertex buffer: activate and feed into vertex shader
            gl.bindBuffer(gl.ARRAY_BUFFER,dynamicVertexBuffers[i]); // activate
            gl.vertexAttribPointer(vPosAttribLoc,3,gl.FLOAT,false,0,0); // feed
            gl.bindBuffer(gl.ARRAY_BUFFER,dynamicNormalBuffers[i]); // activate
            gl.vertexAttribPointer(vNormAttribLoc,3,gl.FLOAT,false,0,0); // feed
            gl.vertexAttribPointer(tPosAttribLoc,2,gl.FLOAT,false,0,0); // feed
                    
            // triangle buffer: activate and render
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,dynamicTriangleBuffers[i]); // activate
            gl.drawElements(gl.TRIANGLES,36,gl.UNSIGNED_SHORT,0); // render
            
        } // end for each triangle set
    }
    
} // end render model


function snakeMove(i){
    //reset snake at a random position with lenght=3, direction="right"
    function resetSnake(i){
        //ensure reset position is not on the other sname nor on food
        function isSnakePosOK(x,y){
            //not on the other snake
            for (var k = 0; k < snakes[1-i].body.length; k++){
                if ((x == snakes[1-i].body[k][0] || x-1 == snakes[1-i].body[k][0] || x-2 ==  snakes[1-i].body[k][0]) && y == snakes[1-i].body[k][1])
                    return false;          
            }
            //not on food
            if ((x == foodPos[0] || x-1 == foodPos[0] || x-2 == foodPos[0]) && y == foodPos[1])
                return false;
            return true;
        }
    
        //update point
        if (i==0) {
            point = 0;
            document.getElementById("point").innerHTML = point;
        }
        else {
            cpoint = 0;
            document.getElementById("cpoint").innerHTML = cpoint;
        }

        //update position
        var x = Math.floor(Math.random()*15)+3;
        var y = Math.floor(Math.random()*18)+1;
        while (!isSnakePosOK(x,y)){
            x = Math.floor(Math.random()*15)+3;
            y = Math.floor(Math.random()*18)+1;
        }   
        snakes[i].body = [[x,y,0],[x-1,y,0],[x-2,y,0]];
        snakes[i].direction=["right", "right"];
    }

    //reset food at a random position
    function resetFood(){
        //to ensure the food position is not on surrent snake/resetPos
        function isFoodPosOK(x,y){
            //not on snake0
            for (var i = 0; i < snakes[0].body.length; i++){
                if (x == snakes[0].body[i][0] && y == snakes[0].body[i][1])
                    return false;
            }
            //not on snake1
            for (var i = 0; i < snakes[1].body.length; i++){
                if (x == snakes[1].body[i][0] && y == snakes[1].body[i][1])
                    return false;
            }
            return true;
        }
    
        //update position
        var x = Math.floor(Math.random()*18)+1;
        var y = Math.floor(Math.random()*18)+1;
        while (!isFoodPosOK(x,y)){
            x = Math.floor(Math.random()*18)+1;
            y = Math.floor(Math.random()*18)+1;
        }   
        foodPos = [x,y,0];
    }

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

    //is hit wall
    if (body[0][0]<1 || body[0][0]>=19 || body[0][1]<1 || body[0][1]>=19) {
        if (i==0){
            document.getElementById("mySoundCollision").src = "collision.mp3";
        } 
        resetSnake(i);
    }
    
    //is hit self
    for (var j = 1; j < len; j++){
        if (body[0][0] == body[j][0] && body[0][1] == body[j][1]){
            if (i==0){
                document.getElementById("mySoundCollision").src = "collision.mp3";
            } 
            resetSnake(i);
            break;
        }
    }
  
    //is hit the other snake
    body2 = snakes[1-i].body;
    for (var j = 0; j < body2.length; j++){
        if (body[0][0] == body2[j][0] && body[0][1] == body2[j][1]){
            if (i==0){
                document.getElementById("mySoundCollision").src = "collision.mp3";
            } 
            resetSnake(i);
            break;
        }
    }
    
    
    //is eat food
    if (body[0][0] == foodPos[0] && body[0][1] == foodPos[1]){
        if (i==0){
            point=point+10;
            document.getElementById("point").innerHTML = point;
            document.getElementById("mySoundFood").src = "http://soundimage.org/wp-content/uploads/2016/04/SynthChime1.mp3";
        }
        if (i==1){
            cpoint = cpoint+10;
            document.getElementById("cpoint").innerHTML = cpoint;
        }
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
    //read data
    inputTriangles = inputTriangles();
    dynamicTriangles = dynamicTriangles();

    //key
    document.onkeydown = handleKeyDown; 
    
    //point
    document.getElementById("point").innerHTML = point;
    document.getElementById("cpoint").innerHTML = cpoint;
   
    //load and render
    setupWebGL(); 
    loadModels(); 
    loadDnamicyModels();
    setupShaders(); 
    renderModels(); 
    renderDynamicModels();

    //loop in speed
    var loop = setInterval(
        function(){
            //move one step for snake0 and snake1
            snakeMove(0);
            snakeMove(1);

            //npc snake randomly change direction
            snakeRandomChangeDirection();

            //render static and dynamic models
            renderModels();
            renderDynamicModels();
        }, speed
    );
} // end main
