var cubeletPlacement = {
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

function clearCube() {
    cubeletPlacement = {"U": [{ id: "6", color: "white" }, { id: "14", color: "white" }, { id: "23", color: "white" },{ id: "7", color: "white" }, { id: "15", color: "white" }, { id: "24", color: "white" },{ id: "8", color: "white" }, { id: "16", color: "white" }, { id: "25", color: "white" }],"L": [{ id: "6", color: "orange" }, { id: "7", color: "orange" }, { id: "8", color: "orange" },{ id: "3", color: "orange" }, { id: "4", color: "orange" }, { id: "5", color: "orange" },{ id: "0", color: "orange" }, { id: "1", color: "orange" }, { id: "2", color: "orange" }],"F": [{ id: "8", color: "green" }, { id: "16", color: "green" }, { id: "25", color: "green" },{ id: "5", color: "green" }, { id: "13", color: "green" }, { id: "22", color: "green" },{ id: "2", color: "green" }, { id: "11", color: "green" }, { id: "19", color: "green" }],"R": [{ id: "25", color: "red" }, { id: "24", color: "red" }, { id: "23", color: "red" },{ id: "22", color: "red" }, { id: "21", color: "red" }, { id: "20", color: "red" },{ id: "19", color: "red" }, { id: "18", color: "red" }, { id: "17", color: "red" }],"B": [{ id: "23", color: "blue" }, { id: "14", color: "blue" }, { id: "6", color: "blue" },{ id: "20", color: "blue" }, { id: "12", color: "blue" }, { id: "3", color: "blue" },{ id: "17", color: "blue" }, { id: "9", color: "blue" }, { id: "0", color: "blue" }],"D": [{ id: "2", color: "yellow" }, { id: "11", color: "yellow" }, { id: "19", color: "yellow" },{ id: "1", color: "yellow" }, { id: "10", color: "yellow" }, { id: "18", color: "yellow" },{ id: "0", color: "yellow" }, { id: "9", color: "yellow" }, { id: "17", color: "yellow" }]};

    createAllFaceTables();
}

document.getElementById("reset-cube").addEventListener("click", clearCube);

// Helper function to create a table for a face
function createFaceTable(faceId) {
    const faceTable = document.getElementById(`face-${faceId}`);
    faceTable.innerHTML = ""; // Clear the table
    const faceData = cubeletPlacement[faceId];


    for (let i = 0; i < 3; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement("td");
            const cubelet = faceData[i * 3 + j];
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
        faceTable.appendChild(row);
    }
}

// Refactored function to create tables for all faces
function createAllFaceTables() {
    const faces = Object.keys(cubeletPlacement);
    for (const face of faces) {
        createFaceTable(face);
    }
}

// Call the refactored function to create tables for all faces
createAllFaceTables();

document.getElementById("complete-move").addEventListener("click", executeMove);

function executeMove() {
    const inputElement = document.getElementById("algs-input");
    const input = inputElement.value.toUpperCase().trim();
    // const input = inputElement.value.trim();

    if (input) {
        const moves = input.split(/\s+/);
        for (const move of moves) {
            const movement = move[0];
            const parameter = move[1];
            if (parameter == undefined) {
                rotate(movement, "");
            } else if (parameter == "'" || parameter == "2") {
                rotate(movement, parameter);
            } else {
                alert("Invalid input");
            }
        }
    }
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
        } else if (parameter == "2") {
            // rotate the face F two times in the clockwise direction
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
        } else if (parameter == "2") {
            // rotate the face B two times in the clockwise direction
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
        } else if (parameter == "2") {
            // rotate the face U two times in the clockwise direction
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
        } else if (parameter == "2") {
            // rotate the face D two times in the clockwise direction
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
        } else if (parameter == "2") {
            // rotate the face L two times in the clockwise direction
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
        } else if (parameter == "2") {
            // rotate the face R two times in the clockwise direction
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
        } else if (parameter == "2") {
            // rotate the cube in the X axis two times in the clockwise direction
            rotateX();
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
        } else if (parameter == "2") {
            // rotate the cube in the Y axis two times in the clockwise direction
            rotateY();
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
        } else if (parameter == "2") {
            // rotate the cube in the Z axis two times in the clockwise direction
            rotateZ();
            rotateZ();
        }
    }
    createAllFaceTables();
}

