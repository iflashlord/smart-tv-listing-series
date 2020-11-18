/**
       o       o
        \     /
         \_ _/
   ________|_________
   || ____________ ||
   | {  SMART TV  }||
   ||{____________}||
   ||--------------||
   ^^              ^^
 * Viapaly List Series Smart TV application 
 * 
 * Developer : Behrouz Pooladrk
 * Phone: 0989131277714
 * Email : me@iflashlord.com | behrouzpc@gmail.com
 * Website: www.iflashlord.com
 * 
 */

onerror = customOnErrorHandler

// set true to auto fill screens
var autoScale = false;

var _pageType = 'main'; // main, list, detail
var _focusType = 'main'; // main, list, detail
var _dataLoading = false
var _header
var _footer
var _location
var _splashView

// main section
var _mainView = new mainView()
var _mainFocus = new mainFocus()

// list section
var _listView = new listView()
var _listFocus = new listFocus()

// detail section
var _detailView = new detailView()
var _detailFocus = new detailFocus()

// footer section
var _footerView = new footerView()

// scrolls
var _detailScroll
var _listScroll

// loading data flag
var _dataLoading = false

// id of current selected item
var _mainId

// id of item to show details
var _detailId

// data management
var dataService;

/**
 * custom error handler for debug
 * @param {string} message 
 * @param {sting} url 
 * @param {number} line 
 */
function customOnErrorHandler(message, url, line) {
    var errorMessage = '\n' + line + ' Error Line ===='
    errorMessage += '\n[ Error Message ]\n' + message
    errorMessage += '\n[ Error URL ]\n' + url
    if (dataService && dataService._isLocalDebug) {
        console.log(errorMessage)
    }

    return false
}

/**
 * get width
 * @param {node} el 
 * @param {string} type 
 */
function getWidth(el, type) {
    if (type === 'inner') {
        return el.clientWidth;
    } else if (type === 'outer') {
        return el.offsetWidth;
    }
    var s = window.getComputedStyle(el, null);
    if (type === 'width') {
        return el.clientWidth - parseInt(s.getPropertyValue('padding-left')) - parseInt(s.getPropertyValue('padding-right'));
    } else if (type === 'full') {
        return el.offsetWidth + parseInt(s.getPropertyValue('margin-left')) + parseInt(s.getPropertyValue('margin-right'));
    }
    return null;
}

/**
 * get height
 * @param {node} el 
 * @param {string} type 
 */
function getHeight(el, type) {
    if (type === 'inner') {
        return el.clientHeight;
    } else if (type === 'outer') {
        return el.offsetHeight;
    }
    var s = window.getComputedStyle(el, null);
    if (type === 'height') {
        return el.clientHeight - parseInt(s.getPropertyValue('padding-left')) - parseInt(s.getPropertyValue('padding-right'));
    } else if (type === 'full') {
        return el.offsetHeight + parseInt(s.getPropertyValue('margin-left')) + parseInt(s.getPropertyValue('margin-right'));
    }
    return null;
}

/**
 * scale app to fill screen
 * @param {node} app 
 * @param {boolean} proportional 
 */
function fillApplication(app, proportional) {
    var currentWidth = getWidth(app, 'outer')
    var currentHeight = getHeight(app, 'outer')

    var availableHeight = window.innerHeight;
    var availableWidth = window.innerWidth;

    var scaleX = availableWidth / currentWidth;
    var scaleY = availableHeight / currentHeight;

    if (proportional) {
        scaleX = Math.min(scaleX, scaleY);
        scaleY = scaleX;
    }

    var translationX = Math.round((availableWidth - (currentWidth * scaleX)) / 2);
    var translationY = Math.round((availableHeight - (currentHeight * scaleY)) / 2);

    app.setAttribute("style",
        "position:fixed;" +
        "left: 0px;" +
        "top:0px;" +
        "-webkit-transform: translate(" + translationX + "px, " +
        translationY + "px) scale3d(" +
        scaleX + ", " + scaleY + ", 1);" +
        "-webkit-transform-origin:0 0;")
}


/**
 * application constructor
 */
function init() {
    // auto scale app to screens if autoScale is true
    if (autoScale) {
        fillApplication(document.getElementsByTagName('body')[0], true);
    }

    // clean up load event
    window.removeEventListener('load', init, false)

    // define splash and add call back to run function after a loop and view splash
    var _splash = new splashView(dataLoadService)
    _splash.splashStart()
}

/**
 * load data and set call back
 */
function dataLoadService() {
    dataService = DataService.getInstance()
    dataService.callBackOnComplete = initCompleteHandler
    dataService.init()
}

/**
 * on complete initials to clean up and view actions
 */
function initCompleteHandler() {
    _splashView = new splashView()

    // select section items on dom
    _header = document.getElementById('header')
    _footer = document.getElementById('footer')
    _location = document.getElementById('location')

    // invisible both header and footer
    _header.style.display = 'none'
    _footer.style.display = 'none'

    // clean up event
    window.removeEventListener('load', init, false)

    // remove the splash
    removeSplash()
}

/**
 * remove splash and clear
 */
function removeSplash() {
    var splash = document.getElementById('splash')
    _splashView.splashStop()

    // remove item
    if (splash) {
        document.body.removeChild(splash)
    }

    // visible footer
    _footer.style.display = 'block'
    _footerView.addEvent()

    // generate main view
    _mainView.generate()

    // add key event to application
    addKeyEvent()
}

/**
 * show/hide light box effect loading
 * @param {boolean} loading 
 */
function dataLoading(loading) {
    _dataLoading = loading

    if (_dataLoading == true) {
        document.getElementById('LockScreenLoader').style.display = 'block'
    } else {
        document.getElementById('LockScreenLoader').style.display = 'none'
    }
}

/**
 * remove all children on selected container
 * @param {node} container 
 */
function removeChildren(container) {
    for (var i = 0; i < container.childNodes.length; i++) {
        container.removeChild(container.firstChild)
    }
}


// add on load event to run init function
window.addEventListener('load', init, false)