import React, { Component } from 'react';
import './App.css';
class App extends Component
{
  constructor() {
    super();
    this.state = {
      currentTodo: "",
      list: [],
      id:"",
      val:""
    };
  }

  add(currentTodo) {
    if(currentTodo!="")
    {
    let list = [...this.state.list];
    list.push({
      todo: currentTodo,
      isCompleted: false
    });
    this.setState({list: list});
    }
    else{
      alert("Empty item cannot be added");
    }
  }

  checktodo(index) {
    let list = [...this.state.list];
    list[index].isCompleted = !list[index].isCompleted;
    this.setState({list: list});
  }

  delete(index) {
      let list = [...this.state.list];
      list.splice(index, 1);
      this.setState({list: list});
  }
  edit=(e,id,newval)=>{
    e.preventDefault();
    let list = [...this.state.list];
    let comp=list[id].isCompleted;
    list.splice(id, 1, {todo:newval,isCompleted:comp}); 
    this.setState({list: list});
  }

  render() {
    return (
      <div id="main">
      <h1 id="main-head">To Do App</h1><br/>
      <div className="row">
        <div className="col-md-6">
        <div className="input-group mb-3" >
         <input type="text" className="form-control" placeholder="add items" aria-label="Recipient's username" aria-describedby="basic-addon2" value={this.state.currentTodo}
          onChange={e => {this.setState({ currentTodo: e.target.value });}}/>
          <div className="input-group-append">
          <button className="input-group-text" id="basic-addon2" onClick={(e)=>{this.add(this.state.currentTodo);
              this.setState({ currentTodo: "" });}}>Add</button>
          </div>
          </div>
          {this.state.list.map((item, index) => (
          <div key={item} className="todo">
            <div className={item.isCompleted ? "done" : ""} onClick={() => this.checktodo(index)}>
              {item.todo}
            </div>
            <div className="delete">
            <i className="fa fa-trash-o" onClick={() =>{if (window.confirm('Are you sure you wish to delete this item?')) this.delete(index)}}></i>
            <i className="fa fa-edit" onClick={()=>{this.setState({id:index,val:item.todo})}} style={{marginLeft:"5%"}} data-toggle="modal" data-target="#exampleModal"></i>
            </div>
          </div>
        ))}
        {this.state.list.length > 0 && `${this.state.list.length} items`}
      </div>
      </div>
      <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
      <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <input type="text" className="form-control" placeholder={this.state.val} aria-label="Recipient's username" aria-describedby="basic-addon2" id="edit-value"/>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={(e)=>{this.edit(e,this.state.id,document.getElementById("edit-value").value)}}>Save changes</button>
      </div>
     </div>
     </div>
     </div>
     </div>
    );
  }
}

export default App;
