// Initialize the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Set the background to transparent
document.body.appendChild(renderer.domElement);

// Cube colors
const cubeColors = [
    new THREE.Color(0xff0000), // Red (right)
    new THREE.Color(0xffa500), // Orange (left)
    new THREE.Color(0xffffff), // White (top)
    new THREE.Color(0xffff00), // Yellow (bottom)
    new THREE.Color(0x00ff00), // Green (front)
    new THREE.Color(0x0000ff)  // Blue (behind)
];

// Create a 3x3x3 Rubik's Cube
const cubeSize = 0.70;
const spacing = 0.01;

const cubes = [];
const cubeDataArray = [];

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

                const cubeData = {
                    position: cube.position.clone(),
                    colors: cubeMaterials.map(material => material.color.clone())
                };

                console.log("cubeData.colors:", cubeData.colors);

                cubeDataArray.push({ cube, position: cubeData.position, colors: cubeData.colors });

                edges.position.copy(cube.position);
                scene.add(edges);
                scene.add(cube);
            }
        }
    }
}

const cubeState = {};

for (let x = -1; x <= 1; x++) {
    cubeState[x] = {};
    for (let y = -1; y <= 1; y++) {
        cubeState[x][y] = {};
        for (let z = -1; z <= 1; z++) {
            if (!(x === 0 && y === 0 && z === 0)) {
                cubeState[x][y][z] = {
                    position: new THREE.Vector3(x * (cubeSize + spacing), y * (cubeSize + spacing), z * (cubeSize + spacing)),
                    colors: cubeColors.map(color => color.clone())
                };
            }
        }
    }
}






// Define rotation angles for all faces (in radians)
const frontFaceRotation = Math.PI / 2;
const backFaceRotation = -Math.PI / 2;
const leftFaceRotation = Math.PI / 2;
const rightFaceRotation = -Math.PI / 2;
const topFaceRotation = -Math.PI / 2;
const bottomFaceRotation = Math.PI / 2;

const frontFaceGroup = new THREE.Group();
const leftFaceGroup = new THREE.Group();
const rightFaceGroup = new THREE.Group();
const topFaceGroup = new THREE.Group();
const bottomFaceGroup = new THREE.Group();
const backFaceGroup = new THREE.Group();

// Créez des groupes pour chaque coin
const topLeftCornerGroup = new THREE.Group();
const topRightCornerGroup = new THREE.Group();
const bottomLeftCornerGroup = new THREE.Group();
const bottomRightCornerGroup = new THREE.Group();

let currentFrontRotation = 0;
let currentLeftRotation = 0;




// Créez une fonction pour ajouter un cube avec ses informations

function restoreCubesFromData() {
    cubes.forEach(cube => {
        const x = Math.round(cube.position.x);
        const y = Math.round(cube.position.y);
        const z = Math.round(cube.position.z);

        const cubeData = cubeState[x][y][z];

        if (cubeData) {
            cube.position.copy(cubeData.position);

            cube.material.forEach((material, index) => {
                material.color.copy(cubeData.colors[index]);
            });
        } else {
            console.error("Invalid cube:", cube);
        }
    });
}


// Créez une fonction pour réorganiser les cubes en fonction de la rotationFace
function reorganizeCubes() {
    cubes.forEach(cube => {
        const position = cube.position.clone();
        
        if (position.z === cubeSize + spacing) {
            frontFaceGroup.add(cube);
        } else if (position.z === -cubeSize - spacing) {
            backFaceGroup.add(cube);
        } else if (position.x === cubeSize + spacing) {
            rightFaceGroup.add(cube);
        } else if (position.x === -cubeSize - spacing) {
            leftFaceGroup.add(cube);
        } else if (position.y === cubeSize + spacing) {
            topFaceGroup.add(cube);
        } else if (position.y === -cubeSize - spacing) {
            bottomFaceGroup.add(cube);
        }
    });
}






