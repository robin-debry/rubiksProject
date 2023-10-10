var cubelet_placement = {
    "U": [
        { id: "6", color: "white" }, { id: "14", color: "white" }, { id: "23", color: "white" },
        { id: "7", color: "white" }, { id: "15", color: "white" }, { id: "24", color: "white" },
        { id: "8", color: "white" }, { id: "16", color: "white" }, { id: "25", color: "white" }
    ],
    "L": [
        { id: "6", color: "orange" }, { id: "7", color: "orange" }, { id: "8", color: "orange" },
        { id: "3", color: "orange" }, { id: "4", color: "orange" }, { id: "5", color: "orange" },
        { id: "0", color: "orange" }, { id: "1", color: "orange" }, { id: "2", color: "orange" }
    ],
    "F": [
        { id: "8", color: "green" }, { id: "16", color: "green" }, { id: "25", color: "green" },
        { id: "5", color: "green" }, { id: "13", color: "green" }, { id: "22", color: "green" },
        { id: "2", color: "green" }, { id: "11", color: "green" }, { id: "19", color: "green" }
    ],
    "R": [
        { id: "25", color: "red" }, { id: "24", color: "red" }, { id: "23", color: "red" },
        { id: "22", color: "red" }, { id: "21", color: "red" }, { id: "20", color: "red" },
        { id: "19", color: "red" }, { id: "18", color: "red" }, { id: "17", color: "red" }
    ],
    "B": [
        { id: "23", color: "blue" }, { id: "14", color: "blue" }, { id: "6", color: "blue" },
        { id: "20", color: "blue" }, { id: "12", color: "blue" }, { id: "3", color: "blue" },
        { id: "17", color: "blue" }, { id: "9", color: "blue" }, { id: "0", color: "blue" }
    ],
    "D": [
        { id: "2", color: "yellow" }, { id: "11", color: "yellow" }, { id: "19", color: "yellow" },
        { id: "1", color: "yellow" }, { id: "10", color: "yellow" }, { id: "18", color: "yellow" },
        { id: "0", color: "yellow" }, { id: "9", color: "yellow" }, { id: "17", color: "yellow" }
    ]
};

// Helper function to create a table for a face
function createFaceTable(face_id) {
    const face_table = document.getElementById(`face-${face_id}`);
    face_table.innerHTML = ""; // Clear the table
    const face_data = cubelet_placement[face_id];


    for (let i = 0; i < 3; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement("td");
            const cubelet = face_data[i * 3 + j];
            cell.textContent = cubelet.id;
            switch (cubelet.color) {
                case "white":
                    cell.style.backgroundColor = "#ffffff";
                    break;
                case "orange":
                    cell.style.backgroundColor = "#e89e15";
                    break;
                case "green":
                    cell.style.backgroundColor = "#58d568";
                    break;
                case "red":
                    cell.style.backgroundColor = "#ed3030";
                    break;
                case "blue":
                    cell.style.backgroundColor = "#1c5ffe";
                    break;
                case "yellow":
                    cell.style.backgroundColor = "#f2f215";
                    break;
            }
            row.appendChild(cell);
        }
        face_table.appendChild(row);
    }
}

// Refactored function to create tables for all faces
function createAllFaceTables() {
    const faces = Object.keys(cubelet_placement);
    for (const face of faces) {
        createFaceTable(face);
    }
}


// Call the refactored function to create tables for all faces
createAllFaceTables();

document.getElementById('reset-cube').addEventListener('click', clearCube);
document.getElementById('step-forward').addEventListener('click', executeNextStep);
document.getElementById('step-backward').addEventListener('click', executePreviousStep);
document.getElementById('complete-move').addEventListener('click', executeCompleteAlgorithm);

