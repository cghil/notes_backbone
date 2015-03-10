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

// this is a TodoItem constructor we are now parsing the right data... with the parse function.
// tells the json to run through the parse method we had created above
// when we run the following command

todoItem.attributes;

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
		return return {_.clone(this.attributes)};
	}
});

// lets fix the des in the model to become description in

var TodoItem = Backbone.Model.extend({
	toJSON: function(){
		var attrs = _.clone(this.attributes);
		attrs.desc = attrs.description
		attrs = _.pick(attrs, 'desc', 'status')
		// the _.pick takes an object and returns a copy of the object but only at the keys selected
	}
});

todoItem.toJSON();

// this will return

{ todo: {desc: 'Pick up cookies', status: 'incomplete'}}

// now we will no longer be able to use the to json in the view to render the template

// Render View with Attributes

// this no longer works!!!!!!
// var TodoView = Backbone.View.extend({
// 	render: function(){
// 		this.$el.html(this.template(this.model.toJSON()));
// 		return this
// 	}
// })

// instead we will use models.attributes instead

var TodoView = Backbone.View.extend({
	render: function(){
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});

// toJSON() should only be used when serializing back to the server

// ____________________________________________________________________________________

// What happens when we have an conventional ID Attribute

var todoItem = new TodoItem({id: 1})
todoItem.fetch(); // gives back {_id: 1, description: 'Pick up milk'...}

todoItem.id // will not work because id is _id

var TodoItem = Backbone.Model.extend({
	idAttribute: '_id'
});

// we now parse this field as the id

// EXAMPLE

var Appointment = Backbone.Model.extend({
	toJSON: function(){
		var attributes = _.clone(this.attributes);
		attributes.cankelled = attributes.cancelled;
		delete attributes.cancelled;
		return {appointment: attributes};
	}
});

// in the 'Appointment' Model
parse: function(response){
	var appointment = response.appointment;
	appointment.canelled = appointment.cankelled;
	delete appointment.cankelled;
	return appointment;
}
// post /appointments
{ "appointment" : {"title": "Ms. Kitty Hairball Treatment", "cankelled" : false, "identifier": 1} }

//Render Changes