// Exemple de changement de rotationFace
function changeRotationFace(newRotationFace) {
    reorganizeCubes();
    rotationFace = newRotationFace;

    // Retirez tous les cubes de leurs groupes actuels
    cubes.forEach(cube => {
        frontFaceGroup.remove(cube);
        backFaceGroup.remove(cube);
        leftFaceGroup.remove(cube);
        rightFaceGroup.remove(cube);
        topFaceGroup.remove(cube);
        bottomFaceGroup.remove(cube);
    });

    if (newRotationFace == "front") {
        restoreCubesFromData();

        // Ajoutez les cubes aux groupes de face appropriés
        cubes.forEach(cube => {
            let position = cube.position.clone();

            if (position.z === cubeSize + spacing) {
                frontFaceGroup.add(cube);
            } else if (position.z === -cubeSize - spacing) {
                backFaceGroup.add(cube);
            } else if (position.x === cubeSize + spacing) {
                rightFaceGroup.add(cube);
            } else if (position.x === -cubeSize - spacing) {
                leftFaceGroup.add(cube);
            } else if (position.y === cubeSize + spacing) {
                topFaceGroup.add(cube);
            } else if (position.y === -cubeSize - spacing) {
                bottomFaceGroup.add(cube);
            }
        });
    } else if (newRotationFace == "left") {
        restoreCubesFromData();

        // Ajoutez les cubes aux groupes de face appropriés pour la rotation "left"
        cubes.forEach(cube => {
            let position = cube.position.clone();

            if (position.x === -cubeSize - spacing) {
                leftFaceGroup.add(cube);
            } else if (position.x === cubeSize + spacing) {
                rightFaceGroup.add(cube);
            } else if (position.z === cubeSize + spacing) {
                frontFaceGroup.add(cube);
            } else if (position.z === -cubeSize - spacing) {
                backFaceGroup.add(cube);
            } else if (position.y === cubeSize + spacing) {
                topFaceGroup.add(cube);
            } else if (position.y === -cubeSize - spacing) {
                bottomFaceGroup.add(cube);
            }
        });
    }

    // Ajoutez les groupes de coin aux groupes de face correspondants
    if (newRotationFace == "front") {
        frontFaceGroup.add(topRightCornerGroup);
        frontFaceGroup.add(topLeftCornerGroup);
        backFaceGroup.add(bottomRightCornerGroup);
        backFaceGroup.add(bottomLeftCornerGroup);
    } else if (newRotationFace == "left") {
        leftFaceGroup.add(topLeftCornerGroup);
        leftFaceGroup.add(bottomLeftCornerGroup);
        rightFaceGroup.add(topRightCornerGroup);
        rightFaceGroup.add(bottomRightCornerGroup);
    }

    // Ajoutez les groupes de face à la scène
    scene.add(frontFaceGroup);
    scene.add(leftFaceGroup);
    scene.add(rightFaceGroup);
    scene.add(topFaceGroup);
    scene.add(bottomFaceGroup);
    scene.add(backFaceGroup);
}


// Define target rotations for X, Y, and Z axes
let targetRotationX = 0;
let targetRotationY = 0;
let targetRotationZ = 0;

// Define interpolation factor (adjust as needed)
const rotationSpeed = 0.05;

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);

    // Smoothly interpolate current rotation to the target rotation
    scene.rotation.x += (targetRotationX - scene.rotation.x) * rotationSpeed;
    scene.rotation.y += (targetRotationY - scene.rotation.y) * rotationSpeed;
    scene.rotation.z += (targetRotationZ - scene.rotation.z) * rotationSpeed;

    renderer.render(scene, camera);
};

