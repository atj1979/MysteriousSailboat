Marginalio.ParagraphsView = Backbone.View.extend({

  initialize: function(options){
    this.doc = options.doc;
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
    var doc = this.doc;
    this.$el.append(
      this.collection.map(function(paragraph){
        var x = new Marginalio.ParagraphView({model: paragraph, 'doc': doc});
        x.render();
        return x.$el;
      })
    );
    return this;
  }
});