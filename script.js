const player = document.querySelector('.player');
const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const speed = document.querySelector('.player-speed');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //

function showPlayIcon() {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
  } else {
    video.pause();
    showPlayIcon();
  }
}

// On video end, show play button icon
video.addEventListener('ended', showPlayIcon);

// Progress Bar ---------------------------------- //

// Format current time, duration
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

// Update progress bar as video plays
function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
}

// Click to seek within the video
function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //

let lastVolume = 1;

// Mute
function toggleMute() {
  volumeIcon.className = '';
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeIcon.classList.add('fas', 'fa-volume-mute');
    volumeIcon.setAttribute('title', 'Unmute');
    volumeBar.style.width = 0;
  } else {
    video.volume = lastVolume;
    volumeIcon.classList.add('fas', 'fa-volume-up');
    volumeIcon.setAttribute('title', 'Mute');
    volumeBar.style.width = `${lastVolume * 100}%`;
  }
}

// Volume Bar
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  // Rounding volume up or down
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  // Change icon depending on volume
  volumeIcon.className = '';
  if (volume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down');
  } else if (volume === 0) {
    volumeIcon.classList.add('fas', 'fa-volume-off');
  }
  lastVolume = volume;
}

// Change Playback Speed -------------------- //

function changeSpeed() {
  video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    /* Firefox */
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE/Edge */
    element.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}

let fullscreen = false;

