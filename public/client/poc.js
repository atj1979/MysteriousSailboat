var Annotation = Backbone.Model.extend({
  initialize: function(params) {
    this.set('username', 'anon');
    this.set('text', 'this is a practice annotation...')
  }
});
var AnnotationView = Backbone.View.extend({

});

var Annotations = Backbone.Collection.extend({
  model: Annotation
});
var AnnotationsView = Backbone.View.extend({
  className: 'annotations',

  render: function() {
    this.$el.html('<textarea rows="4" cols="50">\
                    Comments go here\
                    </textarea>');
    return this;
  }
});

var Paragraph = Backbone.Model.extend({
  initialize: function(){
    var annotations = new Annotations();
    this.set('annotations', annotations);
  }
});
var ParagraphView = Backbone.View.extend({
  className: 'paragraph',
  template: _.template('<div class="body-text"><%= text %></div>'),
  initialize: function(){
    this.annotationsView = new AnnotationsView({collection: this.model.get('annotations')});
  },
  events: { 'click p' : 'clicked'},
  clicked: function(){
    this.$el.toggleClass('focus');
    this.annotationsView.render();
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.append(this.annotationsView.$el);
    return this;
  }

});

var Paragraphs = Backbone.Collection.extend({
  model: Paragraph
});
var ParagraphsView = Backbone.View.extend({
  tagName: 'div',
  className: 'pars-container',
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

var Document = Backbone.Model.extend({
  initialize: function(resp){

    var regex = /<p>(.|\n)*?<\/p>/g; 
    var pars = resp.content.match(regex)
                           .map(function(par){
                              return new Paragraph({ text : par }); 
                            });
    this.set('paragraphs', pars);
  }
});

var DocumentView = Backbone.View.extend({
  tagName: 'div',
  template: _.template("<h2><%= title %></h2>"),
  initialize: function(){
    this.paragraphsView = new ParagraphsView({collection: this.model.get('paragraphs')});
    this.render();
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.append(this.paragraphsView.$el);
    this.paragraphsView.render();
    return this;
  }

});


var data = {
    "domain": "www.newyorker.com",
    "next_page_id": null,
    "url": "http://www.newyorker.com/culture/culture-desk/this-week-in-cultural-clicks-sushi-cats-post-internet-poetry-and-more?intcid=mod-most-popular",
    "short_url": "http://rdd.me/v7bbxofi",
    "author": null,
    "excerpt": "Each week, the editors of Goings On share&#xA0;online happenings that caught their eye. Ever since the dogs took the prize in last October&#x2019;s New Yorker Festival debate &#x201C;Cats vs.&hellip;",
    "direction": "ltr",
    "word_count": 1031,
    "total_pages": 0,
    "content": "<div><div class=\"articleBody\" id=\"articleBody\">\n\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t<figure class=\"horizontal attachment-large landscape img-expandable featured\">\n\t\t\t\t\t\t\t<a href=\"http://www.newyorker.com/wp-content/uploads/2015/03/Sushi-Cat-1200.jpg\" title=\"This Week in Cultural Clicks: Sushi Cats, Post-Internet Poetry, and More\">\n\t\t\t\t\t\t\t\t<img src=\"http://www.newyorker.com/wp-content/uploads/2015/03/Sushi-Cat-290-150.jpg\" class=\"post-load horizontal attachment-large\" alt=\"\">\t\t\t\t\t\t\t</a>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t\n\t\t\t\t\t\t\n\n\n\n\n  \n    \n      <a class=\"tny-slot\" name=\"/2\"></a><a class=\"tny-page\" name=\"/1\"></a><p><em>Each week, the editors of Goings On share&#xA0;online happenings that caught their eye.</em></p> <p>Ever since the dogs took the prize in last October&#x2019;s New Yorker Festival debate &#x201C;<a href=\"http://www.newyorker.com/culture/culture-desk/festival-dispatch-cats-vs-dogs\">Cats vs. Dogs</a>,&#x201D; adjudicated by the nonpartisan judge David Remnick, I&#x2019;ve been wondering why cats get such a bad rap. Was it really because, as Adam Gopnik put it, &#x201C;All dogs are Democrats and all cats Republicans&#x201D;? What about what Anthony Lane so wisely suggested, that the endless loyalty and good cheer of dogs is a dangerous misrepresentation of life, and that &#x201C;truth is cats&#x201D;? There&#x2019;s an upcoming show at the Japan Society, &#x201C;<a href=\"http://www.japansociety.org/page/programs/gallery/life-of-cats\" target=\"_blank\">Life of Cats: Selections from the Hiraki Ukiyo-e Collection</a>,&#x201D; of woodblock prints from the Edo period (1615-1867), depicting the life of Japanese cats, from the cozy to the ferocious. The prints are divided into helpful subcategories like Cats and People, Cats Versus People, and Cats as People&#x2014;in one piquant image, an elaborately berobed cat woman leans on the head of a giant octopus while swatting a soup ladle at some flying fish. (Cats as people is a popular fantasy in Japanese culture&#x2014;the Kitty of Hello Kitty is apparently <a href=\"http://www.latimes.com/entertainment/arts/miranda/la-et-cam-hello-kitty-in-los-angeles-not-a-cat-20140826-column.html#page=1\" target=\"_blank\">not a cat but a &#x201C;little girl.&#x201D;</a>) One afternoon, while researching the Japan Society show, I typed &#x201C;Japanese cats&#x201D; into Google, hoping to find more Edo-period images. Instead, I unearthed this treasure: <a href=\"http://nekozushi.com/\" target=\"_blank\">sushi cats</a>. Or, if you want to sound like you know what you&#x2019;re talking about: <em>nekozushi</em>. You can thank me later.&#x2014;<em>Shauna Lyon</em></p> <p class=\"media-embed-wrapper\"><iframe width=\"560\" height=\"380\" src=\"http://www.youtube.com/embed/ZSFHLjwG2PQ\"></iframe></p> <p>Having enjoyed Emmanuel Villaume&#x2019;s conducting at the opening of &#x201C;Manon&#x201D; at the Met on Monday night, I&#x2019;m looking forward to listening to &#x201C;H&#xE9;ro&#xEF;que,&#x201D; a new album on Warner Classics in which he directs the Prague Philharmonia. The star of the recording is <a href=\"https://www.youtube.com/watch?v=ZSFHLjwG2PQ\" target=\"_blank\">Bryan Hymel</a>, the young American tenor who rose to fame when he substituted for Marcello Giordani in the role of &#xC9;n&#xE9;e in Berlioz&#x2019;s &#x201C;Les Troyens,&#x201D; at the Metropolitan Opera in 2012. The emergence of a first-rate tenor is always a cause for celebration, but Hymel&#x2019;s rare gift for singing the French &#x201C;heroic&#x201D; repertory&#x2014;which demands a unique mixture of power, refinement, and technical flexibility in the highest vocal register&#x2014;makes him doubly valuable.&#x2014;<em>Russell Platt</em></p> <figure class=\"alignnone size-large\"><img src=\"http://www.newyorker.com/wp-content/uploads/2015/03/Scott-Internet-Poetry-320.jpg\" alt=\"\"><figcaption class=\"caption\"><span class=\"caption-text\">A screenshot from Penny Goring&#x2019;s &#x201C;<small>DELETIA</small>&#x2014;self portrait with no self.&#x201D;</span> <span class=\"credit\">Image courtesy New Museum</span></figcaption></figure> <p>This week, Kenneth Goldsmith made <a href=\"http://www.newyorker.com/books/page-turner/post-internet-poetry-comes-of-age\">a strong case for post-Internet poetry</a>, writing on Page-Turner that the form has come into its own. This should come as no surprise, given that the Internet is a text-based medium, driven by code. What did surprise me was that Goldsmith restricted his argument to printed matter: a three-part volume, a book-length confession, an anthology. (In the past, he has championed YouTube&#x2019;s jejune bard of ranting, <a href=\"https://www.youtube.com/user/steveroggenbuck\" target=\"_blank\">Steve Roggenbuck</a>.) The most radical aspect of post-internet art isn&#x2019;t that it infiltrates old-media institutions like books and galleries; it&#x2019;s that, as it does so, it continues to proliferate online like Tribbles on Star Trek.&#xA0;As part of its&#xA0;current triennial,&#xA0;the New Museum tapped the&#xA0;British poet Harry Burke to organize <a href=\"http://www.newmuseum.org/exhibitions/view/poetry-as-practice\" target=\"_blank\">a series of&#xA0;Web-only projects</a> by six other poets: Alex Turgeon, Penny Goring, Tan Lin, Ye Mimi, Melissa Broder, and the collective not I.&#xA0;A new&#xA0;piece is released every Monday, through April 6th. No bookshelf required. (Be warned, this week&#x2019;s offering, Gorin&#x2019;s &#x201C;Deletia&#x2014;Self Portrait with No Self,&#x201D;&#xA0; is a tad NSFW.)<em>&#x2014;Andrea K. Scott</em></p> <p class=\"media-embed-wrapper\"><iframe width=\"560\" height=\"380\" src=\"http://www.youtube.com/embed/8t1x6bpHOYU\"></iframe></p> <p>Van Morrison turns seventy this year, and he&#x2019;s taking stock by re-recording a handful of his three hundred and sixty songs. He enlisted the help of some of his favorite artists, including Mark Knopfler, Taj Mahal, Mavis Staples, Natalie Cole, and George Benson. The resulting album, &#x201C;Duets: Re-Working the Catalogue,&#x201D; his thirty-fifth studio release, comes out March 23rd. Morrison, never one to go for the obvious, focusses on his lesser-known material, and over the past few weeks he&#x2019;s been posting singles on YouTube.&#xA0;The first one was &#x201C;<a href=\"https://www.youtube.com/channel/UCM6LGK-1wJyNl7q21_3RI-w\" target=\"_blank\">Real Real Gone</a>,&#x201D; with the jazz singer Michael Bubl&#xE9;. The last one, &#x201C;Fire in the Belly,&#x201D; with Steve Winwood, is coming next week, on March 17th. This week saw Mark Knopfler lending his earthy voice to &#x201C;<a href=\"https://www.youtube.com/watch?v=_oPb2Ma9z2M\" target=\"_blank\">Irish Heartbeat</a>.&#x201D; But my favorite so far was the album&#x2019;s opening track, for which the late Bobby Womack joined Morrison on a dressed-up and slightly funky version of &#x201C;<a href=\"https://www.youtube.com/watch?v=8t1x6bpHOYU\" target=\"_blank\">Some Peace of Mind</a>.&#x201D; It&#x2019;s one of Womack&#x2019;s last recordings, and his voice gives the chorus an added poignancy.<em>&#x2014;John Donohue</em></p> <p class=\"media-embed-wrapper\"><iframe width=\"560\" height=\"380\" src=\"http://www.youtube.com/embed/Vqo13Ga5o_Q\"></iframe></p> <p>There&#x2019;s a noble tradition of <a href=\"http://www.newyorker.com/culture/richard-brody/wes-anderson-classics-and-commercials\">directors exerting</a> and even <a href=\"https://www.youtube.com/watch?v=JOhDo2ZoOig\" target=\"_blank\">extending their art</a> in commercials, and Nathan Silver is the latest one to rise to the challenge. The prolific filmmaker has made a feature a year since 2012. &#x201C;<a href=\"http://www.newyorker.com/goings-on-about-town/movies/soft-in-the-head\">Soft in the Head</a>&#x201D; came out last year; two (&#x201C;<a href=\"http://www.newyorker.com/goings-on-about-town/movies/uncertain-terms\">Uncertain Terms</a>&#x201D; and &#x201C;Stinking Heaven&#x201D;) are still awaiting release. All three are harshly realistic, furiously histrionic glimpses into the harrowing lives of troubled people living in a variety of group homes&#x2014;a mental-health facility, a home for pregnant teen-agers, a self-regulated rehab house. Silver&#x2019;s commercial is an advertisement for a cell-phone camera and the processor that it runs on, and it&#x2019;s both a work of great originality and a startling new direction for the filmmaker.</p> <a class=\"tny-slot\" name=\"/3\"></a><a class=\"tny-page\" name=\"/2\"></a><p>The commercial has a title, &#x201C;<a href=\"https://www.youtube.com/watch?v=Vqo13Ga5o_Q\" target=\"_blank\">Family Affair</a>,&#x201D; and it&#x2019;s essentially a meta-film, one in which the making of the commercial&#x2014;the commission and Silver&#x2019;s uncertainty about it&#x2014;is folded into the action. The director builds the commercial around a recorded phone call with its creative supervisor, who responds to Silver&#x2019;s queries by describing, in sketch-like form, the kind of film he wants. Silver puckishly takes that recording as a wry voice-over that he brings to life with a freewheeling visual style&#x2014;and he cuts that voice-over up and edits it into a sort of musical score that lends the film a lyrical, through-composed structure. Silver appears in the film, along with his mother, Cindy Silver, who often acts in dramatic roles in his films. But here she plays herself&#x2014;and she&#x2019;s quite an engaging character on her own. I was walking through Grand Central Station one morning when I ran into Silver and the two members of his crew. He seemed happy and excited as he told me that he was waiting for his mother to arrive so that he could shoot a film with her there. Clearly, Silver found the ostensibly commercial premise of his film a springboard for his inspiration. So do I.<em>&#x2014;Richard Brody</em></p>     \n  \n\n\n\n    <nav class=\"social-buttons\"></nav>\n\t\t\t\t\t</div>\n\t\t\t\t\t</div>",
    "date_published": "2015-03-13 11:31:21",
    "dek": null,
    "lead_image_url": "http://www.newyorker.com/wp-content/uploads/2015/03/Scott-Internet-Poetry-320.jpg",
    "title": "This Week in Cultural Clicks: Sushi Cats, Post-Internet Poetry, and More",
    "rendered_pages": 1
};