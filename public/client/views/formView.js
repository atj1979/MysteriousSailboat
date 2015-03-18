Marginalio.FormView = Backbone.View.extend({
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