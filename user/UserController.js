var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');

// Crear uevo Usuario
router.post('/', function (req, res) {
    User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }, 
        function (err, user) {
            if (err) return res.status(500).send("Problem to add in database.");
            res.status(200).send(user);
        });
});

// obtener todos los usuarios
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("Problem to get users");
        res.status(200).send(users);
    });
});
// obtener datos de un usuario
router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("Problem get user data.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// borrar un usuario
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("problem deleting user.");
        res.status(200).send("User: "+ user.name +" deleted.");
    });
});

// actualizar un usuario
router.put('/:id', function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("Problem updating user.");
        res.status(200).send(user);
    });
});


module.exports = router;