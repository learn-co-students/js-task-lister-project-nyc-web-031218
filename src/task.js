let taskId = 0;

class Task {
  constructor(description, priority, list) {
    this.id = ++taskId;
    this.description = description;
    this.priority = priority;
    this.listId = list.id;
  }
}
