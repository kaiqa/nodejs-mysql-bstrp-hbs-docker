package stepdefinition;

import com.github.javafaker.Faker;
import cucumber.api.java.en.Then;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import cucumber.api.java.en.Given;
import main.CucumberRunner;
import pages.HomePage;

public class Home extends CucumberRunner{
	private HomePage homePage;

public Home(){
	homePage = new HomePage(this.driver);
}

	@Given("^I delete all cookies$")
	public void i_delete_all_cookies() throws Throwable {
		deleteAllCookies();
	}

	@Given("^I am on the home page$")
	public void I_am_on_the_home_page() throws Throwable{
		String title = homePage.getHomePageTitle();
		String	baseUrl = config.getProperty("siteUrl");
		System.out.println(driver.getCurrentUrl());
		driver.navigate().to(baseUrl + "login" );
		Assert.assertEquals(title, baseUrl);
	}

	@Given("^I click on the home page login button$")
	public void I_click_on_the_home_page_login_button() throws Throwable{
		homePage.homePageButtonLogin.click();
	}

	@Then("^I see the title \"([^\"]*)\"$")
	public void i_see_the_title(String title) throws Throwable {
		String pageTitle = homePage.getHomePageTitle();
		Assert.assertEquals(pageTitle, title);
	}

	@Then("^I see the home page greeting text \"([^\"]*)\"$")
	public void i_see_the_home_page_greeting_text(String arg1) throws Throwable {
		String greetingText = homePage.homePageGreetingText.getText();
		Assert.assertEquals(greetingText, arg1 );
	}

	@Then("^I navigate back$")
	public void i_navigate_back() throws Throwable {
		driver.navigate().back();
	}

}
