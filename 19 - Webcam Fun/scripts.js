const video = document.querySelector('.player')
const canvas = document.querySelector('.photo')
const ctx = canvas.getContext('2d')
const strip = document.querySelector('.strip')
const snap = document.querySelector('.snap')

function getVideo () {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(stream => {
      video.src = window.URL.createObjectURL(stream)
      video.play()
    })
    .catch(error => {
      console.error(error)
    })
}

function paintCanvas () {
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  return setInterval(() => {
    ctx.drawImage(video, 0, 0)

    let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height)
    // pixels = rgbSplit(pixels)
    // pixels = redEffect(pixels)
    // pixels = greenScreen(pixels)
    ctx.putImageData(pixels, 0, 0)
  }, 16)
}

function takePhoto () {
  snap.currentTime = 0
  snap.play()
  const photo = canvas.toDataURL('image/jpeg')
  const link = document.createElement('a')
  link.href = photo
  link.setAttribute('download', 'heygoodlooking')
  link.innerHTML = `<img src=${photo} />`
  strip.insertBefore(link, strip.firstChild)
}

function redEffect (pixels) {
  for (let i = 0; i < pixels.data.length; i = i + 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100
    pixels.data[i + 1] = pixels.data[i + 1] - 50
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5
  }
  return pixels
}

function rgbSplit (pixels) {
  for (let i = 0; i < pixels.data.length; i = i + 4) {
    pixels.data[i - 150] = pixels.data[i + 0]
    pixels.data[i + 100] = pixels.data[i + 1]
    pixels.data[i + 150] = pixels.data[i + 2]
  }
  return pixels
}

function greenScreen (pixels) {
  const levels = {}

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value
  })

  for (let i = 0; i < pixels.data.length; i = i + 4) {
    let red = pixels.data[i + 0]
    let green = pixels.data[i + 1]
    let blue = pixels.data[i + 2]

    if (red >= levels.rmin && green >= levels.gmin && blue >= levels.bmin && red <= levels.rmax && green <= levels.gmax && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0
    }
  }

  return pixels
}
getVideo()

video.addEventListener('canplay', paintCanvas)
