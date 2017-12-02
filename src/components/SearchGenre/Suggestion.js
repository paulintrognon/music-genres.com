import React from 'react';

export default class Suggestion extends React.Component {
  handleClick = () => {
    this.props.onSuggestionClick(this.props.value);
  }

  render() {
    let className = 'suggestions-item';
    if (this.props.isSelected) {
      className += ' selected';
    }
    return (
      <li className={className} onClick={this.handleClick}>
        {this.props.name}
      </li>
    );
  }
}