function rotateF() {
    const originalcubeData = JSON.parse(JSON.stringify(cubeletPlacement)); // Copy the original cube data

    // Rotate the "F" face data
    cubeletPlacement["F"][0] = originalcubeData["F"][6];
    cubeletPlacement["F"][1] = originalcubeData["F"][3];
    cubeletPlacement["F"][2] = originalcubeData["F"][0];
    cubeletPlacement["F"][3] = originalcubeData["F"][7];
    cubeletPlacement["F"][5] = originalcubeData["F"][1];
    cubeletPlacement["F"][6] = originalcubeData["F"][8];
    cubeletPlacement["F"][7] = originalcubeData["F"][5];
    cubeletPlacement["F"][8] = originalcubeData["F"][2];

    // Update the adjacent faces accordingly
    cubeletPlacement["U"][6] = originalcubeData["L"][8];
    cubeletPlacement["U"][7] = originalcubeData["L"][5];
    cubeletPlacement["U"][8] = originalcubeData["L"][2];

    cubeletPlacement["L"][2] = originalcubeData["D"][0];
    cubeletPlacement["L"][5] = originalcubeData["D"][1];
    cubeletPlacement["L"][8] = originalcubeData["D"][2];

    cubeletPlacement["D"][0] = originalcubeData["R"][6];
    cubeletPlacement["D"][1] = originalcubeData["R"][3];
    cubeletPlacement["D"][2] = originalcubeData["R"][0];

    cubeletPlacement["R"][0] = originalcubeData["U"][6];
    cubeletPlacement["R"][3] = originalcubeData["U"][7];
    cubeletPlacement["R"][6] = originalcubeData["U"][8];
}

function rotateB() {
    const originalcubeData = JSON.parse(JSON.stringify(cubeletPlacement)); // Copy the original cube data

    // Rotate the "B" face data
    cubeletPlacement["B"][0] = originalcubeData["B"][6];
    cubeletPlacement["B"][1] = originalcubeData["B"][3];
    cubeletPlacement["B"][2] = originalcubeData["B"][0];
    cubeletPlacement["B"][3] = originalcubeData["B"][7];
    cubeletPlacement["B"][5] = originalcubeData["B"][1];
    cubeletPlacement["B"][6] = originalcubeData["B"][8];
    cubeletPlacement["B"][7] = originalcubeData["B"][5];
    cubeletPlacement["B"][8] = originalcubeData["B"][2];

    // Update the adjacent faces accordingly
    cubeletPlacement["U"][0] = originalcubeData["R"][2];
    cubeletPlacement["U"][1] = originalcubeData["R"][5];
    cubeletPlacement["U"][2] = originalcubeData["R"][8];

    cubeletPlacement["R"][2] = originalcubeData["D"][8];
    cubeletPlacement["R"][5] = originalcubeData["D"][7];
    cubeletPlacement["R"][8] = originalcubeData["D"][6];

    cubeletPlacement["D"][6] = originalcubeData["L"][0];
    cubeletPlacement["D"][7] = originalcubeData["L"][3];
    cubeletPlacement["D"][8] = originalcubeData["L"][6];

    cubeletPlacement["L"][0] = originalcubeData["U"][2];
    cubeletPlacement["L"][3] = originalcubeData["U"][1];
    cubeletPlacement["L"][6] = originalcubeData["U"][0];
}

function rotateU() {
    const originalcubeData = JSON.parse(JSON.stringify(cubeletPlacement)); // Copy the original cube data

    // Rotate the "U" face data
    cubeletPlacement["U"][0] = originalcubeData["U"][6];
    cubeletPlacement["U"][1] = originalcubeData["U"][3];
    cubeletPlacement["U"][2] = originalcubeData["U"][0];
    cubeletPlacement["U"][3] = originalcubeData["U"][7];
    cubeletPlacement["U"][5] = originalcubeData["U"][1];
    cubeletPlacement["U"][6] = originalcubeData["U"][8];
    cubeletPlacement["U"][7] = originalcubeData["U"][5];
    cubeletPlacement["U"][8] = originalcubeData["U"][2];

    // Update the adjacent faces accordingly
    cubeletPlacement["F"][0] = originalcubeData["R"][0];
    cubeletPlacement["F"][1] = originalcubeData["R"][1];
    cubeletPlacement["F"][2] = originalcubeData["R"][2];

    cubeletPlacement["R"][0] = originalcubeData["B"][0];
    cubeletPlacement["R"][1] = originalcubeData["B"][1];
    cubeletPlacement["R"][2] = originalcubeData["B"][2];

    cubeletPlacement["B"][0] = originalcubeData["L"][0];
    cubeletPlacement["B"][1] = originalcubeData["L"][1];
    cubeletPlacement["B"][2] = originalcubeData["L"][2];

    cubeletPlacement["L"][0] = originalcubeData["F"][0];
    cubeletPlacement["L"][1] = originalcubeData["F"][1];
    cubeletPlacement["L"][2] = originalcubeData["F"][2];
}

