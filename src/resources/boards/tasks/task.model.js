const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'Title',
    order = 0,
    description = 'Lorem Ipsum',
    columnId = 'columnId',
    userId = 'userId',
    boardId = 'boardId'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.columnId = columnId;
    this.boardId = boardId;
  }
}

module.exports = Task;
