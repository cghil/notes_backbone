// Review from fetching data from the server

var TodoItems = Backbone.Collection.extend({
	url: '/todos'
});
// URL to get JSON data from populated server

todoItems.fetch()

// example of populated date
[ {description: "Pick up milk", status: 'incomplete', id: 1}, {description: 'Get a car wash', status: 'incomplete', id: 2} ]

todoItems.length // will equate to 2

// but how do we handle nonstandard responses

// on the cover the backbone parse method is built in

// this is what it looks like
var TodoItems = Backbone.Collection.extend({
	parse: function(response){
		return response
	}
})

// there is a problem however, backbone collection will not work with nonstandard responses

// lets redefine the parse function for a weird looking response like the following:
{ "total": 25, "per_page": 10, "page": 2, "todos": [{'id': 1}, {'id': 2}]}

var TodoItems = Backbone.Collection.extend({
	parse: function(response){
		this.perPage = response.page; // 10
		this.page = response.page; // 2
		this.total = response.total; // 25
		return response.todos;
	}
})

todoItems.toJSON(); // [{ id: 1, description: 'Pick up milk'}, ...]

todoItems.fetch(); // GET /todos

// what if we want to get another page
// for example GET /todos?page=6
//_________________________________________

// we would need a get request with a parameter in this case it is page equals 6
// we are going to send additional data in to the fetch

todoItems.fetch({data: {page: 6}})

// another example

// lets say we want to go to another URL /appointments?since=2013-01-01

// var appointments = new Appointments();
// appointments.fetch({data: {since: "2013-01-01"}});

//now we want to go to a page that looks like the following /appointments?since=2013-01-01&per_page=10
// appointments.fetch({data: {since: "2013-01-01", per_page: 10}});

// lets make it more dynamic

todoItems.page

todoItems.fetch({data: {page: todoItems.page + 1}});

// how do we place the next page link within our app and make it work
// lets review the collection review
var TodosView = Backbone.View.extend({
	// we can add a templating function
	template: _.template('<a href="#/todos/p<%=page %>">next page</a>'),
	initialize: function(){
		this.collection.on('reset', this.render, this);
	},
	render: function(){
		this.addAll();
		this.$el.append(this.template({page: this.collection.page + 1}))
		return this; 
	},
	addAll: function(){
		this.$el.empty();
		this.collection.forEach(this.addOne);
	},
	addOne: function(todoItem){
		var todoView = new TodoView({model: todoItem})
		this.$el.append(todoView.render().el)
	}
})

// we now need to create a route for '/todos/p:page'

// reviewing the router

var TodoApp = new (Backbone.Router.extend({
	routes: {
		"todos/p:page": "page", // there is a parameter
		"": "index"
	},
	// we have to define the page route function
	page: function(page){
		this.todoItems.fetch({data: {page: page}}); // fetch the do items
	},
	initialize: function(){
		this.todoItems = new TodoItems(); // gives us more todo items
		this.todosView = new TodosView({collection: this.todoItems});
		this.todosView.render()
		$('#app').append(this.todosView.el)

		// we are instantiating the collections
		// and we are appending it to the app div
	},
	index: function(){
		this.todoItems.fetch(); // defining the index function that will fetch the todoItems
	}
}))

// lets look at how to sort the data via COMPARATOR

var TodoItems = Backbone.Collection.extend({
	comparator: "status"
});

todoItems.fetch();

// this will automatically sort our objects for us
// lets figure out out to do a more complicated sort
var TodoItems = Backbone.Collection.extend({
	comparator: function(todo1, todo2){
		return todo1.get('status') < todo2.get('status') // sort status in reverse order
	}
});

// Let's find out how many of our items are complete

var TodoItems = Backbone.Collection.extend({
	completedCount: function(){
		return this.where({status: 'complete'}).length; // the where function returns an array of models
	}
})

// example if this was the collection data, [ {description: 'Pick up milk', status: 'incomplete', id: 1}, {description: 'Get a car wash', status: 'complete', id: 2}]

todoItems.completedCount() // ---> 1

