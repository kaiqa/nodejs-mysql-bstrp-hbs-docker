## Testng-Cucumber-
This is demo code bootstrap code with basic happy path test automation
## Features
* The test scenarious  should run successfully on **Chrome** as defined in the **config.properties** file.
* Support of different operation systems and browsers. The drivers are located at resources/drivers/.
* TestNG Annotations/hooks like "BeforeSuite", "AfterClass", "AfterMethod" etc.
* Upon test failure screenshots are created in the /screenshots directory.
* Reporting of test execution can be found at /target/cucumber-html-reports/overview-features.html
 ![report1](./images/report-pass-fail.png)

## Scenarios Login: 
 * 1.0 Login as a test user
 * 1.1 Login as a test user with false password
## Scenarios Register: 
 *  1.0 Register as new user
## To Get Started

#### Pre-requisites
1. Java installed in the system
2. Maven installed in the system

#### Run Scripts
* For single instance execution right click and run chrome.xml or firefox.xml
* or run chrome_firefox.xml
```
mvn clean test
mvn verify -Dcucumber.options="--tags @Regression"
```

#### Gherkin
```
And I fill in the home page login form email field with "m9u8zi+9o9k92e81kk6g@sharklasers.com"

```
 
#### Step definition
```
@Then("^I fill in the home page login form email field with \"([^\"]*)\"$")
	public void i_fill_in_the_home_page_login_form_email_field_with(String email) throws Throwable {
		homePage.homePageLoginFormFieldEmail.sendKeys(email);;
	}
```


#### Pages and locators
```
package pages;

import main.CucumberRunner;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class HomePage extends CucumberRunner {

@FindBy(id="email")
  public WebElement homePageLoginFormFieldEmail;


  public HomePage(WebDriver driver){
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }
```