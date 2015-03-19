Marginalio.Router = Backbone.Router.extend({

  initialize: function(options){
    this.$el = options.el;
    this.focalDoc = null;
  },

  routes: {
    '':    'index',
    'add': 'add',
    'document': 'document'
  },

  swapView: function(view){
    this.$el.html(view.render().el);
  },

  index: function(){
    var documents = new Marginalio.Documents();
    
    var documentsView = new Marginalio.DocumentsView({ collection: documents });
    this.swapView(documentsView);

    documents.on('focus', function(doc){
      this.focalDoc = doc;
      this.navigate('/document', { trigger: true });
    }, this);
  },

  add: function(){
    this.swapView(new Marginalio.addDocumentView());
  },
  document: function() {

    window.mockLoggedInUser = "Fred";
    window.converter = Markdown.getSanitizingConverter();

    var view = new Marginalio.ParagraphsView({collection: this.focalDoc.get('paragraphs') });
    this.swapView(view);
  }
});