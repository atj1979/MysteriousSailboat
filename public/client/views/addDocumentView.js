Marginalio.addDocumentView = Backbone.View.extend({
  className: 'creator',

  template: Templates.add,

  events: {
    'submit': 'addDoc'
  },

  render: function() {
    this.$el.html( this.template() );
    return this;
  },

  addDoc: function(e) {
    e.preventDefault();
    var $form = this.$el.find('form .text');

    var doc = new Marginalio.Document({ url: $form.val() });
    doc.on('request', this.startSpinner, this);
    doc.on('sync', this.success, this);
    doc.on('error', this.failure, this);
    doc.save({}); 
    $form.val('');

    // Makes call to Readability API through server
    // $.ajax({
    //   url: '/addDoc',
    //   type: 'POST',
    //   data: $form,
    //   success: function(data, status){
    //     console.log(data, status);
    //     var doc = new Marginal.Document(data);
    //     doc.save({});
    //   },
    //   error: function(err){
    //     console.error('Incomplete POST request',err);
    //   }
    // });
    // $form.val('');
  },

  success: function(doc) {
    this.stopSpinner();
    var view = new Marginalio.DocumentView({ model: doc });
    this.$el.find('.message').append(view.render().$el.hide().fadeIn());
  },

  failure: function(model, res) {
    this.stopSpinner();
    this.$el.find('.message')
      .html('Please enter a valid URL')
      .addClass('error');
    return this;
  },
  // Do we want any spinner animations?
  startSpinner: function() {
    this.$el.find('img').show();
    this.$el.find('form input[type=submit]').attr('disabled', 'true');
    this.$el.find('.message')
      .html('')
      .removeClass('error');
  },

  stopSpinner: function() {
    this.$el.find('img').fadeOut('fast');
    this.$el.find('form input[type=submit]').attr('disabled', null);
    this.$el.find('.message')
      .html('')
      .removeClass('error');
  }
});