function clearCube() {
    cubelet_placement = { "U": [{ id: "6", color: "white" }, { id: "14", color: "white" }, { id: "23", color: "white" }, { id: "7", color: "white" }, { id: "15", color: "white" }, { id: "24", color: "white" }, { id: "8", color: "white" }, { id: "16", color: "white" }, { id: "25", color: "white" }], "L": [{ id: "6", color: "orange" }, { id: "7", color: "orange" }, { id: "8", color: "orange" }, { id: "3", color: "orange" }, { id: "4", color: "orange" }, { id: "5", color: "orange" }, { id: "0", color: "orange" }, { id: "1", color: "orange" }, { id: "2", color: "orange" }], "F": [{ id: "8", color: "green" }, { id: "16", color: "green" }, { id: "25", color: "green" }, { id: "5", color: "green" }, { id: "13", color: "green" }, { id: "22", color: "green" }, { id: "2", color: "green" }, { id: "11", color: "green" }, { id: "19", color: "green" }], "R": [{ id: "25", color: "red" }, { id: "24", color: "red" }, { id: "23", color: "red" }, { id: "22", color: "red" }, { id: "21", color: "red" }, { id: "20", color: "red" }, { id: "19", color: "red" }, { id: "18", color: "red" }, { id: "17", color: "red" }], "B": [{ id: "23", color: "blue" }, { id: "14", color: "blue" }, { id: "6", color: "blue" }, { id: "20", color: "blue" }, { id: "12", color: "blue" }, { id: "3", color: "blue" }, { id: "17", color: "blue" }, { id: "9", color: "blue" }, { id: "0", color: "blue" }], "D": [{ id: "2", color: "yellow" }, { id: "11", color: "yellow" }, { id: "19", color: "yellow" }, { id: "1", color: "yellow" }, { id: "10", color: "yellow" }, { id: "18", color: "yellow" }, { id: "0", color: "yellow" }, { id: "9", color: "yellow" }, { id: "17", color: "yellow" }] };
    current_step = 0;

    createAllFaceTables();
    update3dCube();
}

// Add these variables at the beginning of your script

let current_step = 0;

const input_element = document.getElementById('algs-input');
var input = input_element.value.toUpperCase();
var input = input.replace(/([A-Z])(2)/g, '$1 $1');
const moves_array = input.split(' ');


// Function to execute the next step of the algorithm
function executeNextStep() {
    if (current_step < moves_array.length) {
        const move = moves_array[current_step];

        // extract the movement and the parameter if there is one
        const movement = move.slice(0, 1);
        const parameter = move.slice(1);

        rotate(movement, parameter);

        current_step++;
        update3dCube();
        createAllFaceTables();
    }
}

// Function to execute the previous step of the algorithm
function executePreviousStep() {
    if (current_step > 0) {
        current_step--;
        const move = moves_array[current_step];

        // extract the movement and the parameter if there is one
        const movement = move.slice(0, 1);
        const parameter = move.slice(1);

        // do the opposite of the move
        if (parameter == "") {
            // rotate the face F one time in the counter-clockwise direction
            rotate(movement, "'");
        } else if (parameter == "'") {
            // rotate the face F one time in the clockwise direction
            rotate(movement, "");
        } else if (parameter == "2") {
            // rotate the face F two times in the counter-clockwise direction
            rotate(movement, "2");
        }
    
        update3dCube();
        createAllFaceTables();
    }
}

// Function to execute the complete algorithm and wait 1 second between each step
function executeCompleteAlgorithm() {
    clearCube();
    const interval = setInterval(() => {
        if (current_step < moves_array.length) {
            const move = moves_array[current_step];

            // extract the movement and the parameter if there is one
            const movement = move.slice(0, 1);
            const parameter = move.slice(1);

            rotate(movement, parameter);

            current_step++;
            update3dCube();
            createAllFaceTables();
        } else {
            clearInterval(interval);
        }
    }, 500);
}

