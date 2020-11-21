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
import pages.LoginPage;

public class Login extends CucumberRunner{
	private LoginPage loginPage;

public Login(){
	loginPage = new LoginPage(this.driver);
}

	@Given("^I am on the login page$")
	public void I_am_on_the_login_page() throws Throwable{
		String title = loginPage.getPageTitle();
		String	baseUrl = config.getProperty("siteUrl");
		System.out.println(driver.getCurrentUrl());
		driver.navigate().to(baseUrl + "login" );
		Assert.assertEquals(title, baseUrl);
	}

	@Then("^I fill in the login page login form email field with \"([^\"]*)\"$")
	public void i_fill_in_the_home_page_login_form_email_field_with(String email) throws Throwable {
		loginPage.loginPageLoginFormFieldEmail.sendKeys(email);;
	}

	@Then("^I fill in the login page login form password field with \"([^\"]*)\"$")
	public void i_fill_in_the_home_page_login_form_password_field_with(String password) throws Throwable {
		loginPage.loginPageLoginFormFieldPassword.sendKeys(password);;
	}
	@Given("^I click on the login page login form button login$")
	public void I_click_on_the_home_page_login_form_button_login() throws Throwable{
		loginPage.loginPageLoginFormFieldButtonLogin.click();
	}

	@Then("^I see the login page title \"([^\"]*)\"$")
	public void i_see_the_title(String title) throws Throwable {
		String pageTitle = loginPage.getPageTitle();
		Assert.assertEquals(pageTitle, title);
	}

}

