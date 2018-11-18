'use strict'

const { keys, values, entries, assign } = Object
const $  = document.querySelector.bind (document)
const $$ = document.querySelectorAll.bind (document)
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|CriOS/i.test(navigator.userAgent)

document.addEventListener ('DOMContentLoaded', () => {
    if (isMobile || window.innerWidth < 500) {
        document.body.classList.add ('mobile')
    }
})

function Vec2 (x, y) {

    const self = {

        x, y,

        add: b => Vec2 (x + b.x, y + b.y),

        sub: b => self.add (b.negative ()),

        distance: b => self.sub (b).length (),

        scale: s => Vec2 (x * s, y * s),

        negative: () => Vec2 (-x, -y),

        length: () => Math.sqrt (x * x + y * y),

        normalize: () => self.scale (1.0 / self.length ()),

        rescale: l => self.normalize ().scale (l),

        toString: () => `Vec2(${x}, ${y})`
    }

    return self
}

function rescale (x, from, to, exponent=1) {

    const t = (x - from[0]) / (from[1] - from[0])
    return to[0] + ((to[1] - to[0]) * (t ** exponent))
} 

function initSmoothHover (container, { flashlightMode = false } = {}) {

    for (const item of container.children) {
        const circle = document.createElement ('DIV')
        circle.classList.add ('hover-circle')
        item.appendChild (circle)
    }

    document.addEventListener ('mousemove', e => {

        const mouse = Vec2 (e.clientX, e.clientY) // двумерный вектор, являющийся текущим положение мыши
      
        for (const item of container.children){

            let circle = item.children[0]

            const rect    = item.getBoundingClientRect ()
            const leftTop = Vec2 (rect.left, rect.top)
            const size    = Vec2 (rect.width, rect.height)
            const center  = leftTop.add (size.scale (0.5))

            const distanceToCenter = mouse.distance (center)

            const opacity = rescale (distanceToCenter, [0, rect.width], [1, 0], 1.3)
            const scale   = rescale (distanceToCenter, [0, rect.width], [1.2, 1], 0.9)
            const active = $('.active')
            
            if (flashlightMode) {

                const gradCenter = mouse.sub (leftTop)
                const color = `rgb(255,155,155) 0, rgba(255,155,155,0.5) ${rect.width}px, transparent ${rect.width * 5}px`

                circle.style.backgroundColor = 'transparent'
                circle.style.backgroundImage = `radial-gradient(circle at ${gradCenter.x.toFixed (2)}px ${gradCenter.y.toFixed (2)}px, ${color})`

            } else {

                circle.style.opacity   = opacity
                circle.style.transform = `scale(${scale})`
            }
        }
    })
}

// function element (tag, { className = '', innerText = '', style = {}, children = [] } = {}) {
    
//     const el = document.createElement (tag)

//     el.className = className
//     el.innerText = innerText

//     assign (el.style, style)

//     for (const child of children) el.appendChild (child)

//     return el
// }

// const numPages = Math.floor(cost.scrollWidth / cost.offsetWidth)

function scrollTo (arg) {

    const target = typeof arg === 'string'
                        ? document.querySelector (arg)
                        : arg
    
    target.scrollIntoView ({
        
        behavior: 'smooth',
        block: 'start'
    })
}

//реализация плавного скролла

document.addEventListener ('DOMContentLoaded', () => {          // код выполняющийся после загрузки DOM-дерева (содержимого document.body)

    for (const link of document.querySelectorAll ('.link')) {   // для каждого элемента с селектором .link

        link.addEventListener ('click', e => {

            const href = link.getAttribute ('href')              // <a href="/#services"> → /#services
            const hash = href.replace ('/', '')                  // /#services → #services

            if (link.classList.contains ('register')) {

                if(!isMobile){
                    e.preventDefault()
                    scrollTo ('#registerContacts')
                }

            } else if (document.querySelector (hash)) { 
                            // есть ли на странице элемент отзывающийся на селектор #services
                history.pushState (null, null, hash)             // заменяем в адресной строке адрес на /#services (но так, чтобы страница не прыгала к этому элементу)
                scrollTo (hash)                                  // плавно прокручиваем страницу к #services
                e.preventDefault ()                              // предотвращаем дефолтное поведение клика на ссылку (чтобы страница не прыгала к #services)
            }
        })
    }
})

// реализация карусели и её прокрутки

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

// реализация кнопок выбора мужского и женского прайса

document.addEventListener ('DOMContentLoaded', () => {
  
    const woman = $('.w')
    const man   = $('.m')
    const cost  = $('.cost')

//     woman.onclick = () => {
        
//         if (cost.scrollLeft < cost.offsetWidth * 0.6) {
            
//             cost.scrollTo ({
//                 left: cost.offsetWidth,
//                 behavior: 'smooth'
//             })
//         }        
//     }

//      man.onclick = () => {

//         if (cost.scrollLeft > cost.offsetWidth * 0.2) {
            
//             cost.scrollTo ({
//                 left: 0,
//                 behavior: 'smooth'
//             })
//         }
//     }


    
})

// генерация цены в прейскуранте

document.addEventListener ('DOMContentLoaded', () => {

    const items = $$('.range .item')

    for (const item of items) {

        item.onclick = function () {

            for (const otherItem of items) {
                otherItem.classList.toggle ('active', item === otherItem)

            }

            for (const priceEl of $$('.page.woman li .price')) {

                const price = priceEl.dataset[item.dataset.size]

                priceEl.parentNode.classList.toggle ('unavailable', !price)
                priceEl.innerText = price
            }
        }
    }

    $('.range .item.active').onclick ()
})


window.addEventListener ('scroll', () => {

    const introh1 = $('.intro h1')
    const nickPosition = (window.scrollY + introh1.getBoundingClientRect().y) * 0.65 

    if (window.scrollY > nickPosition) {
        
        introh1.style.opacity = '1'       
        introh1.style.animation = 'story-appear 0.4s ease-in-out'
    } else {
        introh1.style.opacity = '0'
        introh1.style.animation = 'none'
    }
})

window.addEventListener('resize', () => {
    
    for (const el of $$('.carousel-scroller')) {

        el.scrollTo ({ left: el.scrollLeft })
    }
     
}) 

// функция, которая рассчитывает количество точек/элментов, которое равно количеству страниц
const numPages = el => el.children.length //Math.round (el.scrollWidth / el.offsetWidth)  

// функция, вычисляющая текущую страницу
const currentPage = el => Math.round((el.scrollLeft + el.offsetWidth) / el.offsetWidth)

const scrollToPage = (el, index) => 
    
    el.scrollTo ({
        left: el.offsetWidth * index,
        behavior: 'smooth'
    })
 

function initScroller (el) {

    const inner = el.querySelector ('.scroller-inner')
    const dots  = el.querySelector ('.pagination')
    const n     = numPages (inner)

    // создание точек прокрутки
    for (let i = 0; i < n; i++){
        
        const dot = document.createElement ('DIV')

        dot.onclick = () => scrollToPage (inner, i)
        
        dots.appendChild (dot)
    }

    inner.onscroll = () => dots.childNodes.forEach ((x, i) => x.classList.toggle ('active', i + 1 === currentPage (inner)))  

    inner.onscroll ()
}

//детекция прокручивания страниц

document.addEventListener ('DOMContentLoaded', () => {
    
    setTimeout (() => {

        initScroller ($('.scroller'))

        initScroller ($('.prices'))
    })

    initSmoothHover ($('.range'))
})


