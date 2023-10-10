const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
const controls = new THREE.OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
// set background color to white
renderer.setClearColor(0xffffff, 0);
document.body.appendChild(renderer.domElement);

// Create the orbit controls


// Set the initial position for the controls
controls.target.set(0, 0, 0);
controls.enablePan = true; // Disable panning (i.e. right click + drag)
controls.enableZoom = true; // Disable zooming
controls.enableRotate = true; // Disable rotation
controls.enabled = true; // Disable controls altogether

// Set additional options for the controls (optional)
controls.enableDamping = true; // Enable damping for smoother camera movement
controls.dampingFactor = 0.05; // Adjust damping factor as needed
controls.rotateSpeed = 0.5; // Adjust rotate speed as needed
controls.zoomSpeed = 1.2; // Adjust zoom speed as needed



var cubeletPlacement3D = {
    "0": {
        "Front color": "transparent",
        "Back color": cubeletPlacement["B"][8].color,
        "Up color": "transparent",
        "Down color": cubeletPlacement["D"][6].color,
        "Left color": cubeletPlacement["L"][6].color,
        "Right color": "transparent",
        "position": { "x": -1, "y": -1, "z": -1 }
    },
    "1": {
        "Front color": "transparent",
        "Back color": "transparent",
        "Up color": "transparent",
        "Down color": cubeletPlacement["D"][3].color,
        "Left color": cubeletPlacement["L"][7].color,
        "Right color": "transparent",
        "position": { "x": -1, "y": -1, "z": 0 }

    },
    "2": {
        "Front color": cubeletPlacement["F"][6].color,
        "Back color": "transparent",
        "Up color": "transparent",
        "Down color": cubeletPlacement["D"][0].color,
        "Left color": cubeletPlacement["L"][8].color,
        "Right color": "transparent",
        "position": { "x": -1, "y": -1, "z": 1 }
    },
    "3": {
        "Front color": "transparent",
        "Back color": cubeletPlacement["B"][5].color,
        "Up color": "transparent",
        "Down color": "transparent",
        "Left color": cubeletPlacement["L"][3].color,
        "Right color": "transparent",
        "position": { "x": -1, "y": 0, "z": -1 }
    },
    "4": {
        "Front color": "transparent",
        "Back color": "transparent",
        "Up color": "transparent",
        "Down color": "transparent",
        "Left color": cubeletPlacement["L"][4].color,
        "Right color": "transparent",
        "position": { "x": -1, "y": 0, "z": 0 }
    },
    "5": {
        "Front color": cubeletPlacement["F"][3].color,
        "Back color": "transparent",
        "Up color": "transparent",
        "Down color": "transparent",
        "Left color": cubeletPlacement["L"][5].color,
        "Right color": "transparent",
        "position": { "x": -1, "y": 0, "z": 1 }
    },
    "6": {
        "Front color": "transparent",
        "Back color": cubeletPlacement["B"][2].color,
        "Up color": cubeletPlacement["U"][0].color,
        "Down color": "transparent",
        "Left color": cubeletPlacement["L"][0].color,
        "Right color": "transparent",
        "position": { "x": -1, "y": 1, "z": -1 }
    },
    "7": {
        "Front color": "transparent",
        "Back color": "transparent",
        "Up color": cubeletPlacement["U"][3].color,
        "Down color": "transparent",
        "Left color": cubeletPlacement["L"][1].color,
        "Right color": "transparent",
        "position": { "x": -1, "y": 1, "z": 0 }
    },
    "8": {
        "Front color": cubeletPlacement["F"][0].color,
        "Back color": "transparent",
        "Up color": cubeletPlacement["U"][6].color,
        "Down color": "transparent",
        "Left color": cubeletPlacement["L"][2].color,
        "Right color": "transparent",
        "position": { "x": -1, "y": 1, "z": 1 }
    },
    "9": {
        "Front color": "transparent",
        "Back color": cubeletPlacement["B"][7].color,
        "Up color": "transparent",
        "Down color": cubeletPlacement["D"][7].color,
        "Left color": "transparent",
        "Right color": "transparent",
        "position": { "x": 0, "y": -1, "z": -1 }
    },
    "10": {
        "Front color": "transparent",
        "Back color": "transparent",
        "Up color": "transparent",
        "Down color": cubeletPlacement["D"][4].color,
        "Left color": "transparent",
        "Right color": "transparent",
        "position": { "x": 0, "y": -1, "z": 0 }
    },
    "11": {
        "Front color": cubeletPlacement["F"][7].color,
        "Back color": "transparent",
        "Up color": "transparent",
        "Down color": cubeletPlacement["D"][1].color,
        "Left color": "transparent",
        "Right color": "transparent",
        "position": { "x": 0, "y": -1, "z": 1 }
    },
    "12": {
        "Front color": "transparent",
        "Back color": cubeletPlacement["B"][4].color,
        "Up color": "transparent",
        "Down color": "transparent",
        "Left color": "transparent",
        "Right color": "transparent",
        "position": { "x": 0, "y": 0, "z": -1 }
    },
    "13": {
        "Front color": cubeletPlacement["F"][4].color,
        "Back color": "transparent",
        "Up color": "transparent",
        "Down color": "transparent",
        "Left color": "transparent",
        "Right color": "transparent",
        "position": { "x": 0, "y": 0, "z": 1 }
    },
    "14": {
        "Front color": "transparent",
        "Back color": cubeletPlacement["B"][1].color,
        "Up color": cubeletPlacement["U"][1].color,
        "Down color": "transparent",
        "Left color": "transparent",
        "Right color": "transparent",
        "position": { "x": 0, "y": 1, "z": -1 }
    },
    "15": {
        "Front color": "transparent",
        "Back color": "transparent",
        "Up color": cubeletPlacement["U"][4].color,
        "Down color": "transparent",
        "Left color": "transparent",
        "Right color": "transparent",
        "position": { "x": 0, "y": 1, "z": 0 }
    },
    "16": {
        "Front color": cubeletPlacement["F"][1].color,
        "Back color": "transparent",
        "Up color": cubeletPlacement["U"][7].color,
        "Down color": "transparent",
        "Left color": "transparent",
        "Right color": "transparent",
        "position": { "x": 0, "y": 1, "z": 1 }
    },
    "17": {
        "Front color": "transparent",
        "Back color": cubeletPlacement["B"][6].color,
        "Up color": "transparent",
        "Down color": cubeletPlacement["D"][8].color,
        "Left color": "transparent",
        "Right color": cubeletPlacement["R"][8].color,
        "position": { "x": 1, "y": -1, "z": -1 }
    },
    "18": {
        "Front color": "transparent",
        "Back color": "transparent",
        "Up color": "transparent",
        "Down color": cubeletPlacement["D"][5].color,
        "Left color": "transparent",
        "Right color": cubeletPlacement["R"][7],
        "position": { "x": 1, "y": -1, "z": 0 }
    },
    "19": {
        "Front color": cubeletPlacement["F"][8].color,
        "Back color": "transparent",
        "Up color": "transparent",
        "Down color": cubeletPlacement["D"][2].color,
        "Left color": "transparent",
        "Right color": cubeletPlacement["R"][6].color,
        "position": { "x": 1, "y": -1, "z": 1 }
    },
    "20": {
        "Front color": "transparent",
        "Back color": cubeletPlacement["B"][3].color,
        "Up color": "transparent",
        "Down color": "transparent",
        "Left color": "transparent",
        "Right color": cubeletPlacement["R"][5].color,
        "position": { "x": 1, "y": 0, "z": -1 }
    },
    "21": {
        "Front color": "transparent",
        "Back color": "transparent",
        "Up color": "transparent",
        "Down color": "transparent",
        "Left color": "transparent",
        "Right color": cubeletPlacement["R"][4].color,
        "position": { "x": 1, "y": 0, "z": 0 }
    },
    "22": {
        "Front color": cubeletPlacement["F"][5].color,
        "Back color": "transparent",
        "Up color": "transparent",
        "Down color": "transparent",
        "Left color": "transparent",
        "Right color": cubeletPlacement["R"][3].color,
        "position": { "x": 1, "y": 0, "z": 1 }
    },
    "23": {
        "Front color": "transparent",
        "Back color": cubeletPlacement["B"][0].color,
        "Up color": cubeletPlacement["U"][2].color,
        "Down color": "transparent",
        "Left color": "transparent",
        "Right color": cubeletPlacement["R"][2].color,
        "position": { "x": 1, "y": 1, "z": -1 }
    },
    "24": {
        "Front color": "transparent",
        "Back color": "transparent",
        "Up color": cubeletPlacement["U"][5].color,
        "Down color": "transparent",
        "Left color": "transparent",
        "Right color": cubeletPlacement["R"][1],    
        "position": { "x": 1, "y": 1, "z": 0 }
    },
    "25": {
        "Front color": cubeletPlacement["F"][2],
        "Back color": "transparent",
        "Up color": cubeletPlacement["U"][8],
        "Down color": "transparent",
        "Left color": "transparent",
        "Right color": cubeletPlacement["R"][0],
        "position": { "x": 1, "y": 1, "z": 1}
    }
};


