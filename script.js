const timeDisplay = document.querySelector('.time-display');
let countdown;

function updateTimeDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timeDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

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

// Initialize with 10 minutes
startTimer(600);