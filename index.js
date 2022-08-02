const express = require('express');
require ('dotenv').config();
const routes = require('./src/routes/routes')
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT;
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const path = require('path');

app.use(cookieParser());
app.use(bodyParser.json());
app.set('views', path.join(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: false }));
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: oneDay}
}));
app.use(routes);
app.set('view engine', 'ejs');
// app.use(express.static(__dirname + '/public/css'));
app.use(express.static(path.join(__dirname,'public','css')));

app.use(express.static(__dirname + '/public/images'));
app.use(express.static(__dirname + '/media'));

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, './public/images/')
//     },
//     filename: (req, file, callback) => {
//         callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })

// let upload = multer({
//     storage: storage
// });



// app.get('/home', (req, res) => {
//     res.render(__dirname + '/views/index2');
// });

// app.get('/about', (req, res) => {
//     res.sendFile(__dirname + '/about.html')
// })

// app.get('/register', (req, res) => {
//     res.sendFile(__dirname+ '/views/register.html')
// });

// app.post('/register', upload.single('image'), async (req, res) => {

    
//     let id = req.body.id;
//     let cname = req.body.cname;
//     let uname = req.body.uname;
//     let email = req.body.email;
//     let password = req.body.password;
//     let hashedPassword = await bcrypt(password, 10)
//     let work = req.body.work;
//     let phone = req.body.phone;
//     let image = req.file.filename;
//     let locat = req.body.locat;

//     con.connect((error) => {
//         if(error) throw error;
//         console.log('connected to register');

//         con.query('SELECT email FROM register WHERE email = ?', [email], (error, result) => {
//         if(error) throw error;

//         let sql = "INSERT INTO register(id, cname, uname, email, password, work, phone, image, locat) VALUES ('"+ id +"', '"+ cname +"', '"+ uname +"', '"+ email +"', '"+ hashedPassword +"', '"+ work +"', '"+ phone +"', '"+ image +"', '"+ locat +"')";
//             con.query(sql, function(error, result) {
//                 if(error) throw error;
//                 res.send('Data Inserted Successfully');
//             })
//         })

//     })

    
// });

// app.get('/login', (req, res) =>{
//     res.sendFile(__dirname + '/views/log-in.html');

//     con.query('SELECT * FROM signup', (error, result) => {
//         if(error) throw error;
//         console.log(result)
//         result.forEach((elem) => {
//             // console.log(`${elem.fname}${elem.lname} is a ${elem.work}`)
//             app.post('/login',   (req, res) => {
//                 const  { email, password } = req.body;
//                 // const dbPassword = password;
//                 // bcrypt.compare(password, dbPassword).then((match) => {
//                 //  if(!match) {
//                 //     res.status(400).json({ error: "Wrong Password" })
//                 //  }
                
//                  result.find((a) => {
//                     if ( a.email === email && a.password === password){
//                         // app.get('/home', (req, res) => {
//                             // res.render(__dirname + '/views/index2');
//                             console.log(a + ' valid person')
                            
//                             res.render(__dirname + '/views/index2', { user: a });
//                         // });
//                     }else{
//                         console.log('invalid user')
//                     }
//                 }) 
//             })
                
//             });
//         });
//     });

// });

app.get('/signin', (req, res) => {
    res.sendFile(__dirname + '/views/sign-in.html');

    con.query('SELECT * FROM register', (error, result) => {
        if(error) throw error
        console.log(result)
        result.forEach((elem) => {
            app.post('/signin', (req, res) => {
                const { email, password } = req.body;
                result.find((a) => {
                    if(a.email === email && a.password === password){
                        console.log(a + ' valid company');
                        res.render(__dirname + '/views/index2', { user : a })
                    }else{
                        console.log('invalid company');
                    }
                })
            })
        })
    })
});

app.get('/logout', (req, res) => {
    res.redirect('/login')
});

app.get('/admin/login', (req, res) => {
    res.sendFile(__dirname + '/views/log-in.html');
});


// app.get('/join', (req, res) => {
//     res.sendFile(__dirname + '/views/join.html');
// });

