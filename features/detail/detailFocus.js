function detailFocus() {
    this.definedType = 'detail'

    this.currentSeriesImage = null
    this.serverImageHost = null

    this.currentKeyId = ''
    this.menuMax = 2
    this.menuId = 0

    this.menu0 = null
    this.menu1 = null

    this.pagePosition = 0
    this.moveValue = 100
}

/**
 * set focus on zero item
 */
detailFocus.prototype.focusInit = function() {
    this.pagePosition = 0
}

/**
 * mouse event over handler
 * @param {mouse} event 
 */
detailFocus.prototype.over = function(event) {
    var target = event.currentTarget

    switch (target.id) {
        case 'detailScroll':
            this.menuId = 2
            break

    }

    _detailFocus.focusIn(this.menuId)
}

/**
 * set focus in the selected id
 * @param {number} id 
 */
detailFocus.prototype.focusIn = function(id) {
    if (_focusType != this.definedType) {
        _focusType = this.definedType
    }

    // loop by limited max
    for (var i = 0; i < this.menuMax; i++) {
        if (id == i) {
            this.Focus(this['menu' + i])
        } else {
            if (this['menu' + i]) {
                this.Normal(this['menu' + i])
            }
        }
    }

    this.menuId = id
}

/**
 * set focus based on the target id and change scroll thumb to active
 * useful for improve the detail pages with other action and need to change focus
 * @param {node} object 
 */
detailFocus.prototype.Focus = function(object) {
    var target = object

    switch (target.id) {
        case 'detailScroll':
            var thumb = document.getElementById('detailScrollAPI').childNodes[1]
            thumb.style.backgroundColor = '#db016b'
            break

    }
}

/**
 * set normal based on the target id and change scroll thumb to active
 * useful for improve the detail pages with other action and need to change focus
 * @param {node} object 
 */
detailFocus.prototype.Normal = function(object) {
    if (object == null) {
        return
    }

    var target = object

    switch (target.id) {
        case 'detailScroll':
            var thumb = document.getElementById('detailScrollAPI').childNodes[1]
            thumb.style.backgroundColor = '#cccccc'
            break

    }
}

/**
 * key up handler
 */
detailFocus.prototype.upHandler = function() {
    if (this.menu2 == undefined || this.menuId != 2 || this.menu2.id != 'detailScroll') {
        return
    }

    // select long_info item
    var long_info = document.getElementById('long_info')
    var moveHeight = long_info.offsetHeight - 370

    if (this.pagePosition < 0) {
        if (0 < (this.pagePosition + this.moveValue)) {
            this.pagePosition = 0
        } else {
            this.pagePosition += this.moveValue
        }
    }

    // set top for scroll simulate
    long_info.style.top = this.pagePosition + 'px'

    var scrollNum = (this.pagePosition / moveHeight) * -1

    if (this.pagePosition == 0) {
        _detailScroll.thumb.style.top = 2 + 'px'
    } else {
        _detailScroll.setThumbPositionY(scrollNum)
    }
}

/**
 * key left handler to use as up action too
 */
detailFocus.prototype.leftHandler = function() {
    this.upHandler()
}

/**
 * key right handler to use as down action too
 */
detailFocus.prototype.rightHandler = function() {
    this.downHandler()
}

/**
 * key down handler
 */
detailFocus.prototype.downHandler = function() {
    if (this.menu2 == undefined || this.menuId != 2 || this.menu2.id != 'detailScroll') {
        return
    }

    // select long_info item
    var long_info = document.getElementById('long_info')
    var moveHeight = long_info.offsetHeight - 370

    if (this.pagePosition > (moveHeight * -1)) {
        if ((moveHeight * -1) > (this.pagePosition - this.moveValue)) {
            this.pagePosition = moveHeight * -1
        } else {
            this.pagePosition -= this.moveValue
        }
    }

    // set top for scroll simulate
    long_info.style.top = this.pagePosition + 'px'

    var scrollNum = (this.pagePosition / moveHeight) * -1

    _detailScroll.setThumbPositionY(scrollNum)
}

/**
 * selected handler
 */
detailFocus.prototype.selectedHandler = function() {}

/**
 * destroy events / intervals / etc. for the sake of the performance
 */
detailFocus.prototype.destroy = function() {}