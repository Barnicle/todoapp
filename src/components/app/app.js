import React, { Component } from 'react';
//import ReactDOM from 'react-dom';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../addItem';
import './app.css';

export default class App extends Component {
  maxId = 100;
  constructor(state) {
    super();
    this.label = '';
    this.id = Number;
    this.done = false;
    this.important = false;
  }
  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Create Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    search: '',
    filter: 'all' // active, all, done
  };
  filterItems = filter => {};
  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(el => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]; //слияние
  }

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };
  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  addItem = text => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]; //Создание нового массива
      return {
        todoData: newArr
      };
    });
  };

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id); //поиск необходимого айдишника
      // [a, b, c, d, e]
      // [a, b,   d, e]
      // const before = todoData.slice(0, idx); //все элементы до нужного id
      // const after = todoData.slice(idx + 1); //после
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]; //слияние
      return {
        todoData: newArray
      };
    });
  };

  filter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(item => !item.done);
      case 'done':
        return items.filter(items => items.done);
      default:
        return items;
    }
  };

  onFilterChange = filter => {
    this.setState({ filter });
  };
  onSearchChange = search => {
    this.setState({ search });
  };

  showItems(items, search) {
    if (search.length === 0) return items;
    return items.filter(items => {
      return items.label.indexOf(search) > -1;
    });
  }

  render() {
    const { todoData, search, filter } = this.state;
    const doneCount = todoData.filter(el => el.done).length;
    const visibleItems = this.filter(this.showItems(todoData, search), filter);
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />{' '}
        <div className="d-flex top-panel">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange} />
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <div>
          <AddItem onItemAdded={this.addItem} />
        </div>
      </div>
    );
  }
}
