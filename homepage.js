const {By} = require('selenium-webdriver');
// const { Actions } = require('selenium-webdriver/lib/actions');

async function OpenHomePage(driver) {
  await driver.get('https://www.fitpeo.com/');
  await driver.sleep(3000);
}


async function NavigatetoRevenueCalcuator(driver){
    let RevenueCalc=await driver.findElement(By.xpath('//div[text()="Revenue Calculator"]'));
    await  RevenueCalc.click();
    await driver.sleep(3000);

}

async function ScrollDown(driver) {
  let elementVisible=false;
  while(!elementVisible){
    try{
      let scrollBar=await driver.findElement(By.className("MuiBox-root css-1rbom6u"));
      elementVisible=await scrollBar.isDisplayed();
    }
    catch(error){
      await driver.executeScript('window.scrollBy(0, 1000);');
      await driver.sleep(500);
    }
  }
  await driver.sleep(3000);
  
}

async function Scroll(driver) {
  const iframe = await driver.findElement(By.xpath("//span[text()='Patients should be between 0 to 2000']"));
  await driver.actions()
    .scroll(0, 0, 0, 0, iframe)
    .perform()
  
  await driver.sleep(3000);

  let slider=await driver.findElement(By.xpath("//input[@type='range']"));
  // // let drop=await driver.findElement(By.css("tag[value='200']"));
  let actions = driver.actions({ async: true });
  await actions.dragAndDrop(slider, { x: 93, y: 0 }).perform(); // Adjust the x-offset to move the slider to the desired value
  await driver.sleep(3000)
}

module.exports={
OpenHomePage,
NavigatetoRevenueCalcuator,
Scroll
}