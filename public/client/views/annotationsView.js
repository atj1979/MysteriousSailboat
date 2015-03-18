Marginalio.AnnotationsView = Backbone.View.extend({
  className: 'annotations-container',
  initialize: function(){
    this.collection.on('add', function(){
      //bug - only want to render if change AND this is the focal paragraph
      console.log('add noted')
      this.render();
    }, this)
    this.collection.on('show', function(){
      this.$el.animate({opacity: 1}, 'fast');
      this.render();
    }, this);
    this.collection.on('hide', function(){
      this.$el.html('');
      this.$el.css({opacity: 0});

      // this.$el.animate({opacity: 0}, 200, function(){ 
      //   this.$el.html('');
      // }.bind(this));  
    }, this);
  },
  render: function(){
    this.$el.html('');
    this.$el.append(
      this.collection.map(function(annotation){
          return (new Marginalio.AnnotationView({model: annotation})).render().$el;
        })
      );
    this.$el.append((new Marginalio.FormView({ collection: this.collection })).render().$el);
    return this;
  }
});