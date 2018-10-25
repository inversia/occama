'use strict'


document.addEventListener ('DOMContentLoaded', () => {

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|CriOS/i.test(navigator.userAgent)

    if (isMobile || window.innerWidth < 500) {

        document.body.classList.add ('mobile')
    }
})

const { keys, values, entries, assign } = Object

const $  = document.querySelector.bind (document)
const $$ = document.querySelectorAll.bind (document)

function element (tag, { className = '', innerText = '', style = {}, children = [] } = {}) {
    
    const el = document.createElement (tag)

    el.className = className
    el.innerText = innerText

    assign (el.style, style)

    for (const child of children) el.appendChild (child)

    return el
}

document.addEventListener ('DOMContentLoaded', () => {
    
    const title = $('h1')

    const letters = [...title.innerText].map ((letter, i) => element ('span', {
                                                                style: { animationDelay: i * 0.15 + 's' },
                                                                innerText: letter
                                                             }))
    title.innerText = ''

    for (const span of letters) title.appendChild (span)
})

//document.referrer   - для touch устройств команда

// document.addEventListener ('DOMContentLoaded', () => {
    

//     const left     = document.querySelector ('.left')
//     const right    = document.querySelector ('.right')
//     const scroller = document.querySelector ('.carousel .scroller')
//     const items    = scroller.querySelectorAll ('.item')

//     let currentIndex = 0 // индекс текущего элемента

//     function loopNumber (i, length) { // «зацикливает» число в диапазоне 0...length
//       return (length + (i % length)) % length
//     }

//     left.onclick = function () {

//       const prevIndex = loopNumber (currentIndex - 1, items.length) // индекс предыдущего элемента

//       items[currentIndex].style.animationName = 'slide-to-right'
//       items[prevIndex]   .style.animationName = 'slide-from-left'

//       currentIndex = prevIndex
//     }

//     right.onclick = function () {

//       const nextIndex = loopNumber (currentIndex + 1, items.length) // индекс следующего элемента

//       // включаем нужные анимации (текущий уезжает налево, следующий выезжает справа)

//       items[currentIndex].style.animationName = 'slide-to-left'
//       items[nextIndex]   .style.animationName = 'slide-from-right'

//       currentIndex = nextIndex // меняем индекс текущего элемента
//     }

// })


document.addEventListener ('DOMContentLoaded', () => {

  for (const s of $$('.scroller')) {

    const inner = s.querySelector ('.scroller-inner')
    const prev  = s.querySelector ('.scroller-prev')
    const next  = s.querySelector ('.scroller-next')

    prev.onclick = () => {

      inner.scrollBy ({
        left: -inner.offsetWidth,
        behavior: 'smooth'
      })
    }

    next.onclick = () => {

      const pagesLeft = ((inner.scrollWidth - inner.scrollLeft) / inner.offsetWidth)
      
      if (pagesLeft < 1.2) {
            inner.scrollTo ({
                left: 0,
                behavior: 'smooth'
            })
      } else {
          inner.scrollBy ({
            left: inner.offsetWidth,
            behavior: 'smooth'
          })
      }
    }
  }

})