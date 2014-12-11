requirejs.config({
    baseUrl: 'scripts',
    paths: {
        "some": "some/v1.0"
    },
    shim: {
        'rangy-core': {
            //deps: ["domReady"],
            exports: "rangy-core",
            init: function() { return this.rangy; }
            //init: function (domReady) {
            //    var rangi = this.rangy;
            //    domReady(function () {
            //        rangi.init();
            //    });
            //    return this.rangy;
            //}
        }
    }
  });