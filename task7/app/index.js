// import styles
import './index.scss';

class Anchor {
    constructor(el) {
        this.anchor = el;
        this.anchorItems = this.anchor.querySelectorAll(".js-anchor-item");

        this.setListener();
    }

    /**
     * Слушаем события
     * @returns {void}
     */
    setListener() {
        this.anchorItems.forEach(item => {
            item.addEventListener("click", (e) => {
                this.anchorSroll(e, item);
            });
        });
    }

    /**
     * Сколл до выбранного блока
     * @param {object} - событие клика по item из меню навигации
     * @param {object} - DOM-элемент li, на котором сработало событие click (меню навигации)
     * @returns {void}
     */
    anchorSroll(event, item) {
        event.preventDefault();

        const anchorLink = item.querySelector(".js-anchor-item-link");
        const sectionId = anchorLink.getAttribute("href").slice(1);

        const section = document.getElementById(sectionId);
        section.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".js-anchor");
    for (let i = 0; i < items.length; i++) {
        new Anchor(items[i]);
    }
});