function rotate(movement, parameter) {
    if (movement == "F") {
        if (parameter == "") {
            // rotate the face F one time in the clockwise direction
            rotateF();
        } else if (parameter == "'") {
            // rotate the face F one time in the counter-clockwise direction
            rotateF();
            rotateF();
            rotateF();
        }
    } else if (movement == "B") {
        if (parameter == "") {
            // rotate the face B one time in the clockwise direction
            rotateB();
        } else if (parameter == "'") {
            // rotate the face B one time in the counter-clockwise direction
            rotateB();
            rotateB();
            rotateB();
        }
    } else if (movement == "U") {
        if (parameter == "") {
            // rotate the face U one time in the clockwise direction
            rotateU();
        } else if (parameter == "'") {
            // rotate the face U one time in the counter-clockwise direction
            rotateU();
            rotateU();
            rotateU();
        }
    } else if (movement == "D") {
        if (parameter == "") {
            // rotate the face D one time in the clockwise direction
            rotateD();
        } else if (parameter == "'") {
            // rotate the face D one time in the counter-clockwise direction
            rotateD();
            rotateD();
            rotateD();
        }
    } else if (movement == "L") {
        if (parameter == "") {
            // rotate the face L one time in the clockwise direction
            rotateL();
        } else if (parameter == "'") {
            // rotate the face L one time in the counter-clockwise direction
            rotateL();
            rotateL();
            rotateL();
        }
    } else if (movement == "R") {
        if (parameter == "") {
            // rotate the face R one time in the clockwise direction
            rotateR();
        } else if (parameter == "'") {
            // rotate the face R one time in the counter-clockwise direction
            rotateR();
            rotateR();
            rotateR();
        }
    } else if (movement == "X") {
        if (parameter == "") {
            // rotate the cube in the X axis one time in the clockwise direction
            rotateX();
            rotateX();
            rotateX();
        } else if (parameter == "'") {
            // rotate the cube in the X axis one time in the counter-clockwise direction
            rotateX();
        }
    } else if (movement == "Y") {
        if (parameter == "") {
            // rotate the cube in the Y axis one time in the clockwise direction
            rotateY();
            rotateY();
            rotateY();
        } else if (parameter == "'") {
            // rotate the cube in the Y axis one time in the counter-clockwise direction
            rotateY();
        }
    } else if (movement == "Z") {
        if (parameter == "") {
            // rotate the cube in the Z axis one time in the clockwise direction
            rotateZ();
            rotateZ();
            rotateZ();
        } else if (parameter == "'") {
            // rotate the cube in the Z axis one time in the counter-clockwise direction
            rotateZ();
        }
    }
    update3dCube()
    createAllFaceTables();
}

function rotateF() {
    const original_cube_data = JSON.parse(JSON.stringify(cubelet_placement)); // Copy the original cube data

    // Rotate the "F" face data
    cubelet_placement["F"][0] = original_cube_data["F"][6];
    cubelet_placement["F"][1] = original_cube_data["F"][3];
    cubelet_placement["F"][2] = original_cube_data["F"][0];
    cubelet_placement["F"][3] = original_cube_data["F"][7];
    cubelet_placement["F"][5] = original_cube_data["F"][1];
    cubelet_placement["F"][6] = original_cube_data["F"][8];
    cubelet_placement["F"][7] = original_cube_data["F"][5];
    cubelet_placement["F"][8] = original_cube_data["F"][2];

    // Update the adjacent faces accordingly
    cubelet_placement["U"][6] = original_cube_data["L"][8];
    cubelet_placement["U"][7] = original_cube_data["L"][5];
    cubelet_placement["U"][8] = original_cube_data["L"][2];

    cubelet_placement["L"][2] = original_cube_data["D"][0];
    cubelet_placement["L"][5] = original_cube_data["D"][1];
    cubelet_placement["L"][8] = original_cube_data["D"][2];

    cubelet_placement["D"][0] = original_cube_data["R"][6];
    cubelet_placement["D"][1] = original_cube_data["R"][3];
    cubelet_placement["D"][2] = original_cube_data["R"][0];

    cubelet_placement["R"][0] = original_cube_data["U"][6];
    cubelet_placement["R"][3] = original_cube_data["U"][7];
    cubelet_placement["R"][6] = original_cube_data["U"][8];
}

