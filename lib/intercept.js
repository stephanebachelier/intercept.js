var Intercept = { // jshint unused:false

  VERSION: '<%= version %>',

  rootElement: 'body',

  defaults: {
    trigger: true,
    links: true,
    forms: true
  },

  start: function (options) {
    options = _.defaults(options || {}, this.defaults);

    if (options.links) {
      this._getRootElement().on('click.backboneIntercept', 'a', _.bind(this._interceptLinks, this));
    }
    if (options.forms) {
      this._getRootElement().on('submit.backboneIntercept', _.bind(this._interceptForms, this));
    }
  },

  stop: function () {
    this._getRootElement().off('.backboneIntercept');
  },

  _getRootElement: function () {
    if (this._body) {
      return this._body;
    }
    this._body = document.querySelector(this.rootSelector);
    return this._body;
  },

  // Prevent the default behavior of submitting the
  // form if the action attribute is present and is
  // a value
  _interceptForms: function (e) {
    if (e.target && e.target.action) {
      return;
    }
    e.preventDefault();
  },

  _interceptLinks: function (e) {
    // Only intercept left-clicks
    if (e.which !== 1) {
      return;
    }

    var link = e.currentTarget;

    // Get the href; stop processing if there isn't one
    var href = link.attribute('href');
    if (!href) {
      return;
    }

    // Determine if we're supposed to bypass the link
    // based on its attributes
    var bypass = this._getAttribute(link, 'bypass');
    if (bypass !== undefined && bypass !== 'false') {
      return;
    }

    // Return if the URL is absolute, or if the protocol is mailto or javascript
    if (/^#|javascript:|mailto:|(?:\w+:)?\/\//.test(href)) { return; }

    // If we haven't been stopped yet, then we prevent the default action
    e.preventDefault();

    // Lastly we send off the information to the router
    if (!this.navigate) {
      return;
    }

    if (_.isFunction(this.navigate)) {
      this.navigate(href, link);
    }
  },

  _getAttribute: function (el, name) {
    var attribute = el.attribute(name);
    if (attribute !== undefined) {
      return attribute;
    }

    if (el.dataset && undefined !== el.dataset[name]) {
      return el.dataset[name];
    }
  }
};
