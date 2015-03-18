Marginalio.ParagraphView = Backbone.View.extend({
  className: 'paragraph',
  template: _.template('<div class="count"></div><div class="body-text"><%= text %></div>'),
  initialize: function(){
    var annotations = this.model.get('annotations');
    this.annotationsView = new Marginalio.AnnotationsView({collection: annotations});

    annotations.on('add remove', function(){
      this.$el.find('.count').text(this.model.get('annotations').length)
                             .animate({opacity: 1}, 'fast');
    }, this);
  },
  events: { 
    'click': 'clicked'
  },

  clicked: function(){
    this.model.focus();
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.append(this.annotationsView.$el);

    // roughly center annotation count (easier than CSS!)
    $ (function(){ 
      var neighborHeight = this.$el.find('.body-text').height();
      this.$el.find('.count').animate( {
                                         top: neighborHeight / 2 - 14,
                                         left: -22
                                       }, 0 );
    }.bind(this))

    return this;
  }
});