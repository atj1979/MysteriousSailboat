Marginalio.DocumentsView = Backbone.View.extend({
  className: 'documents',

  initialize: function(){
    this.collection.on('sync', this.addAll, this);
    this.collection.on('remove', this.render, this);
    this.collection.fetch();
  },

  render: function() {
    // this.$el.empty();  // what are the consequences of commenting htis out?
    console.log('render called');
    return this;
  },

  addAll: function(){
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(item){
    var view = new Marginalio.DocumentView({ model: item });
    this.$el.append( view.render().el );
  }
});


