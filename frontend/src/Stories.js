import React, { useState, useEffect } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";

export default function Stories({token}) {

  /* contains all cat records from database */
  const [stories, setStories] = useState([])
  const [categories, setCategories] = useState([])

  const getData = () => {
    fetch("/news-stories")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setStories(res)
      })
  };

  const getCat = () => {
    fetch("/category")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setCategories(res)
      })
  };

  useEffect(() => {
    getData();
    getCat();
  }, []);

  useEffect(() => {
    getData();
  }, []);


  /* Adding record state variables */
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [date, setDate] = useState('')
  const [addValidation, setAddValidation] = useState('')
  const [addMess, setAddMess] = useState('')



  const addStory = () => {
    if (title.length == 0) {
      setAddValidation(
        <div class="alert alert-danger" role="alert">
          Title Cannot Be Emty!
      </div>)
      setTimeout(() => { setAddValidation(''); }, 2000);
    }
    else if (description.length == 0) {
      setAddValidation(
        <div class="alert alert-danger" role="alert">
          Description Cannot Be Emty!
        </div>)
      setTimeout(() => { setAddValidation(''); }, 2000);
    }
    else if (date.length == 0) {
      setAddValidation(
        <div class="alert alert-danger" role="alert">
          Date Cannot Be Emty!
        </div>)
      setTimeout(() => { setAddValidation(''); }, 2000);
    }
    else if (categoryId.length == 0 || categoryId == 0) {
      setAddValidation(
        <div class="alert alert-danger" role="alert">
          Please select a Category !
        </div>)
      setTimeout(() => { setAddValidation(''); }, 2000);
    }
    else {
      setAddValidation('')

        fetch("/news-stories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: title, description: description, date: date, category_id: categoryId, token: token })
        })
          .then(res => res.json())
          .then((res) => {
            console.log(res)
            if (res.msg == "true") {
              getData()
              setAddMess(
                <div class="alert alert-success" role="alert">
                  Inserted!
              </div>
              )
              setTimeout(() => { setAddMess(''); }, 2000);
              setTitle('')
              setDescription('')
              setDate('')
              setCategoryId('')
            }
          })
    }
  }

  /* edit state variables */
  const [editId, setEditId] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editCatId, setEditCatId] = useState('')
  const [editDate, setEditDate] = useState('')
  const [editValidation, setEditValidation] = useState('')
  const [editMess, setEditMess] = useState('')

  const editStory = (s) => {
    console.log(s.id)
    setEditId(s.id)
    setEditTitle(s.title)
    setEditDescription(s.description)
    setEditCatId(s.category_id)
    setEditDate(s.date)
  };

  const updateStory = () => {
    if (editTitle.length == 0) {
      setEditValidation(
        <div class="alert alert-danger" role="alert">
          Title Cannot Be Eemty!
      </div>)
      setTimeout(() => { setEditValidation(''); }, 2000);
    }
    else if (editDescription.length == 0) {
      setEditValidation(
        <div class="alert alert-danger" role="alert">
          Description Cannot Be Eemty!
        </div>)
      setTimeout(() => { setEditValidation(''); }, 2000);

    }
    else {
      setEditValidation('')

      fetch("/news-stories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle, description: editDescription, id: editId,token: token })
      })
        .then(res => res.json())
        .then((res) => {
          console.log(res)
          if (res.msg == "true") {
            getData()
            setEditMess(
              <div class="alert alert-success" role="alert">
                Updated!
            </div>
            )
            setTimeout(() => { setEditMess(''); }, 2000);
          }
        })
    }
  }

  const deleteStory = () => {
    fetch("/news-stories", {
      method: "Delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editId ,token: token})
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
      <button className="catAddBtn btn btn-success" data-toggle="modal" data-target="#addStoryBox" style={{width:'30%'}}>
        Add Story
      </button>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder-plus" viewBox="0 0 16 16" style={{marginTop : -82,color:'white', marginLeft:430}}>
  <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z"/>
  <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z"/>
</svg>

      {/*  Adding story modal box  */}
      <div className="modal fade" id="addStoryBox" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Add a Story</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    {addValidation}
                    {addMess}
                    <label >Title</label>
                    <textarea id="w3review" value={title} onChange={event => setTitle(event.target.value)} className="form-control" ></textarea><br />
                    <label >Description</label>
                    <textarea id="w3review" value={description} onChange={event => setDescription(event.target.value)} className="form-control"></textarea><br />
                    <label>Date</label>
                    <input type="date" className="form-control" value={date} onChange={event => setDate(event.target.value)} /><br />
                    <select onChange={event => setCategoryId(event.target.value)} className="form-control"><br />
                      <option value="0">Select Category</option>
                      {
                        categories.map(c => {
                          return (
                            <option value={c.id}>{c.name}</option>
                          )
                        })
                      }

                    </select>

                  </div>

                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={addStory}>Add</button>
            </div>
          </div>
        </div>
      </div>





      {/* table to display all the catogaries */}
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col" crSpan='2'>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            stories.map(s => {
              return (
                <tr>
                  <td>{s.title.substr(0, 20)}...</td>
                  <td>
                    <button className="btn btn-danger" data-toggle="modal" onClick={() => editStory(s)} data-target="#deleteModelBox"><BsTrashFill /></button>
                    <button className="btn btn-primary" onClick={() => editStory(s)} style={{ marginLeft: 10 }} data-toggle="modal" data-target="#editStoryModal"> <BsPencilSquare /></button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      {/*  edit story modal box  */}
      <div className="modal fade" id="editStoryModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Edit Story</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    {editMess}
                    {editValidation}
                    <label >Title</label>
                    <textarea id="w3review" value={editTitle} onChange={event => setEditTitle(event.target.value)} className="form-control" ></textarea><br />

                    <label >Description</label>
                    <textarea id="w3review" value={editDescription} onChange={event => setEditDescription(event.target.value)} className="form-control" rows="6" cols="50"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={updateStory}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal" id="deleteModelBox" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Are You Sure ? You want to delete "{editTitle}"</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={deleteStory} data-dismiss="modal">Yes</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>

            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
