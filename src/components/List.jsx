import React,{Component} from 'react';

import * as Redux from 'react-redux';
import * as actions from "../actions/actions.jsx";

import ListItem from './ListItem.jsx';

class List extends Component {
  constructor(props){
    super(props);

  }

  componentWillReceiveProps(nextProps){
    let {dispatch} = this.props;
    if (nextProps.searchResults > this.props.searchResults) {
      dispatch(actions.initialLoading(false));
      dispatch(actions.loadingMore(false));
    }

    if (nextProps.offset > this.props.offset) {
      dispatch(actions.getRecentSearch(this.props.searchTerm, nextProps.offset));
    }

  }
    _loadMore(e) {
      e.preventDefault();
      //increment offset and pass searchterm + offset
      let {dispatch, searchTerm, offset, totalBars, searchResults} = this.props;
      if (totalBars === searchResults.length) {
        return;
      }
      dispatch(actions.incrementOffset());
      dispatch(actions.loadingMore(true));

    }


    _renderList(){

      var renderGoingButton = ()=>{
        if (this.props.isGoing) {
          return <button className="nc-going-btn" onClick={this.setGoing.bind(this)}>Not Going</button>
        } else {
          return <button className="nc-going-btn" onClick={this.setGoing.bind(this)}>Going</button>
        }
      }

      return Object.values(this.props.searchResults).map((item)=>{
        return (
          <ListItem key={item.id} item={item}/>
        );
      })
    }

    _renderMore(){
      if (this.props.loadingMore) {
        return (<div><span className="fa fa-spinner fa-pulse fa-fw"></span></div>);
      } else {
        return (
          <div className="nc-button-group">
            <button className="nc-page-btn" onClick={this._loadMore.bind(this)}>Load More..</button>
            <div className="nc-description">Showing {this.props.searchResults.length} of {this.props.totalBars}</div>
          </div>
        )
      }
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
            {this._renderMore()}
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
      auth: state.auth,
      searchResults: state.searchResults.bars,
      totalBars: state.searchResults.totalBars,
      searchTerm: state.recentSearch.savedSearch,
      offset: state.offset.value,
      loading: state.loadingProgress.loading,
      loadingMore: state.loadingProgress.loadingMore,
      isGoing: state.isGoing.isGoing
    }
  }
)(List);
