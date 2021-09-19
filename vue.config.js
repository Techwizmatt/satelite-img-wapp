module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "~bulma/sass/utilities/_all";
          @import "@/asset/variables.scss";
          @import "~bulma";
          @import "~buefy/src/scss/buefy";
        `
      }
    }
  }
}
