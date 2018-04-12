import React from 'react';
import MainComponent from '../../components/main';
import {connect} from 'react-redux';
import { changePrice, loadFromStorage, saveEmail, saveFavorite} from '../../actions/demo';


class Main extends React.Component {

  componentWillMount() {
    this.props.loadFromStorage();
  }

  render() {
    return (
      <MainComponent {...this.props}/>
    )
  }
}

const mapStateToProps = state => ({
  demo: state.demo
});

const dispatchActionsToProps = {
  changePrice,
  saveEmail,
  saveFavorite,
  loadFromStorage
}

export default connect(mapStateToProps, dispatchActionsToProps)(Main);
