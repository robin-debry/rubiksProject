// Initialisation de la scène, de la caméra et du rendu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff); // Définir la couleur de fond du canvas en blanc
document.body.appendChild(renderer.domElement);

// Couleurs des faces du Rubik's Cube
const cubeColors = [
    0xff0000, // Rouge (au fond)
    0xffa500,  // Orange (derrière)
    0xffffff, // Blanc (en face)
    0xffff00, // Jaune (en bas)
    0x00ff00, // Vert (à gauche)
    0x0000ff // Bleu (à droite)
    
];

// Création d'un Rubik's Cube 3x3x3
const cubeSize = 0.75; // Taille d'un cube
const spacing = 0.01; // Espacement entre les cubes

for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
            if (!(x === 0 && y === 0 && z === 0)) { // Ignorer l'emplacement du cube central
                const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
                const cubeMaterials = cubeColors.map(color => new THREE.MeshBasicMaterial({ color }));
                const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);

                cube.position.set(x * (cubeSize + spacing), y * (cubeSize + spacing), z * (cubeSize + spacing));
                scene.add(cube);

                // Créer un contour noir autour du cube
                const edgesGeometry = new THREE.EdgesGeometry(cubeGeometry);
                const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
                const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

                edges.position.copy(cube.position);
                scene.add(edges);
            }
        }
    }
}

function right() {
    scene.rotation.y += 1;
}

function left() {
    scene.rotation.y -= 1;
}

function up() {
    scene.rotation.x += 1;
}

// Positionnement de la caméra
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);

// Fonction d'animation
const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};
animate();
