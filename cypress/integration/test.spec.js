/*
// 登录 done
// 注册 done
// 发博文 done
// 发评论 done
// 敏感词搜索 done
// 添加敏感词 done
// 编辑敏感词 done
// 用户搜索 done
// 禁言用户 done
// 封号用户 done
// 话题搜索 done
// 博文搜索 done
// 博文和话题都是通过或者删除（这些要测一下吗
// 还有一些操作用不用都测试一下？
('Test login', () => {
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
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("大蒜马甲4");
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
        cy.get('#name').type("出售炸药test3");
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

describe ('Test update sensWord', () => {
    it ('is working', () => {
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('#sign-menu > .MuiPaper-root > .MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("thunderboy");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("1");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.get('[title="管理"] > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get(':nth-child(4) > .MuiTab-wrapper').click();
        cy.get(':nth-child(2) > :nth-child(3) > [aria-label="ban"] > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get('#name').type("test11");
        cy.get('.MuiDialogActions-root > :nth-child(2) > .MuiButton-label').click();
    });
});

describe ('Test search users', () => {
    it ('is working', () => {
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('#sign-menu > .MuiPaper-root > .MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("thunderboy");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("1");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.get('[title="管理"] > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get('.makeStyles-search-51 > .MuiInputBase-root > .MuiInputBase-input').type("test");
        cy.get('.makeStyles-searchIcon-52 > .MuiSvgIcon-root').click();
    });
});

describe ('Test search blogs', () => {
    it ('is working', () => {
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('#sign-menu > .MuiPaper-root > .MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("thunderboy");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("1");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.get('[title="管理"] > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get(':nth-child(2) > .MuiTab-wrapper').click();
        cy.get('.makeStyles-search-51 > .MuiInputBase-root > .MuiInputBase-input').type("test");
        cy.get('.makeStyles-searchIcon-52 > .MuiSvgIcon-root').click();
    });
});

describe ('Test search topics', () => {
    it ('is working', () => {
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('#sign-menu > .MuiPaper-root > .MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("thunderboy");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("1");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.get('[title="管理"] > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get(':nth-child(3) > .MuiTab-wrapper').click();
        cy.get('.makeStyles-search-51 > .MuiInputBase-root > .MuiInputBase-input').type("test");
        cy.get('.makeStyles-searchIcon-52 > .MuiSvgIcon-root').click();
    });
});

describe ('Test search sensWord', () => {
    it ('is working', () => {
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('#sign-menu > .MuiPaper-root > .MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("thunderboy");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("1");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.get('[title="管理"] > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get(':nth-child(4) > .MuiTab-wrapper').click();
        cy.get('.makeStyles-search-51 > .MuiInputBase-root > .MuiInputBase-input').type("test");
        cy.get('.makeStyles-searchIcon-52 > .MuiSvgIcon-root').click();
    });
});

describe ('Test ban users', () => {
    it ('is working', () => {
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('#sign-menu > .MuiPaper-root > .MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("thunderboy");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("1");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.get('[title="管理"] > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get(':nth-child(1) > :nth-child(5) > [aria-label="ban"] > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get('form > :nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').type("1");
        cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').type("1");
        cy.get('form > :nth-child(3) > .MuiInputBase-root > .MuiInputBase-input').type("1");
        cy.get('.MuiDialogActions-root > :nth-child(2) > .MuiButton-label').click();
    });
});

describe ('Test forbid users', () => {
    it ('is working', () => {
        cy.visit('http://localhost:3000/');
        cy.get('.makeStyles-sectionDesktop-5 > .MuiButtonBase-root').click();
        cy.get('#sign-menu > .MuiPaper-root > .MuiList-root > [tabindex="-1"]').click();
        cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("thunderboy");
        cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').eq(0).type("1");
        cy.get('.MuiButton-contained > .MuiButton-label').click();
        cy.get('[title="管理"] > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get(':nth-child(1) > :nth-child(5) > [aria-label="micoff"] > .MuiIconButton-label > .MuiSvgIcon-root > path').click();
        cy.get('form > :nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').type("1");
        cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').type("1");
        cy.get('form > :nth-child(3) > .MuiInputBase-root > .MuiInputBase-input').type("1");
        cy.get('.MuiDialogActions-root > :nth-child(2) > .MuiButton-label').click();
    });
});*/



