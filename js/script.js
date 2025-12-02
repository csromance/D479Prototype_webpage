document.addEventListener('DOMContentLoaded', function () {
  const reviewList = document.querySelector('.review-list');
  if (!reviewList) return;

  const cards = Array.from(reviewList.querySelectorAll('.review-card'));
  const prevBtn = document.querySelector('.review-nav.prev');
  const nextBtn = document.querySelector('.review-nav.next');
  const pageSize = 3; // show 3 reviews at a time
  let page = 0;

  function renderPage() {
    const totalPages = Math.ceil(cards.length / pageSize);
    if (page < 0) page = totalPages - 1;
    if (page >= totalPages) page = 0;

    const start = page * pageSize;
    const end = start + pageSize;

    cards.forEach((card, index) => {
      if (index >= start && index < end) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  // If there aren't enough reviews to paginate, just show them and hide controls
  if (cards.length <= pageSize) {
    const controls = document.querySelector('.review-controls');
    if (controls) controls.style.display = 'none';
    return;
  }

  renderPage();

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      page -= 1;
      renderPage();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      page += 1;
      renderPage();
    });
  }
});
