import React, { Component } from 'react';
import './addItem.css';
export default class AddItem extends Component {
  state = {
    label: ''
  };
  onLabelChange = e => {
    this.setState({
      label: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: ''
    });
  };
  render() {
    return (
      <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          required
          placeholder="Enter your task"
          onChange={this.onLabelChange}
          value={this.state.label}
        />
        <button className="btn btn-outline-secondary">Add</button>
      </form>
    );
  }
}
