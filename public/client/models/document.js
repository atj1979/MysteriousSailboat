Marginalio.Document = Backbone.Model.extend({
  urlRoot: '/documents',
  initialize: function(params){
      var retargetLinks = params.content.replace(/(<a)\s/g, '$1 target=\"_blank\" ');
      // split up assets (currently by paragraph or figure)
      var pars = retargetLinks.match(/<p(.|\n)*?<\/p>|<figure(.|\n)*?<\/figure>/g)
                    .map(function(par){
                        return new Marginalio.Paragraph({ text : par }); 
              });

    // add title
    pars.unshift(new Marginalio.Paragraph({ text: '<h2 class="title">' + params.title + '</h2>' }));

    this.set('paragraphs', new Marginalio.Paragraphs(pars));
  },
  focus: function(){
    this.trigger('focus', this);
  }
});

