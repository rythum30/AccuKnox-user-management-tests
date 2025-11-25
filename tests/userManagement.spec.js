import { test, expect } from '@playwright/test';

test.describe("OrangeHRM User Management E2E", () => {

  const username = "Admin";
  const password = "admin123";
  

  const newUser = {
    employeeName: "Ranga Akunuri",
    employeeName2: "Peter Mac Anderson",
    username: "autoUser" + Math.floor(Math.random() * 10000),
    password: "TestPass@123"
  };

  const updatedUser = {
    employeeName: "Paul Collings",
    username: "updatedUser" + Math.floor(Math.random() * 10000),
  };

  test("Add > Search > Edit > Validate > Delete User", async ({ page }) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/dashboard/);

    await page.click("text=Admin");
    await expect(page).toHaveURL(/admin/);

    await page.click("//button[contains(.,'Add')]");

    await page.locator("//div[@class='oxd-select-wrapper']").nth(0).click();
      
    await page.getByRole('option', { name : 'ESS'}).click();

    await page.fill('input[placeholder="Type for hints..."]', newUser.employeeName);
    await page.click(`text=${newUser.employeeName}`);

    await page.locator("//div[@class='oxd-select-wrapper']").nth(1).click();
    await page.getByRole('option', { name : 'Enabled'}).click();

    var id;
    await page.locator("//input[@class='oxd-input oxd-input--active']").nth(1).fill(id = newUser.username);
    await page.waitForTimeout(2000);
    await page.locator("//input[@class='oxd-input oxd-input--active']").nth(1).fill(newUser.password);
    await page.locator("//input[@class='oxd-input oxd-input--active']").nth(2).fill(newUser.password);

    await page.getByText("Save").click();

    await expect(page.getByRole('row', { name: id})).toContainText(id, {timeout: 10000});

    await page.locator("//input[@class='oxd-input oxd-input--active']").nth(1).fill(id);
    await page.getByText('Search').click();

    await expect(page.getByRole('row', { name: id})).toContainText(id);

    await page.locator("//i[@class='oxd-icon bi-pencil-fill']").click({timeout: 2000}); 
    
    await page.locator("//div[@class='oxd-select-wrapper']").nth(0).click();
      
    await page.getByRole('option', { name : 'Admin'}).click();

    await page.getByPlaceholder("Type for hints...").clear();
    await page.getByPlaceholder("Type for hints...").fill(newUser.employeeName2);
    await page.click(`text=${newUser.employeeName2}`);

    await page.locator("//div[@class='oxd-select-wrapper']").nth(1).click();
    await page.getByRole('option', { name : 'Disabled'}).click();

    await page.click('button:has-text("Save")');

    await expect(page.getByRole('row', { name: "Peter Anderson"}).nth(0)).toContainText("Peter Anderson", {timeout: 10000});
    
    await page.getByRole('row', {name: id}).locator("//i[@class='oxd-icon bi-trash']").click();
    await page.click('button:has-text("Yes, Delete")');

    await expect(page.locator(".oxd-toast-content")).toContainText("Successfully Deleted");

    await page.locator("//input[@class='oxd-input oxd-input--active']").nth(1).fill(id);
    await page.getByText('Search').click();

    await expect(page.getByRole('row', { name: id})).toHaveCount(0, {timeout: 10000});
  });
});
