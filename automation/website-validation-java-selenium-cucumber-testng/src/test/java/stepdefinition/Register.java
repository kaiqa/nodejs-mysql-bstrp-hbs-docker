package stepdefinition;

import com.github.javafaker.Faker;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import main.CucumberRunner;
import pages.RegisterPage;
import java.util.List;

public class Register extends CucumberRunner{
	private RegisterPage registerPage;

	public Register(){
		registerPage = new RegisterPage(this.driver);
		registerPage.advancedSearchUrl();
	}

	@Given("^I am on the register page$")
	public void I_am_on_the_register_page() throws Throwable{
		String title = registerPage.getPageTitle();
		String	baseUrl = config.getProperty("siteUrl");
		driver.navigate().to(baseUrl + "register");
		Assert.assertEquals(title, baseUrl);
	}

	@Then("^I fill in the register page register form name field")
	public void i_fill_in_the_register_page_register_form_name_field_with() throws Throwable {
		Faker faker = new Faker();
		String registerName = faker.name().lastName();
		registerPage.registerPageLoginFormFieldRegisterName.sendKeys(registerName);
	}

	@Then("^I fill in the register page register form email field")
	public void i_fill_in_the_register_page_register_form_email_field() throws Throwable {
		Faker faker = new Faker();
		String registerEmail = faker.internet().emailAddress();
		registerPage.registerPageLoginFormFieldRegisterEmail.sendKeys(registerEmail);
	}

	@Then("^I fill in the register page register form password field with \"([^\"]*)\"$")
	public void i_fill_in_the_register_page_register_form_password_field_with(String registerEmail) throws Throwable {
		registerPage.registerPageLoginFormFieldRegisterPassword.sendKeys(registerEmail);
	}

	@Then("^I fill in the register page register form password repeat field with \"([^\"]*)\"$")
	public void i_fill_in_the_register_page_register_form_password_repeat_field_with(String registerPasswordRepeat) throws Throwable {
		registerPage.registerPageLoginFormFieldRegisterPasswordRepeat.sendKeys(registerPasswordRepeat);
	}

	@Then("^I click on the register page register form button sign up$")
	public void i_click_on_the_register_page_register_form_button_sign_up() throws Throwable {
		registerPage.registerPageRegisterFormButtonSignUp.click();
	}
}