// app.post('/join', upload.single('image'), async (req, res) => {

//     let id = req.body.id;
//     let fname = req.body.fname;
//     let lname = req.body.lname;
//     let email = req.body.email;
//     let password = req.body.password;
//     let hashedPassword = await bcrypt.hash(password, 10);
//     let experience = req.body.experience;
//     let phone = req.body.phone;
//     let payment = req.body.payment;
//     let work = req.body.work;
//     let image = req.file.filename;
//     let locat = req.body.locat;

    
//         let sql = "INSERT INTO signup(id, fname, lname, email, password, experience, phone, payment, work, image, locat) VALUES ('" + id + "','" + fname + "', '" + lname + "', '" + email + "', '" + hashedPassword + "', '" + experience + "', '" + phone + "', '" + payment + "', '" + work + "', '" + image + "', '" + locat + "')";
//         con.query(sql, function (error, result) {
//             if (error) throw error;
//             // res.send('Data Registered Successfully ' + result.insertId);
//             res.redirect('/login');
//         })
//     });


app.get('/admin', (req, res) => {
        
        res.redirect("/admin/login");

        let admin = [{
            id: 1,
            email: "ahsan@gmail.com",
            password: "ahsan125",
            isAdmin: true,
        }, 
        {
            id: 2,
            email: "ali@gmail.com",
            password: "ali190",
            isAdmin: true,
        }]
        app.post('/admin/login', (req, res) => {

            const { email, password } = req.body;
            const adminData = admin.find((u) => {
                if( u.email === email && u.password === password){
                    let sql = 'SELECT * FROM signup';
                    con.query(sql, function (err, result) {
                        res.render("pannel", { signup: result });
                })
                }else{
                    console.log('invalid admin');
                }
            });
       
        });

        app.get('/admin/logout', (req, res) => {
            res.redirect('/admin')
        });
    
    });

// app.get('/freelancer', (req, res) => {
        
//         let getId = req.body.id;
//         let sql = "select * from signup";
//         con.query(sql, function (error, result) {
//             if (error) throw error;
//             res.render("user_list", { signup: result });
//             // console.log(result);
//         })
//     });


// app.get('/projects', (req, res) => {
//     console.log('working...')
//     let sql = 'select * from project';
//     con.query(sql, function (error, result) {
//         if(error) throw error;
//         res.render(__dirname + "/views/projects", { project: result })
//         console.log(result);
//     })
//     // res.render(__dirname + '/views/projects')

// });


// app.post('/projects', (req, res) => {
    
//     let id = req.body.id;
//     let title = req.body.title;
//     let description = req.body.description;
//     let budget = req.body.budget;
//     let payment = req.body.payment;
//     let experience = req.body.experience;
//     let tags = req.body.tags;

//         console.log("connected to database");

//         let sql = "INSERT INTO project(id, title, description, budget, payment, experience, tags) VALUES ('" + id + "', '" + title + "', '" + description + "', '" + budget + "', '" + payment + "', '" + experience + "', '"+ tags +"')";
//         con.query(sql, function (error, result) {
//             if (error){
//               console.log("run fire error major error")
//             } 
//             // res.send('Data Inserted Successfully ' + result.insertId);
//             // console.log('Data Inserted Successfully'+ result.insertId);
           
        
//         });
//     });


// app.get('/work', (req, res) => {
//     res.sendFile(__dirname + '/views/works.html')
// });


// app.get('/profile/:id', (req, res) => {
    
//     con.query('SELECT * FROM signup where id = ?', [req.params.id] ,function (error, result) {
//         if(error) throw error;
//         console.log(result)
//         res.render("profile", { profile: result[0] });
        
//     })
//     });


app.get('/request/:id', (req, res) => {

        con.query('SELECT * from project WHERE id = ?', [req.params.id], function(error, result) {
            if(error) throw error;
            res.render(__dirname + '/views/request', { request: result[0] })
            // console.log(result);
        })

    });

 app.get('/chat', (req, res) => {
    res.render(__dirname + '/views/chat')
 });   
    

app.listen(port, () => {
    console.log(`App is runnig on port ${port}`);
})

