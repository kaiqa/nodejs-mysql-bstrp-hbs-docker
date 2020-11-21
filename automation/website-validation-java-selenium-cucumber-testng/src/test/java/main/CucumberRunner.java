package main;

import java.io.Console;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Properties;
import java.util.concurrent.TimeUnit;
import com.google.common.io.Files;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.ITestResult;
import org.testng.annotations.*;


import cucumber.api.CucumberOptions;
import cucumber.api.testng.AbstractTestNGCucumberTests;
import helpers.ReportHelper;

@CucumberOptions(
		strict = true,
		monochrome = true,
		features = "src/test/resources/features",
		glue = "stepdefinition",
		format = {"pretty","json:target/cucumber.json"},
		tags = { "@Regression,@JunitScenario,@TestngScenario" }
		)

@Parameters("browser")
public class CucumberRunner extends AbstractTestNGCucumberTests {

	@DataProvider(parallel = true)
	public Object[][] scenarios() throws Exception {
		return super.features();
	}


	public static Properties config = null;
	public static WebDriver driver = null;

	public void LoadConfigProperty() throws IOException {
		config = new Properties();
		FileInputStream ip = new FileInputStream(
				System.getProperty("user.dir") + "//src//test//resources//config//config.properties");
		config.load(ip);
	}

	public void configureDriverPath() throws IOException {
		if(System.getProperty("os.name").startsWith("Linux")) {
			String firefoxDriverPath = System.getProperty("user.dir") + "/src/test/resources/drivers/linux/geckodriver";
			System.setProperty("webdriver.gecko.driver", firefoxDriverPath);
			String chromeDriverPath = System.getProperty("user.dir") + "/src/test/resources/drivers/linux/chromedriver";
			System.setProperty("webdriver.chrome.driver", chromeDriverPath);
		}
		if(System.getProperty("os.name").startsWith("Mac")) {
			String firefoxDriverPath = System.getProperty("user.dir") + "/src/test/resources/drivers/mac/geckodriver";
			System.setProperty("webdriver.gecko.driver", firefoxDriverPath);
			String chromeDriverPath = System.getProperty("user.dir") + "/src/test/resources/drivers/mac/chromedriver";
			System.setProperty("webdriver.chrome.driver", chromeDriverPath);
		}
		if(System.getProperty("os.name").startsWith("Windows")) {
			String firefoxDriverPath = System.getProperty("user.dir") + "//src//test//resources//drivers//windows//geckodriver.exe";
			System.setProperty("webdriver.gecko.driver", firefoxDriverPath);
			String chromeDriverPath = System.getProperty("user.dir") + "//src//test//resources//drivers//windows//chromedriver.exe";
			System.setProperty("webdriver.chrome.driver", chromeDriverPath);
		}
	}

	public void openBrowser(String environment) throws Exception {
		System.out.println("inside openbrowser passed as :- " + environment);
		// loads the config options
		LoadConfigProperty();
		// configures the driver path
		configureDriverPath();

		if (environment.equals("firefox")) {
			driver = new FirefoxDriver();
		} else if (environment.equals("chrome")) {
			ChromeOptions options = new ChromeOptions();
			// options.addArguments("--headless");
			options.addArguments("--disable-gpu");
			options.addArguments("--no-sandbox");
			options.addArguments("--disable-dev-shm-usage");
			options.setExperimentalOption("useAutomationExtension", false);
			driver = new ChromeDriver(options);
		}
//		if (config.getProperty("browserType").equals("firefox")) {
//			driver = new FirefoxDriver();
//		} else if (config.getProperty("browserType").equals("chrome")) {
//			ChromeOptions options = new ChromeOptions();
//			// options.addArguments("--headless");
//			options.addArguments("--disable-gpu");
//			options.addArguments("--no-sandbox");
//			options.addArguments("--disable-dev-shm-usage");
//			options.setExperimentalOption("useAutomationExtension", false);
//			driver = new ChromeDriver(options);
//		}
	}

	public void maximizeWindow() {
		driver.manage().window().maximize();
	}

	public void implicitWait(int time) {
		driver.manage().timeouts().implicitlyWait(time, TimeUnit.SECONDS);
	}

	public void explicitWait(WebElement element) {
		WebDriverWait wait = new WebDriverWait(driver, 3000);
		wait.until(ExpectedConditions.visibilityOf(element));
	}

	public void pageLoad(int time) {
		driver.manage().timeouts().pageLoadTimeout(time, TimeUnit.SECONDS);
	}

	public void deleteAllCookies() {
		driver.manage().deleteAllCookies();
	}

	public void setEnv() throws Exception {
		LoadConfigProperty();
		String baseUrl = config.getProperty("siteUrl");
		driver.get(baseUrl);
	}

	public static String currentDateTime() {
		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Calendar cal = Calendar.getInstance();
		String cal1 = dateFormat.format(cal.getTime());
		return cal1;
	}

	// @BeforeSuite(alwaysRun = true)
	@BeforeMethod(alwaysRun = true)
	@org.testng.annotations.Parameters(value = { "environment" })
	@SuppressWarnings("unchecked")
	public void setUp( @Optional("chrome") String environment) throws Exception {
		System.out.println("passed as :- " + environment);
		openBrowser(environment);
		maximizeWindow();
		implicitWait(30);
		deleteAllCookies();
		setEnv();
	}

//	@AfterClass(alwaysRun = true)
//	public void takeScreenshot() throws IOException {
//		File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
//		File trgtFile = new File(System.getProperty("user.dir") + "//screenshots/screenshot.png");
//		trgtFile.getParentFile().mkdir();
//		trgtFile.createNewFile();
//		Files.copy(scrFile, trgtFile);
//
//	}

	@AfterMethod(alwaysRun = true)
	public void tearDown(ITestResult result) throws IOException {
		if (!result.isSuccess()) {
			File imageFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
			String failureImageFileName = result.getMethod().getMethodName()
					+ new SimpleDateFormat("MM-dd-yyyy_HH-ss").format(new GregorianCalendar().getTime()) + ".png";
			File failureImageFile = new File(System.getProperty("user.dir") + "//screenshots//" + failureImageFileName);
			failureImageFile.getParentFile().mkdir();
			failureImageFile.createNewFile();
			Files.copy(imageFile, failureImageFile);

			synchronized (driver)
			{driver.quit();}
			System.out.println("after method browser quit");
		}else {
			{driver.quit();}
			System.out.println("after method browser quit");
		}

	}
	@AfterSuite(alwaysRun=true)
	public void generateHTMLReports() {
		ReportHelper.generateCucumberReport();
	}

//	@AfterSuite(alwaysRun = true)
//	public void quit() throws IOException, InterruptedException {
//		synchronized (driver)
//		{driver.close();}
//		System.out.println("browser quit");
//	}
}
