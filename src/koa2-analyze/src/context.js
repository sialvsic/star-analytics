module.exports = {
  get url() {
    return this.request.url;
  },

  get body() {
    return this.response.body;
  },

  set body(value) {
    this.response.body = value;
  },
};
