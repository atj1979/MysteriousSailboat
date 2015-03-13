var Annotation = Backbone.Model.extend({
  initialize: function(params) {
    this.set('username', 'anon');
    this.set('text', 'this is a practice annotation...')
  }

});

var Annotations = Backbone.Collection.extend({
  model: Annotation
  // , comparator: sortByUser
});


var Paragraph = Backbone.Model.extend({
  initialize: function(params){
    var annotations = new Annotations();
    this.set('annotations', annotations);
  }

});
