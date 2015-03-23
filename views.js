// Views

// Views in Bacbone don't contain the HTML markup for your application

// instead they contain the logic behind the presentation of the model's data to the user

// This is usually achieved using JavaScript templating (e.g. Underscore Microtemplates)

// A view's render() mehtod can be bound to a model's change() event
// thus enabling the view to instantly reflect model changes without requiring a full page refresh

// Creating new Views

var TodoView = Backbone.View.extend({
	tagName: 'li',

	// cache the template funciton for a single item
	todoTpl: _.template("An example tamplate"),

	events: {
		'dblclick label': 'edit',
		'keypress .edit' : 'updateOnEnter',
		'blur .edit': 'close'
	},

	initialize: function(options){

		this.options = options || {}
	}

	// re-render the title of the todo item
	render: function(){
		this.$el.html(this.todoTpl(this.model.attributes));
		this.input = this.$('.edit');
		return this;
	},

	edit: function(){
		// executed when todo label is double clicked
	},

	close: function(){
		//executed when todo loses focus
	},

	updateOnEnter: function(e){
		//executed on each keypress when in todo edit mode,
		// but we'll wait for enter to get 
	}
})

var todoView = new TodoView();

console.log(todoView.el) // logs <li><li>
// this el corresponds to the DOM element of the view instance

//What is el?
// The central property of a view is el (ths value logged in the last statement of the example). 
// What is el and how is it defined?

//  el is basically a reference to a DOM element and all views must have one

// Views can use el to compose their element's content and then insert it into the DOM all at once

// There are two ways to associate a DOM element with a view
// #1 a new element can be created for the view and then be added to the DOM
// #2 Or a reference can be made to an element which alread exists in teh page

//How to create a new element for your view?
	// Set 




