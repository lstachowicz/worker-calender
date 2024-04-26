export default class NodeModyficator {
    constructor(element) {
        this.element = element;
    }

    setText(text) {
        this.element.innerText = text;
    }

    hasText() {
        return this.element.innerText != "";
    }

    isSelected() {
        return this.element.classList.contains("selected")
    }

    select() {
        this.element.classList.add("selected");
    }

    unselect() {
        this.element.classList.remove("selected");
    }
};