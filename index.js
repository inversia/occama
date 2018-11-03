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

// function element (tag, { className = '', innerText = '', style = {}, children = [] } = {}) {
    
//     const el = document.createElement (tag)

//     el.className = className
//     el.innerText = innerText

//     assign (el.style, style)

//     for (const child of children) el.appendChild (child)

//     return el
// }

// const numPages = Math.floor(cost.scrollWidth / cost.offsetWidth)

function scrollTo (hash) {

    const target = document.querySelector (hash)
    
    target.scrollIntoView ({
        
        behavior: 'smooth',
        block: 'start'
    })
}

//реализация плавного скролла

document.addEventListener ('DOMContentLoaded', () => {          // код выполняющийся после загрузки DOM-дерева (содержимого document.body)

    for (const link of document.querySelectorAll ('.link')) {   // для каждого элемента с селектором .link

        link.addEventListener ('click', x => {

            const href = link.getAttribute ('href')              // <a href="/#services"> → /#services
            const hash = href.replace ('/', '')                  // /#services → #services

            if (document.querySelector (hash)) {                 // есть ли на странице элемент отзывающийся на селектор #services
                history.pushState (null, null, hash)             // заменяем в адресной строке адрес на /#services (но так, чтобы страница не прыгала к этому элементу)
                scrollTo (hash)                                  // плавно прокручиваем страницу к #services
                x.preventDefault ()                              // предотвращаем дефолтное поведение клика на ссылку (чтобы страница не прыгала к #services)
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

    woman.onclick = () => {
        
        if (cost.scrollLeft < cost.offsetWidth * 0.6) {
            
            cost.scrollTo ({
                left: cost.offsetWidth,
                behavior: 'smooth'
            })
        }        
    }

     man.onclick = () => {

        if (cost.scrollLeft > cost.offsetWidth * 0.2) {
            
            cost.scrollTo ({
                left: 0,
                behavior: 'smooth'
            })
        }
    }

    woman.onclick ()
})

// генерация цены в прейскуранте

document.addEventListener ('DOMContentLoaded', () => {

    const items = $$('.range .item')

    for (const item of items) {

        item.onclick = function () {

            for (const otherItem of items) {
                otherItem.classList.toggle ('active', item === otherItem)

            }

            for (const price of $$('.page.woman li .price')) {

                price.innerText = price.dataset[item.dataset.size]
            }


//             li.style.display = price ? '' : 'none'
//             li.innerText     = price + ' р.'
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
const numPages = el => Math.round (el.scrollWidth / el.offsetWidth)  

// функция, вычисляющая текущую страницу
const currentPage = el => Math.round((el.scrollLeft + el.offsetWidth) / el.offsetWidth)

const scrollToPage = (el, index) => undefined

function initScroller (scroller) {

    const inner = scroller.querySelector ('.scroller-inner')
    const dots  = scroller.querySelector ('.dots')
    const n     = numPages (inner)

    // создание точек прокрутки
    for (let i = 0; i < n; i++){
        
        const dot = document.createElement ('DIV')

        dot.onclick = () => scrollToPage (inner, i)
        
        dots.appendChild (dot)
    }

    inner.onscroll = () => dots.childNodes.forEach ((x, i) => x.classList.toggle ('active', i + 1 === currentPage (inner)))  
}

//детекция прокручивания страниц

document.addEventListener ('DOMContentLoaded', () => {
    

    initScroller ($('.scroller'))
    
//     initScroller ($('.prices'))
})