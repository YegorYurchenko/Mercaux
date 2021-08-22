// import styles
import './index.scss';

import anime from 'animejs/lib/anime.es.js';

class Main {
    constructor(el) {
        this.mainBlock = el;

        this.startBlock = this.mainBlock.querySelector(".js-main-start");
        this.chooseBlock = this.mainBlock.querySelector(".js-main-choose");
        this.chosedBlock = this.mainBlock.querySelector(".js-main-chosed");

        this.selectItemBlockWrapper = this.mainBlock.querySelector(".js-main-select-item-wrap");
        this.selectItemBlock = this.mainBlock.querySelector(".js-main-select-item");
        this.addItemBlock = this.mainBlock.querySelector(".js-main-add-item");

        this.result = this.mainBlock.querySelector(".js-main-result");
        this.resultDialogFirst = this.result.querySelector(".js-main-result-dialog-first");
        this.resultDialogSecond = this.result.querySelector(".js-main-result-dialog-second");

        this.classes = {
            pulse: "pulse",
            active: "active"
        };

        this.setListener();
    }

    /**
     * Слушаем события
     * @returns {void}
     */
    setListener() {
        this.startBlock.addEventListener("click", (e) => {
            this.selectMaterials(e);
        });

        this.chooseBlock.addEventListener("click", (e) => {
            this.selectVisualMerchandising(e);
        });

        this.chosedBlock.addEventListener("click", (e) => {
            this.chosedBlockPlusHomeBtn(e);
        });

        this.selectItemBlock.addEventListener("click", (e) => {
            this.selectItemBlockPlusBtn(e);
        });

        this.addItemBlock.addEventListener("click", (e) => {
            this.addItemBlockBtn(e);
        });
    }

    /**
     * Клик по кнопке Materials
     * @param {object} e - событие клика мышки (или touch)
     * @returns {void}
     */
    selectMaterials(e) {
        // Если нажимаем на правую нижнюю кнопку
        if (e.offsetX > this.startBlock.width * 0.67 && e.offsetY > this.startBlock.height * 0.877) {
            // Создадим анимацию клика
            this.createPulseTouchAnimation(e);

            // Убираем влево текущий блок Start
            anime({
                targets: this.startBlock,
                translateX: "-100vw",
                easing: 'linear',
                duration: 500,
                delay: 350
            });

            // Показываем новый блок Choose
            anime({
                targets: this.chooseBlock,
                translateX: "-100vw",
                easing: 'linear',
                duration: 500,
                delay: 350
            });
        }
    }

    /**
     * Клик по кнопке Visual Merchandising
     * @param {object} e - событие клика мышки
     * @returns {void}
     */
    selectVisualMerchandising(e) {
        // Если нажимаем на левую (2-ую) кнопку
        if (e.offsetX < this.startBlock.width * 0.31 &&
            (e.offsetY > this.startBlock.height * 0.245 && e.offsetY < this.startBlock.height * 0.32)) {
            // Создадим анимацию клика
            this.createPulseTouchAnimation(e);

            setTimeout(() => {
                // Делаем кнопку нажатой
                this.chosedBlock.classList.add(this.classes.active);
            }, 250);
        }
    }

    /**
     * Клик по кнопке + Home
     * @param {object} e - событие клика мышки
     * @returns {void}
     */
    chosedBlockPlusHomeBtn(e) {
        // Если нажимаем кнопку +Home
        if (e.offsetX > this.startBlock.width * 0.91 && e.offsetY < this.startBlock.height * 0.06) {
            // Создадим анимацию клика
            this.createPulseTouchAnimation(e);

            this.selectItemBlockWrapper.classList.add(this.classes.active);

            // Показываем блок Select item
            anime({
                targets: this.selectItemBlock,
                translateY: "-90vh",
                easing: 'linear',
                duration: 400,
                delay: 400
            });
        }
    }

    /**
     * Слушаем события
     * @param {object} e - событие клика мышки (или touch)
     * @returns {void}
     */
    selectItemBlockPlusBtn(e) {
        if ((e.offsetX > this.selectItemBlock.width * 0.14 && e.offsetX < this.selectItemBlock.width * 0.23)
            &&
            (e.offsetY > this.selectItemBlock.height * 0.155 && e.offsetY < this.selectItemBlock.height * 0.247)) {
            // Создадим анимацию клика
            this.createPulseTouchAnimation(e);

            // Показываем блок Add item
            anime({
                targets: this.addItemBlock,
                translateY: "-83vh",
                easing: 'linear',
                duration: 400,
                delay: 400
            });
        }
    }

    /**
     * Выбор item
     * @param {object} e - событие клика мышки (или touch)
     * @returns {void}
     */
    addItemBlockBtn(e) {
        if (e.offsetY > this.addItemBlock.height * 0.256 && e.offsetY < this.addItemBlock.height * 0.627) {
            // Создадим анимацию клика
            this.createPulseTouchAnimation(e);

            // Добавим выбранную картинку на фон
            this.result.classList.add(this.classes.active);

            setTimeout(() => {
                // Удалим overlay
                this.selectItemBlockWrapper.classList.remove(this.classes.active);

                this.showDialog(this.resultDialogFirst);

                setTimeout(() => {
                    this.showDialog(this.resultDialogSecond);
                }, 2200);
            }, 400);
        }
    }

    /**
     * Показать диалог с анимацией
     * @param {object} dialog - DOM-элемент диалога
     * @returns {void}
     */
    showDialog(dialog) {
        setTimeout(() => {
            // Добавим блок диалога
            dialog.classList.add(this.classes.active);

            setTimeout(() => {
                // Показ текста с анимацией набора
                anime({
                    targets: dialog.querySelectorAll(".main__result-dialog-letter"),
                    opacity: 1,
                    delay: function (el, i) {
                        return i * 100;
                    },
                });
            }, 400);
        }, 400);
    }

    /**
     * Создадим анимацию на touch
     * @param {object} e - событие клика мышки (или touch)
     * @returns {void}
     */
    createPulseTouchAnimation(e) {
        const touch = document.createElement('div');
        touch.classList.add(this.classes.pulse);
        touch.style.top = `${e.clientY - 25}px`;
        touch.style.left = `${e.clientX - 25}px`;
        this.mainBlock.appendChild(touch);

        // Удалим блок из DOM-дерева
        setTimeout(() => {
            const pulseBlocks = this.mainBlock.querySelector(`.${this.classes.pulse}`);
            pulseBlocks.remove();
        }, 500);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".js-main");
    for (let i = 0; i < items.length; i++) {
        new Main(items[i]);
    }
});
