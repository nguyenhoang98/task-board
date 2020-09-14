import React, { Component } from "react";
import Control from "../Control/Control";
import ListItem from "../ListItem/ListItem";
import "./TaskList.css";
class TaskList extends Component {
  onChangeFilterName = (e) => {
    const { onChangeFilterName } = this.props;
    onChangeFilterName(e.target.value);
  };
  onChangeFilterStatus = (e) => {
    const { onChangeFilterStatus } = this.props;
    onChangeFilterStatus(e.target.value);
  };
  render() {
    const {
      task,
      onOpenForm,
      onDelTask,
      onUpdateTask,
      onToggleStatus,
      onSearchTask,
      filterName,
      filterStatus,
      onSortTask,
    } = this.props;
    return (
      <div className="task-list">
        <div className="add-task">
          <button className="btn btn-add-task" onClick={onOpenForm}>
            <i className="fa fa-plus" aria-hidden="true"></i>
            Thêm Công Việc
          </button>
        </div>
        <Control onSearchTask={onSearchTask} onSortTask={onSortTask} />

        <div className="task-list">
          <table className="table-task-list">
            <thead>
              <tr>
                <th>Số thứ Tự</th>
                <th>Tên</th>
                <th>Trạng Thái</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <input
                    type="text"
                    value={filterName}
                    name="name"
                    onChange={this.onChangeFilterName}
                  />
                </td>
                <td>
                  <select
                    value={filterStatus}
                    name="status"
                    onChange={this.onChangeFilterStatus}
                  >
                    <option value={0}>Tất Cả</option>
                    <option value={1}>Hiển Thị</option>
                    <option value={-1}>Ẩn</option>
                  </select>
                </td>
                <td></td>
              </tr>
              {task.map((list, index) => {
                return (
                  <ListItem
                    list={list}
                    key={index}
                    index={index}
                    onDelTask={onDelTask}
                    onUpdateTask={onUpdateTask}
                    onToggleStatus={onToggleStatus}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default TaskList;