function animateRotation(group, initialRotation, finalRotation, axis) {
    const rotationSpeed = 0.05;
    let currentRotation = initialRotation;
    const rotationDirection = finalRotation > initialRotation ? 1 : -1;

    function animate() {
        if ((rotationDirection === 1 && currentRotation < finalRotation) || (rotationDirection === -1 && currentRotation > finalRotation)) {
            currentRotation += rotationDirection * rotationSpeed;
            switch (axis) {
                case 'x':
                    group.rotation.x = currentRotation;
                    break;
                case 'y':
                    group.rotation.y = currentRotation;
                    break;
                case 'z':
                    group.rotation.z = currentRotation;
                    break;
                default:
                    break;
            }
            requestAnimationFrame(animate);
        } else {
            // Ensure that the rotation reaches the exact final value
            switch (axis) {
                case 'x':
                    group.rotation.x = finalRotation;
                    break;
                case 'y':
                    group.rotation.y = finalRotation;
                    break;
                case 'z':
                    group.rotation.z = finalRotation;
                    break;
                default:
                    break;
            }
            isRotating = false;
        }
    }

    animate();
}

let isRotating = false;
function rotateFrontFace() {
    if (!isRotating) {
        isRotating = true;
        changeRotationFace("front");

        // Sauvegardez les positions actuelles des cubes
        const cubePositions = cubes.map(cube => ({
            x: cube.position.x,
            y: cube.position.y,
            z: cube.position.z
        }));

        // Mettez à jour cubeState en fonction de la rotation
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    if (!(x === 0 && y === 0 && z === 0)) {
                        const newX = -z;
                        const newY = y;
                        const newZ = x;

                        const cubeData = cubeState[x][y][z];
                        cubeData.position.set(newX * (cubeSize + spacing), newY * (cubeSize + spacing), newZ * (cubeSize + spacing));

                        const targetCubePosition = cubePositions.find(pos => (
                            pos.x === cubeData.position.x &&
                            pos.y === cubeData.position.y &&
                            pos.z === cubeData.position.z
                        ));

                        if (targetCubePosition) {
                            const targetCube = cubes.find(cube => (
                                cube.position.x === targetCubePosition.x &&
                                cube.position.y === targetCubePosition.y &&
                                cube.position.z === targetCubePosition.z
                            ));

                            cubeData.colors = targetCube.material.map(material => material.color.clone());
                        }
                    }
                }
            }
        }

        // Mettez à jour cubeDataArray
        cubeDataArray.forEach(data => {
            data.position.copy(data.cube.position);
            data.colors = data.cube.material.map(material => material.color.clone());
        });

        let initialRotation = currentFrontRotation;
        let finalRotation = initialRotation - frontFaceRotation;

        animateRotation(frontFaceGroup, initialRotation, finalRotation, 'z');

        currentFrontRotation = finalRotation; // Mettez à jour la rotation actuelle
    }
}

  

    function rotateLeftFace() {
        if (!isRotating) {
            isRotating = true;
            changeRotationFace("left");
    
            // Sauvegardez les positions actuelles des cubes
            const cubePositions = cubes.map(cube => ({
                x: cube.position.x,
                y: cube.position.y,
                z: cube.position.z
            }));
    
            // Mettez à jour cubeState en fonction de la rotation
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    for (let z = -1; z <= 1; z++) {
                        if (!(x === 0 && y === 0 && z === 0)) {
                            const newX = x;
                            const newY = z;
                            const newZ = -y;
    
                            const cubeData = cubeState[x][y][z];
                            cubeData.position.set(newX * (cubeSize + spacing), newY * (cubeSize + spacing), newZ * (cubeSize + spacing));
    
                            const targetCubePosition = cubePositions.find(pos => (
                                pos.x === cubeData.position.x &&
                                pos.y === cubeData.position.y &&
                                pos.z === cubeData.position.z
                            ));
    
                            if (targetCubePosition) {
                                const targetCube = cubes.find(cube => (
                                    cube.position.x === targetCubePosition.x &&
                                    cube.position.y === targetCubePosition.y &&
                                    cube.position.z === targetCubePosition.z
                                ));
    
                                cubeData.colors = targetCube.material.map(material => material.color.clone());
                            }
                        }
                    }
                }
            }
    
            // Mettez à jour cubeDataArray
            cubeDataArray.forEach(data => {
                data.position.copy(data.cube.position);
                data.colors = data.cube.material.map(material => material.color.clone());
            });
    
            let initialRotation = currentLeftRotation;
            let finalRotation = initialRotation + leftFaceRotation;
    
            animateRotation(leftFaceGroup, initialRotation, finalRotation, 'x');
    
            currentLeftRotation = finalRotation; // Mettez à jour la rotation actuelle
        }
    }
    


