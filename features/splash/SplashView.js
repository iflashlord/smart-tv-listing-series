/**
 * splash view with loading view
 *
 * @param {function} dataLoadFunc
 */
function SplashView(dataLoadFunc) {
    this.splashMovementDot;
    this.intervalLoading;
    this.currentMove = 0;
    this.maxMove = 4; // max movement for a loop
    this.loadingLoop = 0;
    this.loadFunc = dataLoadFunc;
}

/**
 * start interval and loading
 */
SplashView.prototype.splashStart = function() {
    var target = this;
    this.splashMovementDot = document.getElementById("splash_dot");

    this.intervalLoading = setInterval(function() {
        target.move();
    }, 300);
};

/**
 * move loader dot item
 */
SplashView.prototype.move = function() {

    if (this.currentMove == this.maxMove) {
        this.currentMove = 0;
        this.loadingLoop++;

        //
        if (this.loadingLoop == 1) {
            this.loadFunc();
        }
    } else {
        this.currentMove += 1;
    }

    // calculate the movement of loader circle
    var position = ((this.currentMove * 30) + 75);

    // set style left to change position
    this.splashMovementDot.style.left = position + "px";
};

/**
 * clear interval for performance
 */
SplashView.prototype.splashStop = function() {
    clearInterval(this.intervalLoading);
};