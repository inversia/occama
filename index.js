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

const currentPage = x => Math.floor((x.scrollLeft + x.offsetWidth) / x.offsetWidth)

// const numPages = Math.floor(cost.scrollWidth / cost.offsetWidth)

function scrollTo (hash) {

    const target = document.querySelector (hash)
    
    target.scrollIntoView ({
        
        behavior: 'smooth',
        block: 'start'
    })
}

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

document.addEventListener ('DOMContentLoaded', () => {

    const man   = $('.m')
    const woman = $('.w')
    const cost  = $('.cost')

    man.onclick = () => {

        if (cost.scrollLeft > cost.offsetWidth * 0.2) {
            
            cost.scrollTo ({
                left: 0,
                behavior: 'smooth'
            })
        }
    }

    woman.onclick = () => {
        
        if (cost.scrollLeft < cost.offsetWidth * 0.6) {
            
            cost.scrollTo ({
                left: cost.offsetWidth,
                behavior: 'smooth'
            })
        }        
    }

    woman.onclick ()
})

document.addEventListener ('DOMContentLoaded', () => {

    const items = $$('.range .item')

    for (const item of items) {

        item.onclick = function () {

            for (const otherItem of items) {
                otherItem.classList.toggle ('active', item === otherItem)

            }

    for (const li of $$('.page woman li')) {
        
        li.dataset[item.dataset.size]
//         li.style.display = price ? '' : 'none'

    }
           

//             li.style.display = price ? '' : 'none'
//             li.innerText     = price + ' р.'
        }
    }
})


window.addEventListener ('scroll', () => {

    const intro = $('.intro')

    if (window.scrollY > 900) {
        
//         intro.style.backgroundColor = 'red'

//         alert('YOBA!')

    }
})