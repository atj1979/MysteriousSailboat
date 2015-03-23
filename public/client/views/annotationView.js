Marginalio.AnnotationView = Backbone.View.extend({
  className: 'annotation',
  template: _.template('<div class="annotation-user"><%- username %>: </div>\
                        <div class="annotation-body"><%= text %></div>'),
  render: function(){
    var attrs = this.model.toJSON();
    if (attrs.username === mockLoggedInUser) 
      attrs.username = 'you';
    this.$el.html(this.template(attrs));
    return this;
  }
});