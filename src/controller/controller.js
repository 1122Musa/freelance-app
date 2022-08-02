const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const con = require('../config/connection');
const  jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const session = require('express-session');


con.connect((error) => {
    if(error) throw error;
    console.log('Database Connected ' + con.threadId)
});


function generateToken (email){
   return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
   console.log('its login')
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
            // res.sendStatus(200)
            // return res.json({success: true, message: 'password match'});
            const token = generateToken({id: user[0].id ,email:email, role: user[0].role});
            req.session.token = token;
            console.log("session 1 " + req.session.token)

        }else{
            console.log('Unknown User')
            return res.json({success: false, message: 'passwords do not match'});

        } 
        res.redirect('/')
})
}
exports.functionRefersh =(req, res, next)=>{
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
  }
exports.authenticateToken = (req, res, next)=>{
    
    const authHeader = req.session.token;
    console.log(authHeader);
    // console.log("session 2 "+authHeader) // undefined

    // let decoded = jwt_decode(token);
    // console.log("decoded "+ decoded);
    
    if(authHeader == null  && authHeader == undefined) return res.sendStatus(401)

    // console.log("token "+authHeader); // undefined
    console.log("its working now")
    jwt.verify(authHeader, process.env.TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user;
        next();
    })
}

exports.home = (req, res) => {
    let token = req.session.token;
    let decodeToken = jwt_decode(token);
    console.log(decodeToken);
    userId = decodeToken.id;
    con.query('SELECT * FROM signup WHERE id = ?', [userId], (error, result) => {
        res.render('index2', { user: result[0] })
        console.log(result)
    });
}

exports.about = (req, res) => {
    let token = req.session.token;
    let decodeToken = jwt_decode(token);
    console.log(decodeToken);
    userId = decodeToken.id;
    con.query('SELECT * FROM signup WHERE id = ?', [userId], (error, result) => {
        res.render('about', { user: result[0] })
        console.log(result)
    });
}

exports.freelancer = (req, res) => {
    let token = req.session.token;
    let decodeToken = jwt_decode(token);
    console.log(decodeToken);
    userId = decodeToken.id;
    con.query('SELECT * FROM signup WHERE id = ?', [userId], (error, result) => {
        let userData = result[0]
        con.query('SELECT * FROM signup',(error, result) => {
        console.log('userData ' +userData)    
        if(error) throw error;
        res.render('user_list', { user: userData , signup: result})
    })
    });
}

exports.projects = (req, res) => {
    let token = req.session.token;
    let decodeToken = jwt_decode(token);
    userId = decodeToken.id;
    console.log('User Id' + userId)
    con.query('SELECT * FROM signup WHERE id = ?', [userId] , (err, result) => {
        if(err )throw err;
        console.log(result)
        let userData = result[0];
    if(decodeToken.role == 'freelancer'){
        let alertText = "freelancer";
            con.query('SELECT * FROM project' ,(error, result) => {
                res.render('projects', {user: userData, alert: alertText, project: result });
                console.log(result)
        });
    }else if(decodeToken.role == 'finder'){
        let alertText = " ";
        con.query('SELECT * FROM project' ,(error, result) => {
            res.render('projects', {user: userData, alert: alertText, project: result });
            console.log(result)
        });
    }  
    })
}

exports.projects_post = (req, res) => {

    let token = req.session.token;
    let decodeToken = jwt_decode(token);
    console.log(decodeToken);
    if(decodeToken.role == 'freelancer'){
        return(
            res.send('You are a freelancer. You cant add Projects')
        )
    }else if(decodeToken.role == 'finder'){
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
    
}

exports.work = (req, res) => {
    res.render('works')
}

exports.profile = (req, res) => {
    con.query('SELECT * FROM signup WHERE id=?',[req.params.id], (error, result) => {
        if(error) throw error;
        res.render('profile', { profile: result[0] })
    });
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

exports.myProfile = (req, res) => {
    let token = req.session.token;
    let decodeToken = jwt_decode(token);
    let idToken = decodeToken.id;
    con.query('SELECT * FROM signup WHERE id = ?', [idToken], (err, result) => {
        res.render('dashboard', { dataUser: result[0] } )
    })
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
    let role = "freelancer"
    let locat = req.body.locat;

    console.log('Post request Working');
    let findQuery = con.query('SELECT * FROM signup WHERE email=?',[req.body.email],(error, result) =>{
        console.log(result[0])
    })
    if(email === findQuery){
       alert("Email is already in use")
    }else{
        console.log('hash',hashedPassword)
        let sql = "INSERT INTO signup (fname, lname, email, password, experience, phone, payment, work, image, role, locat) VALUES ('"+ fname +"', '"+ lname +"', '"+ email +"', '"+hashedPassword +"', '"+ experience +"', '"+ phone +"', '"+ payment +"', '"+ work +"', '"+ image +"', '"+ role +"' ,'"+ locat +"')";

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
    // res.redirect('/login')
}

 exports.exitUser = (req, res, next) => {
    // let id  = 7;
    console.log('its logout route');
    let revoke = req.session.token;
    revoke = null;
    console.log('logout '+req.session.token);
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.redirect('/login');
    // jwt.sign(logout, process.env.TOKEN_SECRET, { expiresIn: 1 }, {logout, err} => {
    console.log(revoke);

    // });
}
exports.logout = (req, res) => {
    
    res.redirect('/login');
}