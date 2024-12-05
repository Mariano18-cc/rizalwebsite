
// Local images array
const images = [
    'RizalWeb/Module/module 1 (PICTURES)/lesson 1/1.jpg',
    'RizalWeb/Module/module 1 (PICTURES)/lesson 1/2.jpg',
    'RizalWeb/Module/module 1 (PICTURES)/lesson 1/3.jpg',
    // Add more images here as needed
];

let currentIndex = 0;

// DOM Elements
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModalButton = document.querySelector('.close');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const viewImagesButton = document.getElementById('viewImages');

// Open modal when clicking "View Images" link
viewImagesButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link action
    modal.style.display = 'block';
    showImage(currentIndex);
});

// Close modal
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Show specific image
function showImage(index) {
    modalImage.src = images[index];
}

// Navigate to previous image
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
});

// Navigate to next image
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
});

// Close modal when clicking outside of content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
