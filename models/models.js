var path = require('path');

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name 	=	(url[6] || null);
var user 		=	(url[2] || null);
var pwd 		=	(url[3] || null);
var protocol 	= 	(url[1] || null);
var dialect 	= 	(url[1] || null);
var port 		=	(url[5] || null);
var host 		=	(url[4] || null);
var storage		=	process.env.DATABASE_STORAGE;

//cargar modelo ORM 
var Sequelize = require('sequelize');


//user BBDD SQLite
var sequelize = new Sequelize(DB_name,user,pwd,
			{	
				dialect:protocol,
				protocol: protocol,
				port: port,
				host: host,
				storage:storage,	//solo SQLite
				omitNull: true		//solo Postgres
				});

//importar la definicion de la tabla quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; //exportar definicion de la tabla quiz

//sequelize.sync() crea e inicializa la tabla de preguntas en BD
sequelize.sync().success(function(){
	//success(...) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function(count){
		
		if(count === 0){ //la tabla se inicializa solo si esta vacia
			Quiz.create({pregunta:'capital de Italia',
						 respuesta:'Roma'}).success(function(){console.log('Base de datos inicializada')});
		
		}
	});
});