function rotateD() {
    const originalcubeData = JSON.parse(JSON.stringify(cubeletPlacement)); // Copy the original cube data

    // Rotate the "D" face data
    cubeletPlacement["D"][0] = originalcubeData["D"][6];
    cubeletPlacement["D"][1] = originalcubeData["D"][3];
    cubeletPlacement["D"][2] = originalcubeData["D"][0];
    cubeletPlacement["D"][3] = originalcubeData["D"][7];
    cubeletPlacement["D"][5] = originalcubeData["D"][1];
    cubeletPlacement["D"][6] = originalcubeData["D"][8];
    cubeletPlacement["D"][7] = originalcubeData["D"][5];
    cubeletPlacement["D"][8] = originalcubeData["D"][2];

    // Update the adjacent faces accordingly
    cubeletPlacement["F"][6] = originalcubeData["L"][6];
    cubeletPlacement["F"][7] = originalcubeData["L"][7];
    cubeletPlacement["F"][8] = originalcubeData["L"][8];

    cubeletPlacement["L"][6] = originalcubeData["B"][6];
    cubeletPlacement["L"][7] = originalcubeData["B"][7];
    cubeletPlacement["L"][8] = originalcubeData["B"][8];

    cubeletPlacement["B"][6] = originalcubeData["R"][6];
    cubeletPlacement["B"][7] = originalcubeData["R"][7];
    cubeletPlacement["B"][8] = originalcubeData["R"][8];

    cubeletPlacement["R"][6] = originalcubeData["F"][6];
    cubeletPlacement["R"][7] = originalcubeData["F"][7];
    cubeletPlacement["R"][8] = originalcubeData["F"][8];
}

function rotateL() {
    const originalcubeData = JSON.parse(JSON.stringify(cubeletPlacement)); // Copy the original cube data

    // Rotate the "L" face data
    cubeletPlacement["L"][0] = originalcubeData["L"][6];
    cubeletPlacement["L"][1] = originalcubeData["L"][3];
    cubeletPlacement["L"][2] = originalcubeData["L"][0];
    cubeletPlacement["L"][3] = originalcubeData["L"][7];
    cubeletPlacement["L"][5] = originalcubeData["L"][1];
    cubeletPlacement["L"][6] = originalcubeData["L"][8];
    cubeletPlacement["L"][7] = originalcubeData["L"][5];
    cubeletPlacement["L"][8] = originalcubeData["L"][2];

    // Update the adjacent faces accordingly
    cubeletPlacement["U"][0] = originalcubeData["B"][8];
    cubeletPlacement["U"][3] = originalcubeData["B"][5];
    cubeletPlacement["U"][6] = originalcubeData["B"][2];

    cubeletPlacement["B"][2] = originalcubeData["D"][6];
    cubeletPlacement["B"][5] = originalcubeData["D"][3];
    cubeletPlacement["B"][8] = originalcubeData["D"][0];

    cubeletPlacement["D"][0] = originalcubeData["F"][0];
    cubeletPlacement["D"][3] = originalcubeData["F"][3];
    cubeletPlacement["D"][6] = originalcubeData["F"][6];

    cubeletPlacement["F"][0] = originalcubeData["U"][0];
    cubeletPlacement["F"][3] = originalcubeData["U"][3];
    cubeletPlacement["F"][6] = originalcubeData["U"][6];
}

