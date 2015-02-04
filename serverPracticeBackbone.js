// reviewing how Backbone models fetch data from a server

var TodoItem = Backbone.Model.extend({urlRoot: '/todos'})

// ^^^ this is a restful route in rails that delivers a json obj. We made TodoItem a class for javascript

var todoItem = new TodoItem({id: 1}) // fetches a todoItem with id 1

todoItem.fetch(); // this is the get route for /todos/1

// example of a json obj that would be returned from server

// the api is different than the standard interface
// we need to the parse non-standard JSON into your models
// server response

{todo: {id: 1, description: 'Pick up milk', status: 'incomplete'}}

// the parse method is a default... how ever the parse will not take the json from above well

var TodoItem = Backbone.Model.extend({
	parse: function(response){
		// we intercepted the response in this method
		return response.todo;
	}
})

// we are moving through the json object to grab id, description, status


var todoItem = new TodoItem({
	todo: {id: 1, description: 'Pick up milk', status: 'incomplete'}
});

todoItem.attributes; // will return an empty json object in this case

// we will need to modify the parsing method that is default to backbone to give back data


var todoItem = new TodoItem({
	todo: {id: 1, description: 'Pick up milk', status: 'incomplete'}, {parse: true};
});

// Changing Attribute Names in the front end

var todoItem = Backbone.Model.extend({
	parse: function(repsonse){
		response = response.todo;
		response.description = response.desc
		delete response.desc
		return response;
	}
})

// we get the right thing back

todoItem.attributes // --> { id: 1, description: 'Pick up milk', status: 'incomplete' }

todoItem.set({ description: 'Pick up cookies'});
todoItem.save()

// Overriding the toJSON function

var TodoItem = Backbone.Model.extend({
	toJSON: function(){
		return _.clone(this.attributes);
	}
}) // this is the default function in backbone

// here is what we are expecting. { id: 1, description: 'Pick up cookies', status: 'incomplete'}

var TodoItem = Backbone.Model.extend({
	toJSON: fucntion(){
		return _.clone(this.attributes)
	}
})

