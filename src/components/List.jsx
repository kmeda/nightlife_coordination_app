import React,{Component} from 'react';

import * as Redux from 'react-redux';
import * as actions from "../actions/actions.jsx";

class List extends Component {
  constructor(props){
    super(props);

  }


    _loadMore(e) {
      e.preventDefault();
      //increment offset and pass searchterm + offset
      // dispatch(actions.getRecentSearch(searchTerm, offset));
    }

    _renderList(){
      return Object.values(this.props.searchResults).map((item)=>{
        return (
          <div key={item.id}>{item.id}</div>
        );
      })

    }

  render(){

    let {searchResults} = this.props;

    if (searchResults.length > 0) {

      return (
        <div>
            {this._renderList()}
            <div className="nc-pagination"><button onClick={this._loadMore.bind(this)}>Load More..</button></div>
        </div>
      );

    } else {
      return (
        <div>
          <br/><br/><br/><br/>
          <div className="nc-list-content">Search for bars local to your area..</div>
          <br/><br/><br/><br/>
          <div className="nc-list-content">Powered by Yelp</div>
        </div>
      );
    }
  }
}


export default Redux.connect(
  (state)=>{
    return {
      searchResults: state.searchResults,
      searchTerm: state.recentSearch.searchTerm,
      offset: state.offset.value
    }
  }
)(List);