function rotateRightFace() {
    if (!isRotating) {
        isRotating = true;

        changeRotationFace("left");
        let initialRotation = rightFaceGroup.rotation.x;
        let finalRotation = initialRotation - rightFaceRotation;
        animateRotation(rightFaceGroup, initialRotation, finalRotation, 'x');
        console.log("Initial " + initialRotation);
        console.log("Final " + finalRotation);
        console.log("Test");
    }
}

function rotateTopFace() {
    const initialRotation = topFaceGroup.rotation.z;
    animateRotation(topFaceGroup, initialRotation, -topFaceRotation, 'z');
}

function rotateBottomFace() {
    const initialRotation = bottomFaceGroup.rotation.z;
    animateRotation(bottomFaceGroup, initialRotation, -bottomFaceRotation, 'z');
}

function rotateBackFace() {
    if (!isRotating) {
        isRotating = true;
        changeRotationFace("front");
        let initialRotation = backFaceGroup.rotation.z;
        let finalRotation = initialRotation - backFaceRotation;
        animateRotation(backFaceGroup, initialRotation, finalRotation, 'z');
        console.log("Initial Back " + initialRotation);
        console.log("Final Back " + finalRotation);
        console.log("Test back");
    }
}

// Attach event listeners to buttons
document.getElementById('rotateFrontFace').addEventListener('click', rotateFrontFace);
document.getElementById('rotateBackFace').addEventListener('click', rotateBackFace);
document.getElementById('rotateLeftFace').addEventListener('click', rotateLeftFace);
document.getElementById('rotateRightFace').addEventListener('click', rotateRightFace);
document.getElementById('rotateTopFace').addEventListener('click', rotateTopFace);
document.getElementById('rotateBottomFace').addEventListener('click', rotateBottomFace);

document.getElementById('rotateRightButton').addEventListener('click', () => {
    targetRotationY += 1.5712; // Adjust the desired rotation angle
});

document.getElementById('rotateLeftButton').addEventListener('click', () => {
    targetRotationY -= 1.5712; // Adjust the desired rotation angle
    // targetRotationX -= 1.5712; // Adjust the desired rotation angle
    
});

document.getElementById('rotateUpButton').addEventListener('click', () => {
    targetRotationX += 3.1424; // Adjust the desired rotation angle
    targetRotationY += 3.1424; // Adjust the desired rotation angle
});


