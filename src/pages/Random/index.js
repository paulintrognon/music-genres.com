import React from 'react';
import { connect } from 'react-redux';

import { playRandomTrackAction } from '../../actions/playerActions';
import Homepage from '../Homepage';

class Random extends React.Component {

  componentWillMount() {
    this.props.dispatch(playRandomTrackAction(this.props.match.params.slug));
  }

  render() {
    return (
      <Homepage></Homepage>
    );
  }
}
export default connect()(Random);
