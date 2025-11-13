function init(){
  let glCanvas = document.querySelector("#glcanvas");
  glCanvas.style.width = "500px";
  glCanvas.style.height = "500px";
  let gl = glCanvas.getContext("webgl");


  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  let vertexShaderSource = `
    attribute vec2 aPos;
    varying vec3 vColor;

    void main() {
      gl_Position = vec4(aPos, 0.0, 1.0);
      vColor = vec3(0.4, 0.0, 0.9); // red
    }
  `;

  // ------------ Fragment Shader ------------
  let fragmentShaderSource = `
    precision mediump float;
    varying vec3 vColor;

    void main() {
      gl_FragColor = vec4(vColor, 0.1);
    }
  `;

  let vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);

  let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);

  let shaderProgram = gl.createProgram();


  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

   let vertices = new Float32Array([
    0.0,  0.5,
   -0.5, -0.5,
    0.5, -0.5
  ]);

  let buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  let aPos = gl.getAttribLocation(shaderProgram, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  // ------------ Draw ------------
  gl.drawArrays(gl.TRIANGLES, 0, 3);

}

init();