function rotateB() {
    const original_cube_data = JSON.parse(JSON.stringify(cubelet_placement)); // Copy the original cube data

    // Rotate the "B" face data
    cubelet_placement["B"][0] = original_cube_data["B"][6];
    cubelet_placement["B"][1] = original_cube_data["B"][3];
    cubelet_placement["B"][2] = original_cube_data["B"][0];
    cubelet_placement["B"][3] = original_cube_data["B"][7];
    cubelet_placement["B"][5] = original_cube_data["B"][1];
    cubelet_placement["B"][6] = original_cube_data["B"][8];
    cubelet_placement["B"][7] = original_cube_data["B"][5];
    cubelet_placement["B"][8] = original_cube_data["B"][2];

    // Update the adjacent faces accordingly
    cubelet_placement["U"][0] = original_cube_data["R"][2];
    cubelet_placement["U"][1] = original_cube_data["R"][5];
    cubelet_placement["U"][2] = original_cube_data["R"][8];

    cubelet_placement["R"][2] = original_cube_data["D"][8];
    cubelet_placement["R"][5] = original_cube_data["D"][7];
    cubelet_placement["R"][8] = original_cube_data["D"][6];

    cubelet_placement["D"][6] = original_cube_data["L"][0];
    cubelet_placement["D"][7] = original_cube_data["L"][3];
    cubelet_placement["D"][8] = original_cube_data["L"][6];

    cubelet_placement["L"][0] = original_cube_data["U"][2];
    cubelet_placement["L"][3] = original_cube_data["U"][1];
    cubelet_placement["L"][6] = original_cube_data["U"][0];
}

function rotateU() {
    const original_cube_data = JSON.parse(JSON.stringify(cubelet_placement)); // Copy the original cube data

    // Rotate the "U" face data
    cubelet_placement["U"][0] = original_cube_data["U"][6];
    cubelet_placement["U"][1] = original_cube_data["U"][3];
    cubelet_placement["U"][2] = original_cube_data["U"][0];
    cubelet_placement["U"][3] = original_cube_data["U"][7];
    cubelet_placement["U"][5] = original_cube_data["U"][1];
    cubelet_placement["U"][6] = original_cube_data["U"][8];
    cubelet_placement["U"][7] = original_cube_data["U"][5];
    cubelet_placement["U"][8] = original_cube_data["U"][2];

    // Update the adjacent faces accordingly
    cubelet_placement["F"][0] = original_cube_data["R"][0];
    cubelet_placement["F"][1] = original_cube_data["R"][1];
    cubelet_placement["F"][2] = original_cube_data["R"][2];

    cubelet_placement["R"][0] = original_cube_data["B"][0];
    cubelet_placement["R"][1] = original_cube_data["B"][1];
    cubelet_placement["R"][2] = original_cube_data["B"][2];

    cubelet_placement["B"][0] = original_cube_data["L"][0];
    cubelet_placement["B"][1] = original_cube_data["L"][1];
    cubelet_placement["B"][2] = original_cube_data["L"][2];

    cubelet_placement["L"][0] = original_cube_data["F"][0];
    cubelet_placement["L"][1] = original_cube_data["F"][1];
    cubelet_placement["L"][2] = original_cube_data["F"][2];
}

function rotateD() {
    const original_cube_data = JSON.parse(JSON.stringify(cubelet_placement)); // Copy the original cube data

    // Rotate the "D" face data
    cubelet_placement["D"][0] = original_cube_data["D"][6];
    cubelet_placement["D"][1] = original_cube_data["D"][3];
    cubelet_placement["D"][2] = original_cube_data["D"][0];
    cubelet_placement["D"][3] = original_cube_data["D"][7];
    cubelet_placement["D"][5] = original_cube_data["D"][1];
    cubelet_placement["D"][6] = original_cube_data["D"][8];
    cubelet_placement["D"][7] = original_cube_data["D"][5];
    cubelet_placement["D"][8] = original_cube_data["D"][2];

    // Update the adjacent faces accordingly
    cubelet_placement["F"][6] = original_cube_data["L"][6];
    cubelet_placement["F"][7] = original_cube_data["L"][7];
    cubelet_placement["F"][8] = original_cube_data["L"][8];

    cubelet_placement["L"][6] = original_cube_data["B"][6];
    cubelet_placement["L"][7] = original_cube_data["B"][7];
    cubelet_placement["L"][8] = original_cube_data["B"][8];

    cubelet_placement["B"][6] = original_cube_data["R"][6];
    cubelet_placement["B"][7] = original_cube_data["R"][7];
    cubelet_placement["B"][8] = original_cube_data["R"][8];

    cubelet_placement["R"][6] = original_cube_data["F"][6];
    cubelet_placement["R"][7] = original_cube_data["F"][7];
    cubelet_placement["R"][8] = original_cube_data["F"][8];
}

