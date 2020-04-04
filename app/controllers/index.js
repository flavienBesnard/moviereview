var Movie = require('../models/movie')
var Category = require('../models/category')

//home page
exports.index = function(req, res){
	Category
		.find({})
		.populate({path: 'movies', options: {limit: 5}})
		.exec(function(err, movies){
			// console.log(:)

			if(err){
				console.log(err)
				
				
			}
			
			
			
			
			
			// console.log(categories[0])
			// console.log(categories[0])
		

			res.render('index', {
				title: 'Homepage',
				movies: movies
			})

	})
}

//search page
exports.search = function(req, res){
	var catId = req.query.cat
	var q = req.query.q
	var page = parseInt(req.query.p)
	var displayAmount = 2
	var index = page * displayAmount

	if(catId){
		Category
			.find({_id: catId})
			.populate({
				path: 'movies',
				select: 'title poster',
				options: {limit: displayAmount, skip: index}
			})
			.exec(function(err, movies){

				if(err){
					console.log(err)
					console.log(err)
				
				}

				var category = genres[0] || []
				var movies = movies.movies || []

				res.render('results', {
					title: 'Results page',
					keyword: movies.name,
					movie: results
				})
		})

	}else{
		Movie
			.find({title: new RegExp(q+'.*', 'i')})
			.exec(function(err, movies){
				if (err)
					console.log(err)
				console.log(err)
			
				
				// var movies = category.movies || []

				res.render('results', {
					title: 'Results page',
					keyword: q,
					movies: movies
				})
			})
	}
}