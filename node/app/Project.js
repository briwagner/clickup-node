class Project {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.lists = data.lists;
  }

  markup() {
    return `
    <div class="task">
      <h1>${this.name}</h1>
      ${this.getLists()}
    </div>
    `;
  }

  getLists() {
    if (this.lists.length > 0) {
      let markup = "<ul>";
      for (let i = 0; i < this.lists.length; i++) {
        markup += `<li><a href="/list/${this.lists[i].id}">${this.lists[i].name}</a></li>`;
      }
      markup += "</ul>";
      return markup;
    } else {
      return '';
    }
  }
}

module.exports = Project;