import { debounce } from "./utils.js";

export class Autocomplete {
  optionsList = [];
  actions;

  inputElement;
  selectElement;
  optionsListElement;

  constructor(api, uri, actions) {
    this.actions = actions;

    this.inputElement = document.createElement("input");
    this.inputElement.classList.add("autocomplete_field");
    this.inputElement.addEventListener(
      "keyup",
      debounce(async (event) => {
        if (event.target.value === "") {
          this.clearList();
          return;
        }
        const uriString = `${uri}?q=${this.inputElement.value}+in:name&per_page=5`;
        const listData = await api.getData(uriString);
        if (!listData) return;

        this.setList(listData.items);
        this.creteOptions();
        this.showOptions();
      }, 300),
    );
    this.inputElement.addEventListener("keyup", (event) => {
      if (event.key === "ArrowDown") this.showOptions();
    });

    this.selectElement = document.createElement("select");
    this.selectElement.setAttribute("name", "select");
    this.selectElement.setAttribute("aria-hidden", "true");
    this.selectElement.setAttribute("class", "visually-hidden");
    this.selectElement.setAttribute("tabindex", "-1");

    this.optionsListElement = document.createElement("ul");
    this.optionsListElement.setAttribute("id", "optionsList");
    this.optionsListElement.classList.add("repositories_list");
    this.optionsListElement.classList.add("visually-hidden");
  }

  getElement() {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this.inputElement);
    fragment.appendChild(this.selectElement);
    fragment.appendChild(this.optionsListElement);
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
      fragment.appendChild(optionElement);
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