// Toggle fullscreen
function toggleFullscreen() {
  if (!fullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);

document.addEventListener("DOMContentLoaded", function() {
    var video = document.querySelector(".video");
    var playBtn = document.querySelector("#play-btn");
    var volumeIcon = document.querySelector("#volume-icon");
    var volumeBar = document.querySelector(".volume-bar");
    var progressBar = document.querySelector(".progress-bar");
    var playerSpeed = document.querySelector(".player-speed");
    var timeElapsed = document.querySelector(".time-elapsed");
    var timeDuration = document.querySelector(".time-duration");
    var videoInput = document.getElementById("video-input");

  
    // Mute or unmute video
    volumeIcon.addEventListener("click", function() {
      if (video.muted) {
        video.muted = false;
        volumeIcon.classList.replace("fa-volume-off", "fa-volume-up");
        volumeBar.value = video.volume;
      } else {
        video.muted = true;
        volumeIcon.classList.replace("fa-volume-up", "fa-volume-off");
        volumeBar.value = 0;
      }
    });
  
    // Change volume
    volumeBar.addEventListener("input", function() {
      video.volume = volumeBar.value;
      if (video.volume > 0) {
        video.muted = false;
        volumeIcon.classList.replace("fa-volume-off", "fa-volume-up");
      } else {
        video.muted = true;
        volumeIcon.classList.replace("fa-volume-up", "fa-volume-off");
      }
    });
  
    // Update progress bar and time
    video.addEventListener("timeupdate", function() {
      var progress = (video.currentTime / video.duration) * 100;
      progressBar.style.width = progress + "%";
      timeElapsed.textContent = formatTime(video.currentTime);
      timeDuration.textContent = formatTime(video.duration);
    });
  
    // Seek video
    progressBar.parentElement.addEventListener("click", function(event) {
      var progressWidth = this.offsetWidth;
      var clickedOffsetX = event.offsetX;
      var seekTime = (clickedOffsetX / progressWidth) * video.duration;
      video.currentTime = seekTime;
    });
  
    // Update time format (MM:SS)
    function formatTime(time) {
      var minutes = Math.floor(time / 60);
      var seconds = Math.floor(time % 60);
      return `${padZero(minutes)}:${padZero(seconds)}`;
    }
  
    // Pad zero to single-digit numbers
    function padZero(number) {
      return number.toString().padStart(2, "0");
    }
  
    // Handle video file input
    videoInput.addEventListener("change", function(event) {
      var file = event.target.files[0];
      var videoURL = URL.createObjectURL(file);
      video.src = videoURL;
      video.load();
    });
    // Increase/decrease playback time with arrow buttons
  document.addEventListener("keydown", function(event) {
    var arrowLeft = 37;
    var arrowUp = 38;
    var arrowRight = 39;
    var arrowDown = 40;
    var timeStep = 10; // seconds

    if (event.keyCode === arrowLeft) {
      video.currentTime -= timeStep;
    } else if (event.keyCode === arrowRight) {
      video.currentTime += timeStep;
    } else if (event.keyCode === arrowUp) {
      video.volume += 0.1;
      if (video.volume > 1) {
        video.volume = 1;
      }
      volumeBar.value = video.volume;
      if (video.volume > 0) {
        video.muted = false;
        volumeIcon.classList.replace("fa-volume-off", "fa-volume-up");
      }
    } else if (event.keyCode === arrowDown) {
      video.volume -= 0.1;
      if (video.volume < 0) {
        video.volume = 0;
      }
      volumeBar.value = video.volume;
      if (video.volume === 0) {
        video.muted = true;
        volumeIcon.classList.replace("fa-volume-up", "fa-volume-off");
      }
    }
  });
  });
// Toggle video controls
function toggleControls() {
  if (player.classList.contains('hide-controls')) {
    player.classList.remove('hide-controls');
  } else {
    player.classList.add('hide-controls');
  }
}

// Event listener for video click to toggle controls
video.addEventListener('click', toggleControls);

// Switch video sources
const sourceList = [
  'video-source-1.mp4',
  'video-source-2.mp4',
  'video-source-3.mp4'
];
let currentSourceIndex = 0;

function switchVideoSource() {
  currentSourceIndex = (currentSourceIndex + 1) % sourceList.length;
  const newSource = sourceList[currentSourceIndex];
  video.src = newSource;
  video.load();
  video.play();
}

// Button to switch video sources
const switchSourceBtn = document.querySelector('.switch-source-btn');
switchSourceBtn.addEventListener('click', switchVideoSource);

// Playlist feature
const playlist = [
  {
    title: 'Video 1',
    source: 'video1.mp4'
  },
  {
    title: 'Video 2',
    source: 'video2.mp4'
  },
  {
    title: 'Video 3',
    source: 'video3.mp4'
  }
];
let currentVideoIndex = 0;

function playVideoFromPlaylist(index) {
  currentVideoIndex = index;
  const selectedVideo = playlist[index];
  video.src = selectedVideo.source;
  video.load();
  video.play();
}

// Generate playlist items dynamically
const playlistContainer = document.querySelector('.playlist');
playlist.forEach((video, index) => {
  const playlistItem = document.createElement('div');
  playlistItem.classList.add('playlist-item');
  playlistItem.textContent = video.title;
  playlistItem.addEventListener('click', () => {
    playVideoFromPlaylist(index);
  });
  playlistContainer.appendChild(playlistItem);
});

// Captions/subtitles feature
const captionsBtn = document.getElementById('captions-btn');
const captionsContainer = document.querySelector('.captions-container');

function toggleCaptions() {
  captionsContainer.classList.toggle('show-captions');
}

captionsBtn.addEventListener('click', toggleCaptions);

// Share video feature
const shareBtn = document.getElementById('share-btn');

function shareVideo() {
  // Replace with your own share functionality
  alert('Share the video on social media!');
}

shareBtn.addEventListener('click', shareVideo);

// Keyboard shortcuts
document.addEventListener('keydown', function (event) {
  const spaceBar = 32;
  const leftArrow = 37;
  const rightArrow = 39;
  const upArrow = 38;
  const downArrow = 40;
  const fKey = 70;
  const mKey = 77;

  if (event.keyCode === spaceBar) {
    togglePlay();
  } else if (event.keyCode === leftArrow) {
    video.currentTime -= timeStep;
  } else if (event.keyCode === rightArrow) {
    video.currentTime += timeStep;
  } else if (event.keyCode === upArrow) {
    video.volume += 0.1;
    if (video.volume > 1) {
      video.volume = 1;
    }
    volumeBar.value = video.volume;
    if (video.volume > 0) {
      video.muted = false;
      volumeIcon.classList.replace('fa-volume-off', 'fa-volume-up');
    }
  } else if (event.keyCode === downArrow) {
    video.volume -= 0.1;
    if (video.volume < 0) {
      video.volume = 0;
    }
    volumeBar.value = video.volume;
    if (video.volume === 0) {
      video.muted = true;
      volumeIcon.classList.replace('fa-volume-up', 'fa-volume-off');
    }
  } else if (event.keyCode === fKey) {
    toggleFullscreen();
  } else if (event.keyCode === mKey) {
    toggleMute();
  }
});

// Picture-in-picture mode
const pipBtn = document.querySelector('.pip-btn');

async function togglePIP() {
  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled && video.readyState === 4) {
      await video.requestPictureInPicture();
    }
  } catch (error) {
    console.error('Error toggling Picture-in-Picture mode:', error);
  }
}

pipBtn.addEventListener('click', togglePIP);

  
