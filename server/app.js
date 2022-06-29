var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors')

var app = express()
app.use(cors())

app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'WDF_CA',
});

con.connect(function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Connected!");
    };
});


/* getting all records from category table */
app.get('/category', (req, res) => {
    let id = req.query.id;
    let sql = 'select * from category';
    con.query(sql, (err, data) => {
        if (err) {
            res.send('Error !');
        } else {
            res.send(data);
        }
    });

});


/* Adding record to category table */
app.post('/category', (req, res) => {
    let token = req.body.token;
    let name = req.body.name;
    let sql = 'insert into category values(null,"' + name + '") ';
    if (token) {
        try {
          
            con.query(sql, (err, data) => {
                if (err) {
                    res.send({
                        'msg': 'flase',
                        'err': err
                    });
                } else {
                    res.send({
                        'msg': 'true',
                    });
                }
            });
        } catch (err) {
            res.send('invalid token');
        }
    } else {
        res.send("token not found")
    }

});

/* updating record from category table */
app.put('/category', (req, res) => {
    let token = req.body.token;
    let id = req.body.id;
    let name = req.body.name;
    let sql = 'update category set name = "' + name + '"  where id = ' + id + ' ';
    console.log(sql);

    if (token) {
        try {
         
            con.query(sql, (err, data) => {
                if (err) {
                    res.send({
                        'msg': 'flase',
                        'err': err
                    });
                } else {
                    res.send({
                        'msg': 'true',
                    });
                }
            });
        } catch (err) {
            res.send('invalid token');
        }
    } else {
        res.send("token not found")
    }

});

/* deleteing record from catogary table*/
app.delete('/category', (req, res) => {
    let id = req.body.id;
    let token = req.body.token;
    let sql = 'delete from category where id = ' + id + ' ';
    if (token) {
        try {
       
            con.query(sql, (err, data) => {
                if (err) {
                    res.send({
                        'msg': 'flase',
                        'err': err
                    });
                } else {
                    res.send({
                        'msg': 'true',
                    });
                }
            });
        } catch (err) {
            res.send('invalid token');
        }
    } else {
        res.send("token not found")
    }

});


/* getting all records from news-stories table */
app.get('/news-stories', (req, res) => {
    let id = req.query.id;
    let sql = 'select * from news_stories';
    con.query(sql, (err, data) => {
        if (err) {
            res.send('Error !');
        } else {
            res.send(data);
        }
    });

});

/* Adding record to Story table */
app.post('/news-stories', (req, res) => {
    let token = req.body.token;
    let title = req.body.title;
    let description = req.body.description;
    let category_id = req.body.category_id;
    let date = req.body.date;
    let sql = 'insert into news_stories VALUES(null,"' + title + '","' + description + '","' + date + '",' + category_id + ')';
    console.log(sql)
    if (token) {
        try {
       
            con.query(sql, (err, data) => {
                if (err) {
                    res.send({
                        'msg': 'flase',
                        'err': err
                    });
                } else {
                    res.send({
                        'msg': 'true',
                    });
                }
            });
        } catch (err) {
            res.send('invalid token');
        }
    } else {
        res.send("token not found")
    }

});

/* updating record from news-stories table */
app.put('/news-stories', (req, res) => {
    let id = req.body.id;
    let title = req.body.title;
    let token = req.body.token;
    let description = req.body.description; ``
    let sql = 'update news_stories set title = "' + title + '",description = "' + description + '"  where id = ' + id + ' ';
    if (token) {
        try {
           
            con.query(sql, (err, data) => {
                if (err) {
                    res.send({
                        'msg': 'flase',
                        'err': err
                    });
                } else {
                    res.send({
                        'msg': 'true',
                    });
                }
            });
        } catch (err) {
            res.send('invalid token');
        }
    } else {
        res.send("token not found")
    }

});


/* deleteing news stories */
app.delete('/news-stories', (req, res) => {
    let token = req.body.token;
    let id = req.body.id;
    let sql = 'delete from news_stories where id = ' + id + ' ';
    if (token) {
        try {
           
            con.query(sql, (err, data) => {
                if (err) {
                    res.send({
                        'msg': 'flase',
                        'err': err
                    });
                } else {
                    res.send({
                        'msg': 'true',
                    });
                }
            });
        } catch (err) {
            res.send('invalid token');
        }
    } else {
        res.send("token not found")
    }

});

/* login */
app.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;


    let sql = "select * from user where email = '" + email + "' and password = '" + password + "'";
    console.log(sql);
    con.query(sql, (err, data) => {
        if (err) {
            res.send("error")
        } else {
            if (data.length > 0) {
                let token = jwt.sign({ msg: 'admin' }, 'abcd1234');
                res.send({
                    'msg': 'true',
                    'token': token
                });
            }
            else {
                res.send({
                    'msg': 'false'
                });
            }

        }
    });


})



/* Getting All News */
app.get('/all-news', (req, res) => {
    let sql = 'SELECT * from news_stories,category where news_stories.category_id = category.id';
    con.query(sql, (err, data) => {
        if (err) {
            res.send('Error !');
        } else {
            res.send(data);
        }
    });

});

/* Getting news with filter  */
app.post('/news-filter', (req, res) => {
    let filters = req.body.filters
    let date = req.body.date

    let sql_all = 'SELECT * from news_stories,category where news_stories.category_id = category.id';

    let sql_date_and_filter = 'SELECT news_stories.id,news_stories.title,news_stories.description,\
    news_stories.date,category.name from news_stories,category where news_stories.category_id = category.id and category_id in ('+ filters.toString() + ') and date =  "'+ date + '"';
    
    let sql_filter = 'SELECT news_stories.id,news_stories.title,news_stories.description,\
    news_stories.date,category.name from news_stories,category where news_stories.category_id = category.id and category_id in ('+ filters.toString() + ')';
    
    let sql_date = 'SELECT news_stories.id,news_stories.title,news_stories.description,\
    news_stories.date,category.name from news_stories,category where news_stories.category_id = category.id and date = "'+ date + '"';

    

    if (filters.length > 0 && date) {
        con.query(sql_date_and_filter, (err, data) => {
            if (err) {
                res.send('Error !');
            } else {
                res.send(data)
                console.log(data)
            }
        });

    }
    else if (filters.length > 0) {
        con.query(sql_filter, (err, data) => {
            if (err) {
                res.send('Error !');
            } else {
                res.send(data)
                console.log(data)
            }
        });

    }
    else if (date) {
        con.query(sql_date, (err, data) => {
            if (err) {
                res.send('Error !');
            } else {
                res.send(data)
                console.log(data)
            }
        });

    }
    else{
        con.query(sql_all, (err, data) => {
            if (err) {
                res.send('Error !');
            } else {
                res.send(data)
                console.log(data)
            }
        });
    }

});



app.listen(8080, () => {
    console.log('server is up')
})
