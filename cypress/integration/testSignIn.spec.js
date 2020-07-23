('Test login', () => {
    it ('is working', () => {
        //管理员登录
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('.MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("thunderboy");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("1");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:3000/home');
        });

        //普通用户登录
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('.MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("鲁迅");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("111111");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:3000/home');
        });
    });
});

describe ('Test register', () => {
    it ('is working', () => {
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('#sign-menu > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("大蒜马甲6");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("111111");
        cy.get(':nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("大蒜马甲6");
        cy.get('#mui-component-select-sex').click();
        cy.get('#menu-sex > .MuiPaper-root > .MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(5) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("test@163.com");
        cy.get(':nth-child(6) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("广东");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:3000/home');
        });
    });
});
