export function initCardProductReviewToggle() {
  const parents = document.querySelectorAll('.card-product-review-hidden-mobile');
  if (!parents.length) return;

  parents.forEach(parent => {
    const topBlock = parent.querySelector('.card-product-review-hidden-mobile__top');
    const button = parent.querySelector('.card-product-review-hidden-mobile__btn');

    if (!topBlock || !button) return;

    const MAX_HEIGHT = 232;

    const checkHeight = () => {
      if (topBlock.scrollHeight > MAX_HEIGHT) {
        topBlock.classList.add('rest-height');
      } else {
        topBlock.classList.remove('rest-height');
        button.classList.remove('open');
      }
    };

    checkHeight();

    button.addEventListener('click', () => {
      const isOpen = button.classList.contains('open');

      if (isOpen) {
        topBlock.classList.add('rest-height');
        button.classList.remove('open');
      } else {
        topBlock.classList.remove('rest-height');
        button.classList.add('open');
      }
    });

    window.addEventListener('resize', checkHeight);
  });
}
