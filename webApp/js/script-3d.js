const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
const controls = new THREE.OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

// set background color to white
renderer.setClearColor(0xffffff, 0);
document.body.appendChild(renderer.domElement);

// Set the initial position for the controls
controls.target.set(0, 0, 0);
controls.enablePan = true; // Disable panning (i.e. right click + drag)
controls.enableZoom = true; // Disable zooming
controls.enableRotate = true; // Disable rotation
controls.enabled = true; // Disable controls altogether

// Set additional options for the controls (optional)
controls.enableDamping = true; // Enable damping for smoother camera movement
controls.dampingFactor = 0.05; // Adjust damping factor as needed
controls.rotateSpeed = 0.8; // Adjust rotate speed as needed
controls.zoomSpeed = 1.2; // Adjust zoom speed as needed

function update3dCube() {
    var cubelet_position = {
        "F": [
            { x: -1, y: 1, z: 1 },
            { x: 0, y: 1, z: 1 },
            { x: 1, y: 1, z: 1 },
            { x: -1, y: 0, z: 1 },
            { x: 0, y: 0, z: 1 },
            { x: 1, y: 0, z: 1 },
            { x: -1, y: -1, z: 1 },
            { x: 0, y: -1, z: 1 },
            { x: 1, y: -1, z: 1 }
        ],
        "B": [
            { x: -1, y: 1, z: -1 },
            { x: 0, y: 1, z: -1 },
            { x: 1, y: 1, z: -1 },
            { x: -1, y: 0, z: -1 },
            { x: 0, y: 0, z: -1 },
            { x: 1, y: 0, z: -1 },
            { x: -1, y: -1, z: -1 },
            { x: 0, y: -1, z: -1 },
            { x: 1, y: -1, z: -1 }
        ],
        "U": [
            { x: -1, y: 1, z: -1 },
            { x: 0, y: 1, z: -1 },
            { x: 1, y: 1, z: -1 },
            { x: -1, y: 1, z: 0 },
            { x: 0, y: 1, z: 0 },
            { x: 1, y: 1, z: 0 },
            { x: -1, y: 1, z: 1 },
            { x: 0, y: 1, z: 1 },
            { x: 1, y: 1, z: 1 }
        ],
        "D": [
            { x: -1, y: -1, z: -1 },
            { x: 0, y: -1, z: -1 },
            { x: 1, y: -1, z: -1 },
            { x: -1, y: -1, z: 0 },
            { x: 0, y: -1, z: 0 },
            { x: 1, y: -1, z: 0 },
            { x: -1, y: -1, z: 1 },
            { x: 0, y: -1, z: 1 },
            { x: 1, y: -1, z: 1 }
        ],
        "L": [
            { x: -1, y: 1, z: -1 },
            { x: -1, y: 1, z: 0 },
            { x: -1, y: 1, z: 1 },
            { x: -1, y: 0, z: -1 },
            { x: -1, y: 0, z: 0 },
            { x: -1, y: 0, z: 1 },
            { x: -1, y: 1, z: -1 },
            { x: -1, y: 1, z: 0 },
            { x: -1, y: 1, z: 1 }
        ],
        "R": [
            { x: 1, y: 1, z: -1 },
            { x: 1, y: 1, z: 0 },
            { x: 1, y: 1, z: 1 },
            { x: 1, y: 0, z: -1 },
            { x: 1, y: 0, z: 0 },
            { x: 1, y: 0, z: 1 },
            { x: 1, y: 1, z: -1 },
            { x: 1, y: 1, z: 0 },
            { x: 1, y: 1, z: 1 }
        ]
    };
    var cubelet_placement_3d = {
        "0": {
            "Front color": "transparent",
            "Back color": cubelet_placement["B"][8].color,
            "Up color": "transparent",
            "Down color": cubelet_placement["D"][6].color,
            "Left color": cubelet_placement["L"][6].color,
            "Right color": "transparent",
            "position": { "x": -1, "y": -1, "z": -1 }
        },
        "1": {
            "Front color": "transparent",
            "Back color": "transparent",
            "Up color": "transparent",
            "Down color": cubelet_placement["D"][3].color,
            "Left color": cubelet_placement["L"][7].color,
            "Right color": "transparent",
            "position": { "x": -1, "y": -1, "z": 0 }

        },
        "2": {
            "Front color": cubelet_placement["F"][6].color,
            "Back color": "transparent",
            "Up color": "transparent",
            "Down color": cubelet_placement["D"][0].color,
            "Left color": cubelet_placement["L"][8].color,
            "Right color": "transparent",
            "position": { "x": -1, "y": -1, "z": 1 }
        },
        "3": {
            "Front color": "transparent",
            "Back color": cubelet_placement["B"][5].color,
            "Up color": "transparent",
            "Down color": "transparent",
            "Left color": cubelet_placement["L"][3].color,
            "Right color": "transparent",
            "position": { "x": -1, "y": 0, "z": -1 }
        },
        "4": {
            "Front color": "transparent",
            "Back color": "transparent",
            "Up color": "transparent",
            "Down color": "transparent",
            "Left color": cubelet_placement["L"][4].color,
            "Right color": "transparent",
            "position": { "x": -1, "y": 0, "z": 0 }
        },
        "5": {
            "Front color": cubelet_placement["F"][3].color,
            "Back color": "transparent",
            "Up color": "transparent",
            "Down color": "transparent",
            "Left color": cubelet_placement["L"][5].color,
            "Right color": "transparent",
            "position": { "x": -1, "y": 0, "z": 1 }
        },
        "6": {
            "Front color": "transparent",
            "Back color": cubelet_placement["B"][2].color,
            "Up color": cubelet_placement["U"][0].color,
            "Down color": "transparent",
            "Left color": cubelet_placement["L"][0].color,
            "Right color": "transparent",
            "position": { "x": -1, "y": 1, "z": -1 }
        },
        "7": {
            "Front color": "transparent",
            "Back color": "transparent",
            "Up color": cubelet_placement["U"][3].color,
            "Down color": "transparent",
            "Left color": cubelet_placement["L"][1].color,
            "Right color": "transparent",
            "position": { "x": -1, "y": 1, "z": 0 }
        },
        "8": {
            "Front color": cubelet_placement["F"][0].color,
            "Back color": "transparent",
            "Up color": cubelet_placement["U"][6].color,
            "Down color": "transparent",
            "Left color": cubelet_placement["L"][2].color,
            "Right color": "transparent",
            "position": { "x": -1, "y": 1, "z": 1 }
        },
        "9": {
            "Front color": "transparent",
            "Back color": cubelet_placement["B"][7].color,
            "Up color": "transparent",
            "Down color": cubelet_placement["D"][7].color,
            "Left color": "transparent",
            "Right color": "transparent",
            "position": { "x": 0, "y": -1, "z": -1 }
        },
        "10": {
            "Front color": "transparent",
            "Back color": "transparent",
            "Up color": "transparent",
            "Down color": cubelet_placement["D"][4].color,
            "Left color": "transparent",
            "Right color": "transparent",
            "position": { "x": 0, "y": -1, "z": 0 }
        },
        "11": {
            "Front color": cubelet_placement["F"][7].color,
            "Back color": "transparent",
            "Up color": "transparent",
            "Down color": cubelet_placement["D"][1].color,
            "Left color": "transparent",
            "Right color": "transparent",
            "position": { "x": 0, "y": -1, "z": 1 }
        },
        "12": {
            "Front color": "transparent",
            "Back color": cubelet_placement["B"][4].color,
            "Up color": "transparent",
            "Down color": "transparent",
            "Left color": "transparent",
            "Right color": "transparent",
            "position": { "x": 0, "y": 0, "z": -1 }
        },
        "13": {
            "Front color": cubelet_placement["F"][4].color,
            "Back color": "transparent",
            "Up color": "transparent",
            "Down color": "transparent",
            "Left color": "transparent",
            "Right color": "transparent",
            "position": { "x": 0, "y": 0, "z": 1 }
        },
        "14": {
            "Front color": "transparent",
            "Back color": cubelet_placement["B"][1].color,
            "Up color": cubelet_placement["U"][1].color,
            "Down color": "transparent",
            "Left color": "transparent",
            "Right color": "transparent",
            "position": { "x": 0, "y": 1, "z": -1 }
        },
        "15": {
            "Front color": "transparent",
            "Back color": "transparent",
            "Up color": cubelet_placement["U"][4].color,
            "Down color": "transparent",
            "Left color": "transparent",
            "Right color": "transparent",
            "position": { "x": 0, "y": 1, "z": 0 }
        },
        "16": {
            "Front color": cubelet_placement["F"][1].color,
            "Back color": "transparent",
            "Up color": cubelet_placement["U"][7].color,
            "Down color": "transparent",
            "Left color": "transparent",
            "Right color": "transparent",
            "position": { "x": 0, "y": 1, "z": 1 }
        },
        "17": {
            "Front color": "transparent",
            "Back color": cubelet_placement["B"][6].color,
            "Up color": "transparent",
            "Down color": cubelet_placement["D"][8].color,
            "Left color": "transparent",
            "Right color": cubelet_placement["R"][8].color,
            "position": { "x": 1, "y": -1, "z": -1 }
        },
        "18": {
            "Front color": "transparent",
            "Back color": "transparent",
            "Up color": "transparent",
            "Down color": cubelet_placement["D"][5].color,
            "Left color": "transparent",
            "Right color": cubelet_placement["R"][7].color,
            "position": { "x": 1, "y": -1, "z": 0 }
        },
        "19": {
            "Front color": cubelet_placement["F"][8].color,
            "Back color": "transparent",
            "Up color": "transparent",
            "Down color": cubelet_placement["D"][2].color,
            "Left color": "transparent",
            "Right color": cubelet_placement["R"][6].color,
            "position": { "x": 1, "y": -1, "z": 1 }
        },
        "20": {
            "Front color": "transparent",
            "Back color": cubelet_placement["B"][3].color,
            "Up color": "transparent",
            "Down color": "transparent",
            "Left color": "transparent",
            "Right color": cubelet_placement["R"][5].color,
            "position": { "x": 1, "y": 0, "z": -1 }
        },
        "21": {
            "Front color": "transparent",
            "Back color": "transparent",
            "Up color": "transparent",
            "Down color": "transparent",
            "Left color": "transparent",
            "Right color": cubelet_placement["R"][4].color,
            "position": { "x": 1, "y": 0, "z": 0 }
        },
        "22": {
            "Front color": cubelet_placement["F"][5].color,
            "Back color": "transparent",
            "Up color": "transparent",
            "Down color": "transparent",
            "Left color": "transparent",
            "Right color": cubelet_placement["R"][3].color,
            "position": { "x": 1, "y": 0, "z": 1 }
        },
        "23": {
            "Front color": "transparent",
            "Back color": cubelet_placement["B"][0].color,
            "Up color": cubelet_placement["U"][2].color,
            "Down color": "transparent",
            "Left color": "transparent",
            "Right color": cubelet_placement["R"][2].color,
            "position": { "x": 1, "y": 1, "z": -1 }
        },
        "24": {
            "Front color": "transparent",
            "Back color": "transparent",
            "Up color": cubelet_placement["U"][5].color,
            "Down color": "transparent",
            "Left color": "transparent",
            "Right color": cubelet_placement["R"][1].color,
            "position": { "x": 1, "y": 1, "z": 0 }
        },
        "25": {
            "Front color": cubelet_placement["F"][2].color,
            "Back color": "transparent",
            "Up color": cubelet_placement["U"][8].color,
            "Down color": "transparent",
            "Left color": "transparent",
            "Right color": cubelet_placement["R"][0].color,
            "position": { "x": 1, "y": 1, "z": 1 }
        }
    };

    function getColorHex(color_name) {
        switch (color_name) {
            case "red":
                return 0xed3030; // Red color in hexadecimal
            case "green":
                return 0x58d568; // Green color in hexadecimal
            case "blue":
                return 0x1c5ffe; // Blue color in hexadecimal
            case "white":
                return 0xFFFFFF; // White color in hexadecimal
            case "yellow":
                return 0xf2f215; // Yellow color in hexadecimal
            case "orange":
                return 0xe89e15; // Orange color in hexadecimal
            case "Transparent":
                return 0x00000000; // Transparent color in hexadecimal
            default:
                return 0x000000; // Default to black if color is not recognized
        }
    }

    // Loop through cubeletPlacement3D and create cubelets
    const cubelet_size = 1; // Adjust this value as needed
    const spacing = 0.01;

    for (let i = scene.children.length - 1; i >= 0; i--) {
        const obj = scene.children[i];
        scene.remove(obj);
    }

    for (const cubelet_id in cubelet_placement_3d) {
        const cubelet_data = cubelet_placement_3d[cubelet_id];

        // Create a cubelet mesh with the specified colors
        const cubelet_geometry = new THREE.BoxGeometry(cubelet_size, cubelet_size, cubelet_size);

        const cubelet_materials = [
            new THREE.MeshBasicMaterial({ color: getColorHex(cubelet_data["Right color"]) }),
            new THREE.MeshBasicMaterial({ color: getColorHex(cubelet_data["Left color"]) }),
            new THREE.MeshBasicMaterial({ color: getColorHex(cubelet_data["Up color"]) }),
            new THREE.MeshBasicMaterial({ color: getColorHex(cubelet_data["Down color"]) }),
            new THREE.MeshBasicMaterial({ color: getColorHex(cubelet_data["Front color"]) }),
            new THREE.MeshBasicMaterial({ color: getColorHex(cubelet_data["Back color"]) }),
        ];
        const cubelet_mesh = new THREE.Mesh(cubelet_geometry, cubelet_materials);


        // Position the cubelet
        const position = cubelet_data["position"];
        cubelet_mesh.position.set(position.x * (cubelet_size + spacing), position.y * (cubelet_size + spacing), position.z * (cubelet_size + spacing));

        const edges_geometry = new THREE.EdgesGeometry(cubelet_geometry);
        const edges_material = new THREE.LineBasicMaterial({ color: 0x000000 });
        const edges = new THREE.LineSegments(edges_geometry, edges_material);

        scene.add(cubelet_mesh);
        scene.add(edges);
    }


}

