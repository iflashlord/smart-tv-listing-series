function mainFocus() {
    this.definedType = 'main'

    this.currentKeyId = ''

    this.menuMax = 2
    this.menuId = 0
    this.menuFocus = 0
    this.menuX = 0

    this.menu0 = []
    this.menu1 = []
}
/**
 * constructor to add event and define menus
 */
mainFocus.prototype.focusInit = function() {

    // reassign menu array
    this.menu0 = []
    this.menu1 = []

    // define mouse events
    for (var i = 0; i < this.menuMax; i++) {
        this['menu' + i].push(document.getElementById('main' + i))
        this['menu' + i][0].addEventListener('mouseover', this.over, false)
        this['menu' + i][0].addEventListener('mousedown', this.click, false)
    }
}

/**
 * mouse over event get target id and focus in
 * @param {mouse} event 
 */
mainFocus.prototype.over = function(event) {
    var target = event.currentTarget
        // get id from the element id (main{NUMBER})
    this.menuX = target.id.substr(4, 1)

    _mainFocus.focusIn(this.menuX)
}

/**
 * set current focus
 * @param {number} posX 
 */
mainFocus.prototype.currentSet = function(posX) {
    _mainFocus.focusIn(posX)
}

/**
 * focus in main menu items only vertically
 * @param {number} posX 
 */
mainFocus.prototype.focusIn = function(posX) {
    if (_focusType != this.definedType) {
        _focusType = this.definedType
    }

    for (var i = 0; i < this.menuMax; i++) {
        // only use the posX for horizontal main menu
        if (posX == i) {
            this['menu' + i][0].className = 'active-menu'
        } else {
            this['menu' + i][0].className = 'default-menu'
        }
    }

    this.menuX = posX
}

/**
 * focus out
 * @param {number} id 
 */
mainFocus.prototype.focusOut = function(id) {}

/**
 * mouse event on selected item
 * @param {mouse} event 
 */
mainFocus.prototype.click = function(event) {
    _mainFocus.selectedHandler()
}

/**
 * key left for change menu  
 */
mainFocus.prototype.leftHandler = function() {
    if (this.menuX < (this.menuMax - 1)) { this.menuX++; }
    _mainFocus.focusIn(this.menuX, this.menuY)
}

/**
 * key right for change menu  
 */
mainFocus.prototype.rightHandler = function() {
    if (this.menuX > 0) { this.menuX--; }
    _mainFocus.focusIn(this.menuX, this.menuY)
}

/**
 * key up as left for change menu  
 */
mainFocus.prototype.upHandler = function() {
    this.leftHandler()
}

/**
 * key down as right for change menu  
 */
mainFocus.prototype.downHandler = function() {
    this.rightHandler()
}

/**
 * selected item handler
 */
mainFocus.prototype.selectedHandler = function() {

    if (parseInt(this.menuX) == 1) {
        // about
        _detailFocus.pagePosition = 0
        _detailView.generateAbout()
        return
    } else {
        // series list
        _mainId = parseInt(this.menuX)
        pageChange('list')
    }
}

/**
 * destroy events / intervals / etc. for the sake of the performance
 */
mainFocus.prototype.destroy = function() {
    for (var i = 0; i < this.menuMax; i++) {
        if (this['menu' + i][0]) {
            this['menu' + i][0].removeEventListener('mouseover', this.over)
            this['menu' + i][0].removeEventListener('mousedown', this.click)
        }
    }
}