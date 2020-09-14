import React, { Component } from "react";
import "./ListItem.css";
class ListItem extends Component {
  render() {
    const { list, index, onDelTask, onUpdateTask, onToggleStatus } = this.props;
    return (
      <tr>
        <td> {index + 1} </td>
        <td> {list.name} </td>
        <td>
          <span
            onClick={() => onToggleStatus(list)}
            style={{
              background: list.status ? "red" : "green",
              padding: "2px",
              borderRadius: 2,
              color: "white",
              cursor: "pointer",
            }}
          >
            {list.status === true ? "Kích Hoạt" : "Ẩn"}
          </span>
        </td>
        <td>
          <button className="btn btn-update" onClick={() => onUpdateTask(list)}>
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            Sửa
          </button>
          <button className="btn btn-del" onClick={() => onDelTask(list)}>
            <i className="fa fa-trash" aria-hidden="true"></i>
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}
export default ListItem;