// var cubelets_positions = {
//     "F": [
//         { x: -1, y: 1, z: 1 },
//         { x: 0, y: 1, z: 1 },
//         { x: 1, y: 1, z: 1 },
//         { x: -1, y: 0, z: 1 },
//         { x: 0, y: 0, z: 1 },
//         { x: 1, y: 0, z: 1 },
//         { x: -1, y: -1, z: 1 },
//         { x: 0, y: -1, z: 1 },
//         { x: 1, y: -1, z: 1 }
//     ],
//     "B": [  
//         { x: -1, y: 1, z: -1 },
//         { x: 0, y: 1, z: -1 },
//         { x: 1, y: 1, z: -1 },
//         { x: -1, y: 0, z: -1 },
//         { x: 0, y: 0, z: -1 },
//         { x: 1, y: 0, z: -1 },
//         { x: -1, y: -1, z: -1 },
//         { x: 0, y: -1, z: -1 },
//         { x: 1, y: -1, z: -1 }
//     ],
//     "U": [
//         { x: -1, y: 1, z: -1 },
//         { x: 0, y: 1, z: -1 },
//         { x: 1, y: 1, z: -1 },
//         { x: -1, y: 1, z: 0 },
//         { x: 0, y: 1, z: 0 },
//         { x: 1, y: 1, z: 0 },
//         { x: -1, y: 1, z: 1 },
//         { x: 0, y: 1, z: 1 },
//         { x: 1, y: 1, z: 1 }
//     ],
//     "D": [
//         { x: -1, y: -1, z: -1 },
//         { x: 0, y: -1, z: -1 },
//         { x: 1, y: -1, z: -1 },
//         { x: -1, y: -1, z: 0 },
//         { x: 0, y: -1, z: 0 },
//         { x: 1, y: -1, z: 0 },
//         { x: -1, y: -1, z: 1 },
//         { x: 0, y: -1, z: 1 },
//         { x: 1, y: -1, z: 1 }
//     ],
//     "L": [
//         { x: -1, y: 1, z: -1 },
//         { x: -1, y: 1, z: 0 },
//         { x: -1, y: 1, z: 1 },
//         { x: -1, y: 0, z: -1 },
//         { x: -1, y: 0, z: 0 },
//         { x: -1, y: 0, z: 1 },
//         { x: -1, y: 1, z: -1 },
//         { x: -1, y: 1, z: 0 },
//         { x: -1, y: 1, z: 1 }
//     ],
//     "R": [
//         { x: 1, y: 1, z: -1 },
//         { x: 1, y: 1, z: 0 },
//         { x: 1, y: 1, z: 1 },
//         { x: 1, y: 0, z: -1 },
//         { x: 1, y: 0, z: 0 },
//         { x: 1, y: 0, z: 1 },
//         { x: 1, y: 1, z: -1 },
//         { x: 1, y: 1, z: 0 },
//         { x: 1, y: 1, z: 1 }
//     ]
// };

