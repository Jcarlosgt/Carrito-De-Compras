$(document).ready(function() {
    var btnMenu = $('#btn_menu');
    var menu = $('#navegacion');
    var cont = 1;

    btnMenu.on('click', function() {
        if (cont == 1) {
            menu.animate({
                left: 0
            }, 500);
            cont = 0;
        } else {
            menu.animate({
                left: '-100%'
            }, 500);
            cont = 1;
        }
    });

});

let showModal = (modal) => {
    modal.style.display = 'flex';
}

let hiddeModal = (modal) => {
    modal.style.display = 'none';
}