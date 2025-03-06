//your JS code here. If required.
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const audio = document.getElementById('audio');
    const timeDisplay = document.querySelector('.time-display');
    const playButton = document.querySelector('.play');
    const soundButtons = document.querySelectorAll('.sound-picker button');
    const timeButtons = document.querySelectorAll('.time-select button');

    let countdown;
    let isPlaying = false;

    // Function to update the time display
    function updateTimeDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timeDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    // Function to start the timer
    function startTimer(seconds) {
        clearInterval(countdown);

        const now = Date.now();
        const then = now + seconds * 1000;

        updateTimeDisplay(seconds);

        countdown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);

            if (secondsLeft < 0) {
                clearInterval(countdown);
                audio.pause();
                video.pause();
                isPlaying = false;
                playButton.textContent = 'Play';
                return;
            }

            updateTimeDisplay(secondsLeft);
        }, 1000);
    }

    // Play/Pause button functionality
    playButton.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            video.pause();
            playButton.textContent = 'Play';
        } else {
            audio.play();
            video.play();
            playButton.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    });

    // Sound picker functionality
    soundButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sound = button.getAttribute('data-sound');
            const videoSrc = button.getAttribute('data-video');
            audio.src = `Sounds and videos/${sound}`;
            video.src = `Sounds and videos/${videoSrc}`;
            audio.play();
            video.play();
            isPlaying = true;
            playButton.textContent = 'Pause';
        });
    });

    // Time select functionality
    timeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const time = parseInt(button.getAttribute('data-time'));
            startTimer(time);
        });
    });

    // Initialize with 10 minutes
    startTimer(600);
});