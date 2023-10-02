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

view_2d.style.display = 'block';
view_3d.style.display = 'none';