function rotateL() {
    const original_cube_data = JSON.parse(JSON.stringify(cubelet_placement)); // Copy the original cube data

    // Rotate the "L" face data
    cubelet_placement["L"][0] = original_cube_data["L"][6];
    cubelet_placement["L"][1] = original_cube_data["L"][3];
    cubelet_placement["L"][2] = original_cube_data["L"][0];
    cubelet_placement["L"][3] = original_cube_data["L"][7];
    cubelet_placement["L"][5] = original_cube_data["L"][1];
    cubelet_placement["L"][6] = original_cube_data["L"][8];
    cubelet_placement["L"][7] = original_cube_data["L"][5];
    cubelet_placement["L"][8] = original_cube_data["L"][2];

    // Update the adjacent faces accordingly
    cubelet_placement["U"][0] = original_cube_data["B"][8];
    cubelet_placement["U"][3] = original_cube_data["B"][5];
    cubelet_placement["U"][6] = original_cube_data["B"][2];

    cubelet_placement["B"][2] = original_cube_data["D"][6];
    cubelet_placement["B"][5] = original_cube_data["D"][3];
    cubelet_placement["B"][8] = original_cube_data["D"][0];

    cubelet_placement["D"][0] = original_cube_data["F"][0];
    cubelet_placement["D"][3] = original_cube_data["F"][3];
    cubelet_placement["D"][6] = original_cube_data["F"][6];

    cubelet_placement["F"][0] = original_cube_data["U"][0];
    cubelet_placement["F"][3] = original_cube_data["U"][3];
    cubelet_placement["F"][6] = original_cube_data["U"][6];
}

function rotateR() {
    const original_cube_data = JSON.parse(JSON.stringify(cubelet_placement)); // Copy the original cube data

    // Rotate the "R" face data
    cubelet_placement["R"][0] = original_cube_data["R"][6];
    cubelet_placement["R"][1] = original_cube_data["R"][3];
    cubelet_placement["R"][2] = original_cube_data["R"][0];
    cubelet_placement["R"][3] = original_cube_data["R"][7];
    cubelet_placement["R"][5] = original_cube_data["R"][1];
    cubelet_placement["R"][6] = original_cube_data["R"][8];
    cubelet_placement["R"][7] = original_cube_data["R"][5];
    cubelet_placement["R"][8] = original_cube_data["R"][2];

    // Update the adjacent faces accordingly
    cubelet_placement["U"][2] = original_cube_data["F"][2];
    cubelet_placement["U"][5] = original_cube_data["F"][5];
    cubelet_placement["U"][8] = original_cube_data["F"][8];

    cubelet_placement["F"][2] = original_cube_data["D"][2];
    cubelet_placement["F"][5] = original_cube_data["D"][5];
    cubelet_placement["F"][8] = original_cube_data["D"][8];

    cubelet_placement["D"][2] = original_cube_data["B"][6];
    cubelet_placement["D"][5] = original_cube_data["B"][3];
    cubelet_placement["D"][8] = original_cube_data["B"][0];

    cubelet_placement["B"][0] = original_cube_data["U"][8];
    cubelet_placement["B"][3] = original_cube_data["U"][5];
    cubelet_placement["B"][6] = original_cube_data["U"][2];
}

