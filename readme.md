node version 12++

npm install

# Mac run:
## Run ChromeDriver service
    PASSWORD={EMAIL_PASSWORD} npx wdio run ./wdio.conf.js 
## Run Selenium standalone service
    SERVICE=standalone PASSWORD={EMAIL_PASSWORD} npx wdio run ./wdio.conf.js 
## Run ChromeDriver service + Profile 2
    CHROME_PROFILE=true PASSWORD={EMAIL_PASSWORD} npx wdio run ./wdio.conf.js 


# Windows run:
SET PASSWORD={EMAIL_PASSWORD} & npx wdio run ./wdio.conf.js
## Run ChromeDriver service
    SET PASSWORD={EMAIL_PASSWORD} & npx wdio run ./wdio.conf.js 
## Run Selenium standalone service
    SET SERVICE=standalone & SET PASSWORD={EMAIL_PASSWORD} & npx wdio run ./wdio.conf.js 
## Run ChromeDriver service + Profile 2
    SET CHROME_PROFILE=true & SET PASSWORD={EMAIL_PASSWORD} & npx wdio run ./wdio.conf.js 


Tester can change the browser type in the config file wdio.conf.js at capabilities section "browserName" for standalone service only. 
Firefox can be configured too, but npm firefox profile package needs to be installed first and configs to be modified.

2 Tests are added.
First test suite runs gmailSignIn which logs into a defined gmail account, then opens a spreadsheet and loads Awesome Table Connector Add-on
Second test suite runs generating new pin codes for google's two factor authenticaiton.

When 9 pin codes are used, the test suite automatically runs the pin code updater to generate new pin codes. 
