/* Элементы модального окна */
const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal__overlay");
const modalClose = document.querySelector(".modal__close");
const modalOpenButtons = document.querySelectorAll("[data-modal-open]");

/* Элементы шапки и мобильного меню */
const headerBurger = document.querySelector(".header__burger");
const headerNav = document.querySelector(".header__nav");

/* Элементы каталога */
const tabs = document.querySelectorAll(".catalog__tab");
const catalogCards = document.querySelectorAll(".catalog-card");
const areaSelect = document.querySelector("#area");
const floorSelect = document.querySelector("#floor");
const deadlineSelect = document.querySelector("#deadline");

/* Элементы галереи */
const galleryTrack = document.querySelector(".gallery__track");
const gallerySlides = document.querySelectorAll(".gallery__slide");
const galleryPrevButton = document.querySelector("[data-gallery-prev]");
const galleryNextButton = document.querySelector("[data-gallery-next]");

/* Элементы FAQ */
const faqItems = document.querySelectorAll(".faq__item");
const faqButtons = document.querySelectorAll(".faq__question");
const faqAnswers = document.querySelectorAll(".faq__answer");

/* Модальное окно */
const initModal = () => {
  if (!modal) {
    return;
  }

  const openModal = () => {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
  };

  modalOpenButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeModal);
  }

  /* Закрываем модалку по Escape, если она сейчас открыта */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });
};

/* Бургер-меню */
const initBurgerMenu = () => {
  if (!headerBurger || !headerNav) {
    return;
  }

  headerBurger.addEventListener("click", () => {
    headerNav.classList.toggle("header__nav--open");
    headerBurger.classList.toggle("header__burger--active");
  });
};

/* Каталог с табами и фильтрами */
const initCatalog = () => {
  let currentCategory = "all";

  const applyCatalogFilters = () => {
    const selectedArea = Number(areaSelect?.value || 0);
    const selectedCharacter = floorSelect?.value || "all";
    const selectedBuilding = deadlineSelect?.value || "all";

    catalogCards.forEach((card) => {
      const cardArea = Number(card.dataset.area || 0);
      const matchesCategory = currentCategory === "all" || card.dataset.category === currentCategory;
      const matchesArea = !selectedArea || cardArea >= selectedArea;
      const matchesCharacter = selectedCharacter === "all" || card.dataset.character === selectedCharacter;
      const matchesBuilding = selectedBuilding === "all" || card.dataset.building === selectedBuilding;

      card.style.display = matchesCategory && matchesArea && matchesCharacter && matchesBuilding ? "block" : "none";
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      currentCategory = tab.dataset.tab;

      tabs.forEach((item) => {
        item.classList.remove("catalog__tab--active");
      });

      tab.classList.add("catalog__tab--active");
      applyCatalogFilters();
    });
  });

  /* Фильтрация срабатывает сразу при выборе значения */
  [areaSelect, floorSelect, deadlineSelect].forEach((select) => {
    if (select) {
      select.addEventListener("change", applyCatalogFilters);
    }
  });
};

/* Слайдер галереи */
const initGallery = () => {
  if (!galleryTrack || !gallerySlides.length || !galleryPrevButton || !galleryNextButton) {
    return;
  }

  let currentSlide = 0;

  const updateGallery = () => {
    galleryTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  };

  galleryPrevButton.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + gallerySlides.length) % gallerySlides.length;
    updateGallery();
  });

  galleryNextButton.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % gallerySlides.length;
    updateGallery();
  });

  updateGallery();
};

/* Аккордеон FAQ */
const initFaq = () => {
  const closeAllFaqItems = () => {
    faqItems.forEach((item) => {
      const answer = item.querySelector(".faq__answer");
      const icon = item.querySelector(".faq__icon");

      item.classList.remove("faq__item--active");
      answer.style.display = "none";
      icon.textContent = "+";
    });
  };

  /* По умолчанию ответы скрыты */
  faqAnswers.forEach((answer) => {
    answer.style.display = "none";
  });

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const currentItem = button.closest(".faq__item");
      const currentAnswer = currentItem.querySelector(".faq__answer");
      const currentIcon = button.querySelector(".faq__icon");
      const isOpen = currentItem.classList.contains("faq__item--active");

      closeAllFaqItems();

      if (!isOpen) {
        currentItem.classList.add("faq__item--active");
        currentAnswer.style.display = "block";
        currentIcon.textContent = "−";
      }
    });
  });
};

/* Инициализация всех интерактивных блоков страницы */
initModal();
initBurgerMenu();
initCatalog();
initGallery();
initFaq();
