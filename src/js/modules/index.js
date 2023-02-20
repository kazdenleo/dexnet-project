import toggleBodyLock from './../helpers/toggleBodyLock'
import { html, firstScreen, header, burgerButton } from './../helpers/elementsNodeList'

// logger (Full Logging System) =================================================================================================================
function FLS(message) {
  setTimeout(() => (window.FLS ? console.log(message) : null), 0)
}

// Проверка браузера на поддержку .webp изображений =================================================================================================================
function isWebp() {
  // Проверка поддержки webp
  const testWebp = (callback) => {
    const webP = new Image()

    webP.onload = webP.onerror = () => callback(webP.height === 2)
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebp((support) => {
    const className = support ? 'webp' : 'no-webp'
    html.classList.add(className)

    FLS(support ? 'webp поддерживается' : 'webp не поддерживается')
  })
}

/* Проверка мобильного браузера */
const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () =>
    isMobile.Android() ||
    isMobile.BlackBerry() ||
    isMobile.iOS() ||
    isMobile.Opera() ||
    isMobile.Windows(),
}
/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
  // Добавление класса _touch для HTML если браузер мобильный
  if (isMobile.any()) {
    html.classList.add('touch')
  }
}

// Добавление loaded для HTML после полной загрузки страницы
function addLoadedClass() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      html.classList.add('loaded')
    }, 0)
  })
}

// Получение хеша в адресе сайта
const getHash = () => {
  if (location.hash) {
    return location.hash.replace('#', '')
  }
}

// Указание хеша в адресе сайта
function setHash(hash) {
  hash = hash ? `#${hash}` : window.location.href.split('#')[0]
  history.pushState('', '', hash)
}

// Функция для фиксированной шапки при скролле =================================================================================================================
function headerFixed() {
  const headerStickyObserver = new IntersectionObserver(([entry]) => {
    header.classList.toggle('sticky', !entry.isIntersecting)
  })

  if (firstScreen) {
    headerStickyObserver.observe(firstScreen)
  }
}

// Универсальная функция для открытия и закрытия попапо =================================================================================================================
const togglePopupWindows = () => {
  document.addEventListener('click', ({ target }) => {
    if (target.closest('[data-type]')) {
      const popup = document.querySelector(
        `[data-popup="${target.dataset.type}"]`
      )

      if (document.querySelector('._is-open')) {
        document.querySelectorAll('._is-open').forEach((modal) => {
          modal.classList.remove('_is-open')
        })
      }

      popup.classList.add('_is-open')
      toggleBodyLock(true)
    }

    if (
      target.classList.contains('_overlay-bg') ||
      target.closest('.button-close')
    ) {
      const popup = target.closest('._overlay-bg')

      popup.classList.remove('_is-open')
      toggleBodyLock(false)
    }
  })
}

// Модуль работы с меню (бургер) =======================================================================================================================================================================================================================
const menuInit = () => {
  if (burgerButton) {
    document.addEventListener('click', ({ target }) => {
      if (target.closest('.icon-menu')) {
        html.classList.toggle('menu-open')
        toggleBodyLock(html.classList.contains('menu-open'))
      }
    })
  }
}
const menuOpen = () => {
  toggleBodyLock(true)
  html.classList.add('menu-open')
}
const menuClose = () => {
  toggleBodyLock(false)
  html.classList.remove('menu-open')
}

export {
  FLS,
  isWebp,
  isMobile,
  addTouchClass,
  headerFixed,
  togglePopupWindows,
  addLoadedClass,
  getHash,
  setHash,
  menuInit,
  menuOpen,
  menuClose,
}

const btn = document.querySelector('.info__button');
const popup = document.querySelector('.popup');
const exit = popup.querySelector('.popup__exit');

btn.addEventListener("click", () => {
    popup.classList.add('popup_active');
})

function closePopup() {
    popup.classList.remove('popup_active');
}

exit.addEventListener("click", () => {
    closePopup();
})

popup.addEventListener('mousedown', (e) => {
	var container = document.querySelector('.popup__container');
    if (!container.contains(e.target) & popup.classList.contains('popup_active')) {
        closePopup();
    }
});

const langBtn = document.querySelector('.header__lang');
const langList = document.querySelector('.header__language-items');
langBtn.addEventListener("click", () => {
    langList.classList.toggle('header__language-items_active');
})

window.addEventListener('mousedown', (e) => {
	var container = document.querySelector('.header__language-items');
    if (!container.contains(e.target) & langList.classList.contains('header__language-items_active')) {
        langList.classList.remove('header__language-items_active');
    }
});

//Форма
const popupBtns = document.querySelectorAll('.popupbtn');
const line = document.querySelector('.popup__line');
const popupInfo = popup.querySelectorAll('.popup__pay-info')
popupBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('popupbtn_left')) {
            line.classList.remove('popup__line_right')
            line.classList.add('popup__line_left')
            popupInfo[1].style.display = "none";
            popupInfo[0].style.display = "flex";
        } else if (btn.classList.contains('popupbtn_right')) {
            line.classList.remove('popup__line_left')
            line.classList.add('popup__line_right')
            popupInfo[0].style.display = "none";
            popupInfo[1].style.display = "flex";
        }
    })
})
