import React,{Component} from 'react';

import * as Redux from 'react-redux';
import * as actions from "../actions/actions.jsx";

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

  handleChange(e){
    e.preventDefault();
    var {dispatch} = this.props;
    var term = this.refs.searchTerm.value;
    dispatch(actions.setSearchTerm(term));
  }

  handleSubmit(){
    //dispatch action getRecentSearch with searchterm here
    //updates the state and renders the list based on uid
    //clear searchterm state and input


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

              <div className="nc-search">
                <input type="text" className="nc-input-box" ref="searchTerm" onChange={this.handleChange.bind(this)}></input>
                <div className="nc-search-btn">Go</div>
              </div>
            </div>
            <div className="nc-list-container">
              <br/><br/><br/><br/>
              <div className="nc-list-content">Search for bars local to your area..</div>
              <br/><br/><br/><br/>
              <div className="nc-list-content">Powered by Yelp</div>
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
      auth: state.auth
    }
  }
)(Body);

// if the user is not logged in render hints else render recent search or new search
// search results should
