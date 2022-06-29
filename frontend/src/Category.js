import React, { useState, useEffect } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Chatorey({ getData ,category,token }) {
  
  

  /* Adding record state variables */
  const [name,setName] = useState('')
  const [addValidation,setAddValidation] = useState('')
  const [addMess,setAddMess] = useState('')

  /* edit state variables */
  const [editId,setEditId] = useState('')
  const [editName,setEditName] = useState('')
  const [editValidation,setEditValidation] = useState('')
  const [editMess,setEditMess] = useState('')

  


  const addCat = () =>{
    if(name.length == 0){
      setAddValidation(
      <div class="alert alert-danger" role="alert">
        Name Cannot Be Eemty!
      </div>) 
      setTimeout(() => {  setAddValidation(''); }, 2000);
    }
    else{
      setAddValidation('')

      fetch("/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name ,token: token})
    })
      .then(res => res.json())
      .then((res) => {
        console.log(res)
        if (res.msg == "true") {
          getData()
          setAddMess(
            <div class="alert alert-success" role="alert">
               New Category Created! 
            </div>
          )
          setName('')
          setTimeout(() => {  setAddMess(''); }, 2000);
        }
      })
    }
  }


  const editCat = (c) => {
    setEditName(c.name)
    setEditId(c.id)
  };

  const updateCat = () =>{
    if(editName.length == 0){
      setEditValidation(
      <div class="alert alert-danger" role="alert">
        Name Cannot Be Eemty!
      </div>) 
      setTimeout(() => {  setEditValidation(''); }, 2000);
    }
    else{
      setEditValidation('')

      fetch("/category", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName, id: editId,token: token })
    })
      .then(res => res.json())
      .then((res) => {
        if (res.msg == "true") {
          getData()
          setEditMess(
            <div class="alert alert-success" role="alert">
               Updated!
            </div>
          )
          setTimeout(() => {  setEditMess(''); }, 2000);
        }
      })
    }
  }

  const deleteCat = () =>{
      fetch("/category", {
      method: "Delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editId,token: token })
    })
      .then(res => res.json())
      .then((res) => {
        if (res.msg == "true") {
          getData()
        }
      })
  }


  return (
    <div>
      <button className="catAddBtn btn btn-success" data-toggle="modal" data-target="#addModelBox" >
        Add News Categories
      </button>
      

      {/* add catogary model pop up box  */}
      <div className="modal fade" id="addModelBox" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Add News Categories</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                {addValidation}
                {addMess}
                <input
                type="text"
                onChange={event => setName(event.target.value)}
                placeholder="Enter News Category"
                name="name"
                value={name}
                className="form-control"
              />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={addCat}>Add</button>
              </div>
            </div>
        </div>
       </div>

      {/* table to display all the catogaries */}
      <table className="table table-striped ">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            category.map(c => {
              return(
                <tr>
            <td>{c.name}</td>
              <td>
                <button className="btn btn-danger" onClick={() => editCat(c)} style={{ marginRight : 20,marginLeft : 20}} data-toggle="modal" data-target="#deleteModelBox"><BsTrashFill/></button> 
                <button className="btn btn-primary" onClick={() => editCat(c)} data-toggle="modal" data-target="#editModelBox"> <BsPencilSquare/></button>
              </td>
            </tr>
              )
            })
          }
        </tbody>
      </table>
      
      {/* modal pop up for updating record */}
      <div className="modal fade" id="editModelBox" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Edit</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              {editValidation}
              {editMess}
              <input type="text" className="form-control" value={editName} onChange={event => setEditName(event.target.value)}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={updateCat}>Save changes</button>
            </div>
          </div>
        </div>
      </div>



      <div className="modal" id="deleteModelBox" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Are You Sure ? You want to delete "{editName}"</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={deleteCat} data-dismiss="modal">Yes</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>

            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
