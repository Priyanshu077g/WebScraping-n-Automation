let minimist = require("minimist");
let puppeteer = require("puppeteer");
// const pt = require('puppeteer');
let fs = require("fs");

let args = minimist(process.argv);

let configJSON = fs.readFileSync(args.config,"utf-8");
let configJS0 = JSON.parse(configJSON);
async function run(){
    // start/launch the browser
    let browser = await puppeteer.launch({
        headless : false,
        args : [
            '--start-maximized'
        ],
        defaultViewport : null,
    });
    // get the tables
    let pages = await browser.pages();
    let page = pages[0];
    //open the url

    await page.goto(args.url);
    
    //click on 1st login
    await page.waitForSelector("a[data-event-action='Login']");
    await page.click("a[data-event-action='Login']");

    //click on second login
    await page.waitForSelector("a[href='https://www.hackerrank.com/login']");
    await page.click("a[href='https://www.hackerrank.com/login']");

    //filling details
    await page.waitForSelector("input[placeholder='Your username or email']");
    await page.type("input[placeholder='Your username or email']",configJS0.userid,{delay : 20});
    await page.waitForTimeout(3000);

    await page.waitForSelector("input[placeholder='Your password']");
    await page.type("input[placeholder='Your password']",configJS0.password,{delay : 50});
    await page.waitForTimeout(3000);

    //click on final login
    await page.waitForSelector("button[data-analytics='LoginPassword']");
    await page.click("button[data-analytics='LoginPassword']");

    //click on competete
    
    await page.waitForSelector("a[data-analytics='NavBarContests']");
    await page.click("a[data-analytics='NavBarContests']");

    // create contest
    await page.waitForSelector("a[href='/administration/contests/create']");
    await page.click("a[href='/administration/contests/create']");

    //create n number of contest
    await page.waitForSelector("input[data-analytics='CreateContestName']");
    await page.type("input[data-analytics='CreateContestName']",configJS0.contestname + "8",{delay : 20});
    await page.waitForTimeout(1100);

    await page.waitForSelector("input[data-analytics='CreateContestStartDate']");
    await page.type("input[data-analytics='CreateContestStartDate']",configJS0.starttime,{delay : 20});
    await page.waitForTimeout(1100);

    await page.waitForSelector("input[id='starttime']");
    await page.type("input[id='starttime']",configJS0.startat,{delay : 20});
    await page.waitForTimeout(1100);

    await page.waitForSelector("div.checkbox-container");
    await page.click("div.checkbox-container");
    await page.waitForTimeout(100);
    
    // s2id_organization_type
    await page.waitForSelector("div.select2-container.pull-left");
    await page.click("div.select2-container.pull-left");
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);

    await page.waitForSelector("input[data-analytics='CreateContestOrgName']");
    await page.type("input[data-analytics='CreateContestOrgName']",configJS0.organization,{delay : 1000});
    await page.waitForTimeout(1100);

    // data-analytics="CreateContestButton"
    await page.waitForSelector("button[data-analytics='CreateContestButton']");
    await page.click("button[data-analytics='CreateContestButton']");
    // select2-match
    // save-contest btn btn-green
    await page.waitForSelector("button.save-contest.btn.btn-green");
    await page.click("button.save-contest.btn.btn-green");
    

}
run();