function rotateR() {
    const originalcubeData = JSON.parse(JSON.stringify(cubeletPlacement)); // Copy the original cube data

    // Rotate the "R" face data
    cubeletPlacement["R"][0] = originalcubeData["R"][6];
    cubeletPlacement["R"][1] = originalcubeData["R"][3];
    cubeletPlacement["R"][2] = originalcubeData["R"][0];
    cubeletPlacement["R"][3] = originalcubeData["R"][7];
    cubeletPlacement["R"][5] = originalcubeData["R"][1];
    cubeletPlacement["R"][6] = originalcubeData["R"][8];
    cubeletPlacement["R"][7] = originalcubeData["R"][5];
    cubeletPlacement["R"][8] = originalcubeData["R"][2];

    // Update the adjacent faces accordingly
    cubeletPlacement["U"][2] = originalcubeData["F"][2];
    cubeletPlacement["U"][5] = originalcubeData["F"][5];
    cubeletPlacement["U"][8] = originalcubeData["F"][8];

    cubeletPlacement["F"][2] = originalcubeData["D"][2];
    cubeletPlacement["F"][5] = originalcubeData["D"][5];
    cubeletPlacement["F"][8] = originalcubeData["D"][8];

    cubeletPlacement["D"][2] = originalcubeData["B"][6];
    cubeletPlacement["D"][5] = originalcubeData["B"][3];
    cubeletPlacement["D"][8] = originalcubeData["B"][0];

    cubeletPlacement["B"][0] = originalcubeData["U"][8];
    cubeletPlacement["B"][3] = originalcubeData["U"][5];
    cubeletPlacement["B"][6] = originalcubeData["U"][2];
}

function rotateX() {
    const originalcubeData = JSON.parse(JSON.stringify(cubeletPlacement)); // Copy the original cube data

    // Rotate the "L" face data
    cubeletPlacement["L"][0] = originalcubeData["L"][6];
    cubeletPlacement["L"][1] = originalcubeData["L"][3];
    cubeletPlacement["L"][2] = originalcubeData["L"][0];
    cubeletPlacement["L"][3] = originalcubeData["L"][7];
    cubeletPlacement["L"][5] = originalcubeData["L"][1];
    cubeletPlacement["L"][6] = originalcubeData["L"][8];
    cubeletPlacement["L"][7] = originalcubeData["L"][5];
    cubeletPlacement["L"][8] = originalcubeData["L"][2];

    // Rotate the "R" face data
    cubeletPlacement["R"][0] = originalcubeData["R"][2];
    cubeletPlacement["R"][1] = originalcubeData["R"][5];
    cubeletPlacement["R"][2] = originalcubeData["R"][8];
    cubeletPlacement["R"][3] = originalcubeData["R"][1];
    cubeletPlacement["R"][5] = originalcubeData["R"][7];
    cubeletPlacement["R"][6] = originalcubeData["R"][0];
    cubeletPlacement["R"][7] = originalcubeData["R"][3];
    cubeletPlacement["R"][8] = originalcubeData["R"][6];
    
    //put the U face data into the F face
    cubeletPlacement["F"][0] = originalcubeData["U"][0];
    cubeletPlacement["F"][1] = originalcubeData["U"][1];
    cubeletPlacement["F"][2] = originalcubeData["U"][2];
    cubeletPlacement["F"][3] = originalcubeData["U"][3];
    cubeletPlacement["F"][4] = originalcubeData["U"][4];
    cubeletPlacement["F"][5] = originalcubeData["U"][5];
    cubeletPlacement["F"][6] = originalcubeData["U"][6];
    cubeletPlacement["F"][7] = originalcubeData["U"][7];
    cubeletPlacement["F"][8] = originalcubeData["U"][8];
    
    // put the F face data into the D face 
    cubeletPlacement["D"][0] = originalcubeData["F"][0];
    cubeletPlacement["D"][1] = originalcubeData["F"][1];
    cubeletPlacement["D"][2] = originalcubeData["F"][2];
    cubeletPlacement["D"][3] = originalcubeData["F"][3];
    cubeletPlacement["D"][4] = originalcubeData["F"][4];
    cubeletPlacement["D"][5] = originalcubeData["F"][5];
    cubeletPlacement["D"][6] = originalcubeData["F"][6];
    cubeletPlacement["D"][7] = originalcubeData["F"][7];
    cubeletPlacement["D"][8] = originalcubeData["F"][8];

    // put the D face data into the UBface
    cubeletPlacement["B"][0] = originalcubeData["D"][8];
    cubeletPlacement["B"][1] = originalcubeData["D"][7];
    cubeletPlacement["B"][2] = originalcubeData["D"][6];
    cubeletPlacement["B"][3] = originalcubeData["D"][5];
    cubeletPlacement["B"][4] = originalcubeData["D"][4];
    cubeletPlacement["B"][5] = originalcubeData["D"][3];
    cubeletPlacement["B"][6] = originalcubeData["D"][2];
    cubeletPlacement["B"][7] = originalcubeData["D"][1];
    cubeletPlacement["B"][8] = originalcubeData["D"][0];

    // put the B face data into the U face
    cubeletPlacement["U"][0] = originalcubeData["B"][8];
    cubeletPlacement["U"][1] = originalcubeData["B"][7];
    cubeletPlacement["U"][2] = originalcubeData["B"][6];
    cubeletPlacement["U"][3] = originalcubeData["B"][5];
    cubeletPlacement["U"][4] = originalcubeData["B"][4];
    cubeletPlacement["U"][5] = originalcubeData["B"][3];
    cubeletPlacement["U"][6] = originalcubeData["B"][2];
    cubeletPlacement["U"][7] = originalcubeData["B"][1];
    cubeletPlacement["U"][8] = originalcubeData["B"][0];
}

