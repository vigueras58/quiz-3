var models = require('../models/models.js');


// GET /quizes
exports.index = function(req,res){
	models.Quiz.findAll().then(function(quizes){
			
		res.render('/quizes/index', {title: 'Quiz',quizes:quizes});
	}).catch(function(error){next(error)})
};


// GET /quizes/:quizID(\\d+)
exports.show = function(req,res){
		models.Quiz.find(req.params.quizID).then(function(quiz){
			
			res.render('quizes/show', {title: 'Quiz', quiz:quiz});
		});
	};

// GET /quizes/:quizID(\\d+)/answer
exports.answer = function(req,res){
		models.Quiz.find(req.params.quizID).then(function(quiz){
			if(req.query.respuesta === quiz.respuesta){
			
				res.render('quizes/answer', {title: 'Quiz',respuesta: 'Correcto'});
			
			} else{
				
				res.render('quizes/answer', {title: 'Quiz',respuesta: 'Incorrecto'});
			}
		});
	}; 

