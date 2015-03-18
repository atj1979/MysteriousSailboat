window.Marginalio = Backbone.View.extend({
  template: Templates.layout,

  events: {
    'click li a.index':  'renderIndexView',
    'click li a.add':    'renderAddView'
  },

  initialize: function(){
    console.log( 'Marginalio is running' );
    $('body').append(this.render().el);

    this.router = new Marginalio.Router({ el: this.$el.find('#container') });
    this.router.on('route', this.updateNav, this);

    Backbone.history.start({ pushState: true });
  },

  render: function(){
    this.$el.html( this.template() );
    return this;
  },

  // Renders index/landing page
  renderIndexView: function(e){
    e && e.preventDefault();
    this.router.navigate('/', { trigger: true });
  },

  // View that controls adding new pages
  renderAddView: function(e){
    e && e.preventDefault();
    this.router.navigate('/add', { trigger: true });
  },

  updateNav: function(routeName){
    this.$el.find('.navigation li a')
      .removeClass('selected')
      .filter('.' + routeName)
      .addClass('selected');
  }
});