function rotateY() {
    const originalcubeData = JSON.parse(JSON.stringify(cubeletPlacement)); // Copy the original cube data

    // Rotate the "U" face data
    cubeletPlacement["U"][0] = originalcubeData["U"][2];
    cubeletPlacement["U"][1] = originalcubeData["U"][5];
    cubeletPlacement["U"][2] = originalcubeData["U"][8];
    cubeletPlacement["U"][3] = originalcubeData["U"][1];
    cubeletPlacement["U"][5] = originalcubeData["U"][7];
    cubeletPlacement["U"][6] = originalcubeData["U"][0];
    cubeletPlacement["U"][7] = originalcubeData["U"][3];
    cubeletPlacement["U"][8] = originalcubeData["U"][6];
    
    // Rotate the "D" face data
    cubeletPlacement["D"][0] = originalcubeData["D"][6];
    cubeletPlacement["D"][1] = originalcubeData["D"][3];
    cubeletPlacement["D"][2] = originalcubeData["D"][0];
    cubeletPlacement["D"][3] = originalcubeData["D"][7];
    cubeletPlacement["D"][5] = originalcubeData["D"][1];
    cubeletPlacement["D"][6] = originalcubeData["D"][8];
    cubeletPlacement["D"][7] = originalcubeData["D"][5];
    cubeletPlacement["D"][8] = originalcubeData["D"][2];

    //put the F face data into the R face
    cubeletPlacement["R"][0] = originalcubeData["F"][0];
    cubeletPlacement["R"][1] = originalcubeData["F"][1];
    cubeletPlacement["R"][2] = originalcubeData["F"][2];
    cubeletPlacement["R"][3] = originalcubeData["F"][3];
    cubeletPlacement["R"][4] = originalcubeData["F"][4];
    cubeletPlacement["R"][5] = originalcubeData["F"][5];
    cubeletPlacement["R"][6] = originalcubeData["F"][6];
    cubeletPlacement["R"][7] = originalcubeData["F"][7];
    cubeletPlacement["R"][8] = originalcubeData["F"][8];

    // put the R face data into the B face
    cubeletPlacement["B"][0] = originalcubeData["R"][0];
    cubeletPlacement["B"][1] = originalcubeData["R"][1];
    cubeletPlacement["B"][2] = originalcubeData["R"][2];
    cubeletPlacement["B"][3] = originalcubeData["R"][3];
    cubeletPlacement["B"][4] = originalcubeData["R"][4];
    cubeletPlacement["B"][5] = originalcubeData["R"][5];
    cubeletPlacement["B"][6] = originalcubeData["R"][6];
    cubeletPlacement["B"][7] = originalcubeData["R"][7];
    cubeletPlacement["B"][8] = originalcubeData["R"][8];

    // put the B face data into the L face
    cubeletPlacement["L"][0] = originalcubeData["B"][0];
    cubeletPlacement["L"][1] = originalcubeData["B"][1];
    cubeletPlacement["L"][2] = originalcubeData["B"][2];
    cubeletPlacement["L"][3] = originalcubeData["B"][3];
    cubeletPlacement["L"][4] = originalcubeData["B"][4];
    cubeletPlacement["L"][5] = originalcubeData["B"][5];
    cubeletPlacement["L"][6] = originalcubeData["B"][6];
    cubeletPlacement["L"][7] = originalcubeData["B"][7];
    cubeletPlacement["L"][8] = originalcubeData["B"][8];

    // put the L face data into the F face
    cubeletPlacement["F"][0] = originalcubeData["L"][0];
    cubeletPlacement["F"][1] = originalcubeData["L"][1];
    cubeletPlacement["F"][2] = originalcubeData["L"][2];
    cubeletPlacement["F"][3] = originalcubeData["L"][3];
    cubeletPlacement["F"][4] = originalcubeData["L"][4];
    cubeletPlacement["F"][5] = originalcubeData["L"][5];
    cubeletPlacement["F"][6] = originalcubeData["L"][6];
    cubeletPlacement["F"][7] = originalcubeData["L"][7];
    cubeletPlacement["F"][8] = originalcubeData["L"][8];
}