function rotateX() {
    const original_cube_data = JSON.parse(JSON.stringify(cubelet_placement)); // Copy the original cube data

    // Rotate the "L" face data
    cubelet_placement["L"][0] = original_cube_data["L"][6];
    cubelet_placement["L"][1] = original_cube_data["L"][3];
    cubelet_placement["L"][2] = original_cube_data["L"][0];
    cubelet_placement["L"][3] = original_cube_data["L"][7];
    cubelet_placement["L"][5] = original_cube_data["L"][1];
    cubelet_placement["L"][6] = original_cube_data["L"][8];
    cubelet_placement["L"][7] = original_cube_data["L"][5];
    cubelet_placement["L"][8] = original_cube_data["L"][2];

    // Rotate the "R" face data
    cubelet_placement["R"][0] = original_cube_data["R"][2];
    cubelet_placement["R"][1] = original_cube_data["R"][5];
    cubelet_placement["R"][2] = original_cube_data["R"][8];
    cubelet_placement["R"][3] = original_cube_data["R"][1];
    cubelet_placement["R"][5] = original_cube_data["R"][7];
    cubelet_placement["R"][6] = original_cube_data["R"][0];
    cubelet_placement["R"][7] = original_cube_data["R"][3];
    cubelet_placement["R"][8] = original_cube_data["R"][6];

    //put the U face data into the F face
    cubelet_placement["F"][0] = original_cube_data["U"][0];
    cubelet_placement["F"][1] = original_cube_data["U"][1];
    cubelet_placement["F"][2] = original_cube_data["U"][2];
    cubelet_placement["F"][3] = original_cube_data["U"][3];
    cubelet_placement["F"][4] = original_cube_data["U"][4];
    cubelet_placement["F"][5] = original_cube_data["U"][5];
    cubelet_placement["F"][6] = original_cube_data["U"][6];
    cubelet_placement["F"][7] = original_cube_data["U"][7];
    cubelet_placement["F"][8] = original_cube_data["U"][8];

    // put the F face data into the D face 
    cubelet_placement["D"][0] = original_cube_data["F"][0];
    cubelet_placement["D"][1] = original_cube_data["F"][1];
    cubelet_placement["D"][2] = original_cube_data["F"][2];
    cubelet_placement["D"][3] = original_cube_data["F"][3];
    cubelet_placement["D"][4] = original_cube_data["F"][4];
    cubelet_placement["D"][5] = original_cube_data["F"][5];
    cubelet_placement["D"][6] = original_cube_data["F"][6];
    cubelet_placement["D"][7] = original_cube_data["F"][7];
    cubelet_placement["D"][8] = original_cube_data["F"][8];

    // put the D face data into the UBface
    cubelet_placement["B"][0] = original_cube_data["D"][8];
    cubelet_placement["B"][1] = original_cube_data["D"][7];
    cubelet_placement["B"][2] = original_cube_data["D"][6];
    cubelet_placement["B"][3] = original_cube_data["D"][5];
    cubelet_placement["B"][4] = original_cube_data["D"][4];
    cubelet_placement["B"][5] = original_cube_data["D"][3];
    cubelet_placement["B"][6] = original_cube_data["D"][2];
    cubelet_placement["B"][7] = original_cube_data["D"][1];
    cubelet_placement["B"][8] = original_cube_data["D"][0];

    // put the B face data into the U face
    cubelet_placement["U"][0] = original_cube_data["B"][8];
    cubelet_placement["U"][1] = original_cube_data["B"][7];
    cubelet_placement["U"][2] = original_cube_data["B"][6];
    cubelet_placement["U"][3] = original_cube_data["B"][5];
    cubelet_placement["U"][4] = original_cube_data["B"][4];
    cubelet_placement["U"][5] = original_cube_data["B"][3];
    cubelet_placement["U"][6] = original_cube_data["B"][2];
    cubelet_placement["U"][7] = original_cube_data["B"][1];
    cubelet_placement["U"][8] = original_cube_data["B"][0];
}

