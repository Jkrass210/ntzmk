export function initMapPoints() {
  const mapContainer = document.querySelector('.map-objects-box');
  const pointsContainer = document.querySelector('.box-point');
  
  if (!mapContainer || !pointsContainer) {
    console.warn('Map points: необходимые элементы не найдены');
    return;
  }
  
  const svg = mapContainer.querySelector('svg');
  if (!svg) {
    console.warn('Map points: SVG карта не найдена');
    return;
  }
  
  const points = pointsContainer.querySelectorAll('.box-location');
  if (points.length === 0) {
    console.warn('Map points: точки не найдены');
    return;
  }

  // Переносим точки в контейнер карты
  points.forEach(point => {
    mapContainer.appendChild(point);
  });

  // Устанавливаем абсолютное позиционирование
  points.forEach(point => {
    point.style.position = 'absolute';
    point.style.transform = 'translate(-50%, -100%)'; // Центрирование
  });

  // Убеждаемся, что контейнер карты имеет relative позиционирование
  if (getComputedStyle(mapContainer).position === 'static') {
    mapContainer.style.position = 'relative';
  }

  function updatePointsPosition() {
    const svgRect = svg.getBoundingClientRect();
    
    points.forEach(point => {
      const locationId = point.getAttribute('data-id');
      if (!locationId) return;
      
      const locationMarker = svg.querySelector(`#${locationId}`);
      if (!locationMarker) return;
      
      const cx = parseFloat(locationMarker.getAttribute('cx'));
      const cy = parseFloat(locationMarker.getAttribute('cy'));
      
      // Рассчитываем позицию относительно SVG
      const pointX = (cx / svg.viewBox.baseVal.width) * svgRect.width;
      const pointY = (cy / svg.viewBox.baseVal.height) * svgRect.height;
      
      point.style.left = `${pointX}px`;
      point.style.top = `${pointY}px`;
    });
  }

  // Первоначальная установка позиций
  updatePointsPosition();
  
  // Обработчик изменения размера окна
  let resizeTimeout;
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updatePointsPosition, 100);
  }

  window.addEventListener('resize', handleResize);

  // Функция для очистки
  return () => {
    window.removeEventListener('resize', handleResize);
    clearTimeout(resizeTimeout);
  };
}

let destroyMapPoints = null;

export function initMapPointsController() {
  const mapContainer = document.querySelector('.map-objects-box');
  const pointsContainer = document.querySelector('.box-point');

  function restorePoints() {
    if (!mapContainer || !pointsContainer) return;
    const movedPoints = mapContainer.querySelectorAll('.box-location');
    movedPoints.forEach(p => pointsContainer.appendChild(p));
  }

  function checkWidth() {
    const width = window.innerWidth;

    if (width >= 1024) {
      if (!destroyMapPoints) {
        destroyMapPoints = initMapPoints();
      }
    } else {
      if (destroyMapPoints) {
        destroyMapPoints();     // снимаем resize-обработчики
        destroyMapPoints = null;
        restorePoints();        // возвращаем точки обратно
      }
    }
  }

  checkWidth();
  window.addEventListener('resize', checkWidth);
}
