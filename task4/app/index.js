// import styles
import './index.scss';

class Slider {
    constructor(el) {
        this.slider = el;
        this.slides = this.slider.querySelectorAll(".js-slider-item");
        this.prevBtn = this.slider.querySelector(".js-slider-btn-prev");
        this.nextBtn = this.slider.querySelector(".js-slider-btn-next");

        this.currentSlideIndex = 0;
        this.lastSlideIndex = this.slides.length - 1;

        this.timer = null;

        this.classes = {
            active: "active"
        };

        this.init();
        this.setListener();
    }

    /**
     * Активируем Slider и Timer
     * @returns {void}
     */
    init() {
        this.setActiveSlide();
        this.getTimer();
    }

    /**
     * Слушаем события
     * @returns {void}
     */
    setListener() {
        this.prevBtn.addEventListener("click", () => {
            clearInterval(this.timer);
            this.prevSlide();
            this.getTimer();
        });
        
        this.nextBtn.addEventListener("click", () => {
            clearInterval(this.timer);
            this.nextSlide();
            this.getTimer();
        });
    }

    /**
     * Делаем активным выбранный слайд
     * @returns {void}
     */
    setActiveSlide() {
        this.slides.forEach((item, index) => {
            if (index === this.currentSlideIndex) {
                item.classList.add(this.classes.active);
            } else {
                item.classList.remove(this.classes.active);
            }
        });
    }

    /**
     * Устанавливаем таймер для автоматического переключения
     * @returns {void}
     */
    getTimer() {
        this.timer = setInterval(() => {
            this.nextSlide();
        }, 2000);
    }

    /**
     * Активация следующего слайда
     * @returns {void}
     */
    prevSlide() {
        if (this.currentSlideIndex === 0) {
            this.currentSlideIndex = this.lastSlideIndex;
        } else {
            this.currentSlideIndex -= 1;
        }

        this.setActiveSlide();
    }

    /**
     * Активация предыдущего слайда
     * @returns {void}
     */
    nextSlide() {
        if (this.currentSlideIndex === this.lastSlideIndex) {
            this.currentSlideIndex = 0;
        } else {
            this.currentSlideIndex += 1;
        }

        this.setActiveSlide();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".js-slider");
    for (let i = 0; i < items.length; i++) {
        new Slider(items[i]);
    }
});
