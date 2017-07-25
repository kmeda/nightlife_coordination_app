import React,{Component} from 'react';

import * as Redux from 'react-redux';
import * as actions from "../actions/actions.jsx";

class ListItem extends Component {
  constructor(props){
    super(props);
  }

  setGoing(item, e){
    e.preventDefault();
    // for this bar id push bar_id to firebase for this user
    // on toggle remove it for this user

    // how do you toggle ?
    // set state and toggle it | based on this state change the button name
    // if state is the required value? push to firebase : else remove from firebase
    // state: isGoing: false
    // state === false ? true : false;
    //


    // for every fetch there after filter through this list and get the count
    //

  var {dispatch, isGoing} = this.props;
  e.target.innerText = e.target.innerText === "Going" ? "Not Going" : "Going";

  if (e.target.innerText === "Going") {
    //remove  from firebase
    //dispatch action to do so
    dispatch(actions.removeUserfromBar(item));

  } else if (e.target.innerText === "Not Going") {
    //add to firebase

    dispatch(actions.addUsertoBar(item));
  }

  }


  render(){
    var {item} = this.props;

    return (
      <div className="nc-bar-container">
        <div className="nc-business-image"><img className="nc-image-url" src={item.image_url} alt="No Picture"/></div>
        <div className="nc-business-container">
          <div className="nc-business-wrapper">
            <div className="nc-business-name"><a href={item.url} target="_blank">{item.name}</a></div>
            <div className="nc-going-container">
              <button className="nc-going-btn" onClick={this.setGoing.bind(this, item.id)}>
                Going
              </button>
              <div className="nc-going-count">0</div>
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
      searchTerm: state.recentSearch.searchTerm,
      loadingProgress: state.loadingProgress,
      isGoing: state.isGoing.isGoing
    }
  }
)(ListItem);
