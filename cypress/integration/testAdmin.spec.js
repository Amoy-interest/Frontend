describe ('Test add sensWord', () => {
    it ('is working', () => {
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('#sign-menu > .MuiPaper-root > .MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("thunderboy");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("111111");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.get('[title="管理"] > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get(':nth-child(4) > .MuiTab-wrapper').click();
        cy.get(':nth-child(1) > .MuiButton-label').click();
        cy.get('#name').type("出售炸药test6");
        cy.get('.MuiDialogActions-root > :nth-child(2) > .MuiButton-label').click();
        cy.contains("出售炸药test6");
    });
});

describe ('Test update sensWord', () => {
    it ('is working', () => {
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('#sign-menu > .MuiPaper-root > .MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("thunderboy");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("111111");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.get('[title="管理"] > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get(':nth-child(4) > .MuiTab-wrapper').click();
        cy.get(':nth-child(2) > :nth-child(3) > [aria-label="ban"] > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get('#name').clear().type("test11");
        cy.get('.MuiDialogActions-root > :nth-child(2) > .MuiButton-label').click();
        cy.contains("test11");
    });
});



describe ('Test ban users', () => {
    it ('is working', () => {
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('#sign-menu > .MuiPaper-root > .MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("thunderboy");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("111111");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.get('[title="管理"] > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get(':nth-child(1) > :nth-child(5) > [aria-label="ban"] > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get('form > :nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').type("1");
        cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').type("1");
        cy.get('form > :nth-child(3) > .MuiInputBase-root > .MuiInputBase-input').type("1");
        cy.get('.MuiDialogActions-root > :nth-child(2) > .MuiButton-label').click();
        //后面再确定要前端如何进行响应。
    });
});

describe ('Test forbid users', () => {
    it ('is working', () => {
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('#sign-menu > .MuiPaper-root > .MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("thunderboy");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("111111");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.get('[title="管理"] > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get(':nth-child(1) > :nth-child(5) > [aria-label="micoff"] > .MuiIconButton-label > .MuiSvgIcon-root > path').click();
        cy.get('form > :nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').type("1");
        cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').type("1");
        cy.get('form > :nth-child(3) > .MuiInputBase-root > .MuiInputBase-input').type("1");
        cy.get('.MuiDialogActions-root > :nth-child(2) > .MuiButton-label').click();
    });
});
