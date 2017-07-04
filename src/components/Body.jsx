import React,{Component} from 'react';


class Body extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="inner-wrapper">
        <div className="wrapper">
          <div className="login-btn">Login</div>
          <div className="inner-container">
            <div className="header-container">
              <h1>Plans Tonite?</h1>
              <div className="icons-styling">
                <span className="fa fa-map-marker fa-2x"></span>
                <span className="fa fa-cab fa-2x"></span>
                <span className="fa fa-glass fa-2x"></span>
              </div>
              <h2 className="content-h2">See which bars are hoppin tonight and RSVP ahead of time!</h2>
              <h2 className="content-h2">Remember: take a cab and drink responsibly.</h2>

              <div className="search">
                <input type="text" className="input-box"></input>
                <div className="search-btn">Go</div>
              </div>
            </div>
            <div className="list-container">
              <br/><br/><br/><br/>
              <div className="list-content">Search for bars local to your area...</div>
              <br/><br/><br/><br/>
              <div className="list-content">Powered by Yelp</div>
            </div>
          </div>

          <span className="inline-text">Designed and developed by Karthik   <a href="https://github.com/kmeda" target="_blank"><span className="fa fa-github fa-lg git-hub"></span></a></span>

        </div>
        </div>
    )
  }
}

export default Body;
