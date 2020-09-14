import React, { Component } from "react";
import "./TaskForm.css";
class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: true,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onResetForm = this.onResetForm.bind(this);
  }
  onChange(e) {
    var target = e.target;
    var name = target.name;
    var value =
      target.value === "true"
        ? true
        : target.value === "false"
        ? false
        : target.value;
    this.setState({
      [name]: value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.onAddTask(this.state);
    this.onResetForm();
  }
  onResetForm() {
    this.setState({
      id: "",
      name: "",
      status: true,
    });
  }
  componentDidMount(){
    const { editting } = this.props ;
    if(editting){
      this.setState({
        id : editting.id ,
        name : editting.name ,
        status : editting.status
      })
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.editting){
      this.setState({
        id : nextProps.editting.id ,
        name : nextProps.editting.name ,
        status : nextProps.editting.status
      })
    }
    else{
      this.setState({
        id: "",
        name: "",
        status: true,
      })
    }
  }
  render() {
    const { onCloseForm } = this.props ;
    const { id } = this.state ;
    return (
      <div className="task-form">
        <div className="task-form-title">
          {
              id ? 'Cập nhật Công Việc' : 'Thêm Công Việc'
          }
          <span className="close-form" onClick={onCloseForm}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </span>
        </div>
        <div>
          <form onSubmit={this.onSubmit}>
            <div className="group-form">
              <label>Tên : </label>
              <input
                type="text"
                name="name"
                onChange={this.onChange}
                value={this.state.name}
              />
            </div>
            <div className="group-form">
              <label>Trạng Thái : </label>
              <select
                name="status"
                onChange={this.onChange}
                value={this.state.status}
              >
                <option value={true}>Hiển Thị </option>
                <option value={false}>Ẩn</option>
              </select>
            </div>
            <div className="group-form">
              <button className="btn btn-save" type="submit">
                <i className="fa fa-plus" aria-hidden="true"></i>
                Lưu Lại
              </button>
              <button
                className="btn btn-del"
                type="button"
                onClick={this.onResetForm}
              >
                <i className="fa fa-times" aria-hidden="true"></i>
                Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default TaskForm;
