Feature: Register

  @Regression
  Scenario: 1.0 Register as new user
    Given I delete all cookies
    And   I am on the register page
    And   I fill in the register page register form name field
    And   I fill in the register page register form email field
    And   I fill in the register page register form password field with "x"
    And   I fill in the register page register form password repeat field with "x"
    Then  I click on the register page register form button sign up

