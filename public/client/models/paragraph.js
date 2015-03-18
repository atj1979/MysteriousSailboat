Marginalio.Paragraph = Backbone.Model.extend({
  initialize: function(){
    var annotations = new Marginalio.Annotations();
    this.set('annotations', annotations);
  },
  focus: function() {
    this.trigger('focus', this);
  }
});