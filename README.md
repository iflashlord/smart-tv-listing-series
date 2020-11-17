# SERIES LIST SMART TV APPLICATION



#### Run application : 

npm start

#### Run tests: 

npm test

#### Run auto js documentation generator: 

npm doc



#### General Info

**Note:** Application designed based on the 1280x720 standard but by setting `autoScale` to `true` in `app.js` file it automatically scaled based on the screen size. (by default it sets to ‍`false`)



#### Design 

Sketch with adobe XD source and export result is abiliable on the `design` directory



#### Local and Remote Data

Inside `service/DataService.js` we have a variable `_isLocalDebug` that help you to switch either offline or online data. when `_isLocalDebug` is false we use a proxy to request the real server without CROS limitation, you should test in this state only on `localhost` by `npm start` command.

  

#### Bouns Features

* Add detail view by opening ltems on list
* Splash screen
* Prevent regenerate the list item on DOM by check if it is generated before
* Add main page with two simple menu
* Scroll content with both mouse and keyboard
* Add simple about application
* Use back (ESC) button for details and section and  some other LG key functions
* Show the guide based on the LG
* Use LG standard controll support
* Support both local and remote data by proxy
* Vertical scroll with mouse and keyboard
* Mouse wheel as up and down button
* Add breadcrumbs to list



