Marginal.DocumentView = Backbone.View.extend({
  className: 'doc',

  template: Templates['doc'],

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});
