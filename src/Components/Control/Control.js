import React, { Component } from "react";
import ControlSearch from "../ControlSearch/ControlSearch";
import ControlSort from "../ControlSort/ControlSort";
import "./Control.css";

class Control extends Component {
  render() {
    const { onSearchTask, onSortTask } = this.props;
    return (
      <div className="control">
        <ControlSearch onSearchTask={onSearchTask} />
        <ControlSort onSortTask={onSortTask} />
      </div>
    );
  }
}

export default Control;
