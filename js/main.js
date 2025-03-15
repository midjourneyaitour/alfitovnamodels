// Мобильное меню
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.body;

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });

    // Закрытие меню при клике на ссылку
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });
    
    // Закрытие меню при клике вне меню
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('no-scroll');
        }
    });
}

// Добавление класса для изменения навигации при прокрутке
const nav = document.querySelector('.nav');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Анимация элементов при прокрутке
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.8) {
            element.classList.add('visible');
        }
    });
};

// Обработка касаний для мобильных устройств
let touchStartY = 0;
let touchEndY = 0;

// Функция для определения направления свайпа
function checkDirection() {
    if (touchEndY < touchStartY) {
        // Свайп вверх - скрываем навигацию
        if (window.scrollY > 100) {
            nav.classList.add('nav-hidden');
        }
    } else if (touchEndY > touchStartY) {
        // Свайп вниз - показываем навигацию
        nav.classList.remove('nav-hidden');
    }
}

// Обработчики событий касания
document.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    checkDirection();
});

// Улучшенная загрузка изображений
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    // Проверяем поддержку атрибута loading="lazy"
    if ('loading' in HTMLImageElement.prototype) {
        // Браузер поддерживает lazy loading
        console.log('Browser supports lazy loading');
    } else {
        // Браузер не поддерживает lazy loading, используем Intersection Observer
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);