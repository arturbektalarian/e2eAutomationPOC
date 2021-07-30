node version 12++

npm install

Mac run:
PASSWORD={EMAIL_PASSWORD} npx wdio run ./wdio.conf.js

Windows run:
SET PASSWORD={EMAIL_PASSWORD} & npx wdio run ./wdio.conf.js


Tester can change the browser type in the config file wdio.conf.js at capabilities section "browserName".


2 Tests are added.
First test suite runs gmailSignIn which logs into a defined gmail account, then opens a spreadsheet and loads Awesome Table Connector Add-on
Second test suite runs generating new pin codes for google's two factor authenticaiton.

When 9 pin codes are used, the test suite automatically runs the pin code updater to generate new pin codes. 
