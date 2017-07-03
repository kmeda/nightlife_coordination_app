import React,{Component} from 'react';

import bg_image_1 from "../assets/image-1.jpg";
import bg_image_2 from "../assets/image-2.jpg";

import Body from './Body.jsx';

class Home extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="container">
        <div><img className="bg-image-1" alt="image-1"/></div>
        <div><img className="bg-image-2" alt="image-2"/></div>

        <Body />
      </div>
    )
  }
}

export default Home;
