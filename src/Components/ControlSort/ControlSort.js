import React, { Component } from "react";
import "./ControlSort.css";
class ControlSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openLinkSort: false,
      sortName: "name",
      sortStatus: 1,
    };
    this.onOpenSortLink = this.onOpenSortLink.bind(this);
    this.onSortTask = this.onSortTask.bind(this);
    this.onCloseSortLink = this.onCloseSortLink.bind(this) ;
  }
  onOpenSortLink() {
    this.setState({
      openLinkSort: !this.state.openLinkSort,
    });
  }
  onCloseSortLink() {
    this.setState({
      openLinkSort: false
    });
  }
  onSortTask(sortName, sortStatus) {
    const { onSortTask } = this.props;
    onSortTask(sortName, sortStatus);
    this.setState({
      sortName: sortName,
      sortStatus: sortStatus,
    });
    this.onCloseSortLink()
  }
  render() {
    const { openLinkSort } = this.state;
    return (
      <div className="control-sort">
        <button className="btn btn-sort" onClick={this.onOpenSortLink}>
          <i className="fa fa-sort" aria-hidden="true"></i>
          Sắp Xếp
        </button>
        {openLinkSort && (
          <div className="sort-link">
            <button
              className="btn sort-item"
              onClick={() => this.onSortTask("name", 1)}
            >
              Sắp Xếp a-z
            </button>
            <button
              className="btn sort-item"
              onClick={() => this.onSortTask("name", -1)}
            >
              Sắp Xếp z-a
            </button>
            <button
              className="btn sort-item"
              onClick={() => this.onSortTask("status", 1)}
            >
              Kích Hoạt
            </button>
            <button
              className="btn sort-item"
              onClick={() => this.onSortTask("status", -1)}
            >
              Ẩn
            </button>
          </div>
        )}
      </div>
    );
  }
}
export default ControlSort;
