var express = require('express');
var router = express.Router();
var quiz_controller = require('../controllers/quizController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/author', function(req, res, next){
  res.render('author',{ title: 'creditos', author:'Fernando Mata Pelaez'});
});

router.get('/quizes',quiz_controller.index);
router.get('/quizes/:quizID(\\d+)',quiz_controller.show);
router.get('/quizes/:quizID(\\d+)/answer',quiz_controller.answer);


module.exports = router;
