const checkbox_view = document.querySelector('#toggle-view');
const view_2d = document.querySelector('.view-2d');
const view_3d = document.querySelector('.view-3d');

checkbox_view.addEventListener('change', function() {
    if (checkbox_view.checked) {
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
const url_params = new URLSearchParams(window.location.search);
const alg = url_params.get('alg');
document.querySelector('#algs-input').value = alg;

const checkbox_orbit = document.querySelector('#toggle-orbit');

checkbox_orbit.addEventListener('change', function() {
    if (checkbox_orbit.checked) {
        controls.enabled = true;
    } else {
        controls.enabled = false;
        camera.position.set(4, 3, 4);
        camera.lookAt(0, 1, 0);
    }
});

const controls_container = document.querySelector('.controls');
const expand_controls = document.querySelector('#expand-controls');
const shrink_controls = document.querySelector('#shrink-controls');
const reset_cube = document.querySelector('#reset-cube');
const step_backward = document.querySelector('#step-backward');
const algs_input = document.querySelector('#algs-input');
const step_forward = document.querySelector('#step-forward');
const complete_move = document.querySelector('#complete-move');

expand_controls.addEventListener('click', () => {
    controls_container.classList.add('expand');
    expand_controls.style.display = 'none';
    shrink_controls.style.display = 'block';
    reset_cube.style.display = 'block';
    algs_input.style.display = 'block';
    complete_move.style.display = 'block';
});

shrink_controls.addEventListener('click', () => {
    controls_container.classList.remove('expand');
    expand_controls.style.display = 'block';
    shrink_controls.style.display = 'none';
    reset_cube.style.display = 'none';
    algs_input.style.display = 'none';
    complete_move.style.display = 'none';
});