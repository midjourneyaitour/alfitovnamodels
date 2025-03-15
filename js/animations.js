// Animation Handlers
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация анимаций
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
    });
    
    // Добавляем плавное прокручивание для всех якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Учитываем высоту навигации
                behavior: 'smooth'
            });
        });
    });
    
    // Добавляем обработчик для индикатора прокрутки
    const scrollIndicator = document.querySelector('.scroll-indicator-top');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('.welcome-section');
            if (nextSection) {
                window.scrollTo({
                    top: nextSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Инициализируем Intersection Observer для более эффективного отслеживания видимости
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Прекращаем наблюдение после появления
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            observer.observe(element);
        });
    }
});

// Дополнительные анимации можно добавить здесь

// Параллакс эффект для изображений с улучшенной производительностью
const parallaxImages = document.querySelectorAll('.parallax-image');
let ticking = false;

function handleParallax() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            parallaxImages.forEach(image => {
                const scrollPosition = window.pageYOffset;
                const imagePosition = image.getBoundingClientRect().top + scrollPosition;
                const offset = scrollPosition - imagePosition;
                const windowHeight = window.innerHeight;
                
                if (offset > -windowHeight && offset < windowHeight) {
                    // Эффект параллакса - изображение движется медленнее, чем прокрутка
                    image.style.transform = `translateY(${offset * 0.15}px)`;
                }
            });
            ticking = false;
        });
        ticking = true;
    }
}

// Плавное появление элементов при прокрутке с улучшенной производительностью
const fadeElements = document.querySelectorAll('.fade-in, .animate-on-scroll');
let fadeInTicking = false;

function handleFadeIn() {
    if (!fadeInTicking) {
        window.requestAnimationFrame(() => {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight * 0.85) {
                    element.classList.add('visible');
                }
            });
            fadeInTicking = false;
        });
        fadeInTicking = true;
    }
}

// Добавляем эффект параллакса для hero секции
function handleHeroParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition > 0) {
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    }
}

// Обработчики событий с оптимизацией производительности
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    handleParallax();
    handleFadeIn();
    handleHeroParallax();
    
    // Добавляем дополнительную проверку после остановки прокрутки
    scrollTimeout = setTimeout(() => {
        handleFadeIn();
    }, 100);
});

window.addEventListener('load', () => {
    handleParallax();
    handleFadeIn();
    
    // Добавляем анимацию для изображений при загрузке
    document.querySelectorAll('.image-column img').forEach((img, index) => {
        setTimeout(() => {
            img.classList.add('visible');
        }, 300 * index); // Последовательная анимация
    });
});