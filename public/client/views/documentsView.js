Marginalio.DocumentsView = Backbone.View.extend({
  className: 'documents',

  initialize: function(){
    this.collection.on('sync', this.addAll, this);
    this.listenTo(this.collection, 'remove', this.deleteFromServer);
    this.collection.fetch();
  },

  render: function() {
    // this.$el.empty();  // what are the consequences of commenting htis out?
    console.log('render called', this.collection);
    return this;
  },

  addAll: function(){
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(item){
    var view = new Marginalio.DocumentView({ model: item });
    this.$el.append( view.render().el );
  },
  deleteFromServer: function(item){

    // console.log("element: ", this.$el);

    // $.ajax({
    //   url: '/deleteDoc',
    //   type: 'POST',
    //   // changed $form to this.$el
    //   data: this.$el,
    //   success: function(data, status){
    //     var doc = new Marginalio.Document(JSON.parse(data));
    //     doc.on('request', this.startSpinner, this);
    //     doc.on('sync', this.success, this);
    //     doc.on('error', this.failure, this);
    //     doc.save();
    //   },
    //   error: function(err){
    //     console.error('Incomplete POST request',err);
    //   }
    // });

    this.render();
  }
});


