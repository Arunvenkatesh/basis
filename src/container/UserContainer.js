import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/';
import { PropTypes } from 'prop-types';

export default function UserContainer(ComposedComponent) {
  /**
   * UserContainer is a wrapper component
   */
  class UserContainer extends Component {
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  /**
   * mapStateToProps() is used for dispatching actions to store.
   * @param  state  which contains all userStates used for the application.
   * returns userReducer which contains all state variables initialised in reducer.
   */
  function mapStateToProps(state) {
    return {
      userReducer: state.userReducer
    };
  }
  /**
   * mapDispatchToProps() is used for dispatching actions to store.
   * @param   dispatch is a function of redux store.
   * returns actions  which contains all action functions
   */
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(ActionCreators, dispatch)
    };
  }
  /**
   * connect() function that connects react components with redux store
   */
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserContainer);
}

UserContainer.contextTypes = {
  router: PropTypes.object
};
