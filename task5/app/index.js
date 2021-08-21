// import styles
import './index.scss';

import _debounce from 'lodash/debounce';

class Header {
    constructor(el) {
        this.header = el;
        this.navItem = this.header.querySelector(".js-header-nav-item");
        this.dropdown = this.header.querySelector(".js-header-dropdown");

        this.classes = {
            active: "active",
            small: "small"
        };

        this.setListener();
    }

    /**
     * Слушаем события
     * @returns {void}
     */
    setListener() {
        const iOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);
        let event = "click";

        if (iOS != null) event = "touchstart";

        this.navItem.addEventListener(event, () => {
            if (window.innerWidth <= 480) { // Только для телефона
                this.toggleDropdown();
            }
        });

        // Изменение Header при scroll
        window.addEventListener("scroll", _debounce(() => {
            if (window.pageYOffset > 20) {
                this.header.classList.add(this.classes.small);
            } else {
                this.header.classList.remove(this.classes.small);
            }
        }, 50));
    }

    /**
     * Открываем/закрываем dropdown для мобильных устройств при нажатии на item
     * @returns {void}
     */
    toggleDropdown() {
        if (this.dropdown.classList.contains(this.classes.active)) {
            this.dropdown.classList.remove(this.classes.active);
        } else {
            this.dropdown.classList.add(this.classes.active);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".js-header");
    for (let i = 0; i < items.length; i++) {
        new Header(items[i]);
    }
});