function rotateZ() {
    const originalcubeData = JSON.parse(JSON.stringify(cubeletPlacement)); // Copy the original cube data
    
    // Rotate the "F" face data
    cubeletPlacement["F"][0] = originalcubeData["F"][2];
    cubeletPlacement["F"][1] = originalcubeData["F"][5];
    cubeletPlacement["F"][2] = originalcubeData["F"][8];
    cubeletPlacement["F"][3] = originalcubeData["F"][1];
    cubeletPlacement["F"][5] = originalcubeData["F"][7];
    cubeletPlacement["F"][6] = originalcubeData["F"][0];
    cubeletPlacement["F"][7] = originalcubeData["F"][3];
    cubeletPlacement["F"][8] = originalcubeData["F"][6];

    // Rotate the "B" face data
    cubeletPlacement["B"][0] = originalcubeData["B"][6];
    cubeletPlacement["B"][1] = originalcubeData["B"][3];
    cubeletPlacement["B"][2] = originalcubeData["B"][0];
    cubeletPlacement["B"][3] = originalcubeData["B"][7];
    cubeletPlacement["B"][5] = originalcubeData["B"][1];
    cubeletPlacement["B"][6] = originalcubeData["B"][8];
    cubeletPlacement["B"][7] = originalcubeData["B"][5];
    cubeletPlacement["B"][8] = originalcubeData["B"][2];

    //put the R face data into the U face with a counter-clockwise rotation
    cubeletPlacement["U"][0] = originalcubeData["R"][2];
    cubeletPlacement["U"][1] = originalcubeData["R"][5];
    cubeletPlacement["U"][2] = originalcubeData["R"][8];
    cubeletPlacement["U"][3] = originalcubeData["R"][1];
    cubeletPlacement["U"][4] = originalcubeData["R"][4];
    cubeletPlacement["U"][5] = originalcubeData["R"][7];
    cubeletPlacement["U"][6] = originalcubeData["R"][0];
    cubeletPlacement["U"][7] = originalcubeData["R"][3];
    cubeletPlacement["U"][8] = originalcubeData["R"][6];

    // put the U face data into the L face with a counter clockwise rotation
    cubeletPlacement["L"][0] = originalcubeData["U"][2];
    cubeletPlacement["L"][1] = originalcubeData["U"][5];
    cubeletPlacement["L"][2] = originalcubeData["U"][8];
    cubeletPlacement["L"][3] = originalcubeData["U"][1];
    cubeletPlacement["L"][4] = originalcubeData["U"][4];
    cubeletPlacement["L"][5] = originalcubeData["U"][7];
    cubeletPlacement["L"][6] = originalcubeData["U"][0];
    cubeletPlacement["L"][7] = originalcubeData["U"][3];
    cubeletPlacement["L"][8] = originalcubeData["U"][6];

    // put the L face data into the D face with a counter clockwise rotation
    cubeletPlacement["D"][0] = originalcubeData["L"][2];
    cubeletPlacement["D"][1] = originalcubeData["L"][5];
    cubeletPlacement["D"][2] = originalcubeData["L"][8];
    cubeletPlacement["D"][3] = originalcubeData["L"][1];
    cubeletPlacement["D"][4] = originalcubeData["L"][4];
    cubeletPlacement["D"][5] = originalcubeData["L"][7];
    cubeletPlacement["D"][6] = originalcubeData["L"][0];
    cubeletPlacement["D"][7] = originalcubeData["L"][3];
    cubeletPlacement["D"][8] = originalcubeData["L"][6];

    // put the D face data into the R face with a counter clockwise rotation
    cubeletPlacement["R"][0] = originalcubeData["D"][2];
    cubeletPlacement["R"][1] = originalcubeData["D"][5];
    cubeletPlacement["R"][2] = originalcubeData["D"][8];
    cubeletPlacement["R"][3] = originalcubeData["D"][1];
    cubeletPlacement["R"][4] = originalcubeData["D"][4];
    cubeletPlacement["R"][5] = originalcubeData["D"][7];
    cubeletPlacement["R"][6] = originalcubeData["D"][0];
    cubeletPlacement["R"][7] = originalcubeData["D"][3];
    cubeletPlacement["R"][8] = originalcubeData["D"][6];
}