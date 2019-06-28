# geospark
Marketing site for Geospark

## local development
This site is strictly client side. There is no server side code in this repo. Some of the JavaScript may point to existing code. Details coming soon.

### install environment
* Clone this repo to your local machine
* Navigate to the root of the repo
* Run "npm install" (this should install all dependencies)
* Run "gulp" to compile files from "src", or "gulp watch" to watch files from "src" directory.

### directory breakdown
Gulp watch will watch all the following directories for changes:

* /src/html/includes - common includes like contact form, header, topnav, footer, etc
* /src/html/site - html pages
* /src/html/templates - moustache templates for rendering loops like press clippings, testimonials, etc.
* /src/js/vendors - 3rd party js libraries and plugins
* /src/js/app - marketing site specific JavaScript files. 
* /src/sass - raw sass/css files

Note: images and videos are stored in the compiled site static directory.
* /site/agencystatic - compiled css, js, and static images and video files





