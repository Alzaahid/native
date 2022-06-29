import React, { Component, useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Chatorey from './Category.js'
import AddStories from './Stories.js'
import Home from './Home'


export default function Nav({ token }) {
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
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          <img src="img/download.png" width="80px" />{" "}
        </a>
        <button className="barsIcon" onClick={openMenu}>
          <FaBars />
        </button>
      </nav>
      <Router>
        <div id="mySidenav" class="sidenav" style={{ width: width }}>
          <div className="dropdown" >
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <BsFillPersonFill />  Hi Admin
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <Link to="/add-chatorey" onClick={close}>Manage Category</Link>
              <Link to="/add-stories" onClick={close}>Manage Stories</Link>
            </div>
          </div>

          <button className="closebtn" onClick={close}>
            &times;
          </button>

          <Link to="/" onClick={(test, close)}>
            Home
          </Link>
          <button className="filter-btn"
            onClick={() => handleAll()}
          >
            All
          </button>
          {
            category.map(c => {
              return (
                <button className="filter-btn" onClick={() => filter(c.id, c.name)}>
                  {c.name}
                </button>
              )
            })
          }

          
        </div>

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
  );
}
