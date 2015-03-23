Marginalio.Paragraph = Backbone.Model.extend({
  initialize: function(params){
    var annotations;
    if (!params.annotations){
      annotations = new Marginalio.Annotations();
    } else {
      annotations = new Marginalio.Annotations(params.annotations);
    }
    this.set('annotations', annotations);
  },
  focus: function() {
    this.trigger('focus', this);
  }
});