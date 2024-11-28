// Skip button functionality
const skipButton = document.getElementById('skipButton');
const video = document.getElementById('myVideo');

skipButton.addEventListener('click', function() {
    video.currentTime = 30; // Skips to 30 seconds
    skipButton.style.display = 'none'; // Hide the skip button after clicking
});

// Show skip button after 5 seconds of video playback
video.addEventListener('play', function() {
    setTimeout(() => {
        skipButton.style.display = 'block'; // Show skip button
    }, 5000); // After 5 seconds
});

document.getElementById('skipButton').addEventListener('click', function() {
    window.location.href = 'home.html';
});