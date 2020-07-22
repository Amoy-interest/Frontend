/*describe ('Test login', () => {
    it ('is working', () => {
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('.MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("thunderboy");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("1");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:3000/home');
            expect (true).to.equal (true);
        });
    });
});

describe ('Test register', () => {
    it ('is working', () => {
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('#sign-menu > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("大蒜马甲3");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("1");
        cy.get(':nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("大蒜马甲");
        cy.get('#mui-component-select-sex').click();
        cy.get('#menu-sex > .MuiPaper-root > .MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(5) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("test@163.com");
        cy.get(':nth-child(6) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("广东");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.location().should((location) => {
            expect(location.href).to.eq('http://localhost:3000/home');

        });
    });
    expect (true).to.equal (true);
});

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

describe ('Test add sensWord', () => {
    it ('is working', () => {
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('.MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("thunderboy");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("1");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.get('[title="管理"] > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get(':nth-child(4) > .MuiTab-wrapper').click();
        cy.get(':nth-child(1) > .MuiButton-label').click();
        cy.get('#name').type("出售炸药test2");
        cy.get('.MuiDialogActions-root > :nth-child(2) > .MuiButton-label').click();

        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('.MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("thunderboy");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("1");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.get('[title="管理"] > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get(':nth-child(4) > .MuiTab-wrapper').click();
        cy.contains("出售炸药test2");
    });
});*/




