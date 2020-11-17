/**
 * add key/control/mouse event for specific action based on the current focus type
 */
function addKeyEvent() {
    window.addEventListener('keydown', KeyDown, false)
    window.addEventListener('mousewheel', wheel, false)
}

/**
 * handel up and down mouse scrolling handler based on the current page
 * @param {mouse} event 
 */
function wheel(event) {
    if (_dataLoading == true) {
        return
    }

    // mouse wheel delta
    var delta = event.wheelDelta

    var target

    if (_focusType == 'main') {
        target = _mainFocus
    }

    if (_focusType == 'list') {
        target = _listFocus
    }

    if (_focusType == 'detail') {
        target = _detailFocus
    }

    // detect mouse delta to up or down handler
    if (delta > 0) {
        target.upHandler()
    } else {
        target.downHandler()
    }
}

/**
 * handel up and down mouse scrolling handler based on the current page
 * @param {keyboard} event 
 */
function KeyDown(event) {
    if (_dataLoading == true) {
        return
    }

    var target

    if (_focusType == 'main') {
        target = _mainFocus
    }

    if (_focusType == 'list') {
        target = _listFocus
    }

    if (_focusType == 'detail') {
        target = _detailFocus
    }

    var keyCode

    if (event.keyCode) {
        keyCode = event.keyCode
    } else {
        keyCode = event
    }

    switch (keyCode) {
        case VK_GREEN: // lg green key
            _footerView.homeClick()
            break

        case 88:
            window.NetCastExit()
            break

        case VK_UP: // lg up key
            target.upHandler()
            break

        case VK_LEFT: // lg and keyboard left key
            target.leftHandler()
            break

        case VK_RIGHT: // lg and keyboard right key
            target.rightHandler()
            break

        case VK_DOWN: // lg and keyboard down key
            target.downHandler()
            break

        case VK_ENTER: // lg and keyboard enter/OK key
            target.selectedHandler()
            break

        case 27: // lg and keyboard back/esc
        case VK_BACK:

            // if current page is list 
            if (_pageType == 'list') {

                // if series info is open remove that to show list
                if (document.getElementById('series_info')) {
                    _detailView.remove()
                } else { // otherwise go to main
                    pageChange('main')
                }
                return
            }

            // if current page is main 
            if (_pageType == 'main') {

                // if series info is open remove that to show list
                if (document.getElementById('about_info')) {
                    _detailView.remove()
                } else { // otherwise to TV apps

                    // lg method to terminate app
                    if (window.NetCastBack) {
                        window.NetCastBack()
                    }
                }

                return
            }

            _footerView.backClick()

            break
        default:
            if (_focusType == 'detail') {
                target.keyHandler(event)
            }
            break
    }
}

/**
 * page change manager to remove and generate new pages
 * @param {string} page 
 */
function pageChange(page) {

    // clear current page 
    switch (_pageType) {
        case 'main':
            _mainView.remove()
            break

        case 'list':
            _listView.remove()
            break

        case 'detail':
            break

    }

    // generate new page
    switch (page) {
        case 'main':
            _mainView.generate()
                // invisible home footer button
            _footerView.Home.style.display = 'none'
            break

        case 'list':
            _listView.generate()

            // visible home footer button
            _footerView.Home.style.display = 'block'
            break

        case 'detail':
            // nothing !
            break

    }

    _pageType = page
}