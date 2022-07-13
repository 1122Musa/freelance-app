const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const con = require('../config/connection');
const  jwt = require('jsonwebtoken');


con.connect((error) => {
    if(error) throw error;
    console.log('Database Connected ' + con.threadId)
});

function generateToken (email){
   return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}





exports.login = (req, res) => {
       
    res.render('log-in')
}

exports.login_post = (req, res) => {

    const { email, password } = req.body; 
    const query = con.query(`SELECT * FROM signup WHERE email="${email}"`, (error, result) => {
        let user = result;
        // return
        let isValid = bcrypt.compareSync(password, user[0].password);
        // console.log('isValid')
        if(isValid){
            console.log("Valid User")
            // return res.json({success: false, message: 'passwords match'});
            const token = generateToken({email:email});
            res.json("token "+ token)

        }else{
            console.log('Unknown User')
            return res.json({success: false, message: 'passwords do not match'});

        } 
        res.redirect('/')
})
}

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    console.log("authHeader "+req.headers['authorization']) // undefined
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) return res.sendStatus(401)

    console.log("token "+token); // undefined

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.sendStatus(403)
            console.log("not verify")
        }
        req.user = user;
        next();
    })
}

exports.home =  authenticateToken,(req, res) => {
    console.log(req.headers['authorization'])
    con.query('SELECT * FROM signup', (error, result) => {

        res.render('index2', { user: result })
    });
}

exports.about = (req, res) => {
    res.render('about')
}

exports.freelancer = (req, res) => {

    con.query('SELECT * FROM signup',(error, result) => {
        if(error) throw error;
        res.render('user_list', { signup: result})
    })
    
}

exports.projects = (req, res) => {
    con.query('SELECT * FROM project' ,(error, result) => {
        res.render('projects', { project: result });
        console.log(result)
    });
    
}

exports.projects_post = (req, res) => {

    
    let title = req.body.title;
    let description = req.body.description;
    let budget = req.body.budget;
    let payment = req.body.payment;
    let experience = req.body.experience;
    let tags = req.body.tags;
       

        let sql = "INSERT INTO project (title, description, budget, payment, experience, tags) VALUES ('"+ title +"', '"+ description +"', '"+ budget +"', '"+ payment +"', '"+ experience +"', '"+ tags +"')";
        console.log("connected to database");
        con.query(sql, (error, result) => {
            if(error) throw error;
            console.log('Project Added')
            res.redirect('/projects')
        })
}

exports.work = (req, res) => {
    res.render('works')
}

exports.profile_id = (req, res) => {
    con.query('SELECT * FROM signup WHERE id=?',[req.params.id], (error, result) => {
        if(error) throw error;
        res.render('profile', { profile: result[0] })
    });
}

exports.request_id = (req, res) => {
    con.query('SELECT * FROM project WHERE id=?',[req.params.id], (error, result) => {
        if(error) throw error;
        res.render('request', { request: result[0] })
    })
}

exports.register = (req, res) => {
    con.query("SELECT * FROM signup", (error, result) => {
    console.log(result)
    res.render('register')
    })
    
}

exports.register_post = (req, res) => {

    let cname = req.body.cname;
    let uname = req.body.uname;
    let email = req.body.email;
    let password = req.body.password;
    let work = req.body.work;
    let phone = req.body.phone;
    let image = req.body.image;
    let locat = req.body.locat;

    let  sql = "INSERT INTO register (cname, uname, email, password, work, phone, image, locat) VALUES ('"+ cname +"', '"+ uname +"', '"+ email +"', '"+ password +"', '"+ work +"', '"+ phone +"', '"+ image +"', '"+ locat +"')";
    console.log("Connected to Database");
    con.query(sql, function (error, result) {
        if(error) throw error;
        console.log("Company Added")
    });
}

exports.join = (req, res) => {
    res.render('join');

    console.log("Get Request working");
    
}

exports.join_post =  (req, res) => {
    
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body)
    let hashedPassword = bcrypt.hashSync(password, 10);
    let experience = req.body.experience;
    let phone = req.body.phone;
    let payment = req.body.payment;
    let work = req.body.work;
    let image = req.image;
    let locat = req.body.locat;

    console.log('Post request Working');
    let findQuery = con.query('SELECT * FROM signup WHERE email=?',[req.body.email],(error, result) =>{
        console.log(result[0])
    })
    if(email === findQuery){
       alert("Email is already in use")
    }else{
        console.log('hash',hashedPassword)
        let sql = "INSERT INTO signup (fname, lname, email, password, experience, phone, payment, work, image, locat) VALUES ('"+ fname +"', '"+ lname +"', '"+ email +"', '"+hashedPassword +"', '"+ experience +"', '"+ phone +"', '"+ payment +"', '"+ work +"', '"+ image +"', '"+ locat +"')";

        con.query(sql, function(error, result) {
            if(error) throw error;
            res.send("Data Inserted");
        })
    }
        
    // res.redirect('/login');
}


exports.pannel = (req, res) => {
    con.query('SELECT * FROM signup', (error, result) => {

        res.render('pannel', { signup: result })
    });
}