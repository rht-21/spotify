let homeButton = document.getElementById('home');
let searchButton = document.getElementById('search');
let homeView = document.getElementById('home-view');
let searchView = document.getElementById('search-view');

searchButton.onclick = function () {
    homeButton.classList.remove('active');
    searchButton.classList.add('active');
    searchView.classList.remove('hidden');
    homeView.classList.add('hidden');
}

homeButton.onclick = function () {
    homeButton.classList.add('active');
    searchButton.classList.remove('active');
    searchView.classList.add('hidden');
    homeView.classList.remove('hidden');
}

function changeActiveMenu(clickedElement) {
    var listItems = document.querySelectorAll('#right-menu div');
    listItems.forEach(function (item) {
        item.classList.remove('menu-active');
    });

    clickedElement.classList.add('menu-active');
}

document.addEventListener('DOMContentLoaded', function () {
    const toggleButtons = [
        { buttonOn: document.getElementById('shuffle-on'), buttonOff: document.getElementById('shuffle-off') },
        { buttonOn: document.getElementById('repeat-on'), buttonOff: document.getElementById('repeat-off') },
        { buttonOn: document.getElementById('play'), buttonOff: document.getElementById('pause') },
        { buttonOn: document.getElementById('liked'), buttonOff: document.getElementById('not-liked') }
    ];

    toggleButtons.forEach(buttons => {
        buttons.buttonOn.addEventListener('click', () => toggle(buttons));
        buttons.buttonOff.addEventListener('click', () => toggle(buttons));
    });

    function toggle(buttons) {
        buttons.buttonOn.classList.toggle('hidden');
        buttons.buttonOff.classList.toggle('hidden');
    }
});

const volumeControl = document.getElementById("volume");
const icons = document.querySelectorAll("#volume-bar img");

volumeControl.addEventListener("input", function () {
    const value = this.value;
    icons.forEach(icon => {
        if (value == 0) {
            icon.src = "./Components/images/mute.svg";
        } else if (value < 50) {
            icon.src = "./Components/images/vol-1.svg";
        } else {
            icon.src = "./Components/images/vol-3.svg";
        }
    });
});

function highlightLibrary(item) {
    // Remove the 'selected' class from all items
    var items = document.querySelectorAll('.library-list-items');
    items.forEach(function (element) {
        element.classList.remove('selected-library');
        element.classList.remove('highlight');
    });

    // Add the 'selected' class to the clicked item
    item.classList.add('selected-library');
    item.classList.add('highlight');
}

// Playing Song

let audioElement = new Audio('./components/songs/carry-you.mp3');
let play = document.getElementById('play');
let pause = document.getElementById('pause');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let progressBar = document.getElementById('progress-bar');

let songs = [
    {
        songName: "Carry You",
        songArtist: "Martin Garrix, Third Party, Oaks, Declan J Donovan",
        songPath: "./components/songs/carry-you.mp3",
        songArtPath: "./components/songs/arts/carry-you.jpg"
    },
    {
        songName: "Celestial",
        songArtist: "Ed Sheeran",
        songPath: "./components/songs/celestial.mp3",
        songArtPath: "./components/songs/arts/celestial.jpg"
    },
    {
        songName: "GO",
        songArtist: "K-391",
        songPath: "./components/songs/go.mp3",
        songArtPath: "./components/songs/arts/go.jpg"
    }
];

let currentSongIndex = 0; // Keep track of the current song index

function loadSong() {
    audioElement.src = songs[currentSongIndex].songPath;
    audioElement.play();
    play.classList.add('hidden');
    pause.classList.remove('hidden');

    // Update song artwork
    let playingArt = document.getElementById('playing-art');
    playingArt.innerHTML = `<img src="${songs[currentSongIndex].songArtPath}" alt="Song Artwork">`;

    // Update song name
    let playingSongName = document.getElementById('playing-song-name');
    playingSongName.textContent = songs[currentSongIndex].songName;

    // Update song artist
    let playingSongArtist = document.getElementById('playing-song-artist');
    playingSongArtist.textContent = songs[currentSongIndex].songArtist;
}

// Function to play the next song
function playNextSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    loadSong();
}

// Function to play the previous song
function playPreviousSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong();
}

// Function to handle volume change
function handleVolumeChange() {
    let volume = document.getElementById('volume').value;
    audioElement.volume = volume / 100;
}

// Event listener for volume change
document.getElementById('volume').addEventListener('input', handleVolumeChange);

// Function to format time in mm:ss format
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Handling Play/Pause

play.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
    }
});

pause.addEventListener('click', ()=> {
    if (audioElement.play) {
        audioElement.pause();
    }
});

// Event Listening

audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100)
    progressBar.value = progress;

    // Update current time
    let currentTimeElement = document.getElementById('current-time');
    currentTimeElement.textContent = formatTime(audioElement.currentTime);

    // Update song time
    let songTimeElement = document.getElementById('song-time');
    songTimeElement.textContent = formatTime(audioElement.duration);
})

progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration/100;
})

progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
})

next.addEventListener('click', playNextSong);
prev.addEventListener('click', playPreviousSong);