function rotateY() {
    const original_cube_data = JSON.parse(JSON.stringify(cubelet_placement)); // Copy the original cube data

    // Rotate the "U" face data
    cubelet_placement["U"][0] = original_cube_data["U"][2];
    cubelet_placement["U"][1] = original_cube_data["U"][5];
    cubelet_placement["U"][2] = original_cube_data["U"][8];
    cubelet_placement["U"][3] = original_cube_data["U"][1];
    cubelet_placement["U"][5] = original_cube_data["U"][7];
    cubelet_placement["U"][6] = original_cube_data["U"][0];
    cubelet_placement["U"][7] = original_cube_data["U"][3];
    cubelet_placement["U"][8] = original_cube_data["U"][6];

    // Rotate the "D" face data
    cubelet_placement["D"][0] = original_cube_data["D"][6];
    cubelet_placement["D"][1] = original_cube_data["D"][3];
    cubelet_placement["D"][2] = original_cube_data["D"][0];
    cubelet_placement["D"][3] = original_cube_data["D"][7];
    cubelet_placement["D"][5] = original_cube_data["D"][1];
    cubelet_placement["D"][6] = original_cube_data["D"][8];
    cubelet_placement["D"][7] = original_cube_data["D"][5];
    cubelet_placement["D"][8] = original_cube_data["D"][2];

    //put the F face data into the R face
    cubelet_placement["R"][0] = original_cube_data["F"][0];
    cubelet_placement["R"][1] = original_cube_data["F"][1];
    cubelet_placement["R"][2] = original_cube_data["F"][2];
    cubelet_placement["R"][3] = original_cube_data["F"][3];
    cubelet_placement["R"][4] = original_cube_data["F"][4];
    cubelet_placement["R"][5] = original_cube_data["F"][5];
    cubelet_placement["R"][6] = original_cube_data["F"][6];
    cubelet_placement["R"][7] = original_cube_data["F"][7];
    cubelet_placement["R"][8] = original_cube_data["F"][8];

    // put the R face data into the B face
    cubelet_placement["B"][0] = original_cube_data["R"][0];
    cubelet_placement["B"][1] = original_cube_data["R"][1];
    cubelet_placement["B"][2] = original_cube_data["R"][2];
    cubelet_placement["B"][3] = original_cube_data["R"][3];
    cubelet_placement["B"][4] = original_cube_data["R"][4];
    cubelet_placement["B"][5] = original_cube_data["R"][5];
    cubelet_placement["B"][6] = original_cube_data["R"][6];
    cubelet_placement["B"][7] = original_cube_data["R"][7];
    cubelet_placement["B"][8] = original_cube_data["R"][8];

    // put the B face data into the L face
    cubelet_placement["L"][0] = original_cube_data["B"][0];
    cubelet_placement["L"][1] = original_cube_data["B"][1];
    cubelet_placement["L"][2] = original_cube_data["B"][2];
    cubelet_placement["L"][3] = original_cube_data["B"][3];
    cubelet_placement["L"][4] = original_cube_data["B"][4];
    cubelet_placement["L"][5] = original_cube_data["B"][5];
    cubelet_placement["L"][6] = original_cube_data["B"][6];
    cubelet_placement["L"][7] = original_cube_data["B"][7];
    cubelet_placement["L"][8] = original_cube_data["B"][8];

    // put the L face data into the F face
    cubelet_placement["F"][0] = original_cube_data["L"][0];
    cubelet_placement["F"][1] = original_cube_data["L"][1];
    cubelet_placement["F"][2] = original_cube_data["L"][2];
    cubelet_placement["F"][3] = original_cube_data["L"][3];
    cubelet_placement["F"][4] = original_cube_data["L"][4];
    cubelet_placement["F"][5] = original_cube_data["L"][5];
    cubelet_placement["F"][6] = original_cube_data["L"][6];
    cubelet_placement["F"][7] = original_cube_data["L"][7];
    cubelet_placement["F"][8] = original_cube_data["L"][8];
}

