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