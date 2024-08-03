const {By,Key} = require('selenium-webdriver');
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

async function checkBox(driver){
  const element = await driver.findElement(By.css(".MuiBox-root.css-1p19z09"));
  await driver.executeScript("arguments[0].scrollIntoView(true);", element);
  await driver.sleep(3000);

  const cptCodes = ['CPT-99091', 'CPT-99453', 'CPT-99454', 'CPT-99474'];
  for (const code of cptCodes) {
    const checkbox = await driver.findElement(By.xpath(`//p[text()='${code}']/following-sibling::label//input[@type='checkbox']`));
    await checkbox.click();
    await driver.sleep(500); 
  }

  await driver.sleep(3000);
}

async function validateReimbursement(driver) {
  const element = await driver.findElement(By.css(".MuiBox-root.css-1p19z09"));
  await driver.executeScript("arguments[0].scrollIntoView(true);", element);
  await driver.sleep(3000);

  const reimbursementElement = await driver.findElement(By.xpath("//p[contains(@class, 'MuiTypography-root MuiTypography-body2 inter css-1xroguk') and contains(text(), 'Total Recurring Reimbursement for all Patients Per Month:')]//following-sibling::p[contains(@class, 'MuiTypography-root MuiTypography-body1 inter css-hocx5c')]"));
  const reimbursementValue = await reimbursementElement.getText();

  const expectedValue = "$110295";
  if (reimbursementValue === expectedValue) {
    console.log(`Validation successful: ${reimbursementValue} matches ${expectedValue}`);
  } else {
    console.log(`Validation failed: ${reimbursementValue} does not match ${expectedValue}`);
  }

  await driver.sleep(3000);
}

async function AdjustSlider(driver) {
  const iframe = await driver.findElement(By.xpath("//span[text()='Patients should be between 0 to 2000']"));
  await driver.actions()
    .scroll(0,0, 0, 200, iframe)
    .perform()
  await driver.sleep(1000);

  let slider=await driver.findElement(By.xpath("//input[@type='range']"));

  let actions = driver.actions({ async: true });
  await actions.dragAndDrop(slider, { x: 93, y: 0 }).perform(); 

  await driver.actions()
    .scroll(0,0, 0, 200, iframe)
    .perform()
  await driver.sleep(1000)

  let textField= await driver.findElement(By.css('input.MuiInputBase-inputSizeSmall'));
  const textFieldValue = await textField.getAttribute('value');

  if (textFieldValue==817){
    console.log("Test Passed: Text field value is correctly set to 817")
  }else{
    console.log("Test Failed: Text field value is not correct")
  }
}

async function UpdateTextField(driver) {
  let textField= await driver.findElement(By.css('input.MuiInputBase-inputSizeSmall'));
  await textField.click();
  await textField.sendKeys(Key.chord(Key.CONTROL, "a"), Key.DELETE);
  await textField.sendKeys('560', Key.RETURN);
  await driver.sleep(1000);
  let slider=await driver.findElement(By.xpath("//input[@type='range']"));
  const sliderValue = await slider.getAttribute('value');
  if (sliderValue==560){
    console.log("Test Passed: Slider value is correctly set to 560")
  }else{
    console.log("Test Failed: Slider value is not correct")
  }
  await textField.sendKeys(Key.chord(Key.CONTROL, "a"), Key.DELETE);
  await textField.sendKeys('200', Key.RETURN);
}




module.exports={
OpenHomePage,
NavigatetoRevenueCalcuator,
UpdateTextField,
AdjustSlider,
checkBox,
validateReimbursement
}