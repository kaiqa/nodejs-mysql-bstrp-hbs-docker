Feature: Login

  @Regression
  Scenario: 1.0 Login as a test  user
    Given I delete all cookies
    And   I am on the login page
    Then  I fill in the login page login form email field with "kai@kai.com"
    And   I fill in the login page login form password field with "x"
    Then  I click on the login page login form button login