const bg = document.getElementById('bg')
const homeBtn = document.querySelector('.home')
const mainSlider = document.querySelector('.main-slider')
const nextBtn = document.querySelector('.next')
const nextPug = document.querySelector('.btn-next')
const prevPug = document.querySelector('.btn-prev')
const text1 = document.querySelector('.text1')
const text2 = document.querySelector('.text2')
const circlePug1 = document.querySelector('.circle1')
const circlePug2 = document.querySelector('.circle2')
const moreBtn = document.querySelector('.more')
const popup = document.querySelector('.popup')
const cross = document.querySelector('.cross')
const spermArr = document.querySelectorAll('.sperm')
const scrollThumb = document.querySelector('.scroll-thumb')
const scrollTrack = document.querySelector('.scroll-track')
const scrollableText = document.querySelector('.scrollable-text')
var start = null
var end = null
var startY = null
var endY = null
var popupOpened = false
var touches = []
const slideWidth = 1024
const startCoordinate = 0
let drag = false
let dragOffset = 0
const scrollBarTop = 240
const scrollBarBottom = 586

const checkSwipe = (start, end) => {
  if (start !== null && end !== null && start != end && end - start >= 20) {
    rightSwipe()
  }
  if (start !== null && end !== null && start != end && start - end >= 20) {
    leftSwipe()
  }
}

const checkVerticalSwipe = (startY, endY) => {
  if (Math.abs(startY - endY) >= 80) {
    return true
  } else {
    return false
  }
}

//Desctop swipes
window.addEventListener('mousedown', (event) => {
  event.preventDefault()
  start = event.clientX
  startY = event.clientY
  end = null
  endY = null
})
window.addEventListener('mouseup', (event) => {
  end = event.clientX
  endY = event.clientY
  if (!checkVerticalSwipe(startY, endY)) checkSwipe(start, end)
  start = null
  startY = null
})

//Mobile swipes
window.addEventListener('touchstart', (event) => {
  startY = event.touches[0].clientY
  start = event.touches[0].clientX
  end = null
  endY = null
  touches = []
})
window.addEventListener('touchmove', (event) => {
  touches.push(event.touches[event.touches.length - 1])
})
window.addEventListener('touchend', (event) => {
  end = touches[touches.length - 1].clientX
  endY = touches[touches.length - 1].clientY
  if (!checkVerticalSwipe(startY, endY)) checkSwipe(start, end)
  start = null
  startY = null
})

//Redirect to first slide
homeBtn.addEventListener('click', () => {
  bg.style.left = startCoordinate + 'px'
  mainSlider.style.left = startCoordinate + 'px'
})

//Redirect to second slide
nextBtn.addEventListener('click', () => {
  bg.style.left = -slideWidth + 'px'
  mainSlider.style.left = -slideWidth + 'px'
  spermArr.forEach((el) => {
    el.classList.add('active')
  })
})

//Show popup
moreBtn.addEventListener('click', () => {
  if (!popupOpened) {
    popup.style.zIndex = 30
    popup.style.visibility = 'visible'
    popup.style.opacity = 1
    popupOpened = true
  }
})

//Close popup
cross.addEventListener('click', () => {
  popup.style.visibility = 'hidden'
  popup.style.opacity = 0
  popupOpened = false
  popup.style.zIndex = -30
})

//Pagination buttons
nextPug.addEventListener('click', () => {
  text2.style.visibility = 'visible'
  text1.style.visibility = 'hidden'
  text2.style.opacity = 1
  text1.style.opacity = 0
  circlePug1.classList.add('circle2')
  circlePug1.classList.remove('circle1')
  circlePug2.classList.add('circle1')
  circlePug2.classList.remove('circle2')
})
prevPug.addEventListener('click', () => {
  text1.style.visibility = 'visible'
  text2.style.visibility = 'hidden'
  text1.style.opacity = 1
  text2.style.opacity = 0
  circlePug1.classList.add('circle1')
  circlePug1.classList.remove('circle2')
  circlePug2.classList.add('circle2')
  circlePug2.classList.remove('circle1')
})

//Swipe functions
const rightSwipe = () => {
  if (bg.style.left.slice(0, -2) < 0) {
    bg.style.left =
      Number(bg.style.left.slice(0, -2)) + Number(slideWidth) + 'px'
    mainSlider.style.left =
      Number(mainSlider.style.left.slice(0, -2)) + Number(slideWidth) + 'px'
  }
  if (bg.style.left == -slideWidth + 'px') {
    spermArr.forEach((el) => {
      el.classList.add('active')
    })
  } else {
    spermArr.forEach((el) => {
      el.classList.remove('active')
    })
  }
}
const leftSwipe = () => {
  if (bg.style.left.slice(0, -2) > -2 * slideWidth) {
    bg.style.left =
      Number(bg.style.left.slice(0, -2)) - Number(slideWidth) + 'px'
    mainSlider.style.left =
      Number(mainSlider.style.left.slice(0, -2)) - Number(slideWidth) + 'px'
  }
  if (bg.style.left == -slideWidth + 'px') {
    spermArr.forEach((el) => {
      el.classList.add('active')
    })
  } else {
    spermArr.forEach((el) => {
      el.classList.remove('active')
    })
  }
}

//Custom scroll
scrollThumb.addEventListener('mousedown', (event) => {
  event.preventDefault()
  event.stopPropagation()
  start = null
  end = null
  drag = true
  dragOffset = event.clientY - scrollThumb.style.top.slice(0, -2) - scrollBarTop
})
scrollThumb.addEventListener('mousemove', (event) => {
  event.preventDefault()
  event.stopPropagation()
  if (
    event.clientY - dragOffset >= scrollBarTop &&
    event.clientY - dragOffset <= scrollBarBottom &&
    drag
  ) {
    scrollThumb.style.top = event.clientY - scrollBarTop - dragOffset + 'px'
    scrollableText.style.transform = `translateY(${
      scrollBarTop - event.clientY + dragOffset
    }px)`
  }
})
scrollThumb.addEventListener('mouseup', (event) => {
  event.preventDefault()
  event.stopPropagation()
  start = null
  end = null
  drag = false
  dragOffset = 0
})

scrollThumb.addEventListener('touchstart', (event) => {
  event.preventDefault()
  event.stopPropagation()
  drag = true
  dragOffset =
    event.touches[0].clientY - scrollThumb.style.top.slice(0, -2) - scrollBarTop
})
scrollThumb.addEventListener('touchmove', (event) => {
  event.preventDefault()
  event.stopPropagation()
  if (
    event.touches[event.touches.length - 1].clientY - dragOffset >=
      scrollBarTop &&
    event.touches[event.touches.length - 1].clientY - dragOffset <=
      scrollBarBottom &&
    drag
  ) {
    scrollThumb.style.top =
      event.touches[event.touches.length - 1].clientY -
      scrollBarTop -
      dragOffset +
      'px'
    scrollableText.style.transform = `translateY(${
      scrollBarTop -
      event.touches[event.touches.length - 1].clientY +
      dragOffset
    }px)`
  }
})
scrollThumb.addEventListener('touchend', (event) => {
  event.preventDefault()
  event.stopPropagation()
  drag = false
  dragOffset = 0
})
