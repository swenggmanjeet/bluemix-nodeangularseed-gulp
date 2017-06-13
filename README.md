# Bluemix NodeJs + Gulp App

This is an Bluemix - NodeJs starter application that uses gulp to automate tasks to build and test the site and AngularJs to handle the calls to the different Watson apis. So we can deploy a basic application just modifying:
+ *app.js* >> that contains the node server, the credentials and the endpoints that handle the calls to the watson apis
+ */app folder* >> that contains the angular app to connect and show the data in the site through the different endpoints that we define on node server

Important: If you dont have nodejs and gulp in your system you must install it from the next links. Karma and Protractor are used for unit test purposes so it's recommend to install it also.

1. [Install Node.js][]
2. [Install Gulpjs][]
3. [Install Karma][]
4. [Install Protractor][]


[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/rubengmz/bluemix-nodeangularseed-gulp)

## Project Structure
+ ##### NodeJs Server --- file ./app.js
    + Contains the credentials and the url to create the endpoint that connect with Watson apis
    + Run the node server using Express

+ ##### Frontend application --- folder ./app
    + **data** > Static json files to define the content of the site 
    + **fonts** > Static font files to use in final css declarations
    + **images** > Stactic images
    + **js** > Javascript base folder, only use it if you need to check a specific method from the node server. You can use it later to define your karma tests 
    + **scripts** > Contains the angular scripts: app, controllers, components and factories
    + **scss** > Style declarations using SaSS technology (scss)
    + **templates** > Include the html views that have beed defined in the angular routing

+ ##### Karma tests --- folder ./test
    + Describe your iterations to check whatever you need from your /js files using Karma and name it using `*.spec.js`
    + Config file: **karma.conf.js**
    + Run all test with **gulp test**

+ ##### Protractor tests --- folder ./e2e
    + Describe your iterations to check all the possible flows in your site and name it using `*.spec.js`
    + Config file: **protractor.conf.js**
    + Run all test with **gulp e2e**

## Run the app locally

Go to into this project's root directory, open a command window console and then:
> + Run `npm install` to install the app's dependencies
> + Run `bower install` to install the vendor's dependencies
 
Once you have installed all the dependencies you can run any of the following gulp tasks:

##### Single Tasks

> + **`gulp lint`** : validate your html, sass and javascript code
> + **`gulp server`** : run your node app.js to launch the localhost 
> + **`gulp copy:static`** : copy your static files (images, fonts, json...) to the final public folder 
> + **`gulp build:css`** : compile your sass files into a final css package
> + **`gulp build:js`** : compile your angular files into the final js packages


##### Global tasks

> + **`gulp build:all`** : run the linters, build the CSS & Js packages and copy the static files (images, fonts...) into the final public folder
> + **`gulp dev`** : run a gulp sequence that build all the packages, watch for changes and launch the localhost
> + **`gulp prod`** : run a gulp sequence that build all the packages, watch for changes and launch the localhost
> + **`gulp test`** : run karma tests
> + **`gulp e2e`** : run protactor end to end tests

+ During development phase running the app in a browser at <http://localhost:6006>

[Install Node.js]: https://nodejs.org/en/download/
[Install Gulpjs]: http://gulpjs.com/
[Install Karma]: https://karma-runner.github.io/1.0/index.html
[Install Protractor]: http://www.protractortest.org/#/


## Bluemix Delivery Pipeline
> Build Stage
> Deploy Stage
