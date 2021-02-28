Feature: Login

    @Regression
    Scenario: 1.0 Login as a test user
        Given I delete all cookies
        And   I am on the login page
        Then  I fill in the login page login form email field with "kai@kai.com"
        And   I fill in the login page login form password field with "x"
        Then  I click on the login page login form button login
        And   I see the home page greeting text "Hello, kai"
    @Regression
    Scenario: 1.1 Login as a test user with false password
        Given I delete all cookies
        And   I am on the login page
        Then  I fill in the login page login form email field with "kai@kai.com"
        And   I fill in the login page login form password field with "fffff"
        Then  I click on the login page login form button login
        And   I see the login page wrong password alert message "Incorrect email or password"