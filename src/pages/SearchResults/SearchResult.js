import React from 'react';

export default class SearchResult extends React.Component {
  handleClick = () => {
    this.props.onClickHandler(this.props.value);
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        {this.props.name}
      </div>
    )
  }
}
