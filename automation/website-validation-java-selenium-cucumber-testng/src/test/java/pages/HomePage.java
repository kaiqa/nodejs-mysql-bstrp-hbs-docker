package pages;

import main.CucumberRunner;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class HomePage extends CucumberRunner {

    WebDriver driver;
    @FindBy(className="btn btn-primary btn-lg")
    public WebElement homePageButtonLogin;

    @FindBy(xpath="//html/body/div[6]/section/section[2]/div[2]/p/button")
    public WebElement  homePageLoginFormSignUpLink;

    @FindBy(xpath="//html/body/div[6]/section/section[3]/div/section[2]/p/button")
    public WebElement  homePageLoginFormSButtonCreateAccount;

    @FindBy(className="display-4")
    public WebElement homePageGreetingText;


    public HomePage(WebDriver driver){
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    //Get the title from Home Page
    public String getHomePageTitle(){
    return  driver.getTitle().toString();
    }

}