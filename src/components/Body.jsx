import React,{Component} from 'react';


class Body extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="inner-wrapper">
        <div className="wrapper">
          <div className="login-btn">Logout</div>
          <div className="inner-container">
            <div className="header-container">
              <h1>Plans Tonite?</h1>
              <h2 className="content-h2">See which bars are hoppin tonight and RSVP ahead of time!</h2>
              <h2 className="content-h2">Remember: take a cab and drink responsibly.</h2>

              <div className="search">
                <input type="text" className="input-box"></input>
                <div className="search-btn">Go</div>
              </div>
            </div>
            <div className="list-container">
              <span className="inline-text">Designed and developed by Karthik - Github Link</span>
            </div>
          </div>
        </div>
        </div>
    )
  }
}

export default Body;
