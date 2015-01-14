// to create a model class
var Appointment = Backbone.Model.extend({});

var appointment = new Appointment({title: 'I have an instance of appointment'})

// to start displaying the data
var AppointmentView = Backbone.View.extend({}); // to create a view class

var appointmentView = new AppointmentView({ model: appointment}); // to create a view instance

// data --> models (provides the data) --> views (start to build the html)--> dom

// rendering the view
// 1. we first need to define render
// 2. we do this by going to our view class and define rendering there

var AppointmentView = Backbone.View.extend({
  render: function(){
    var html = '<li>'+this.model.get('title')+'</li>'; // i believe this refers to the instance of the model (appointment if it is called on appointment)
    // in the rendering function make sure to tell it where to render. I will be using JQUERY to make these methods easy.
    $(this.el).html(html);
  }
})

//Backbone Models
// to get an attribute
appointment.get('title') //in this case it will be the 'I have an instance of appointment'
// to set an attribute
appointment.set({title: 'backbone needs to be checked'})
// sync to the server?
appointment.save();

// to render the appointmentView instance make sure to call the render function
appointmentView.render();

// our appointment model isn't too useful... lets set some default attributes

var Appointment = Backbone.Model.extend({
  defaults: function(){
    return {
      title: 'Checkup',
      date: new Date(); // we make this a function to change the date. if it was written as an obj literal, we get every date the same. when the creation of the model happened
    }
  }
})

// thus far we have been instantiating the model via object literals and have had not restful routing.

// lets start to instantiate real data from a route.

var Appointment = Backbone.Model.extend({urlRoot: '/appointments'});

// lets make a apt
var appointment = new Appointment({id: 1})

appointment.fetch(); // get all information on apt

appointment.set({description: 'Funny Bone Hurts'}) //update

appointment.save(); // put /todos/1 with json params

// Reviewing Model View Logic
// View
var appointmentView = Backbone.View.extend({
  template: _.template('<span class="<% if(cancelled) print("cancelled") %>">' +
                        '<%= title %></span>' +
                        '<a href="#">x</a>'),
  events: { 'click a' : 'cancel'},
  initialize: function(){
    this.model.on('change', this.render, this);
  },
  cancel: function(){
    this.model.cancel();
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
  };
});

// Model
var Appointment = Backbone.Model.extend({
  cancel: function(){
    this.set({cancelled: true});
  }
})
