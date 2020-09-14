import React, { Component } from "react";
import "./App.css";
import TaskForm from "./Components/TaskForm/TaskForm";
import TaskList from "./Components/TaskList/TaskList";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: [],
      openForm: false,
      editting: null,
      searchName: "",
      filterName: "",
      filterStatus: 0,
      sortName: "name",
      sortStatus: 1,
    };
    this.onAddTask = this.onAddTask.bind(this);
    this.onCloseForm = this.onCloseForm.bind(this);
    this.onOpenForm = this.onOpenForm.bind(this);
    this.onDelTask = this.onDelTask.bind(this);
    this.onUpdateTask = this.onUpdateTask.bind(this);
    this.onToggleStatus = this.onToggleStatus.bind(this);
    this.onSearchTask = this.onSearchTask.bind(this);
    this.onChangeFilterName = this.onChangeFilterName.bind(this);
    this.onChangeFilterStatus = this.onChangeFilterStatus.bind(this);
    this.onSortTask = this.onSortTask.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem("task")) {
      this.setState({
        task: JSON.parse(localStorage.getItem("task")),
      });
    }
  }
  componentDidUpdate() {
    localStorage.setItem("task", JSON.stringify(this.state.task));
  }
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  generatorId() {
    return (
      this.s4() + this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4()
    );
  }
  findindex(id) {
    return this.state.task.findIndex((task) => {
      return task.id === id;
    });
  }
  onAddTask(task) {
    if (task.name !== "") {
      if (task.id === "") {
        task.id = this.generatorId();
        this.setState({
          task: this.state.task.concat(task),
        });
      } else {
        let index = this.findindex(task.id);
        this.setState({
          task: [
            ...this.state.task.slice(0, index),
            {
              ...task,
            },
            ...this.state.task.slice(index + 1),
          ],
        });
      }
    }
    this.onCloseForm();
  }
  onCloseForm() {
    this.setState({
      openForm: false,
    });
  }
  onOpenForm() {
    this.setState({
      openForm: true,
    });
  }
  onDelTask(task) {
    let index = this.findindex(task.id);
    this.state.task.splice(index, 1);
    this.setState({
      task: this.state.task,
    });
  }
  onUpdateTask(task) {
    this.setState({
      editting: task,
    });
    this.onOpenForm();
  }
  onToggleStatus(task) {
    let index = this.findindex(task.id);
    this.setState({
      task: [
        ...this.state.task.slice(0, index),
        {
          ...task,
          status: !task.status,
        },
        ...this.state.task.slice(index + 1),
      ],
    });
  }
  onSearchTask(key) {
    this.setState({
      searchName: key,
    });
  }
  onChangeFilterName(key) {
    this.setState({
      filterName: key,
    });
  }
  onChangeFilterStatus(status) {
    status = Number(status);
    this.setState({
      filterStatus: status,
    });
  }
  onSortTask(sortName, sortStatus) {
    this.setState({
      sortName: sortName,
      sortStatus: sortStatus,
    });
  }
  render() {
    const {
      openForm,
      editting,
      searchName,
      filterName,
      filterStatus,
      sortName,
      sortStatus,
    } = this.state;
    let { task } = this.state;
    if (searchName) {
      task = task.filter((task) => {
        return task.name.toUpperCase().indexOf(searchName.toUpperCase()) > -1;
      });
    }
    if (filterName) {
      task = task.filter((task) => {
        return task.name.toUpperCase().indexOf(filterName.toUpperCase()) > -1;
      });
    }

    if (filterStatus) {
      task = task.filter((task) => {
        if (filterStatus === 0) {
          return task;
        }
        if (filterStatus === 1) {
          return task.status === true;
        }
        if (filterStatus === -1) {
          return task.status === false;
        }
      });
    }

    if (sortName === "name") {
      task = task.sort((a, b) => {
        const x = a.name.toUpperCase();
        const y = b.name.toUpperCase();
        if (x < y) return -sortStatus;
        if (x > y) return sortStatus;
        return 0;
      });
    }
    if (sortName === "status") {
      task = task.sort((a, b) => {
        const x = a.status === true ? 1 : 0;
        const y = b.status === true ? 1 : 0;
        if (x < y) return sortStatus;
        if (x > y) return -sortStatus;
        return 0;
      });
    }
    return (
      <div className="app">
        <h2>Quản Lí Công Việc</h2>
        <div className="content">
          {openForm && (
            <TaskForm
              onAddTask={this.onAddTask}
              onCloseForm={this.onCloseForm}
              editting={editting}
            />
          )}
          <TaskList
            task={task}
            onOpenForm={this.onOpenForm}
            onDelTask={this.onDelTask}
            onUpdateTask={this.onUpdateTask}
            onToggleStatus={this.onToggleStatus}
            onSearchTask={this.onSearchTask}
            filterName={filterName}
            filterStatus={filterStatus}
            onChangeFilterName={this.onChangeFilterName}
            onChangeFilterStatus={this.onChangeFilterStatus}
            onSortTask={this.onSortTask}
          />
        </div>
      </div>
    );
  }
}
export default App;
