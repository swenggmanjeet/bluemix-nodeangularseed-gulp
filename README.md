# Bluemix NodeJs-Angular seed

This project is a migration from the previous [AngularBluemixSeed][], using Gulp to automate tasks instead of Grunt and Sass technology to customize the style of your final website. 

Also it uses a Node Express server to connect with different apis so you are able to set the credentials for your apis in the server side and define the endpoints, that allows you to create a full angularJs web application that doesn't need to create a backend project running in the background.


>   + The Node Express server is located in a file called **app.js** in the root directory.
>   + The frontend app is located in the folder called **/app** 


__*Important:*__ If you dont have nodejs and gulp in your system you must install it from the next links. Karma and Protractor are used for unit test purposes so it's recommend to install it also.

1. [Install Node.js][]
2. [Install Bower][]
3. [Install Gulpjs][]
4. [Install Karma][]
5. [Install Protractor][]

If you want to reply this project in you bluemix environment just click on the next button:

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/rubengmz/bluemix-nodeangularseed-gulp)

----------------------------------

## Project Structure
+ ##### NodeJs Server --- file ./app.js
    + Contains the credentials and the url to create the endpoint that connect with Watson apis.
    + Run the node server using Express.

+ ##### Api Credentials --- file ./credentials.js
    + Define a module with the credentials for all the api services used in the application.

+ ##### Frontend application --- folder ./app
    + **/data**: Static json files to define the content of the site.
    + **/fonts**: Static font files to use in final css declarations.
    + **/images**: Stactic images.
    + **/js**: Javascript base folder, as it's an angular sap, only use it if you need to check a specific method from the node server. You can use it later to define your karma tests .
    + **/ng-app**: Contains the angular app: controllers, factories, components and the templates for the pages that have beed defined in the angular routing.
        
        + Each angular component contains: 
            + *.component.js --> Define the angular component module and his own controller
            + *.template.html 
            + *.style.scss --> *Remember to add it in the main component.all.scss of /scss folder

    + **/scss**: Style declarations using SaSS technology (scss).
    + **index.html**: Main html view where the angular app is injected.

+ ##### Karma tests --- folder ./test
    + Describe your iterations to check whatever you need from your /js files using Karma and name it using `*.spec.js`.
    + Config file: **karma.conf.js**.
    + Run all karma test with **gulp test**.

+ ##### Protractor tests --- folder ./e2e
    + Describe your iterations to check all the possible flows in your site and name it using `*.spec.js`.
    + Config file: **protractor.conf.js**.
    + Run all protractor test with **gulp e2e**.

----------------------------------

## Run the app locally

Go to into this project's root directory, open a command window console and then:
> + Run `npm install` to install the app's dependencies.
> + Run `bower install` to install the vendor's dependencies.
 
Once you have installed all the dependencies you can run any of the following gulp tasks:

##### Single Tasks

> + **`gulp lint`** : validate your html (*HtmlHint*), sass (*Sass Lint*)  and javascript code (*EsLint*).
> + **`gulp server`** : run your node app.js to launch the localhost.
> + **`gulp copy:static`** : copy your static files (images, fonts, json...) to the final public folder.
> + **`gulp build:css`** : compile your sass files into a final css package.
> + **`gulp build:js`** : compile your angular files into the final js package.


##### Global tasks

> + **`gulp build:all`** : run the linters, build the CSS & Js packages and copy the static files (images, fonts...) into the final public folder.
> + **`gulp dev`** : run a gulp sequence that build all the packages, watch for changes and launch the localhost.
> + **`gulp prod`** : run a gulp sequence that build and minimize all the packages to reduce the final page load.
> + **`gulp test`** : run karma tests.
> + **`gulp e2e`** : run protactor end to end tests.

+ During development phase running the `gulp dev` task should open your default web browser with the localhost url


----------------------------------

## Bluemix Delivery Pipeline

Using the Continuous delivery tool in Bluemix you must create your **delivery pipeline** with the following steps:
> #### Build Stage
    + Set the builder type to: npm
    + Add the code to install the modules needed in the same way that you did for local development:
        ``
            export PATH=/opt/IBM/node-v6.7.0/bin:$PATH
            npm install
            npm install -g bower
            bower install
            npm install -g gulp-cli

            gulp prod
        ``
> #### Deploy Stage
    + It should be appears by default using Deployer type: Cloud Foundry
    + The deploy scrips should be something similar to: 
        `` 
            #!/bin/bash
            cf push "${CF_APP}"

            # View logs
            # cf logs "${CF_APP}" --recent
        `` 


[Install Node.js]: https://nodejs.org/en/download/
[Install Bower]: https://bower.io/
[Install Gulpjs]: http://gulpjs.com/
[Install Karma]: https://karma-runner.github.io/1.0/index.html
[Install Protractor]: http://www.protractortest.org/#/
[AngularBluemixSeed]: https://github.com/larshnordli/AngularBluemixSeed

