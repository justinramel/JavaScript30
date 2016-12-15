const player = document.querySelector('.player')
const video = player.querySelector('video')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const fullscreen = player.querySelector('.fullscreen')

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

function handleProgress () {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

let mousedown = false
function jump (e) {
  const jumpPercent = e.offsetX / video.offsetWidth
  video.currentTime = jumpPercent * video.duration
}

function handleSpace (e) {
  if (e.code !== 'Space') return
  togglePlay()
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', updatePlayButton)
video.addEventListener('pause', updatePlayButton)
video.addEventListener('timeupdate', handleProgress)

toggle.addEventListener('click', togglePlay)
window.addEventListener('keydown', handleSpace)

skipButtons.forEach(btn => btn.addEventListener('click', skip))

ranges.forEach(range => range.addEventListener('change', updateRange))
ranges.forEach(range => range.addEventListener('mousemove', updateRange))

progress.addEventListener('click', jump)
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)
progress.addEventListener('mousemove', (e) => mousedown && jump(e))

fullscreen.addEventListener('click', () => video.webkitRequestFullScreen())
