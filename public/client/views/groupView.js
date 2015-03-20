// backbone view for a list of usernames in a group

Marginalio.GroupView = Backbone.View.extend({
  className: 'group',
  template: _.template('<div class="group-user"><%- username %>: </div>'),
  render: function(){
    var attrs = this.model.toJSON();
    if (attrs.username === mockLoggedInUser) 
      attrs.username = 'you';
    this.$el.html(this.template(attrs));
    return this;
  }
});
