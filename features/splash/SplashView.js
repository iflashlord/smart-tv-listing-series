/**
 * splash view with loading view
 *
 * @param {function} dataLoadFunc
 */
function splashView(dataLoadFunc) {
    this.splashMovementDot
    this.intervalLoading
    this.currentMove = 0
    this.maxMove = 4 // max movement for a loop
    this.loadingLoop = 0
    this.loadFunc = dataLoadFunc
}

/**
 * start interval and loading
 */
splashView.prototype.splashStart = function() {
    var target = this
    this.splashMovementDot = document.getElementById('splash_dot')

    this.intervalLoading = setInterval(function() {
        target.move()
    }, 300)
}

/**
 * move loader dot item
 */
splashView.prototype.move = function() {
    if (this.currentMove == this.maxMove) {
        this.currentMove = 0
        this.loadingLoop++;

        if (this.loadingLoop == 1) {
            this.loadFunc()
        }

    } else {
        this.currentMove += 1
    }

    // calculate the movement of loader circle
    var position = ((this.currentMove * 30) + 75)

    // set style left to change position
    this.splashMovementDot.style.left = position + 'px'
}

/**
 * clear interval for performance
 */
splashView.prototype.splashStop = function() {
    clearInterval(this.intervalLoading)
}

// export to make it accessible for test
exports._test = { splashView }