import React,{Component} from 'react';

import * as Redux from 'react-redux';
import * as actions from "../actions/actions.jsx";
import _ from "lodash";
import firebase, {firebaseRef} from '../firebase/index.js';

class ListItem extends Component {
  constructor(props){
    super(props);
  }
  componentDidUpdate(){
    console.log("Rendered");
  }

  setGoing(id, e){
    e.preventDefault();
    var {dispatch, isGoing, item} = this.props;
    var uid = this.props.auth.uid;

    if (uid) {
      e.target.innerText = e.target.innerText === "Going" ? "Not Going" : "Going";
      if (e.target.innerText === "Going") {
        dispatch(actions.removeUserfromBar(id));

        setTimeout(()=>{
        // dispatch(actions.getGoingCount(id));
      }, 500);

      } else if (e.target.innerText === "Not Going") {
        dispatch(actions.addUsertoBar(id));
        // dispatch(actions.getGoingCount(id));
      }

    } else {
      alert("Login required to RSVP.");
    }

  }


  render(){
    // console.log(this.props.countData);
    var goingList = this.props.countData;
    var {item} = this.props;
    var uid = this.props.auth.uid;

    var userList = {};

    Object.keys(goingList).map((each)=>{
      if (each === item.id) {
        // console.log(goingList[item.id]);
        userList = goingList[item.id]
      }
    });

    var myData = item.userData ? item.userData : {};
    var findUID = ()=>{
      var myUID = _.find(Object.values(userList), {uid});
      if (myUID && myUID.uid === uid) {
        return true;
      }
      return false;
    }



    return (
      <div className="nc-bar-container">
        <div className="nc-business-image"><img className="nc-image-url" src={item.image_url} alt="No Picture"/></div>
        <div className="nc-business-container">
          <div className="nc-business-wrapper">
            <div className="nc-business-name"><a href={item.url} target="_blank">{item.name}</a></div>
            <div className="nc-going-container">
              <div className="nc-going-count">
                { userList ? Object.keys(userList).length : 0 }
              </div>
              <button className="nc-going-btn" onClick={this.setGoing.bind(this, item.id)}>
                {findUID() ? "Not Going" : "Going"}
              </button>
            </div>
          </div>
          <div className="nc-business-review">{item.reviews[0]? item.reviews[0].text : "No reviews"}</div>
        </div>
        <div className="nc-business-address">
          <div>{item.location.address1}</div>
          <div>{item.location.city}</div>
          <div>{item.location.zip_code}</div>
        </div>
      </div>
    );
  }
}

export default Redux.connect(
  (state)=>{
    return {
      auth: state.auth,
      searchResults: state.searchResults.bars
    }
  }
)(ListItem);
