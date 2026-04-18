import { testWebP } from './module/testWebP.js';
import { initContactsModal } from './module/initContactsModal.js';
import { initMobileMenu } from './module/initMobileMenu.js';
import { initMobileDropdowns } from './module/initMobileDropdowns.js';
import { initHeaderScroll } from './module/initHeaderScroll.js';
import { initHeaderScrollAdd } from './module/initHeaderScrollAdd.js';
import { initSwiper } from './module/swiper.js';
import { counterAnim } from './module/counterAnim.js';
import { initMapPoints, initMapPointsController} from './module/initMapPoints.js';
import { initLocationTabs } from './module/initLocationTabs.js';
import { initDropDownType2 } from './module/initDropDownType2.js';
import { dropDownLocations } from './module/dropDownLocations.js';
import { initTabs } from './module/initAllTabs.js';
import { initStaticTabs } from './module/initStaticTabs.js';
import { initFormValidation } from './module/initFormValidation.js';
import { initDropDownFilter1 } from './module/initDropDownFilter1.js';
import { initModal } from './module/initModal.js';
import { initCardProductReviewToggle } from './module/initCardProductReviewToggle.js';
import { initGradientScrollToggle } from './module/initGradientScrollToggle.js';
import { video } from './module/video.js';
import { initDropdowns } from './module/initDropdowns.js';
import { initTabsType1 } from './module/initTabsType1.js';


testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp');
    console.log("выполнился webp")
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});

if(document.querySelector('.header__contacts')) {
  initContactsModal();
}

if(document.querySelector('.header__bottom')) {
  initMobileMenu();
}

if(document.querySelectorAll('.drop-down-type-1').length) {
  initMobileDropdowns()
}

if(document.querySelector('#header')) {
  initHeaderScroll();
  initHeaderScrollAdd();
}

if(document.querySelectorAll('.swiper-container').length) {
  initSwiper()
}

if (document.querySelectorAll('.counter').length) {
  counterAnim()
}

if (document.querySelector('.map-objects-box')){
  initMapPointsController()
}

if (document.querySelectorAll('.box-location').length) {
  initLocationTabs()
}

if (document.querySelector('.drop-down-type-2')) {
  initDropDownType2()
}

if (document.querySelector('.box-point-wrapper')) {
  dropDownLocations()
}

if (document.querySelector('.js-open-tab')) {
  initTabs()
}

/*if (document.querySelector('.form-type-1')) {
  initValidate()
}*/

if (document.querySelectorAll('.static-tabs').length) {
  initStaticTabs()
}

if (document.querySelectorAll('.js-form').length) {
  initFormValidation();

  try {
    if (window.BX && typeof BX.addCustomEvent === 'function') {
      BX.addCustomEvent('onAjaxSuccess', initFormValidation);
    } else {
      // Если BX нет, но он может появиться позже
      const checkBX = () => {
        if (window.BX && typeof BX.addCustomEvent === 'function') {
          BX.addCustomEvent('onAjaxSuccess', initFormValidation);
          return true;
        }
        return false;
      };
      
      // Проверяем каждые 100мс в течение 5 секунд
      let attempts = 0;
      const interval = setInterval(() => {
        if (checkBX() || attempts >= 50) {
          clearInterval(interval);
        }
        attempts++;
      }, 100);
    }
  } catch (error) {
    console.warn('Не удалось подписаться на событие Bitrix:', error);
  }
}

if (document.querySelectorAll('.drop-down-filter-1').length) {
  initDropDownFilter1()
}

if (document.querySelectorAll('.modal').length) {
  initModal()
}

if (document.querySelectorAll('.card-product-review-hidden-mobile').length) {
  initCardProductReviewToggle()
}

if (document.querySelectorAll('.modal-history__wrapper').length) {
  initGradientScrollToggle()
}

if (document.querySelectorAll('.box-video').length) {
  video()
}

if (document.querySelectorAll('.drop-down-nav').length) {
  initDropdowns('.drop-down-nav');
}

if (document.querySelectorAll(".js-tabs-tipe-1").length) {
  initTabsType1();
}