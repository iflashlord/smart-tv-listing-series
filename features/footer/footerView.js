function footerView() {
    this.footer
    this.Exit
    this.Back
    this.Home
}

/**
 * add footer events
 */
footerView.prototype.addEvent = function() {
    this.footer = document.getElementById('footer')
    this.Exit = footer.getElementsByTagName('li')[0]
    this.Back = footer.getElementsByTagName('li')[1]
    this.Home = footer.getElementsByTagName('li')[2]

    this.Exit.addEventListener('mouseover', this.over, false)
    this.Exit.addEventListener('mouseout', this.out, false)
    this.Exit.addEventListener('mousedown', this.down, false)

    this.Back.addEventListener('mouseover', this.over, false)
    this.Back.addEventListener('mouseout', this.out, false)
    this.Back.addEventListener('mousedown', this.down, false)

    this.Home.addEventListener('mouseover', this.over, false)
    this.Home.addEventListener('mouseout', this.out, false)
    this.Home.addEventListener('mousedown', this.down, false)
}

/**
 * mouse over event on back/home/exit footer buttons
 * @param {mouse} event 
 */
footerView.prototype.over = function(event) {
    var target = event.target

    if (target.className == 'exit') {
        target.className = 'exit_focus'
    }
    if (target.className == 'back') {
        target.className = 'back_focus'
    }
    if (target.className == 'home') {
        target.className = 'home_focus'
    }
}

/**
 * mouse out event on back/home/exit footer buttons
 * @param {mouse} event 
 */
footerView.prototype.out = function(event) {
    var target = event.target

    if (target.className == 'exit_focus') {
        target.className = 'exit'
    }
    if (target.className == 'back_focus') {
        target.className = 'back'
    }
    if (target.className == 'home_focus') {
        target.className = 'home'
    }
}

/**
 * mouse down event on back/home/exit footer buttons
 * @param {mouse} event 
 */
footerView.prototype.down = function(event) {
    if (event.target.className == 'exit_focus') {
        // lg method to terminate app
        if (window.NetCastExit) {
            window.NetCastExit()
        }
    }

    if (event.target.className == 'back_focus') {
        _footerView.backClick()
    }

    if (event.target.className == 'home_focus') {
        if (document.getElementById('series_info')) {
            _detailView.remove()
        }

        // back to main
        pageChange('main')
    }
}

/**
 * back handler based on the current page
 */
footerView.prototype.backClick = function() {

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

            // lg method to back app
            if (window.NetCastBack) {
                window.NetCastBack()
            }
        }

        return
    }
}

/**
 * home button click on footer 
 */
footerView.prototype.homeClick = function() {
    if (document.getElementById('HOME').style.display == 'block') {
        if (document.getElementById('series_info')) {
            _detailView.remove()
        }

        pageChange('main')
    }
}