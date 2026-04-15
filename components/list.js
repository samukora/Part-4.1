export class List {
  list = [];
  listElement;

  constructor() {
    this.listElement = document.createElement("ul");
  }

  addItem(elem) {
    if (this.list.find((item) => item.id == elem.id)) return;

    this.list.push(elem);
    this.listElement.append(this.createCard(elem));
  }

  removeItem(elem) {
    this.list = this.list.filter((item) => item.id != elem.id);
    elem.remove();
  }

  createCard(elem) {
    const liElement = document.createElement("li");
    liElement.appendChild(this.createInfoBlock(elem));
    liElement.appendChild(this.createDeleteBlock());
    return liElement;
  }

  createInfoBlock(elem) {
    const liItemElement = document.createElement("div");
    liItemElement.classList.add("card_info");
    liItemElement.insertAdjacentHTML(
      "afterbegin",
      `<p>Name: ${elem.name}</p>
      <p>Owner: ${elem.owner.login}</p>
      <p>Stars: ${elem.stargazers_count}</p>`,
    );
    return liItemElement;
  }

  createDeleteBlock()  {
    const liButtonElement = document.createElement("div");
    liButtonElement.insertAdjacentHTML(
      "afterbegin",
      "<img src='../images/trash.png', alt='Кнопка для удаления выбранного элемента из списка'>",
    );
    liButtonElement.classList.add("card_actions");
    liButtonElement.addEventListener("click", (event) => {
      this.removeItem(event.target.closest("li"));
    });

    return liButtonElement;
  }


  getElement() {
    return this.listElement;
  }
}
