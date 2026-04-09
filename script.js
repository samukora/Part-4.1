import { Autocomplete } from "./components/autocomplete.js";
import { Api } from "./components/api.js";
import { List } from "./components/list.js";

const api = new Api("https://api.github.com", {
  headers: {
    Authorization: "",
  },
});

const listResuts = new List();
const selectedListElement = document.querySelector("#list");

const autocomplete = new Autocomplete(api, "search/repositories", {
  onSelect: (event) => {
    listResuts.addItem(autocomplete.getInfoByID(event.target.value));
    autocomplete.clearField();
    selectedListElement.replaceChildren(listResuts.showList());
  },
});
const autocompleteElement = document.querySelector("#autocomplete");
autocompleteElement.replaceChildren(autocomplete.getElement());


