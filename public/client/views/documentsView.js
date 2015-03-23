Marginalio.DocumentsView = Backbone.View.extend({
  className: 'documents',

  initialize: function(){
    // this.addAll();
    this.collection.on('sync', this.addAll, this);
    this.collection.on('add remove', this.render, this);
    this.collection.fetch();
    this.on('deletion', this.addAll, this);
  },

  render: function() {
    // this.$el.empty();  // what are the consequences of commenting htis out?
    console.log('render called');
    return this;
  },

  addAll: function(){
    // console.log("COLLECTION", this.collection.models);
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(item){
    var view = new Marginalio.DocumentView({ model: item });
    this.$el.append( view.render().el );
  }
  // deletion: function(){
  //   render();
  //   console.log('rerendered');
  // }
});


