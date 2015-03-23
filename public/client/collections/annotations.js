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


Marginalio.Annotations = Backbone.Collection.extend({
  model: Marginalio.Annotation,
  url: '/documents',
  show: function(){
    this.trigger('show', this);
  },
  hide: function(){
    this.trigger('hide', this);
  },   
});