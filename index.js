const home=require("./homepage.js")
const {Builder, By, until, Browser} = require('selenium-webdriver');


let driver;
(async function main() {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
      await driver.manage().window().maximize();
      await home.OpenHomePage(driver);
      await home.NavigatetoRevenueCalcuator(driver);
      await home.UpdateTextField(driver);
      await home.AdjustSlider(driver);    //   await home.navigateToRevenueCalculator(driver);
      await home.checkBox(driver);
      await home.validateReimbursement(driver);
    } finally {
      await driver.quit();
    }
  })();