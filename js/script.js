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

document.addEventListener('DOMContentLoaded', function () {
  // --- Attractions category filters ---
  const filterButtons = document.querySelectorAll('.attraction-filters .filter-btn');
  const attractionCards = document.querySelectorAll('.attraction-list .attraction-card');

  if (filterButtons.length && attractionCards.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter || 'all';

        // Update active state on buttons
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // Show/hide cards based on category
        attractionCards.forEach((card) => {
          if (filter === 'all') {
            card.classList.remove('hidden');
          } else {
            const match = card.classList.contains('cat-' + filter);
            card.classList.toggle('hidden', !match);
          }
        });
      });
    });
  }

  // --- Featured Experience mini-slider ---
  const experienceCard = document.querySelector('.featured-experience .experience-card');
  const experienceImage = experienceCard
    ? experienceCard.querySelector('.featured-experience-image')
    : null;
  const experienceTitle = experienceCard ? experienceCard.querySelector('h3') : null;
  const experienceText = experienceCard ? experienceCard.querySelector('p') : null;
  const experienceDots = document.querySelectorAll(
    '.featured-experience .scroll-indicators .dot'
  );

  const experiences = experienceCard
    ? [
      {
        title: 'Surf the East Reef',
        text: 'Catch beginner-friendly waves with a local guide; boards and gear included.',
        imageClass: 'card-image-featured-experience',
      },
      {
        title: 'Sunset Volcano Hike',
        text: 'Join a small-group hike to the crater overlook, ending with stargazing on the ridge.',
        imageClass: 'card-image-attraction-volcano',
      },
      {
        title: 'Night Market Food Tour',
        text: 'Sample grilled seafood, tropical fruit, and Taniti street food with a local host.',
        imageClass: 'card-image-attraction-markets',
      },
    ]
    : [];

  let currentExperienceIndex = 0;
  let experienceIntervalId = null;

  function setExperience(index) {
    if (
      !experienceCard ||
      !experienceImage ||
      !experienceTitle ||
      !experienceText ||
      !experiences.length
    ) {
      return;
    }
    currentExperienceIndex = index;

    const exp = experiences[index];
    if (!exp) return;

    // Update active dot
    experienceDots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Swap image classes
    experienceImage.classList.remove(
      'card-image-featured-experience',
      'card-image-attraction-volcano',
      'card-image-attraction-markets'
    );
    experienceImage.classList.add(exp.imageClass);

    // Update text
    experienceTitle.textContent = exp.title;
    experienceText.textContent = exp.text;
  }

  if (experienceDots.length && experiences.length) {
    experienceDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        setExperience(index);
        if (experienceIntervalId) {
          clearInterval(experienceIntervalId);
        }
        experienceIntervalId = setInterval(() => {
          const nextIndex = (currentExperienceIndex + 1) % experiences.length;
          setExperience(nextIndex);
        }, 5000);
      });
    });

    experienceIntervalId = setInterval(() => {
      const nextIndex = (currentExperienceIndex + 1) % experiences.length;
      setExperience(nextIndex);
    }, 5000);

    // Initialize first state
    setExperience(0);
  }
});
