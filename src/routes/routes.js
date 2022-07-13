const express = require('express');
const router = express.Router();
const path = require('path');
const controller = require('../controller/controller');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../public/images')
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({
    storage: storage
});


router.get('/', controller.home);
router.get('/about', controller.about);
router.get('/freelancer', controller.freelancer);
router.get('/projects', controller.projects);
router.post('/projects', controller.projects_post);
router.get('/work', controller.work);
// router.get('/admin', controller.admin);
router.get('/profile/:id', controller.profile_id);
router.get('/request/:id', controller.request_id);
router.get('/register', controller.register);
router.post('/register', controller.register_post);
router.get('/join', controller.join);
router.post('/join', controller.join_post);
router.get('/login', controller.login);
router.post('/login', controller.login_post);
router.post('/login', controller.login)
router.get('/pannel', controller.pannel);


module.exports = router