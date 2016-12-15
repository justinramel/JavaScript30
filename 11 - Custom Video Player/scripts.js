const player = document.querySelector('.player')
const video =  player.querySelector('video')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')

function togglePlay () {
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
}

function skip () {
  const seconds = Number(this.dataset.skip)
  video.currentTime += seconds
}

function updatePlayButton () {
  toggle.innerHTML = this.paused ? '▶️' : '⏸'
}

function updateRange () {
  const attribute = this.getAttribute('name')
  video[attribute] = Number(this.value)
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', updatePlayButton)
video.addEventListener('pause', updatePlayButton)
toggle.addEventListener('click', togglePlay)
skipButtons.forEach(btn => btn.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('click', updateRange))
