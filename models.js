var Todo = Backbone.Model.extend({
	defaults: {
		title: '',
		completed: false
	}
});

// this sets the value of the attributes via instantiation

var myTodo = new Todo({
	title: "Set through instantiation."
});

// attributes

myTodo.attributes // returns an object literal with the attributes of title and completed

// models expose an .attributs represents an internal hash cotaining the state of that model

myTodo.set("title", "Title attributes set through Model.set().") 

// set single attribute value at a time through Model.set()

var titleOfMyTodo= myTodo.get('Title') // this gives you the title of myTodo

myTodo.set({
	title: "Both attributes set through Model.set()"
	completed: true
});

myTodo.on("change:title", function(){
	console.log('Title has been changed')
})

myTodo.set({title: "mmmm... this title is newer than before"})
// log entry: Title has been changed

// passing the {silent: true} silences an event that would normally go off

// it is best practice to use Model.set() or direct instantiation

//Listening for changes in the model

var Todo = Backbone.Model.extend({
	defaults: {
		title: '',
		completed: false
	},
	initialize: function(){
		console.log('This model has been initialized.');
		this.on('change', function(){
			console.log('- Values for this model have changed'); // this refers to an instance of Todo
		});
	},
	setTitle: function(newTitle){
		this.set({title: newTitle})
	}
});

var myTodo = new Todo();

myTodo.set('title', 'This listener is triggered whenever an attribute value changes');
// this logs: - Values for this model have changed

myTodo.setTitle('Go fishing on Sunday.');
// this also triggers the listener

// convenient places to add listeners is in the initialize() function as shown below
myTodo.set('completed', true);

// validation
// Backbone supports model validation through model.validate(), which allows checking the attribute values 
//for a model prior to setting them

// by default, validation occurs when the model is persisted using the save() method or when set() is
// called if {validate: true} is passed as an argument

var Person = new Backbone.Model({name: 'Jeremy'});

// Validates the model name
Person.validate = function(attrs){
	if (!attrs.name) {
		return 'I need your name';
	}
}

//unset()
// removes an attribute by deleting it from the internal model attributes hash


//example of validation

// an invalid event will be triggered, setting the validationError
// property on the model with the value which is returned by this method
var Todo = Backbone.Model.extend({
	defaults: {
		completed: false
	},

	validate: function(attributes){
		if(attributes.title == undefined){
			return "Remember to set a title for your todo."
		}
	}
	initialize: function(){
		console.log('This model has been initialized.');
		this.on('invalid', function(model, error){ // this is an invalid event
			console.log(error);
		});
	}
});

var myTodo = new Todo();
myTodo.set('completed', true, {validate: true}); // logs: Remember to set a title for your todo.

