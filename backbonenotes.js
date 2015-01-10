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