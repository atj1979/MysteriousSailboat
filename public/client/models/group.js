// backbone model for a list of usernames in a group

Marginalio.Group = Backbone.Model.extend({
  // url: '/annotations', // TODO: fix endpoints
  defaults: {
    username: 'testName'
  }
});