function getColorHex(colorName) {
    switch (colorName) {
        case "red":
            return 0xFF0000; // Red color in hexadecimal
        case "green":
            return 0x00FF00; // Green color in hexadecimal
        case "blue":
            return 0x0000FF; // Blue color in hexadecimal
        case "white":
            return 0xFFFFFF; // White color in hexadecimal
        case "yellow":
            return 0xFFFF00; // Yellow color in hexadecimal
        case "orange":
            return 0xFFA500; // Orange color in hexadecimal
        case "transparent":
            return 0x00000000; // Transparent color in hexadecimal
        // Add more cases for other colors as needed
        default:
            return 0x000000; // Default to black if color is not recognized
    }
}

// Loop through cubeletPlacement3D and create cubelets
const cubeletSize = 1; // Adjust this value as needed
const spacing = 0.01;

for (const cubeletID in cubeletPlacement3D) {
    const cubeletData = cubeletPlacement3D[cubeletID];
    
    // Create a cubelet mesh with the specified colors
    const cubeletGeometry = new THREE.BoxGeometry(cubeletSize, cubeletSize, cubeletSize);
    
    const cubeletMaterials = [
        new THREE.MeshBasicMaterial({ color: getColorHex(cubeletData["Front color"]) }),
        new THREE.MeshBasicMaterial({ color: getColorHex(cubeletData["Back color"]) }),
        new THREE.MeshBasicMaterial({ color: getColorHex(cubeletData["Up color"]) }),
        new THREE.MeshBasicMaterial({ color: getColorHex(cubeletData["Down color"]) }),
        new THREE.MeshBasicMaterial({ color: getColorHex(cubeletData["Left color"]) }),
        new THREE.MeshBasicMaterial({ color: getColorHex(cubeletData["Right color"]) })
    ];
    console.log("colors: " + cubeletData["Front color"] + ", " + cubeletData["Back color"] + ", " + cubeletData["Up color"] + ", " + cubeletData["Down color"] + ", " + cubeletData["Left color"] + ", " + cubeletData["Right color"]);
    const cubelet = new THREE.Mesh(cubeletGeometry, cubeletMaterials);
    
    
    // Position the cubelet
    const position = cubeletData["position"];
    cubelet.position.set(position.x * (cubeletSize+spacing), position.y * (cubeletSize +spacing), position.z*(cubeletSize + spacing));

    const edgesGeometry = new THREE.EdgesGeometry(cubeletGeometry);
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    
    console.log(cubeletID, position);
    scene.add(cubelet);
    scene.add(edges);
}


camera.position.set(5, 5, 10);
camera.lookAt(0, 0, 0); // Look at the center of the scene

// Render the scene with your existing renderer and camera
function animate() {
    requestAnimationFrame(animate);


    controls.update();


    renderer.render(scene, camera);
}

animate();



// Accessing properties of a cubelet, for example:
console.log(cubeletPlacement3D["0"]["Front color"]); // Returns THREE.Color(1, 1, 1, 0)
console.log(cubeletPlacement3D["0"]["Back color"]); // Returns cubeletPlacement["B"][8]
console.log(cubeletPlacement3D["0"]["Up color"]); // Returns THREE.Color(1, 1, 1, 0)
console.log(cubeletPlacement3D["0"]["Down color"]); // Returns cubeletPlacement["D"][6]
console.log(cubeletPlacement3D["0"]["Left color"]); // Returns cubeletPlacement["L"][6]
console.log(cubeletPlacement3D["0"]["Right color"]); // Returns THREE.Color(1, 1, 1, 0)
