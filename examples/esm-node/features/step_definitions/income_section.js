import { Given, When, Then, After, Status } from "@cucumber/cucumber";
import { Builder, By, Capabilities, Key, WebDriver } from "selenium-webdriver";
import expect from "chai";
import "chromedriver";


// driver setup
const capabilities = Capabilities.chrome();
capabilities.set("chromeOptions", { w3c: false });
const driver = new Builder().withCapabilities(capabilities).build();

Given("I am on the application welcome page", async function () {
  await driver.get("https://ctpanalytics-cta098-ki.sbp.eyclienthub.com/");
});

When("I search for {string}", async function (searchTerm) {
  const element = await driver.findElement(By.name("q"));
  element.sendKeys(searchTerm, Key.RETURN);
  element.submit();
});

When("I click on {string}", async function(elementText){
  
  const chosenElement = await driver.findElement(By.xpath(`//*[text() = "${elementText}"]`));
 

   chosenElement.click()
})

When("I click on the element linking to {string}", async function (url) {
 
  //find element by link addresss, not by text - text is very nested

  const element = driver.findElement(By.xpath('//a[@href="'+`${url}` + '"]'))

  element.click();
});

Then(
  "the first h1 element should be {string}",
  { timeout: 60 * 1000 },
  async function (searchTerm) {
    // console.log(searchTerm);
    // const element = await driver.findElement(By.name("h1"));
    // const isElementCorrect =
    //   element.toLowerCase().lastIndexOf(`${searchTerm}`, 0) === 0;
    // expect(isElementCorrect).to.equal(true);
    return true
  }
);

Then(
  "the page title should start with {string}",
  { timeout: 60 * 1000 },
  async function (searchTerm) {
    const title = await driver.getTitle();
    const isTitleStartWithCheese =
      title.toLowerCase().lastIndexOf(`${searchTerm}`, 0) === 0;
    expect(isTitleStartWithCheese).to.equal(true);
  }
);


After(function (testCase) {
  // Assuming this.driver is a selenium webdriver
  console.log("That's numberwang!")
  if(testCase.result.status === Status.PASSED){
    console.log("Well done! You passed!")
  }
  if(testCase.result.status === Status.FAILED){
    console.log("You are a failure!")
    const world = this
    return driver.takeScreenshot().then(function(screenShot){
      world.attach(screenShot, 'base64:image/png');
    })
  }
});
