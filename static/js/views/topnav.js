define([
  'jQuery',
  'Underscore',
  'Backbone',
  'text!templates/topnav.html'
], function($, _, BackBone, topNavTemplate) {

  var TopNavView = BackBone.View.extend({
    events: {
      'click #nav-list > li > a'      : 'changeActive',
      'click #secondary-nav > li > a' : 'changeActive'
    },

    installCheck: function(data) {
      if (data) {
          // alert("Thank you for installing our app!");
      } else {
          navigator.mozApps.install(
            "/manifest.webapp",
            {},
            this.installCallback,
            this.errorCallback
          );
      }
    },

    installCallback: function(result) {
        // alert("<3");
    },

    errorCallback: function(result) {
        // alert("WHY U NO INSTALL?!" + result.code + " " + result.message);
    },

    initialize: function() {
      _.bindAll(this, 'render', 'changeActive', 'setActiveElement');
      this.template = _.template(topNavTemplate);
      navigator.mozApps.amInstalled(this.installCheck);
    },

    changeActive: function(evt) {
      if (evt.target.id === 'twitter-link') {
        return;
      }

      this.setActiveElement(evt.target.id);
    },

    setActiveElement: function(elementName) {
      var elt = this.$('#' + elementName);
      this.$('#nav-list > .active').removeClass('active');
      this.$('#secondary-nav > .active').removeClass('active');
      elt.parent().addClass('active');  // Add 'active' to <li>, not <a>

      var newLanguage = elt.attr('data-lang');
      if (newLanguage) {
        this.trigger('changeLanguage', newLanguage);
      }
    },

    render: function() {
      $(this.el).html(this.template({ settings: this.options.settings }));
      return this;
    },
  });

  return TopNavView;
});