// Function to execute a single rotation
function executeRotation(rotationString) {
    const rotations = rotationString.split(' ');

    let delay = 0; // Initial delay
    rotations.forEach(singleRotation => {
        singleRotation = singleRotation.toUpperCase();
        switch (singleRotation) {
            case "F":
                rotateFrontFace();
                break;
            case "F'":
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        rotateFrontFace();
                    }, delay);
                    delay += 500; // Add a delay between rotations
                }
                break;
            case "F2":
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                        rotateFrontFace();
                    }, delay);
                    delay += 500; // Add a delay between rotations
                }
                break;
            case "B":
                rotateBackFace();
                break;
            case "B'":
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        rotateBackFace();
                    }, delay);
                    delay += 500; // Add a delay between rotations
                }
                break;
            case "B2":
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                        rotateBackFace();
                    }, delay);
                    delay += 500; // Add a delay between rotations
                }
                break;
            case "L":
                rotateLeftFace();
                break;
            case "L'":
                rotateLeftFace();
                rotateLeftFace();
                rotateLeftFace();
                break;
            case "L2":
                rotateLeftFace();
                rotateLeftFace();
                break;
            case "R":
                rotateRightFace();
                break;
            case "R'":
                rotateRightFace();
                rotateRightFace();
                rotateRightFace();
                break;
            case "R2":
                rotateRightFace();
                rotateRightFace();
                break;
            case "U":
                rotateTopFace();
                break;
            case "U'":
                rotateTopFace();
                rotateTopFace();
                rotateTopFace();
                break;
            case "U2":
                rotateTopFace();
                rotateTopFace();
                break;
            case "D":
                rotateBottomFace();
                break;
            case "D'":
                rotateBottomFace();
                rotateBottomFace();
                rotateBottomFace();
                break;
            case "D2":
                rotateBottomFace();
                rotateBottomFace();
                break;
            case "X":
                targetRotationX -= 1.5712; // Adjust the desired rotation angle
                break;
            case "X'":
                targetRotationX += 1.5712; // Adjust the desired rotation angle
                break;
            case "Y":
                targetRotationY -= 1.5712; // Adjust the desired rotation angle
                break;
            case "Y'":
                targetRotationY += 1.5712; // Adjust the desired rotation angle
                break;
            case "Z":
                targetRotationZ -= Math.PI / 2; // Adjust the desired rotation angle
                break;
            case "Z'":
                targetRotationZ += Math.PI / 2; // Adjust the desired rotation angle
                break;
            case "M":
                rotateRightFace();
                rotateRightFace();
                rotateRightFace();
                rotateLeftFace();
                targetRotationX += Math.PI / 2; // Adjust the desired rotation angle
                break;
            case "M'":
                rotateLeftFace();
                rotateLeftFace();
                rotateLeftFace();
                rotateRightFace();
                targetRotationX -= Math.PI / 2; // Adjust the desired rotation angle
                break;
            case "M2":
                rotateRightFace();
                rotateRightFace();
                rotateRightFace();
                rotateLeftFace();
                targetRotationX += Math.PI / 2; // Adjust the desired rotation angle
                rotateRightFace();
                rotateRightFace();
                rotateRightFace();
                rotateLeftFace();
                targetRotationX += Math.PI / 2; // Adjust the desired rotation angle
                break;
            case "E":
                rotateTopFace();
                rotateTopFace();
                rotateTopFace();
                rotateBottomFace();
                targetRotationY += Math.PI / 2; // Adjust the desired rotation angle
                break;
            case "E'":
                rotateBottomFace();
                rotateBottomFace();
                rotateBottomFace();
                rotateTopFace();
                targetRotationY -= Math.PI / 2; // Adjust the desired rotation angle
                break;
            case "E2":
                rotateTopFace();
                rotateTopFace();
                rotateTopFace();
                rotateBottomFace();
                targetRotationY += Math.PI / 2;
                rotateTopFace();
                rotateTopFace();
                rotateTopFace();
                rotateBottomFace();
                targetRotationY += Math.PI / 2;
                break;
            case "S":
                rotateFrontFace();
                rotateFrontFace();
                rotateFrontFace();
                rotateBackFace();
                targetRotationZ -= Math.PI / 2; // Adjust the desired rotation angle
                break;
            case "S'":
                rotateBackFace();
                rotateBackFace();
                rotateBackFace();
                rotateFrontFace();
                targetRotationZ += Math.PI / 2; // Adjust the desired rotation angle
                break;
            case "S2":
                rotateFrontFace();
                rotateFrontFace();
                rotateFrontFace();
                rotateBackFace();
                targetRotationZ -= Math.PI / 2;
                rotateFrontFace();
                rotateFrontFace();
                rotateFrontFace();
                rotateBackFace();
                targetRotationZ -= Math.PI / 2;
                break;
            default:
                // Handle invalid input or display an error message
                document.getElementById('inputScrambleError').innerText = "Invalid rotation: " + rotationString;
                break;
        }
    });
}

// Attach event listener to the "play" button
document.getElementById('play').addEventListener('click', function () {
    const inputElement = document.getElementById('scrambleAlg');
    const scrambleAlg = inputElement.value.trim();

    // Clear any previous error message
    document.getElementById('inputScrambleError').innerText = "";

    // Split the input string into individual rotations
    const rotations = scrambleAlg.split(' ');

    // Execute each rotation
    rotations.forEach(rotation => {
        executeRotation(rotation);
    });
});

//position camera



// Start the animation loop
animate();