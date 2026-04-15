import { debounce } from "./utils.js";

export class Autocomplete {
  optionsList = [];
  actions;

  inputElement;
  selectElement;
  optionsListElement;

  constructor(api, urn, actions) {
    this.actions = actions;

    this.inputElement = document.createElement("input");
    this.inputElement.classList.add("autocomplete_field");
    this.inputElement.addEventListener(
      "keydown",
      debounce(async (event) => {
        if (event.target.value === "") {
          this.clearList();
          return;
        }
        const urnFull = `${urn}?q=${encodeURIComponent(this.inputElement.value)}+in:name&per_page=5`;
        const listData = await api.getData(urnFull);
        if (!listData) return;

        this.setList(listData.items);
        this.creteOptions();
        this.showOptions();
      }, 200),
    );

    this.inputElement.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") this.showOptions();
    });

    this.selectElement = document.createElement("select");
    this.selectElement.classList.add("visually-hidden");
    this.selectElement.setAttribute("tabindex", "-1");

    this.optionsListElement = document.createElement("ul");
    this.optionsListElement.id = "optionsList";
    this.optionsListElement.classList.add("repositories_list", "visually-hidden");
  }

  getElement() {
    const fragment = document.createDocumentFragment();
    fragment.append(this.inputElement, this.selectElement, this.optionsListElement);
    return fragment;
  }

  setList(listData) {
    this.optionsList = [...listData];
  }

  creteOptions() {
    const fragment = document.createDocumentFragment();

    this.optionsList.forEach((elem) => {
      const optionElement = document.createElement("li");
      optionElement.setAttribute("value", elem.id);
      optionElement.textContent = `${elem.name}`;
      optionElement.addEventListener("click", this.actions.onSelect);
      fragment.append(optionElement);
    });
    this.optionsListElement.replaceChildren(fragment);
  }

  showOptions() {
    this.optionsListElement.classList.remove("visually-hidden");
    document.addEventListener("click", this.showOptionsEvent.bind(this));
  }

  hideOptions() {
    this.optionsListElement.classList.add("visually-hidden");
    document.removeEventListener("click", this.showOptionsEvent.bind(this));
  }

  clearList() {
    this.optionsList = [];
    this.optionsListElement.textContent = "";
    this.hideOptions();
  }

  getInfoByID(id) {
    return this.optionsList.find((elem) => elem.id === id);
  }

  showOptionsEvent (event) {
    if (this.inputElement != event.target) {
      this.hideOptions();
    }
  }

  clearField() {
    this.inputElement.value = "";
  }
}
