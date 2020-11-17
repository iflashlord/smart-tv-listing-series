function mainView() {
    this.page
    this.titles = [
        'Series List',
        'About'
    ]
    this.images = [
        './assets/series.svg',
        './assets/about.svg'
    ]
}

/**
 * generate main view
 */
mainView.prototype.generate = function() {
    _header.style.display = 'block'
    _location.style.display = 'none'

    this.page = document.getElementById('mainContainer')
    this.page.innerHTML = "<div class='bg_home_overlay'>" +
        ' </div>' +
        "<div class='MainMenu'>" +
        '</div>'

    // loop add menus
    for (var i = 0; i < this.titles.length; i++) {
        this.addMenu(i)
    }

    _mainFocus.focusInit()
    _mainFocus.currentSet(0)
}

/**
 * add menu to main page
 * @param {number} index 
 */
mainView.prototype.addMenu = function(index) {

    var MainMenu = document.getElementsByClassName('MainMenu')[0]

    var MenuContents = document.createElement('div')
    MenuContents.className = 'MenuContents'


    MenuContents.innerHTML = "<div id='main" + index + "' class='main-menu'> " +

        " <img class='menu_item_image' src='" + this.images[index] + "'/> " +

        "<div class='menu_item_normal'>" +
        "<span class='menu_item_title'>" + this.titles[index] + '</span>' +
        '</div>' +

        '</div>'

    // add event for imgs to replace with placeholder image if we had problem in load images
    var _tempArray = MenuContents.getElementsByTagName('img')
    var _length = _tempArray.length
    for (var i = 0; i < _length; i++) {
        _tempArray[i].addEventListener('error', this.loadErrorHandler, false)
    }

    MainMenu.appendChild(MenuContents)
}

/**
 * replace image source with the placeholder when we have trouble in load that
 * @param {error} event 
 */
mainView.prototype.loadErrorHandler = function(event) {
    event.currentTarget.src = './assets/blank.svg'
}

/**
 * remove page by set blank data to innerHTML
 */
mainView.prototype.remove = function() {
    _mainFocus.destroy()
        // clear the page
    this.page.innerHTML = ''
}

// module.exports = mainView;

exports._test = {
    mainView
}