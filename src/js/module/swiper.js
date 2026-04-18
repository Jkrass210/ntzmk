export function initSwiper() {
  /*const historyMainSliderElement = document.querySelector('.swiper-business-history_main');
  const historyPreviewSliderElement = document.querySelector('.swiper-business-history_preview');

  if (historyMainSliderElement || historyPreviewSliderElement) {
    // Инициализация превью слайдера
    const previewSwiper = new Swiper(historyPreviewSliderElement, {
      modules: [A11y],
      breakpoints: {
        320: { slidesPerView: 'auto', spaceBetween: 4 },
        991: { slidesPerView: 3.2, spaceBetween: 12 },
        1050: { slidesPerView: 3.8, spaceBetween: 16 },
        1400: { slidesPerView: 4, spaceBetween: 24 },
      },
      watchSlidesProgress: true,
    });

    // Инициализация основного слайдера
    const mainSwiper = new Swiper(historyMainSliderElement, {
      modules: [Navigation, Thumbs, A11y],
      slidesPerView: 1,
      spaceBetween: 20,
      noSwiping: true,
      noSwipingClass: 'swiper-slide',
      breakpoints: {
        991: {
          noSwiping: false,
        }
      },
      navigation: {
        nextEl: '.swiper-btn-type-1.--next',
        prevEl: '.swiper-btn-type-1.--prev',
      },
      thumbs: {
        swiper: previewSwiper,
      },
    });
  }*/

  // Общие параметры для всех слайдеров
  const commonOptions = {};

  // Инициализация всех слайдеров с базовыми параметрами
  const sliders = document.querySelectorAll('.swiper-container');

  sliders.forEach((slider) => {
    // Проверка типа элемента
    if (slider instanceof HTMLElement) {
      // Уникальные параметры для каждого слайдера через класс
      let uniqueOptions = { ...commonOptions };

      /*if (slider.classList.contains('swiper-line-news')) {
        uniqueOptions = {
          ...uniqueOptions,
          slidesPerView: 1.1,
          spaceBetween: 16,
          navigation: {
            nextEl: '.line-news__box-swiper .swiper-btn-type-1.--next',
            prevEl: '.line-news__box-swiper .swiper-btn-type-1.--prev',
          },
          breakpoints: {
            450: { slidesPerView: 1.8, spaceBetween: 16 },
            700: { slidesPerView: 2.35, spaceBetween: 20 },
            1050: { slidesPerView: 2.8, spaceBetween: 20 },
            1100: { slidesPerView: 3, spaceBetween: 20 },
            1200: { slidesPerView: 3, spaceBetween: 24 },
          },
        };
      }*/

      /*if (slider.classList.contains('swiper-line-news')) {
        // Находим ближайший родительский контейнер для этого слайдера
        const boxSwiper = slider.closest('.line-news__box-swiper');

        // Если контейнер найден, используем кнопки внутри него
        if (boxSwiper) {
          uniqueOptions = {
            ...uniqueOptions,
            slidesPerView: 1.1,
            spaceBetween: 16,
            navigation: {
              nextEl: boxSwiper.querySelector('.swiper-btn-type-1.--next'),
              prevEl: boxSwiper.querySelector('.swiper-btn-type-1.--prev'),
            },
            breakpoints: {
              450: { slidesPerView: 1.8, spaceBetween: 16 },
              700: { slidesPerView: 2.35, spaceBetween: 20 },
              1050: { slidesPerView: 2.8, spaceBetween: 20 },
              1100: { slidesPerView: 3, spaceBetween: 20 },
              1200: { slidesPerView: 3, spaceBetween: 24 },
            },
          };
        } else {
          // Если контейнер не найден, создаем слайдер без навигации или с другим селектором
          uniqueOptions = {
            ...uniqueOptions,
            slidesPerView: 1.1,
            spaceBetween: 16,
            breakpoints: {
              450: { slidesPerView: 1.8, spaceBetween: 16 },
              700: { slidesPerView: 2.35, spaceBetween: 20 },
              1050: { slidesPerView: 2.8, spaceBetween: 20 },
              1100: { slidesPerView: 3, spaceBetween: 20 },
              1200: { slidesPerView: 3, spaceBetween: 24 },
            },
          };
        }
      }*/

      if (slider.classList.contains('swiper-line-news')) {
        // Находим контейнеры
        var boxSwiperSecNews = slider.closest('.another-news.swiper-line-news');
        var boxSwiper = slider.closest('.line-news__box-swiper');
        var viewportWidth = window.innerWidth;

        // Если это special слайдер и ширина больше 1000px - пропускаем
        if (boxSwiperSecNews && viewportWidth > 1000) {
          return null;
        }

        // Настройки слайдера
        uniqueOptions = {
          slidesPerView: 1.1,
          spaceBetween: 16,
          breakpoints: {
            450: { slidesPerView: 1.8, spaceBetween: 16 },
            700: { slidesPerView: 2.35, spaceBetween: 20 },
            1050: { slidesPerView: 2.8, spaceBetween: 20 },
            1100: { slidesPerView: 3, spaceBetween: 20 },
            1200: { slidesPerView: 3, spaceBetween: 24 },
          },
        };

        // Добавляем навигацию если есть контейнер
        if (boxSwiper) {
          uniqueOptions.navigation = {
            nextEl: boxSwiper.querySelector('.swiper-btn-type-1.--next'),
            prevEl: boxSwiper.querySelector('.swiper-btn-type-1.--prev'),
          };
        }
      }

      if (slider.classList.contains('swiper-line-product')) {
        uniqueOptions = {
          ...uniqueOptions,
          slidesPerView: 1,
          spaceBetween: 16,
          initialSlide: 1,
          navigation: {
            nextEl: '.line-product__box-swiper .swiper-btn-type-1.--next',
            prevEl: '.line-product__box-swiper .swiper-btn-type-1.--prev',
          },
          breakpoints: {
            500: { slidesPerView: 1.2, spaceBetween: 16 },
            700: { slidesPerView: 1.9, spaceBetween: 20 },
            1100: { slidesPerView: 2, spaceBetween: 20 },
            1200: { slidesPerView: 2.3, spaceBetween: 24 },
          },
        };
      }

      if (slider.classList.contains('swiper-line-partners')) {
        uniqueOptions = {
          ...uniqueOptions,
          slidesPerView: "auto",
          spaceBetween: 0,
          initialSlide: 1,
          navigation: {
            nextEl: '.line-partners__box-swiper .swiper-btn-type-1.--next',
            prevEl: '.line-partners__box-swiper .swiper-btn-type-1.--prev',
          },
        };
      }

      if (slider.classList.contains('swiper-licenses')) {
        uniqueOptions = {
          ...uniqueOptions,
          slidesPerView: "auto",
          spaceBetween: 20,
          observer: true,
          observeParents: true,
          navigation: {
            nextEl: '.swiper-licenses .swiper-btn-type-1.--next',
            prevEl: '.swiper-licenses .swiper-btn-type-1.--prev',
          },
        };
      }

      if (slider.classList.contains('swiper-about')) {
        uniqueOptions = {
          ...uniqueOptions,
          allowTouchMove: true,
          loop: true,
          watchOverflow: true,
          slidesPerView: 1,
          spaceBetween: 16,
          //initialSlide: 3,
          navigation: {
            nextEl: '.page-about__box-swiper .swiper-btn-type-1.--next',
            prevEl: '.page-about__box-swiper .swiper-btn-type-1.--prev',
          },
          breakpoints: {
            1000: { slidesPerView: "auto", spaceBetween: 20, allowTouchMove: false },
            1100: { slidesPerView: "auto", spaceBetween: 24, allowTouchMove: false },
          },
        };
      }

      if (slider.classList.contains('swiper-location')) {
        uniqueOptions = {
          ...uniqueOptions,
          slidesPerView: 1,
          spaceBetween: 0,
          speed: 600,
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
          pagination: {
            el: slider.closest('.box-location').querySelector('.swiper-location-pagination'),
            type: 'fraction',
          },
          navigation: {
            nextEl: slider.closest('.box-location').querySelector('.swiper-location-group-btn .swiper-btn-type-2.--next'),
            prevEl: slider.closest('.box-location').querySelector('.swiper-location-group-btn .swiper-btn-type-2.--prev'),
          },
          observer: true,
          observeParents: true,
        };
      }

      if (slider.classList.contains('swiper-section-news')) {
        uniqueOptions = {
          ...uniqueOptions,
          slidesPerView: 1,
          spaceBetween: 16,
          breakpoints: {
            700: { slidesPerView: 2, spaceBetween: 20 },
            1200: { slidesPerView: 2, spaceBetween: 16 },
          },
          navigation: {
            nextEl: '.swiper-btn-type-1.--next',
            prevEl: '.swiper-btn-type-1.--prev',
          },
        };
      }

      if (slider.classList.contains('swiper-product')) {
        uniqueOptions = {
          ...uniqueOptions,
          slidesPerView: 1,
          spaceBetween: 0,
          pagination: {
            el: ".swiper-product-pagination",
            clickable: true,
          },
          /*navigation: {
            nextEl: '.swiper-btn-type-1.--next',
            prevEl: '.swiper-btn-type-1.--prev',
          },*/
        };
      }

      if (slider.classList.contains('swiper-main-product')) {
        uniqueOptions = {
          ...uniqueOptions,
          effect: 'fade',
          fadeEffect: {
            crossFade: true,
          },
          slidesPerView: 1,
          pagination: {
            el: ".swiper-main-product-pagination",
            type: 'fraction',
          },
          navigation: {
            nextEl: '.swiper-btn-type-1.--next',
            prevEl: '.swiper-btn-type-1.--prev',
          },
        };
      }

      if (slider.classList.contains('swiper-production')) {
        uniqueOptions = {
          ...uniqueOptions,
          observer: true,
          observeParents: true,
          observeSlideChildren: true,
          slidesPerView: 1,
          spaceBetween: 0,
          pagination: {
            el: ".swiper-production-pagination",
            type: "fraction",
          },
          navigation: {
            nextEl: '.swiper-btn-type-1.--next',
            prevEl: '.swiper-btn-type-1.--prev',
          },
        };
      }

      // Инициализируем слайдер с уникальными параметрами
      const swiper = new Swiper(slider, uniqueOptions);
    }
  });
}