// import styles
import './index.scss';

class Form {
    constructor(el) {
        this.formWrapper = el;
        this.openFormBtn = this.formWrapper.querySelector(".js-form-open-btn");
        this.closeFormBtn = this.formWrapper.querySelector(".js-form-close-btn");

        this.form = this.formWrapper.querySelector(".js-form");
        this.emailInput = this.formWrapper.querySelector(".js-form-email");
        this.textInput = this.formWrapper.querySelector(".js-form-text");

        this.formSubmitBtn = this.formWrapper.querySelector(".js-form-submit");

        this.classes = {
            active: "active",
            visible: "visible",
            error: "error"
        };

        this.setListener();
    }

    /**
     * Слушаем события
     * @returns {void}
     */
    setListener() {
        this.openFormBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.openForm();
        });

        this.closeFormBtn.addEventListener("click", () => {
            this.closeForm();
        });

        this.formSubmitBtn.addEventListener("click", (e) => {
            e.preventDefault();
            
            if (this.checkEmailInput() && this.checkTextInput()) {
                this.closeForm();
                this.openFormBtn.classList.remove(this.classes.active);
            }
        });
    }

    /**
     * Откроем форму
     * @returns {void}
     */
    openForm() {
        this.form.classList.add(this.classes.active);
        setTimeout(() => {
            this.form.classList.add(this.classes.visible);
        }, 33);
    }

    /**
     * Закроем форму
     * @returns {void}
     */
    closeForm() {
        this.form.classList.remove(this.classes.visible);
        setTimeout(() => {
            this.form.classList.remove(this.classes.active);
        }, 250);
    }

    /**
     * Проверка поля email
     * @returns {void}
     */
    checkEmailInput() {
        const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g
        const email = emailReg.exec(this.emailInput.value);

        if (email && email[0]) {
            this.emailInput.classList.remove(this.classes.error);
            return true;
        }

        this.emailInput.classList.add(this.classes.error);
        return false;
    }
    
    /**
     * Проверка поля text - не менее 3-х символов
     * @returns {void}
     */
    checkTextInput() {
        if (this.textInput.value.length >= 3) {
            this.textInput.classList.remove(this.classes.error);
            return true;
        }
        
        this.textInput.classList.add(this.classes.error);
        return false;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".js-form-wrapper");
    for (let i = 0; i < items.length; i++) {
        new Form(items[i]);
    }
});