function rotateZ() {
    const original_cube_data = JSON.parse(JSON.stringify(cubelet_placement)); // Copy the original cube data

    // Rotate the "F" face data
    cubelet_placement["F"][0] = original_cube_data["F"][2];
    cubelet_placement["F"][1] = original_cube_data["F"][5];
    cubelet_placement["F"][2] = original_cube_data["F"][8];
    cubelet_placement["F"][3] = original_cube_data["F"][1];
    cubelet_placement["F"][5] = original_cube_data["F"][7];
    cubelet_placement["F"][6] = original_cube_data["F"][0];
    cubelet_placement["F"][7] = original_cube_data["F"][3];
    cubelet_placement["F"][8] = original_cube_data["F"][6];

    // Rotate the "B" face data
    cubelet_placement["B"][0] = original_cube_data["B"][6];
    cubelet_placement["B"][1] = original_cube_data["B"][3];
    cubelet_placement["B"][2] = original_cube_data["B"][0];
    cubelet_placement["B"][3] = original_cube_data["B"][7];
    cubelet_placement["B"][5] = original_cube_data["B"][1];
    cubelet_placement["B"][6] = original_cube_data["B"][8];
    cubelet_placement["B"][7] = original_cube_data["B"][5];
    cubelet_placement["B"][8] = original_cube_data["B"][2];

    //put the R face data into the U face with a counter-clockwise [rotation]
    cubelet_placement["U"][0] = original_cube_data["R"][2];
    cubelet_placement["U"][1] = original_cube_data["R"][5];
    cubelet_placement["U"][2] = original_cube_data["R"][8];
    cubelet_placement["U"][3] = original_cube_data["R"][1];
    cubelet_placement["U"][4] = original_cube_data["R"][4];
    cubelet_placement["U"][5] = original_cube_data["R"][7];
    cubelet_placement["U"][6] = original_cube_data["R"][0];
    cubelet_placement["U"][7] = original_cube_data["R"][3];
    cubelet_placement["U"][8] = original_cube_data["R"][6];

    // put the U face data into the L face with a counter clockwise rotation
    cubelet_placement["L"][0] = original_cube_data["U"][2];
    cubelet_placement["L"][1] = original_cube_data["U"][5];
    cubelet_placement["L"][2] = original_cube_data["U"][8];
    cubelet_placement["L"][3] = original_cube_data["U"][1];
    cubelet_placement["L"][4] = original_cube_data["U"][4];
    cubelet_placement["L"][5] = original_cube_data["U"][7];
    cubelet_placement["L"][6] = original_cube_data["U"][0];
    cubelet_placement["L"][7] = original_cube_data["U"][3];
    cubelet_placement["L"][8] = original_cube_data["U"][6];

    // put the L face data into the D face with a counter clockwise rotation
    cubelet_placement["D"][0] = original_cube_data["L"][2];
    cubelet_placement["D"][1] = original_cube_data["L"][5];
    cubelet_placement["D"][2] = original_cube_data["L"][8];
    cubelet_placement["D"][3] = original_cube_data["L"][1];
    cubelet_placement["D"][4] = original_cube_data["L"][4];
    cubelet_placement["D"][5] = original_cube_data["L"][7];
    cubelet_placement["D"][6] = original_cube_data["L"][0];
    cubelet_placement["D"][7] = original_cube_data["L"][3];
    cubelet_placement["D"][8] = original_cube_data["L"][6];

    // put the D face data into the R face with a counter clockwise rotation
    cubelet_placement["R"][0] = original_cube_data["D"][2];
    cubelet_placement["R"][1] = original_cube_data["D"][5];
    cubelet_placement["R"][2] = original_cube_data["D"][8];
    cubelet_placement["R"][3] = original_cube_data["D"][1];
    cubelet_placement["R"][4] = original_cube_data["D"][4];
    cubelet_placement["R"][5] = original_cube_data["D"][7];
    cubelet_placement["R"][6] = original_cube_data["D"][0];
    cubelet_placement["R"][7] = original_cube_data["D"][3];
    cubelet_placement["R"][8] = original_cube_data["D"][6];
}

function isDone() {
    const original_cube_data = JSON.parse(JSON.stringify(cubelet_placement)); // Copy the original cube data
    const done_button = document.getElementById("done_button");
    const url_id = URLSearchParams(window.location.search).get("id");
    console.log(url_id);

    // "1_2": {
    //     "id_Y": "1",
    //     "id_X": "2",
    //     "colors": "green, blue, green, red, blue, blue, blue, red, blue",
    //     "algorithm": "x' U' R' L B U2 R L",
    //     "done": false
    //   },

    for (let i = 0; i < original_cube_data.length; i++) {
        if (original_cube_data[i]["done"] == false) {
            done_button.firstChild.style.display = "none";
            done_button.lastChild.style.display = "block";
            return;
        }
    }
}

// isDone();