import seleniumWebdriver from "selenium-webdriver";

function CustomWorld() {
  this.driver = new seleniumWebdriver.Builder().forBrowser("firefox").build();
}

module.exports = function () {
  this.World = CustomWorld;

  // sets a default timeout to 30 seconds.  Time is in ms.
  this.setDefaultTimeout(30 * 1000);
};
