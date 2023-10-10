const checkbox = document.querySelector('#toggle-view');
const view_2d = document.querySelector('.view_2d');
const view_3d = document.querySelector('.view_3d');

checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
        view_2d.style.display = 'none';
        view_3d.style.display = 'block';
    } else {
        view_2d.style.display = 'block';
        view_3d.style.display = 'none';
    }
});

view_2d.style.display = 'none';
view_3d.style.display = 'block';

//retrieve the alg from the url and display it in the alg input field
const urlParams = new URLSearchParams(window.location.search);
const alg = urlParams.get('alg');
document.querySelector('#algs-input').value = alg;

const checkbox2 = document.querySelector('#toggle-orbit');

checkbox2.addEventListener('change', function() {
    if (checkbox2.checked) {
        controls.enabled = true;
    } else {
        controls.enabled = false;
        camera.position.set(4, 3, 4);
        camera.lookAt(0, 1, 0);
    }
});

const controlsContainer = document.querySelector('.controls');
const expandControls = document.querySelector('#expand-controls');
const shrinkControls = document.querySelector('#shrink-controls');
const resetCube = document.querySelector('#reset-cube');
const stepBackward = document.querySelector('#step-backward');
const algsInput = document.querySelector('#algs-input');
const stepForward = document.querySelector('#step-forward');
const completeMove = document.querySelector('#complete-move');

expandControls.addEventListener('click', () => {
    controlsContainer.classList.add('expand');
    expandControls.style.display = 'none';
    shrinkControls.style.display = 'block';
    resetCube.style.display = 'block';
    algsInput.style.display = 'block';
    completeMove.style.display = 'block';
});

shrinkControls.addEventListener('click', () => {
    controlsContainer.classList.remove('expand');
    expandControls.style.display = 'block';
    shrinkControls.style.display = 'none';
    resetCube.style.display = 'none';
    algsInput.style.display = 'none';
    completeMove.style.display = 'none';
});