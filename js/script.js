// Reviews pagination
document.addEventListener('DOMContentLoaded', function () {
  const reviewList = document.querySelector('.review-list');
  if (!reviewList) return;

  const cards = Array.from(reviewList.querySelectorAll('.review-card'));
  const prevBtn = document.querySelector('.review-nav.prev');
  const nextBtn = document.querySelector('.review-nav.next');
  const pageSize = 3;
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

// Declare interval IDs at top level for cleanup
let experienceIntervalId = null;
let accommodationIntervalId = null;
let diningIntervalId = null;
let travelIntervalId = null;
let toastTimeoutId = null;

// Everything else
document.addEventListener('DOMContentLoaded', function () {
  // --- Attractions category filters ---
  const filterButtons = document.querySelectorAll('.attraction-filters .filter-btn');
  const attractionCards = document.querySelectorAll('.attraction-list .attraction-card');

  if (filterButtons.length && attractionCards.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter || 'all';

        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

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

  // --- Featured Experience (Attractions) ---
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
        imageClass: 'card-image-attraction-volcano-hike',
      },
      {
        title: 'Night Market Food Tour',
        text: 'Sample grilled seafood, tropical fruit, and Taniti street food with a local host.',
        imageClass: 'card-image-attraction-night-market',
      },
    ]
    : [];

  let currentExperienceIndex = 0;

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

    experienceDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    experienceImage.classList.remove(
      'card-image-featured-experience',
      'card-image-attraction-volcano-hike',
      'card-image-attraction-night-market'
    );
    experienceImage.classList.add(exp.imageClass);

    experienceTitle.textContent = exp.title;
    experienceText.textContent = exp.text;
  }

  if (experienceDots.length && experiences.length) {
    experienceDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        setExperience(index);
        if (experienceIntervalId) clearInterval(experienceIntervalId);
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

    setExperience(0);
  }

  // --- Featured Accommodation (Lodging) ---
  const accommodationCard = document.querySelector('.featured-accommodation .experience-card');
  const accommodationImage = accommodationCard
    ? accommodationCard.querySelector('.featured-accommodation-image')
    : null;
  const accommodationTitle = accommodationCard ? accommodationCard.querySelector('h3') : null;
  const accommodationText = accommodationCard ? accommodationCard.querySelector('p') : null;
  const accommodationDots = document.querySelectorAll(
    '.featured-accommodation .scroll-indicators .dot'
  );

  const accommodations = accommodationCard
    ? [
      {
        title: 'Lagoon Bungalow Escape',
        text: 'Stay in a spacious overwater bungalow with glassy turquoise water below, private deck loungers, and soft evening lighting along the pier.',
        imageClass: 'card-image-featured-stay',
      },
      {
        title: 'Overwater Bungalow Collection',
        text: 'Line up a row of classic overwater bungalows with warm lighting, ideal for couples and special trips.',
        imageClass: 'card-image-explore-overwater',
      },
      {
        title: 'Beachfront Family Resort',
        text: 'Choose a beachfront hotel with wide sand, easy pool access, and short walks to casual dining and activities.',
        imageClass: 'card-image-explore-beach',
      },
    ]
    : [];

  let currentAccommodationIndex = 0;

  function setAccommodation(index) {
    if (
      !accommodationCard ||
      !accommodationImage ||
      !accommodationTitle ||
      !accommodationText ||
      !accommodations.length
    ) {
      return;
    }

    currentAccommodationIndex = index;
    const acc = accommodations[index];
    if (!acc) return;

    accommodationDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    accommodationImage.classList.remove(
      'card-image-featured-stay',
      'card-image-explore-overwater',
      'card-image-explore-garden',
      'card-image-explore-beach'
    );
    accommodationImage.classList.add(acc.imageClass);

    accommodationTitle.textContent = acc.title;
    accommodationText.textContent = acc.text;
  }

  if (accommodationDots.length && accommodations.length) {
    accommodationDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        setAccommodation(index);
        if (accommodationIntervalId) clearInterval(accommodationIntervalId);
        accommodationIntervalId = setInterval(() => {
          const nextIndex = (currentAccommodationIndex + 1) % accommodations.length;
          setAccommodation(nextIndex);
        }, 5000);
      });
    });

    accommodationIntervalId = setInterval(() => {
      const nextIndex = (currentAccommodationIndex + 1) % accommodations.length;
      setAccommodation(nextIndex);
    }, 5000);

    setAccommodation(0);
  }

  // --- Featured Dining (Food) ---
  const diningCard = document.querySelector('.featured-dining .experience-card');
  const diningImage = diningCard ? diningCard.querySelector('.featured-dining-image') : null;
  const diningTitle = diningCard ? diningCard.querySelector('h3') : null;
  const diningText = diningCard ? diningCard.querySelector('p') : null;
  const diningDots = document.querySelectorAll('.featured-dining .scroll-indicators .dot');

  const diningExperiences = diningCard
    ? [
      {
        title: 'Lagoon Tasting Night',
        text: 'Multi-course dinner spotlighting fresh seafood, island-grown produce, and dessert under the stars.',
        imageClass: 'card-image-featured-dining',
      },
      {
        title: 'Harborfront Sunset Dinner',
        text: 'Relax at a harbor-side grill with fresh-caught fish, island cocktails, and harbor lights reflecting on the water.',
        imageClass: 'card-image-food-harbor',
      },
      {
        title: 'Night Market Street Feast',
        text: 'Follow a local guide through Taniti\'s night market for grilled skewers, noodles, and sweet treats from open-air stalls.',
        imageClass: 'card-image-explore-night-market',
      },
    ]
    : [];

  let currentDiningIndex = 0;

  function setDining(index) {
    if (
      !diningCard ||
      !diningImage ||
      !diningTitle ||
      !diningText ||
      !diningExperiences.length
    ) {
      return;
    }

    currentDiningIndex = index;
    const exp = diningExperiences[index];
    if (!exp) return;

    diningDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    diningImage.classList.remove(
      'card-image-featured-dining',
      'card-image-food-harbor',
      'card-image-explore-night-market'
    );
    diningImage.classList.add(exp.imageClass);

    diningTitle.textContent = exp.title;
    diningText.textContent = exp.text;
  }

  if (diningDots.length && diningExperiences.length) {
    diningDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        setDining(index);
        if (diningIntervalId) clearInterval(diningIntervalId);
        diningIntervalId = setInterval(() => {
          const nextIndex = (currentDiningIndex + 1) % diningExperiences.length;
          setDining(nextIndex);
        }, 5000);
      });
    });

    diningIntervalId = setInterval(() => {
      const nextIndex = (currentDiningIndex + 1) % diningExperiences.length;
      setDining(nextIndex);
    }, 5000);

    setDining(0);
  }

  // --- Featured Travel Tip (Travel Info) ---
  const travelCard = document.querySelector('.featured-travel-tip .experience-card');
  const travelImage = travelCard ? travelCard.querySelector('.featured-travel-image') : null;
  const travelTitle = travelCard ? travelCard.querySelector('h3') : null;
  const travelText = travelCard ? travelCard.querySelector('p') : null;
  const travelLink = travelCard ? travelCard.querySelector('.card-link') : null;
  const travelDots = document.querySelectorAll('.featured-travel-tip .scroll-indicators .dot');

  const travelTips = travelCard
    ? [
      {
        title: 'Your First Evening on Taniti',
        text: 'Plan a relaxed first night near the harbor so you can adjust to the time zone before exploring the rest of the island.',
        imageClass: 'card-image-featured-travel',
        link: 'info.html#sightseeing',
      },
      {
        title: 'Getting Around Without a Car',
        text: 'Use island shuttles, taxis, and bike rentals to move between the harbor, beaches, and rainforest trails.',
        imageClass: 'card-image-featured-no-car',
        link: 'info.html#ground-transportation',
      },
      {
        title: 'Essentials to Pack',
        text: 'Bring reef-safe sunscreen, light rain gear, and a power adapter so you\'re ready for shifting weather and day trips.',
        imageClass: 'card-image-essentials-to-pack',
        link: 'info.html#faqs',
      },
    ]
    : [];

  let currentTravelIndex = 0;

  function setTravelTip(index) {
    if (!travelCard || !travelImage || !travelTitle || !travelText || !travelTips.length) {
      return;
    }

    currentTravelIndex = index;
    const tip = travelTips[index];
    if (!tip) return;

    travelDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    travelImage.classList.remove(
      'card-image-featured-travel',
      'card-image-featured-no-car',
      'card-image-essentials-to-pack'
    );
    travelImage.classList.add(tip.imageClass);

    travelTitle.textContent = tip.title;
    travelText.textContent = tip.text;
    if (travelLink && tip.link) {
      travelLink.href = tip.link;
    }
  }

  if (travelDots.length && travelTips.length) {
    travelDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        setTravelTip(index);
        if (travelIntervalId) clearInterval(travelIntervalId);
        travelIntervalId = setInterval(() => {
          const nextIndex = (currentTravelIndex + 1) % travelTips.length;
          setTravelTip(nextIndex);
        }, 5000);
      });
    });

    travelIntervalId = setInterval(() => {
      const nextIndex = (currentTravelIndex + 1) % travelTips.length;
      setTravelTip(nextIndex);
    }, 5000);

    setTravelTip(0);
  }

  // --- Prototype toast for fake filters ---
  function getOrCreatePrototypeToast() {
    let toast = document.querySelector('.prototype-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'prototype-toast';
      toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    return toast;
  }

  function showPrototypeToast(message) {
    const toast = getOrCreatePrototypeToast();
    toast.textContent = message;
    toast.classList.add('visible');

    if (toastTimeoutId) clearTimeout(toastTimeoutId);
    toastTimeoutId = setTimeout(() => {
      toast.classList.remove('visible');
    }, 2600);
  }

  const prototypeFilterTargets = document.querySelectorAll(
    '.booking-filters .filter-chip, .booking-filters .filter-placeholder, .booking-filters .more-filters-link'
  );

  prototypeFilterTargets.forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      showPrototypeToast('Filters are display-only in this prototype.');
    });
  });

  // --- Selection bar on booking page ---
  const bookingCards = document.querySelectorAll('.booking-card');
  const selectionBar = document.querySelector('.booking-selection-bar');
  const selectionCountEl = selectionBar
    ? selectionBar.querySelector('.selection-count')
    : null;

  let selectedCount = 0;

  function updateSelectionBar() {
    if (!selectionBar || !selectionCountEl) return;

    if (selectedCount <= 0) {
      selectionBar.classList.add('hidden');
      selectionCountEl.textContent = '0 items selected for your trip';
      return;
    }

    const label = selectedCount === 1 ? 'item' : 'items';
    selectionCountEl.textContent = `${selectedCount} ${label} selected for your trip`;
    selectionBar.classList.remove('hidden');
  }

  bookingCards.forEach((card) => {
    const selectBtn = card.querySelector('.select-btn');
    if (!selectBtn) return;

    selectBtn.addEventListener('click', (event) => {
      event.preventDefault();

      const isSelected = card.classList.toggle('selected');
      if (isSelected) {
        selectedCount += 1;
      } else {
        selectedCount = Math.max(0, selectedCount - 1);
      }

      updateSelectionBar();
    });
  });

  // --- Checkout button + itinerary toast ---
  const completeBookingBtn = document.querySelector('.complete-booking-btn');
  if (completeBookingBtn) {
    completeBookingBtn.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = 'thankyou.html';
    });
  }

  const itineraryLinks = document.querySelectorAll(
    '.checkout-link[href="#"], .action-link[href="#"]'
  );

  if (itineraryLinks.length) {
    itineraryLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        showPrototypeToast('Itinerary view is not included in this prototype.');
      });
    });
  }
});

// Clean up intervals and timeouts when page unloads to prevent memory leaks
window.addEventListener('beforeunload', () => {
  if (experienceIntervalId) clearInterval(experienceIntervalId);
  if (accommodationIntervalId) clearInterval(accommodationIntervalId);
  if (diningIntervalId) clearInterval(diningIntervalId);
  if (travelIntervalId) clearInterval(travelIntervalId);
  if (toastTimeoutId) clearTimeout(toastTimeoutId);
});
