var Interception = { // jshint unused:false

  VERSION: '<%= version %>',

  rootSelector: 'body',

  defaults: {
    links: true,
    forms: true
  },

  start: function (options) {
    options = options || {};

    if (options.links || this.defaults.links) {
      this._getRootElement().addEventListener('click', this._interceptLinks.bind(this), true);
    }
    if (options.forms || this.defaults.forms) {
      this._getRootElement().addEventListener('submit', this._interceptForms.bind(this));
    }
  },

  stop: function () {
    this._getRootElement().removeEventListener('click', this._interceptLinks, true);
    this._getRootElement().removeEventListener('submit', this._interceptForms);
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

  linkRegexp: /^#|javascript:|mailto:|(?:\w+:)?\/\//,

  _interceptLinks: function (e) {
    // Only intercept left-clicks
    if (e.which !== 1) {
      return;
    }

    var target = e.target;
    var link;

    while (target !== e.currentTarget) {
      if (target instanceof HTMLAnchorElement || target instanceof HTMLButtonElement) {
        link = target;
        break;
      }
      target = target.parentElement;
    }

    // if no anchor or button element found or if no href present stop processing
    if (!link || !link.href) {
      return;
    }

    // Determine if we're supposed to bypass the link
    // based on its attributes
    var bypass = this._getAttribute(link, 'bypass');
    if (bypass !== undefined && bypass !== 'false') {
      return;
    }

    // Return if the URL is absolute, or if the protocol is mailto or javascript
    if (this.linkRegexp.test(link.href)) { return; }

    // If we haven't been stopped yet, then we prevent the default action
    e.preventDefault();

    // Lastly we send off the information to the navigate function if it exists
    if (this.navigate && typeof this.navigate === 'function') {
      this.navigate(link.href, link);
    }
  },

  _getAttribute: function (el, name) {
    var attribute = el.getAttribute(name);
    if ((attribute !== undefined) && (attribute !== null)) {
      return attribute;
    }

    if (el.dataset && undefined !== el.dataset[name]) {
      return el.dataset[name];
    }

    return;
  }
};
