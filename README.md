# OrangeHRM User Management – Playwright Automation

This project automates the full User Management E2E flow in **OrangeHRM** using **Playwright (JavaScript)**.

---

## SetUp

**Pre Requisites**
Node.js (v16 or above recommended)
Git installed

---

**Playwright Installation**
npm init -y
npm i @playwright/test
npx playwright install

---

## Application Under Test (AUT)
URL: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login  
**Credentials:**  
- Username: Admin  
- Password: admin123  

---

# Features Covered
 Login  
 Navigate to Admin → User Management  
 Add a new user  
 Search the created user  
 Edit user details  
 Validate updated user  
 Delete the user  


---

# Test Run Command

npx playwright test userManagement.spec.js --headed