// function rotation(face, direction) {
//     const face_cubelets = cubelets_positions[face];
//     const elements_to_remove = []; // Array to store elements for removal
//     const position_tolerance = 0.1; // Adjust this value as needed

//     // Find and attach the cubelets within tolerance
//     for (const cubelet of face_cubelets) {
//         scene.traverse(function (object) {
//             if (object instanceof THREE.Mesh) {
//                 const cubelet_position = object.position;
//                 const within_tolerance = (
//                     Math.abs(cubelet_position.x - cubelet.x) <= position_tolerance &&
//                     Math.abs(cubelet_position.y - cubelet.y) <= position_tolerance &&
//                     Math.abs(cubelet_position.z - cubelet.z) <= position_tolerance
//                 );
//                 if (within_tolerance) {
//                     elements_to_remove.push(object); // Save reference for removal
//                 }
//             }
//         });
//     }

//     let rotation_axis;
//     if (face === "F" || face === "B") {
//         rotation_axis = new THREE.Vector3(0, 0, 1);
//     } else if (face === "U" || face === "D") {
//         rotation_axis = new THREE.Vector3(0, 1, 0);
//     } else if (face === "L" || face === "R") {
//         rotation_axis = new THREE.Vector3(1, 0, 0);
//     }

//     const angle = direction === "clockwise" ? Math.PI / 2 : -Math.PI / 2;
//     scene.updateMatrixWorld(); // Ensure the scene's matrix is updated
//     scene.rotateOnWorldAxis(rotation_axis, angle);

//     // Clean up and remove the elements saved for removal
//     for (const element of elements_to_remove) {
//         scene.remove(element);
//     }

//     update3dCube(); // Update the cube with the new positions
// }


// function findCubeletWithinTolerance(target_position, tolerance) {
//     for (const object of scene.children) {
//         if (object instanceof THREE.Mesh) {
//             const cubelet_position = object.position;
//             const within_tolerance = (
//                 Math.abs(cubelet_position.x - target_position.x) <= tolerance &&
//                 Math.abs(cubelet_position.y - target_position.y) <= tolerance &&
//                 Math.abs(cubelet_position.z - target_position.z) <= tolerance
//             );

//             if (within_tolerance) {
//                 return object;
//             }
//         }
//     }
//     return null; // No matching cubelet found
// }

camera.position.set(4, 3, 4);
camera.lookAt(0, 1, 0); // Look at the center of the scene

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

// Render the scene with your existing renderer and camera
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
update3dCube();[]