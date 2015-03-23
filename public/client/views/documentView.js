Marginalio.DocumentView = Backbone.View.extend({
  className: 'document',

  template: Templates.document,
  events: {
    // select the .info class for showDoc trigger. If the trigger is just click, clicking the delete button would show the document instead of deleting.
    'click .info' : 'showDoc',
    'click #deleteButton' : 'deleteDocument'
  },
  showDoc: function() {
    this.model.focus();
  },
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },
  deleteDocument: function() {
    console.log("BUTTON CLICKED");
    // Trigger the model deletion event.
    // this.trigger('deletion');
    // Delete the document.
    this.remove();
    this.destroy();
  }
});
