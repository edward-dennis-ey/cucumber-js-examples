Feature: Income Section

    Scenario: Starting the Income Section
        Given I am on the application welcome page
        When I click on "Your Income"
        Then the first h1 element should be "Now, let's talk about your income"