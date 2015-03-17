// Front-end design overview
// -------------------------
// The top level view is the Document view, which delegates almost all work
//  to the paragraphs view, which in turn delegates to paragraph view.
// (Document view could possibly be removed, if the article title, and related data, 
// can be rendered by paragraphs view)
// 
//  a paragraph is currently a <p> tag, parsed from the hard-coded article, and an associated
//  collection of annotations.
//
//  ParagraphsView also tracks the "focal paragraph," that is, the last paragraph
//  the user clicked. This is the trickiest logic of the program:
  //  ParagraphView listens for clicks, which triggers a focus event on the associated model.
  //  ParagraphsView listens for this event, and then does two things:
  //  1. tells the current focal annotation to hide
  //  2. tells the new focal annotation to show.
  //  These, again, are events triggered on the model and listend for in annotations view.

var AnnotationView = Backbone.View.extend({
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

var AnnotationsView = Backbone.View.extend({
  className: 'annotations-container',
  initialize: function(){
    this.collection.on('add', function(){
      //bug - only want to render if change AND this is the focal paragraph
      console.log('add noted')
      this.render();
    }, this)
    this.collection.on('show', function(){
      this.render();
    }, this);
    this.collection.on('hide', function(){
      this.$el.html('');
    }, this);
  },
  render: function(){
    this.$el.html('');
    this.$el.append(
      this.collection.map(function(annotation){
          return (new AnnotationView({model: annotation})).render().$el;
        })
      );
    this.$el.append((new FormView({ collection: this.collection })).render().$el);
    return this;
  }
});

var FormView = Backbone.View.extend({
  className: 'form',
  template: _.template(' <textarea name="comment" id="comment" form="send" rows="1" cols="10"></textarea>\
    <form action="#" id="send" method="post">\
    <input type="submit" name="submit" class="submit"/>\
      </form>'),
   events: {
    'submit #send': 'handleSubmit'
  },
  handleSubmit: function(e){
    e.preventDefault();

    var $text = this.$('#comment');
    if ($text.val() === ''){
      return ;
    }
    this.collection.create({
      username: mockLoggedInUser,
      text: converter.makeHtml( $text.val() )
    });
    $text.val('');
  },
  render: function(){
    this.$el.html(this.template());
    return this;
  }
});

var ParagraphView = Backbone.View.extend({
  className: 'paragraph',
  template: _.template('<div class="count"><%= annotations.length %></div><div class="body-text"><%= text %></div>'),
  initialize: function(){
    var annotations = this.model.get('annotations');
    this.annotationsView = new AnnotationsView({collection: annotations});

    annotations.on('add remove', function(){
      this.$el.find('.count').text(this.model.get('annotations').length);
    }, this);

  },
  events: { 'click' : 'clicked'},

  clicked: function(){
    //paragraph emits a focus event
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

var ParagraphsView = Backbone.View.extend({
  tagName: 'div',
  className: 'pars-container',
  initialize: function(){
    this.focalPar = null;
    this.collection.on('focus', function(paragraph){

      if (this.focalPar !== paragraph){
        if (this.focalPar) {
          this.focalPar.get('annotations').hide();
        }
        this.focalPar = paragraph;
        this.focalPar.get('annotations').show();
      }
    });
  },
  render: function(){
    this.$el.append(
      this.collection.map(function(paragraph){
        var x = new ParagraphView({model: paragraph});
        x.render();
        return x.$el;
      })
    );
    return this;
  }
});

var DocumentView = Backbone.View.extend({
  initialize: function(){
    this.paragraphsView = new ParagraphsView({collection: this.model.get('paragraphs')});
    this.render();
  },
  render: function(){
    this.$el.append(this.paragraphsView.$el);
    this.paragraphsView.render();
    return this;
  }
});
