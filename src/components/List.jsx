import React,{Component} from 'react';

import * as Redux from 'react-redux';
import * as actions from "../actions/actions.jsx";

class List extends Component {
  constructor(props){
    super(props);

  }

  componentWillReceiveProps(nextProps){
    let {dispatch} = this.props;
    if (nextProps.searchResults > this.props.searchResults) {
      dispatch(actions.isLoading(false));
    }

    if (nextProps.offset > this.props.offset) {
      dispatch(actions.getRecentSearch(this.props.searchTerm, nextProps.offset));
    }

  }
    _loadMore(e) {
      e.preventDefault();
      //increment offset and pass searchterm + offset
      let {dispatch, searchTerm, offset} = this.props;
      dispatch(actions.incrementOffset());

    }

    _renderList(){
      return Object.values(this.props.searchResults).map((item)=>{
        return (
          <div className="nc-pagination" key={item.id}>{item.id}</div>
        );
      })

    }

  render(){

    let {searchResults, loading, dispatch} = this.props;

    if (loading) {
      return (
        <div className="nc-initial-load"><span className="fa fa-spinner fa-pulse fa-3x fa-fw"></span></div>
      )
    }

    if (searchResults.length > 0) {

      return (
        <div>
            {this._renderList()}
            <div className="nc-pagination">
              <button className="nc-page-btn" onClick={this._loadMore.bind(this)}>Load More..</button>
            </div>
        </div>
      );

    }
    else {
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
      searchTerm: state.recentSearch.savedSearch,
      offset: state.offset.value,
      loading: state.loadingProgress.loading
    }
  }
)(List);
