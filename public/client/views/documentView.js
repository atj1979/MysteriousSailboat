Marginalio.DocumentView = Backbone.View.extend({
  className: 'document',

  template: Templates.document,
  events: {
    'click' : 'showDoc'
  },
  showDoc: function() {
    this.model.focus();
  },
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});
