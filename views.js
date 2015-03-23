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
	// Set any combination of the following properties on the OBJLITERAL (on the view)
	// tagName, id, and className

	// A new element will be created for you by the framework and a reference to it will be available at the el property

var TodosView = Backbone.View.extend({
	tagName: 'ul', // this is required, defaults to div if not set
	className: 'container', // optional you can assign multiple classses to this property like so: 'container homepage'

	id: 'todos' // optional
})

var todosView = new TodosView();

console.log(todosView.el) // i would expect <ul id="todos" class="container"></ul>

//				What if the element already exists on the page?
// we can set the el as a CSS selector that matches the element within the view factory

var TodosView= Backbone.View.extend({
	el: '#footer'
});

// or

// we can set the el to an existing element when creating the view

var todosView = new TodosView({el: $('#footer')}); // notice that this is relies on jquery

// Backbone makes it easy to have view logic via jQuery
view.$el === $(view.el)
// &
view.$(selector) === $(view.el).find(selector)

// we see this in the TodoView example's render method, we see this.$el used to set the HTML of the elemetn and this.$() used to find the subelements of the class edit

// setElement
// 					e.g. example of setElement

var button1 = $('<button></button>');
var button2 = $('<button></button>');

var View = Backbone.View.extend({
	events: {
		click: function(e){
			console.log(view.el === e.target);
		}
	}
})

// Create a new instance of the view applying it to the button1

var view = new View({el: button1})
view.setElement(button2)
button1.trigger('click');
button2.trigger('click'); // returns true

// The "el" property represents the markup portion of the view that will be rendered
//to get he view to actually render to the page, we need to add it as a new element or appen it to an existing element

var view = new Backbone.View;

view.setElement('<p><a><b>test</b></a></p>');

console.log(view$('a b').html()); // outputs "test"

// render() understanding it

// is an optional funciotn that defines the logic for rendering a template. We'll use underscore's microtemplating


















