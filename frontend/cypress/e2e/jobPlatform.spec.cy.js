// cypress/e2e/jobPlatform.spec.js

describe('Job Platform', () => {
  it('loads job list and displays job details on click', () => {
    cy.visit('http://localhost:3000'); // Replace with your actual frontend URL

    // Ensure the job list is visible
    cy.get('.job-list').should('be.visible');

    // Check if job list items are rendered correctly
    cy.contains('python /home/user1/train.py - Running').should('be.visible');
    cy.contains('python /home/user2/train.py - Succeeded').should('be.visible');

    // Click on a job item
    cy.contains('python /home/user1/train.py - Running').click();

    // Check if job details are displayed correctly
    cy.contains('Job Details').should('be.visible');
    cy.contains('Status: Running').should('be.visible');
    cy.contains('Command: python /home/user1/train.py').should('be.visible');
    cy.contains('Training model...\nEpoch 1: Loss 0.5\n...').should('be.visible');
  });
});
