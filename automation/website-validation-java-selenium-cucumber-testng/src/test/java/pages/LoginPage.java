package pages;

import main.CucumberRunner;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class LoginPage extends CucumberRunner {

    WebDriver driver;
    @FindBy(className="btn btn-primary btn-lg")
    public WebElement loginPageButtonLogin;

    @FindBy(name = "gdprChoice")
    public WebElement loginPageButtonCookieAccept;

    @FindBy(id="email")
    public WebElement loginPageLoginFormFieldEmail;

    @FindBy(id="password")
    public WebElement loginPageLoginFormFieldPassword;

   // @FindBy(xpath="/html/body/div[6]/section/section[2]/div[1]/div/form/fieldset/ol/li[4]/input")
    @FindBy(xpath = "//div[1]/div/button")
    public WebElement loginPageLoginFormFieldButtonLogin;

    @FindBy(xpath="//html/body/div[6]/section/section[2]/div[2]/p/button")
    public WebElement  loginPageLoginFormSignUpLink;

    @FindBy(xpath="//html/body/div[6]/section/section[3]/div/section[2]/p/button")
    public WebElement  loginPageLoginFormSButtonCreateAccount;

    @FindBy(xpath="//form/h4")
    public WebElement loginPageAlertTextPasswordInvalid;


    public LoginPage(WebDriver driver){
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    //Get the title from the Login Page
    public String getPageTitle(){
    return  driver.getTitle().toString();
    }

    //Get the url from the Login Page
    public String getCurrentUrl(){
        return  driver.getCurrentUrl().toString();
    }

}
