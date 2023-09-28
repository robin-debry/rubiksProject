// Initialize the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Set the background to transparent
document.body.appendChild(renderer.domElement);

// Cube colors
const cubeColors = [
    0xff0000, // Red (right)
    0xffa500, // Orange (left)
    0xffffff, // White (top)
    0xffff00, // Yellow (bottom)
    0x00ff00, // Green (front)
    0x0000ff // Blue (behind)
];

// Create a 3x3x3 Rubik's Cube
const cubeSize = 0.70;
const spacing = 0.01;

const cubes = [];

for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
            if (!(x === 0 && y === 0 && z === 0)) {
                const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
                const cubeMaterials = cubeColors.map(color => new THREE.MeshBasicMaterial({ color }));
                const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);

                cube.position.set(x * (cubeSize + spacing), y * (cubeSize + spacing), z * (cubeSize + spacing));
                scene.add(cube);
                cubes.push(cube);

                const edgesGeometry = new THREE.EdgesGeometry(cubeGeometry);
                const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
                const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

                edges.position.copy(cube.position);
                scene.add(edges);
            }
        }
    }
}

// Define target rotations for X and Y axes
let targetRotationX = 0;
let targetRotationY = 0;

// Define interpolation factors (adjust as needed)
const rotationSpeed = 0.05;

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);

    // Smoothly interpolate current rotation to the target rotation
    scene.rotation.x += (targetRotationX - scene.rotation.x) * rotationSpeed;
    scene.rotation.y += (targetRotationY - scene.rotation.y) * rotationSpeed;

    renderer.render(scene, camera);
};

// Attach event listeners to buttons
document.getElementById('rotateRightButton').addEventListener('click', () => {
    targetRotationY += 1.5712; // Adjust the desired rotation angle
});

document.getElementById('rotateLeftButton').addEventListener('click', () => {
    targetRotationY -= 1.5712; // Adjust the desired rotation angle
});

document.getElementById('rotateUpButton').addEventListener('click', () => {
    targetRotationX += 3.1424; // Adjust the desired rotation angle
});

// Position the camera
camera.position.set(3, 2, 3);
camera.lookAt(0, 0, 0);

// Start the animation loop
animate();


// Define rotation angles for all faces (in radians)
const frontFaceRotation = Math.PI / 2;
const backFaceRotation = -Math.PI / 2;
const leftFaceRotation = Math.PI / 2;
const rightFaceRotation = -Math.PI / 2;
const topFaceRotation = -Math.PI / 2;
const bottomFaceRotation = Math.PI / 2;

function rotateFrontFace() {
    for (let i = 0; i < cubes.length; i++) {
        const cube = cubes[i];
        const position = cube.position.clone();

        if (position.z === cubeSize + spacing) {
            cube.rotateZ(frontFaceRotation);
        }
    }
}

function rotateBackFace() {
    for (let i = 0; i < cubes.length; i++) {
        const cube = cubes[i];
        const position = cube.position.clone();

        if (position.z === -cubeSize - spacing) {
            cube.rotateZ(backFaceRotation);
        }
    }
}

function rotateLeftFace() {
    for (let i = 0; i < cubes.length; i++) {
        const cube = cubes[i];
        const position = cube.position.clone();

        if (position.x === -cubeSize - spacing) {
            cube.rotateX(leftFaceRotation);
        }
    }
}

function rotateRightFace() {
    for (let i = 0; i < cubes.length; i++) {
        const cube = cubes[i];
        const position = cube.position.clone();

        if (position.x === cubeSize + spacing) {
            cube.rotateX(rightFaceRotation);
        }
    }
}

function rotateTopFace() {
    for (let i = 0; i < cubes.length; i++) {
        const cube = cubes[i];
        const position = cube.position.clone();

        if (position.y === cubeSize + spacing) {
            cube.rotateY(topFaceRotation);
        }
    }
}

function rotateBottomFace() {
    for (let i = 0; i < cubes.length; i++) {
        const cube = cubes[i];
        const position = cube.position.clone();

        if (position.y === -cubeSize - spacing) {
            cube.rotateY(bottomFaceRotation);
        }
    }
}

// Attach event listeners to buttons
document.getElementById('rotateFrontFace').addEventListener('click', rotateFrontFace);
document.getElementById('rotateBackFace').addEventListener('click', rotateBackFace);
document.getElementById('rotateLeftFace').addEventListener('click', rotateLeftFace);
document.getElementById('rotateRightFace').addEventListener('click', rotateRightFace);
document.getElementById('rotateTopFace').addEventListener('click', rotateTopFace);
document.getElementById('rotateBottomFace').addEventListener('click', rotateBottomFace);
