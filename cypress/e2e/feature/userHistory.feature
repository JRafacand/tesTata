Feature: Test Tata

Scenario: Login and Buy 
    Given I am on the Demoblaze home page
    When I login with the following credentials
      | username      | password |
      | standard_user | secret_sauce|
    Then Choose below different products
      | product_name |
      | Samsung galaxy s6 |
      | Nokia lumia 1520 |
      | Nexus 6 |
      | Samsung galaxy s7 |
      | Iphone 6 32gb |
      | Sony xperia z5 |
    Then I click on the shopping cart and click on the checkout button
    Then I fill out the form with the following information
      | name_lastn  | country | city    | credit_Card         | month | year |
      | John Pinzon | Ecuador | Ecuador | 4321-7658-9876-1234 | 12    | 2023 |
    Then I click on the continue button and I should see Thank you for your order
    
    