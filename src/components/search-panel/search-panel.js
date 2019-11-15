import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import './search-panel.css';
export default class SearchPanel extends Component {
  state = {
    temp: ''
  };
  onSearch = e => {
    const term = e.target.value;
    this.setState({
      temp: e.target.value
    });
    this.props.onSearchChange(term);
    console.log(e.target.value);
  };

  render() {
    return (
      <input
        className="search-input"
        placeholder="Type here to search"
        value={this.state.temp}
        onChange={this.onSearch}
      />
    );
  }
}
