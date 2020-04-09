require("dotenv").config();
const puppeteer = require("puppeteer");

async function scraping() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
    });
    // Step 1 - Navigate
    await page.goto("https://github.com");
    const signIn = "body > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu.HeaderMenu--logged-out.position-fixed.top-0.right-0.bottom-0.height-fit.position-lg-relative.d-lg-flex.flex-justify-between.flex-items-center.flex-auto > div.d-lg-flex.flex-items-center.px-3.px-lg-0.text-center.text-lg-left > a.HeaderMenu-link.no-underline.mr-3";

    setTimeout(async () => {
        await page.click(signIn);
    }, 800);

    // Step 2 - Log in
    await page.waitForNavigation();

    // enter username
    await page.focus("#login_field");
    await page.keyboard.type(process.env.GIT_USERNAME);

    // enter password
    await page.focus("#password");
    await page.keyboard.type(process.env.GIT_PASSWORD);

    // Click Sign in
    await page.click("#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block");

    await page.waitForNavigation();
    // Final message
    console.log("Login successful!");
}

scraping();