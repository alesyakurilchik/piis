
// Улучшенная карусель с поддержкой свайпов для мобильных устройств
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const track = carousel.querySelector('.carousel__track');
    const slides = Array.from(track.querySelectorAll('.carousel__slide'));
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const dotsContainer = document.getElementById('carouselDots');
    const dots = Array.from(dotsContainer.querySelectorAll('.carousel__dot'));

    let currentIndex = 0;
    const slideWidth = 100; // в процентах
    let autoplayInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    // Установка начального положения
    track.style.transform = `translateX(0%)`;

    // Обновление активной точки
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('carousel__dot--active', index === currentIndex);
            // Добавляем ARIA-атрибуты для доступности
            dot.setAttribute('aria-selected', index === currentIndex);
            dot.setAttribute('aria-label', `Слайд ${index + 1} из ${slides.length}`);
        });
    }

    // Переход к слайду
    function goToSlide(index) {
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }

        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        updateDots();

        // Обновляем ARIA-атрибуты для доступности
        carousel.setAttribute('aria-live', 'polite');
        setTimeout(() => {
            carousel.setAttribute('aria-live', 'off');
        }, 1000);
    }

    // Обработчики событий для кнопок
    prevButton.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        resetAutoplay();
    });

    nextButton.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        resetAutoplay();
    });

    // Обработчики событий для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoplay();
        });
        // Добавляем ARIA-атрибуты для доступности
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-selected', index === currentIndex);
        dot.setAttribute('aria-label', `Слайд ${index + 1} из ${slides.length}`);
    });

    // Поддержка свайпов для мобильных устройств
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        resetAutoplay();
    }, {passive: true});

    function handleSwipe() {
        const swipeThreshold = 50; // минимальное расстояние для свайпа
        if (touchEndX < touchStartX - swipeThreshold) {
            // Свайп влево - следующий слайд
            goToSlide(currentIndex + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Свайп вправо - предыдущий слайд
            goToSlide(currentIndex - 1);
        }
    }

    // Автоматическое переключение слайдов
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Добавляем ARIA-атрибуты для доступности
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-roledescription', 'карусель');
    dotsContainer.setAttribute('role', 'tablist');
    slides.forEach((slide, index) => {
        slide.setAttribute('role', 'tabpanel');
        slide.setAttribute('aria-roledescription', 'слайд');
        slide.setAttribute('aria-label', `${index + 1} из ${slides.length}`);
    });

    // Запускаем автоматическое переключение
    startAutoplay();

    // Останавливаем автоматическое переключение при наведении
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        startAutoplay();
    });

    // Обработка клавиш для доступности
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentIndex - 1);
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentIndex + 1);
            resetAutoplay();
        }
    });
});