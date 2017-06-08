# Bluemix NodeJs + Gulp App

Important: If you dont have nodejs and gulp installed in your system:
1. [Install Node.js][]
2. [Install Gulpjs][]

For test purpose the app needs karma(jasmine) and protractor:
3. [Install Karma][]
4. [Install Protractor][]

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/IBM-Bluemix/nodejs-helloworld)

## Run the app locally

+ cd into this project's root directory
+ Run `npm install` to install the app's dependencies
+ Run any of the following gulp tasks:
> + **gulp lint** : validate your html, sass and javascript code
> + **gulp server** : run your node app.js to launch the localhost 
> + **gulp build:css** : compile your sass files into a final css package
> + **gulp build:js** : compile your angular files into the final js packages
> + **gulp build:dev** : run the linters, build the packages and copy the static files (images, fonts...) into the final public folder
> + **gulp build:prod** : build the package without spend time in linters (use it just for final production deploys)
> + **gulp serve** : run a gulp sequence that build the packages, watch for changes and launch the localhost
> + **gulp test** : run karma tests
> + **gulp e2e** : run protactor end to end tests [In Progress] Pending to implement, by now you can launch manually opening the webdriver server -- webdriver-manager start -- and using command -- protractor protractor.conf.js --

+ Access the running app in a browser at <http://localhost:6006>

[Install Node.js]: https://nodejs.org/en/download/
[Install Gulpjs]: http://gulpjs.com/
[Install Karma]: https://karma-runner.github.io/1.0/index.html
[Install Protractor]: http://www.protractortest.org/#/