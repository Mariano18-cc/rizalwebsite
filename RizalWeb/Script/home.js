document.addEventListener('DOMContentLoaded', function() {  

    document.getElementById('intro').addEventListener('click', function() {
        window.location.href = 'intro.html';
    });
    document.getElementById('ack').addEventListener('click', function() {
        window.location.href = 'ack.html';
    });

    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const button = dropdown.querySelector('button');
        const content = dropdown.querySelector('.dropdown-content');

        button.addEventListener('click', function(event) {
            event.stopPropagation();
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });

        window.addEventListener('click', function(event) {
            if (!dropdown.contains(event.target)) {
                content.style.display = 'none';
            }
        });
    });

    document.getElementById('game').addEventListener('click', function() {
        window.location.href = 'game.html';
    });
});
