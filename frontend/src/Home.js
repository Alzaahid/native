import React, { useState } from 'react'

export default function Home({ news, filters, removeFilter, setTdate, tdate, handleDateChange }) {


  

  return (
    <div>
      <div className="d-flex justify-content-center">
        <div class="btn-group">
          
          <div class="dropdown-menu" style={{ backgroundColor: 'white', marginRight: '80px' }}>
            <input type="date" className="form-control" value={tdate} onChange={event => handleDateChange(event.target.value)} />
            <div class="dropdown-divider"></div>
            <button
              style=
              {{
                textDecoration: 'none',
                backgroundColor: 'whitesmoke',
                border: 'none',
                width : '100%'

              }}
              onClick={() => setTdate('')}
              >
              Reset Date
            </button>
          </div>
        </div>
      </div>

      {
        filters.map(c => {
          return (
            <span style={{ marginRight: '5px' }} class="badge badge-secondary">{c.name} <button style={{ border: 'none', textDecoration: "none", backgroundColor: '#c3c3c3', borderRadius: '50px' }} onClick={() => removeFilter(c.id)}>&times;</button></span>
          )
        })
      }
      
      {
        news.map(c => {
          return (
            <div style={{
              padding: '15px', border: '1px solid grey' , margin: '10px'
            }}
            >

            
             
                <img
                src="img/sports.jpg"
               width="440px"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />

              
              
              <br />
              <hr style={{
               
               borderRadius: '5px',
               width: '100%'
             }} />
              <b>
              <p style={{ color: '#444444' }}>Category : {c.name} 
              </p>
              </b>
              <hr style={{
               
                borderRadius: '5px',
                width: '100%'
              }} />
              <h4>Title :{c.title}</h4>
              <hr style={{
               
               borderRadius: '5px',
               width: '100%'
             }} />
              <p>{c.description}</p>
              <hr style={{
               
               borderRadius: '5px',
               width: '100%'
             }} />
               <p>  <img  style={{width: 30, height: 30, borderRadius: 400/ 2}}
      src="img/admin.png"
      alt="new"
      />Posted By Admin | {
                new Date(
                  c.date
                ).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })
              } </p>

             
            </div>

            
          )
        })
      }


    </div>
  )
}
