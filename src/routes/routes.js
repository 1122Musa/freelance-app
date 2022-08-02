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


router.get('/', [controller.authenticateToken],controller.home);
router.get('/about', [controller.authenticateToken],controller.about);
router.get('/freelancer', [controller.authenticateToken],controller.freelancer);
router.get('/projects', [controller.authenticateToken],controller.projects);
router.post('/projects', controller.projects_post);
router.get('/work', [controller.authenticateToken],controller.work);
// router.get('/admin', controller.admin);
router.get('/profile', controller.profile);
router.get('/profile/:id', controller.profile_id);
router.get('/request/:id', controller.request_id);
router.get('/register', controller.register);
router.post('/register', controller.register_post);
router.get('/myProfile', controller.myProfile);
router.get('/join', controller.join);
router.post('/join', controller.join_post);
router.get('/login', controller.login);
router.post('/login', controller.login_post);
router.get('/pannel', controller.pannel);
router.get('/logout',[controller.exitUser], controller.logout);


module.exports = router