// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Creates a User Schema. This will be the basis of how user data is stored in the db
var UserSchema = new Schema({
    beautyname: {type: String, required: true},
    username: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    day: {type: String, required: true},
    gender: {type: String, required: true},
    pic: {type: String},
    beautycian: {type: String, required: true},
    location: {type: [Number], required: true}, // [Long, Lat]
    
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

// Sets the created_at parameter equal to the current time
UserSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// var Book = module.exports = mongoose.model('beautydatas', UserSchema);

// // Get Books
// module.exports.getBooks = (callback, limit) => {
// 	Book.find(callback).limit(limit);
// }

// // Get Book
// module.exports.getBookById = (id, callback) => {
// 	Book.findById(id, callback);
// }

// // Add Book
// module.exports.addBook = (book, callback) => {
// 	Book.create(book, callback);
// }

// // Update Book
// module.exports.updateBook = (id, book, options, callback) => {
// 	var query = {_id: id};
// 	var update = {
// 		title: book.title,
// 		genre: book.genre,
// 		description: book.description,
// 		author: book.author,
// 		publisher: book.publisher,
// 		pages: book.pages,
// 		image_url: book.image_url,
// 		buy_url: book.buy_url
// 	}
// 	Book.findOneAndUpdate(query, update, options, callback);
// }

// // Delete Book
// module.exports.removeBook = (id, callback) => {
// 	var query = {_id: id};
// 	Book.remove(query, callback);
// }

// Indexes this schema in geoJSON format (critical for running proximity searches)
UserSchema.index({location: '2dsphere'});

// Exports the UserSchema for use elsewhere. Sets the MongoDB collection to be used as: "scotch-user"
const Book =  module.exports = mongoose.model('beautydatas', UserSchema);
// Get Books
module.exports.getBooks = (callback, limit) => {
	Book.find(callback).limit(limit);
}

// Get Book
module.exports.getBookById = (id, callback) => {
	Book.findById(id, callback);
}

// Add Book
module.exports.addBook = (book, callback) => {
	Book.create(book, callback);
}

// Update Book
module.exports.updateBook = (id, book, options, callback) => {
	var query = {_id: id};
	var update = {
		title: book.title,
		genre: book.genre,
		description: book.description,
		author: book.author,
		publisher: book.publisher,
		pages: book.pages,
		image_url: book.image_url,
		buy_url: book.buy_url
	}
	Book.findOneAndUpdate(query, update, options, callback);
}

// Delete Book
module.exports.removeBook = (id, callback) => {
	var query = {_id: id};
	Book.remove(query, callback);
}
