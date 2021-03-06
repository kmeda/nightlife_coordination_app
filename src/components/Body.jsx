import React,{Component} from 'react';

import * as Redux from 'react-redux';
import * as actions from "../actions/actions.jsx";

import List from './List.jsx';

class Body extends Component {
  constructor(props){
    super(props);
  }


  handleLogin(){
    //dispatch login action here
    var {dispatch} = this.props;
    dispatch(actions.loggingIn(true));
    dispatch(actions.startLogin());

  }

  handleLogout(){
    //dispatch login action here
    var {dispatch} = this.props;
    dispatch(actions.startLogout());

  }

  componentDidMount() {
      this.refs.searchTerm.focus();
  }

  handleChange(e){
    e.preventDefault();
    var {dispatch} = this.props;
    var term = this.refs.searchTerm.value;
    dispatch(actions.setSearchTerm(term));
  }

  handleSubmit(e){
    e.preventDefault();

    var {dispatch, searchTerm, loadingProgress, auth} = this.props;

    if (loadingProgress.loading || loadingProgress.loadingMore) {
      return;
    }

    if (!loadingProgress.loading || !loadingProgress.loadingMore) {
      dispatch(actions.clearItems());
      dispatch(actions.clearOffset());
      dispatch(actions.cleartotalBars());
    }

    if (searchTerm.length === 0 || searchTerm.match(/^\s*$/g)) {
        this.refs.searchTerm.value = '';
      dispatch(actions.clearSearchTerm());
      dispatch(actions.initialLoading(false));
        this.refs.searchTerm.focus();
      return;
    }
    dispatch(actions.initialLoading(true));
    dispatch(actions.saveSearchTerm(searchTerm));

    if (auth.uid) {
      dispatch(actions.saveSearchHistory(searchTerm));
    }

    dispatch(actions.getRecentSearch(searchTerm, 0));
      this.refs.searchTerm.value = '';
    dispatch(actions.clearSearchTerm());
      this.refs.searchTerm.focus();

  }


  render(){

    var {uid, loggingIn, dispatch} = this.props.auth;

    var renderButton = ()=>{
      if (!uid && !loggingIn) {
        return <div className="nc-login-btn" onClick={this.handleLogin.bind(this)}>Login</div>
      } else if (!uid && loggingIn){
        return <div className="nc-login-btn"><span className="fa fa-circle-o-notch fa-spin fa-fw"></span></div>
      } else {
        return <div className="nc-login-btn" onClick={this.handleLogout.bind(this)}>Logout</div>
      }
    }

    return (
      <div className="nc-inner-wrapper">
        <div className="nc-wrapper">
            {renderButton()}
          <div className="nc-inner-container">
            <div className="nc-header-container">
              <h1>Plans Tonite?</h1>
              <div className="nc-icons-styling">
                <span className="fa fa-map-marker fa-2x"></span>
                <span className="fa fa-cab fa-2x"></span>
                <span className="fa fa-glass fa-2x"></span>
              </div>
              <h2 className="nc-content-h2">See which bars are hoppin tonight and RSVP ahead of time!</h2>
              <h2 className="nc-content-h2">Remember: take a cab and drink responsibly.</h2>
              <form className="nc-search">
                <input type="text" className="nc-input-box" ref="searchTerm" onChange={this.handleChange.bind(this)}></input>
                <button className="nc-search-btn" onClick={this.handleSubmit.bind(this)}>Go</button>
              </form>
            </div>
            <div className="nc-list-container">
              <List countData={this.props.countData}/>
            </div>
          </div>
          <span className="nc-inline-text">Designed and developed by Karthik   <a href="https://github.com/kmeda" target="_blank"><span className="fa fa-github fa-lg nc-git-hub"></span></a></span>
        </div>
        </div>
    )
  }
}

export default Redux.connect(
  (state)=>{
    return {
      auth: state.auth,
      searchTerm: state.recentSearch.searchTerm,
      loadingProgress: state.loadingProgress
    }
  }
)(Body);
