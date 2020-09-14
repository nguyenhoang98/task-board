import React, { Component } from "react";
import "./ControlSearch.css";
class ControlSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name : ''
    }
    this.searchName = this.searchName.bind(this) ;
    this.onSearchTask = this.onSearchTask.bind(this) ;
  }
  searchName(e){
    this.setState({
      name : e.target.value
    })
  }
  onSearchTask(){
    const { name } = this.state ;
    const { onSearchTask } = this.props ;
    onSearchTask(name)
  }
  render() {
    const { name } = this.state ;
    return (
      <div className="control-search">
        <div className="control-search-input">
          <input type="text" value = {name} onChange = {this.searchName} />
        </div>
        <div className="control-search-button">
          <button className="btn btn-search"
          onClick = {this.onSearchTask}
          >
            <i className="fa fa-search" aria-hidden="true"></i>
            Tìm
          </button>
        </div>
      </div>
    );
  }
}
export default ControlSearch;
