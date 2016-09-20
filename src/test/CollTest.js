var app       = require('./helpers/app.js');
var gathers   = require('./data/index.js');
var should    = require('should'),
	supertest = require('supertest');
 
describe('Проверка маршрутов приложения', function () {
	
	it('проверка стартового маршрута', 
	function () {
        
		supertest(app)
		.get('/')
		.expect(200)
		.end(function (err, res) {
			if(err) console.log(err);
			 res.status.should.equal(200);
			});
	});  

	it('Проверка  маршрута внесения данных сборщика и количества', 
	function () {
		supertest(app)
		.get('/gather/8')
		.expect(200)
		.end(function (err, res) {
			res.status.should.equal(200);
		}); 

	});

	it('Проверка  маршрута данных сборщика и количества', 
	function () {
		supertest(app)
		.get('/gather')
		.expect(200)
		.end(function (err, res) {
			res.status.should.equal(200);
		}); 

	});
	
}); 