Marginalio.ParagraphView = Backbone.View.extend({
  className: 'paragraph',
  template: _.template('<div class="count"></div><div class="body-text"><%= text %></div>'),
  initialize: function(options){
    var annotations = this.model.get('annotations');
    this.annotationsView = new Marginalio.AnnotationsView({collection: annotations});
    var doc = options.doc;


    annotations.on('add remove', function(){
      // console.log('document model is:', doc);
      // console.log('annotation model:', annotations.models);
      // var text = this.model.attributes.text;
      
      /* 
      If you log the document here you see that the annotations are added under the
      paragraphs attribute.  My goal was to overwrite the entirety of the paragraphs
      section.  (We could also filter through all the paragraphs until we found the
      one with text matching the current model's text attribute)  But since it's an
      array we cannot just affect the correct entry easily.
      */

      // We tell the document to save, how the save is handled is in request-handler.
      // This passes along the new annotations in the request.
      doc.save();

      this.$el.find('.count').text(this.model.get('annotations').length)
      .animate({opacity: 1}, 'fast');
    }, this);
  },
  events: { 
    'click': 'clicked'
  },

  clicked: function(){
    console.log('triggering');
    this.model.focus();
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.append(this.annotationsView.$el);

    // roughly center annotation count (easier than CSS!)
    $ (function(){ 
      var neighborHeight = this.$el.find('.body-text').first().height();

      var length = this.model.get('annotations').length || '';
      this.$el.find('.count').text(length).animate( {
       top: 22,
       left: -22
     }, 0 );
    }.bind(this))

    return this;
  }
});