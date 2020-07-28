
describe ('Test search sensWord', () => {
    it ('is working', () => {
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('#sign-menu > .MuiPaper-root > .MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("thunderboy");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("111111");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.get('[title="管理"] > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get(':nth-child(4) > .MuiTab-wrapper').click();
        cy.get('.makeStyles-search-51 > .MuiInputBase-root > .MuiInputBase-input').type("test");
        cy.get('.makeStyles-searchIcon-52 > .MuiSvgIcon-root').click();
        cy.get('.MuiTableBody-root').find('tr').should('have.length', 4);
        cy.get('.MuiTableBody-root').find('tr').each(
            ($el, index, $list) => {
                expect($el).to.contain('test');
            });
    });
});



describe ('Test search users', () => {
    it ('is working', () => {
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('#sign-menu > .MuiPaper-root > .MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("thunderboy");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("111111");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.get('[title="管理"] > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get('.makeStyles-search-51 > .MuiInputBase-root > .MuiInputBase-input').type("大蒜");
        cy.get('.makeStyles-searchIcon-52 > .MuiSvgIcon-root').click();
        cy.get('.MuiTableBody-root').find('tr').should('have.length', 5);
        cy.get('.MuiTableBody-root').find('tr').each(
            ($el, index, $list) => {
                expect($el).to.contain('大蒜');
            });
    });
});


describe ('Test search blogs', () => {
    it ('is working', () => {
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('#sign-menu > .MuiPaper-root > .MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("thunderboy");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("111111");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.get('[title="管理"] > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get(':nth-child(2) > .MuiTab-wrapper').click();
        cy.get('.makeStyles-search-51 > .MuiInputBase-root > .MuiInputBase-input').type("寄");
        cy.get('.makeStyles-searchIcon-52 > .MuiSvgIcon-root').click();
        cy.get('.MuiTableBody-root').find('tr').should('have.length', 16);
        cy.get('.MuiTableBody-root').find('tr').each(
            ($el, index, $list) => {
                if (!(index & 1)) {
                    expect($el).to.contain('寄');
                }
            });
    });
});


describe ('Test search topics', () => {
    it ('is working', () => {
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('#sign-menu > .MuiPaper-root > .MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("thunderboy");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("111111");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.get('[title="管理"] > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get(':nth-child(3) > .MuiTab-wrapper').click();
        cy.get('.makeStyles-search-51 > .MuiInputBase-root > .MuiInputBase-input').type("不");
        cy.get('.makeStyles-searchIcon-52 > .MuiSvgIcon-root').click();
        cy.get('.MuiTableBody-root').find('tr').should('have.length', 2);
        cy.get('.MuiTableBody-root').find('tr').each(
            ($el, index, $list) => {
                expect($el).to.contain('不');
            });
    });
});

