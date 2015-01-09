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
    var html = '<li>'+this.model.get('title')+'</li>'; // i believe this refers to the instance of the model (appointment)
    $(this)
  }
})