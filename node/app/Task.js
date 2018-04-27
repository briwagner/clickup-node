class Task {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.text_content;
    this.parent = data.parent;
    this.assignees = data.assignees;
    this.tags = data.tags;
    this.estimate = data.time_estimate;
    this.status = data.status.status;
  }

  markup() {
    return `
    <div class="task">
      <h1>${this.name} - ${this.id}</h1>
      <p>${this.description != null ? this.description : 'No description'}</p>
      <p>Assigned: ${this.getAssigned()}</p>
      <p>${this.status}</p>
    </div>
    `;
  }

  getAssigned() {
    return this.assignees.map((x) => x.username).join(", ");
  }
}

module.exports = Task;