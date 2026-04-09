export class List {
  list = [];
  listElement;

  constructor() {
    this.listElement = document.createElement("ul");
  }

  addItem(elem) {
    if (!this.list.find((item) => item.id == elem.id)) this.list.push(elem);
  }

  removeItem(id) {
    this.list = this.list.filter((elem) => elem.id != id);
  }

  showList() {
    const fragment = document.createDocumentFragment();
    this.list.forEach((elem) => {
      const liElement = document.createElement("li");
      liElement.setAttribute("id", elem.id);
      const liItemElement = document.createElement("div");
      liItemElement.classList.add("card_info");
      liItemElement.insertAdjacentHTML(
        "afterbegin",
        `<p>Name: ${elem.name}<p>
        <p>Owner: ${elem.owner.login}<p>
        <p>Stars: ${elem.stargazers_count}<p>`,
      );
      const liButtonElement = document.createElement("div");

      liButtonElement.insertAdjacentHTML(
        "afterbegin",
        "<img src='../images/trash.png', alt='Кнопка для удаления выбранного элемента из списка'>",
      );
      liButtonElement.classList.add("card_actions");
      liButtonElement.addEventListener("click", (event) => {
        this.removeItem(event.target.closest("li").id);
        this.showList();
      });

      liElement.appendChild(liItemElement);
      liElement.appendChild(liButtonElement);
      fragment.appendChild(liElement);
    });
    this.listElement.replaceChildren(fragment);

    return this.listElement;
  }
}
