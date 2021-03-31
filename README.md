# True
Marketing site for the True 2.0 landing page

## To Deploy
To deploy this landing page, simply grab the files inside the "site" directory. the "site" directory contains all compiled files that are production ready.

If you need to make edits to files, see below.


## local development
This site is strictly client side. There is no server side code in this repo. Some of the JavaScript may point to existing code. Details coming soon.

### install environment
* install sass gem (https://sass-lang.com/install)
* install gulp (npm install gulp -g)
* Clone this repo to your local machine
* Navigate to the root of the repo
* Run "npm install" (this should install all dependencies)
* Run "gulp" to compile files from "src", or "gulp watch" to watch files from "src" directory.

NOTE: if you get errors when running the gulp command, try installing node version 10.15.3

### directory breakdown
Gulp watch will watch all the following directories for changes:

* /src/html/includes - common includes like contact form, header, topnav, footer, etc
* /src/html/site - html pages
* /src/js/vendors - 3rd party js libraries and plugins
* /src/js/app - marketing site specific JavaScript files. 
* /src/sass - raw sass/css files

Note: images and videos are stored in the compiled site static directory.
* /site/static - compiled css, js, and static images and video files





