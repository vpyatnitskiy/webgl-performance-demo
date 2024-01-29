const canvas = document.querySelector('canvas')
const gl = canvas.getContext('webgl2')

const width = canvas.width
const height = canvas.height

const vertexShaderGLSL = `#version 300 es

in vec4 vertexPosition;

void main() {
  gl_Position = vertexPosition;
}`

const fragmentShaderGLSL = `#version 300 es
precision highp float;

out vec4 fragColor;

void main() {
  fragColor = vec4(1, 0, 0, 1);
}`

const vertices = new Float32Array([
    -1, -1, 0,
    1, -1, 0,
    1, 1, 0,
])

const indices = new Uint16Array([ 0, 1, 2 ])

const vertexShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertexShader, vertexShaderGLSL)
gl.compileShader(vertexShader)

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, fragmentShaderGLSL)
gl.compileShader(fragmentShader)

const shaderProgram = gl.createProgram()
gl.attachShader(shaderProgram, vertexShader)
gl.attachShader(shaderProgram, fragmentShader)
gl.linkProgram(shaderProgram)
gl.useProgram(shaderProgram)

const vertexBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

const indexBuffer = gl.createBuffer()
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)

const coord = gl.getAttribLocation(shaderProgram, 'vertexPosition')
gl.enableVertexAttribArray(coord)
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0)

function draw() {
    vertices[0] = Math.sin(Date.now() / 1000)

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)

    gl.clearColor(0.5, 0.5, 0.5, 1.0)
    gl.enable(gl.DEPTH_TEST)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.viewport(0, 0, width, height)

    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)
}

function loop() {
    draw()
    requestAnimationFrame(loop)
}

loop()
