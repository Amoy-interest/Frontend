describe ('Test add post', () => {
    it ('is working', () => {
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('.MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("鲁迅");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("1");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:3000/home');
            expect (true).to.equal (true);
        });
        cy.get('[title="发现"]').click();
        cy.get('.MuiFormControl-root > .MuiInputBase-root').type("测试发博文功能");
        cy.get('.MuiGrid-grid-sm-4 > .MuiButtonBase-root').click();
    });
});

describe ('Test add comment', () => {
    it ('is working', () => {
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('#sign-menu > .MuiPaper-root > .MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("鲁迅");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("1");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:3000/home');
            expect (true).to.equal (true);
        });
        cy.get(':nth-child(1) > :nth-child(1) > .MuiPaper-root > .MuiCardActions-root > .PostCard-expand-65').click();
        cy.get('[rows="1"]').type("测试评论");
        cy.get('.MuiButton-label').click();
    });
});
