// Initialize Three.js scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('cube-3d-container').appendChild(renderer.domElement);

// Define cubelet size and geometry
var cubeletSize = 0.5;
var cubeletGeometry = new THREE.BoxGeometry(cubeletSize, cubeletSize, cubeletSize);

// Define cubelet colors
var cubeletColors = [
    0x000000, // black
    0xff0000, // red
    0x00ff00, // green
    0x0000ff, // blue
    0xffff00, // yellow
    0xffa500, // orange
    0xffffff, // white
];

// Append cubelets to the scene
var cubelets = [];
for (var i = 0; i < 27; i++) {
    var cubelet = new THREE.Mesh(cubeletGeometry, new THREE.MeshBasicMaterial({ color: cubeletColors[i % 6] }));
    cubelets.push(cubelet);
    scene.add(cubelet);
}

// Define cubelet positions
var cubeletPositions = [
    [-1, 1, 1], // top left front
    [0, 1, 1], // top center front
    [1, 1, 1], // top right front
    [-1, 0, 1], // middle left front
    [0, 0, 1], // middle center front
    [1, 0, 1], // middle right front
    [-1, -1, 1], // bottom left front
    [0, -1, 1], // bottom center front
    [1, -1, 1], // bottom right front
    [-1, 1, 0], // top left center
    [0, 1, 0], // top center center
    [1, 1, 0], // top right center
    [-1, 0, 0], // middle left center
    [1, 0, 0], // middle right center
    [-1, -1, 0], // bottom left center
    [0, -1, 0], // bottom center center
    [1, -1, 0], // bottom right center
    [-1, 1, -1], // top left back
    [0, 1, -1], // top center back
    [1, 1, -1], // top right back
    [-1, 0, -1], // middle left back
    [0, 0, -1], // middle center back
    [1, 0, -1], // middle right back
    [-1, -1, -1], // bottom left back
    [0, -1, -1], // bottom center back
    [1, -1, -1], // bottom right back
];

// Add cubelet positions to cubelets
for (var i = 0; i < 27; i++) {
    cubelets[i].position.set(cubeletPositions[i][0] * cubeletSize, cubeletPositions[i][1] * cubeletSize, cubeletPositions[i][2] * cubeletSize);
}

// Set camera position
camera.position.z = 5;

// Create ambient light
var ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Create directional light
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Create controls for user interaction
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// Create an animation function
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cubelets or add any cube rotation logic here if needed
    for (var i = 0; i < 27; i++) {
        cubelets[i].rotation.x += 0.01;
        cubelets[i].rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

// Call the animate function to start the animation
animate();
