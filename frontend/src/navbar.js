import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Container ,Card, Col, Navbar,Nav} from 'react-bootstrap'; 
import { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Chatorey from './Category.js'
import AddStories from './Stories.js'
import Home from './Home'


export default function Navigation({token}) {
   {
    const [width, setWidth] = useState(0);

    const openMenu = () => {
      setWidth(250);
    };
    const close = () => {
      setWidth(0);
    };
  
    const test = () => {
      console.log("test");
    };
  
    /* contains all cat records from database */
    const [category, setCategory] = useState([])
  
    const getData = () => {
      fetch("/category")
        .then(res => res.json())
        .then(res => {
          console.log(res);
          setCategory(res)
        })
    };
  
    const [news, setNews] = useState([])
    const getNews = () => {
      fetch("/all-news")
        .then(res => res.json())
        .then(res => {
          console.log(res);
          setNews(res)
        })
    };
  
  
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
  
    const [tdate, setTdate] = useState()
  
    const handleDateChange = (date) => {
      setTdate(date)
    }
  
    const [filters, setFilters] = useState([])
    const [filterId, setFilterId] = useState([])
  
    const filter = (id, name) => {
      let new_list = [...filters, { id: id, name: name }]
      setFilters(new_list)
  
      let new_filter_id = [...filterId, id]
      setFilterId(new_filter_id)
  
  
    }
  
    const removeFilter = (id) => {
      let newList = filters.filter((ele) => {
        if (ele.id != id) {
          return (ele)
        }
      })
      setFilters(newList)
  
      let newListIds = filterId.filter((ele) => {
        if (ele != id) {
          return (ele)
        }
      })
      setFilterId(newListIds)
    }
  
    const getFilterNews = () => {
      setNews([])
      fetch("/news-filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filters: filterId ,date:tdate })
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          setNews(res)
  
        })
    }
  
    const handleAll = () => {
      setTdate('')
      setFilters([])
  }
  
  
  
    useEffect(() => {
      getFilterNews()
    }, [filterId,tdate]);
  
    useEffect(() => {
      getData();
      getNews();
    }, []);
    return (
      <div>
          <Router>
    <Navbar bg="primary" variant="dark">
      <Container>
      <Navbar.Brand href="#home"><img
        src="img/download.png"
       
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      /></Navbar.Brand>
      <Nav className="me-auto">
      <Link to="/" onClick={(test, close)} style={{color:'whitesmoke', textDecoration:'none', marginTop:7}}>
            Home
          </Link>
     <Nav.Link>

     <Link to="/add-chatorey" onClick={close} style={{color:'whitesmoke' , textDecoration:'none'}}>Add News Categories</Link>

     </Nav.Link>
     
              <Link to="/add-stories" onClick={close} style={{color:'whitesmoke' , textDecoration:'none', marginTop:8}}>Add News</Link>
      </Nav>

 
      
      </Container>
    </Navbar>

    <Switch>
          <Route path="/add-chatorey">
            <Chatorey category={category} getData={getData} token={token} />
          </Route>
          <Route path="/add-stories">
            <AddStories token={token} />
          </Route>

          <Route path="/">
            <Home news={news} filters={filters} removeFilter={removeFilter} tdate={tdate} setTdate={setTdate} handleDateChange={handleDateChange} />

          </Route>

        </Switch>
    </Router>
  
    </div>
    )
  }
}
