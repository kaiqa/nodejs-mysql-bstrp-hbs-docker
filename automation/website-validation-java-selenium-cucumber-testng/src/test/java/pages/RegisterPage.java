package pages;

import main.CucumberRunner;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import static org.openqa.selenium.remote.http.HttpClient.USER_AGENT;


public class RegisterPage extends CucumberRunner {

    @FindBy(id="name")
    public WebElement registerPageLoginFormFieldRegisterName;

    @FindBy(id="password")
    public WebElement registerPageLoginFormFieldRegisterPassword;

    @FindBy(id="passwordConfirm")
    public WebElement  registerPageLoginFormFieldRegisterPasswordRepeat;

    @FindBy(id="email")
    public WebElement registerPageLoginFormFieldRegisterEmail;

    @FindBy(xpath = "//div[2]/form/button")
    public WebElement registerPageRegisterFormButtonSignUp;

    public RegisterPage(WebDriver driver){
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    public String advancedSearchUrl()
    {
         String url = driver.getCurrentUrl();
         return url + "/search/advanced";
    }

    public String getUrl(String request) throws IOException
    {
        URL obj = new URL(request);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("User-Agent", USER_AGENT);
        int responseCode = con.getResponseCode();
        System.out.println("Response Code: " + responseCode);
        String response = Integer.toString(responseCode);

        return response ;
    }

    public String getPageTitle(){
        return  driver.getTitle().toString();
    }

}
