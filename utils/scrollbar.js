var dataHolderScrollbar = {
    selectedId: 0,
    scrollbars: []
};
/**
 * custom scroll bar for long data and also view based on the data
 * @param {string} layerId 
 * @param {string} scrollbarId 
 */
function ScrollBarCustom(layerId, scrollbarId) {
    this.layerId = layerId
    this.selectedId
    this.scrollbarId = scrollbarId
    this.layer
    this.scroll
    this.track
    this.thumb

    this.x = 0
    this.y = 0
    this.width = 0
    this.height = 0

    this.thumbRatio = 0.2

    // track view init data 
    this.trackColor = '#A6BBB8'
    this.trackWidth = 20
    this.trackHeight = 568
    this.trackBorderRadius = 15

    // thumb view init data 
    this.thumbColor = '#304E54'
    this.thumbWidth = 16
    this.thumbHeight = 140
    this.thumbBorderRadius = 15
    this.thumbFocusColor = '#DB016B'
    this.thumbInitX = 2
    this.thumbInitY = 2

    // update callback function
    this.updateCallBack
    this.updateMouseUp
}

/**
 * scroll bar custom constructor
 */
ScrollBarCustom.prototype.init = function() {
    this.selectedId = dataHolderScrollbar.scrollbars.length
    var currentScrollbarInfo = {
        id: this.selectedId,
        offsetX: 0,
        offsetY: 0,
        scope: this
    }

    dataHolderScrollbar.scrollbars.push(currentScrollbarInfo)

    this.layer = document.getElementById(this.layerId)
    this.scroll = document.createElement('div')

    // scrollbar container
    this.scroll.id = this.scrollbarId
    this.scroll.className = 'scrollbar'

    // scroll bar track
    this.track = document.createElement('div')
    this.track.className = 'track'

    // scroll bar thumb
    this.thumb = document.createElement('div')
    this.thumb.className = 'thumb'

    // scroll bar style
    this.scroll.style.padding = '0px'
    this.scroll.style.margin = '0px'
    this.scroll.style.position = 'absolute'

    // scrollbar style
    this.track.style.padding = '0px'
    this.track.style.margin = '0px'
    this.track.style.backgroundColor = this.trackColor
    this.track.style.width = this.trackWidth + 'px'
    this.track.style.height = this.trackHeight + 'px'
    this.track.style.webkitBorderRadius = this.trackBorderRadius + 'px'
    this.track.style.position = 'inherit'

    // define thumb height on track
    this.thumbHeight = this.trackHeight * this.thumbRatio

    // thumb style
    this.thumb.style.padding = '0px'
    this.thumb.style.margin = '0px'
    this.thumb.style.backgroundColor = this.thumbColor
    this.thumb.style.width = this.thumbWidth + 'px'
    this.thumb.style.height = this.thumbHeight + 'px'
    this.thumb.style.webkitBorderRadius = this.thumbBorderRadius + 'px'
    this.thumb.style.position = 'inherit'
    this.thumb.style.cursor = 'pointer'
    this.thumb.style.top = this.thumbInitY + 'px'
    this.thumb.style.left = this.thumbInitX + 'px'

    this.setPosition(this.x, this.y)

    // append children
    this.layer.appendChild(this.scroll)
    this.scroll.appendChild(this.track)
    this.scroll.appendChild(this.thumb)

    // add events
    this.thumb.addEventListener('mousedown', this.mouseDownHandler)
    this.thumb.addEventListener('mouseup', this.mouseUpHandler)

    this.scroll.scope = this
    this.thumb.scope = this
}

/**
 * mouse down event
 * @param {mouse} event 
 */
ScrollBarCustom.prototype.mouseDownHandler = function(event) {
    var scope = event.target.scope

    dataHolderScrollbar.selectedId = scope.selectedId

    window.addEventListener('mousemove', scope.mouseMoveHandler)
    window.addEventListener('mouseup', scope.mouseUpHandler)

    dataHolderScrollbar.scrollbars[dataHolderScrollbar.selectedId].offsetY = event.clientY
}

/**
 * mouse up event
 * @param {mouse} event 
 */
ScrollBarCustom.prototype.mouseUpHandler = function(event) {
    // get from data holder instead of event
    var scope = dataHolderScrollbar.scrollbars[dataHolderScrollbar.selectedId].scope

    // remove events
    window.removeEventListener('mousemove', scope.mouseMoveHandler)
    window.removeEventListener('mouseup', scope.mouseUpHandler)

    var scrollInfo = dataHolderScrollbar.scrollbars[dataHolderScrollbar.selectedId]
    if (scrollInfo.scope.updateMouseUp != null) {
        scrollInfo.scope.updateMouseUp()
    }
}

/**
 * mouse move event for drag scroll bar
 * @param {mouse} event 
 */
ScrollBarCustom.prototype.mouseMoveHandler = function(event) {
    var scrollInfo = dataHolderScrollbar.scrollbars[dataHolderScrollbar.selectedId]

    var direction = event.clientY - scrollInfo.offsetY

    scrollInfo.scope.moveThumbY(direction)

    scrollInfo.offsetY = event.clientY

    if (scrollInfo.scope.updateCallBack != null) {
        scrollInfo.scope.updateCallBack()
    }
}

/**
 * get the Y position of the thumb
 */
ScrollBarCustom.prototype.getThumbPositionY = function() {
    var scrollInfo = dataHolderScrollbar.scrollbars[this.selectedId]
    var numerator = Number(scrollInfo.scope.thumb.style.top.split('px')[0])
    var denominator = Number((scrollInfo.scope.trackHeight - scrollInfo.scope.thumbHeight - scrollInfo.scope.thumbInitY))
    return Math.floor((numerator / denominator) * 100) / 100
}

/**
 * the Y position of the thumb
 * @param {number} ratio 
 */
ScrollBarCustom.prototype.setThumbPositionY = function(ratio) {
    if (ratio > 1) {
        ratio = 1
    }

    if (ratio < 0) {
        ratio = 0
    }

    var scrollInfo = dataHolderScrollbar.scrollbars[this.selectedId]

    var trackHeight = this.trackHeight - this.thumbHeight - this.thumbInitY
    var gotoY = trackHeight * ratio

    scrollInfo.scope.thumb.style.top = gotoY + 'px'
}

/**
 * set focus by shadow
 */
ScrollBarCustom.prototype.setFocus = function() {
    var scrollInfo = dataHolderScrollbar.scrollbars[this.selectedId]

    // thumb set focus by add shadow
    scrollInfo.scope.thumb.style.webkitBoxShadow = ('0 0 5px ' + scrollInfo.scope.thumbFocusColor)
}

/**
 * remove shadow for lose focus
 */
ScrollBarCustom.prototype.deFocus = function() {
    var scrollInfo = dataHolderScrollbar.scrollbars[this.selectedId]

    // thumb remove focus by remove shadow
    scrollInfo.scope.thumb.style.webkitBoxShadow = null
}

/**
 * set x,y position on left, top scroll item
 * @param {number} x 
 * @param {number} y 
 */
ScrollBarCustom.prototype.setPosition = function(x, y) {
    this.scroll.style.left = x + 'px'
    this.scroll.style.top = y + 'px'
}

/**
 * move thumb y position by direction
 * @param {number} direction 
 */
ScrollBarCustom.prototype.moveThumbY = function(direction) {
    var gotoY = parseInt(this.thumb.style.top.split('px')[0]) + direction
    var endY = this.trackHeight - this.thumbHeight - this.thumbInitY

    if (gotoY <= this.thumbInitY) {
        gotoY = this.thumbInitY
    }

    if (gotoY > endY) {
        gotoY = endY
    }

    this.thumb.style.top = gotoY + 'px'
}

/**
 * destroy events / intervals / etc. for the sake of the performance
 */
ScrollBarCustom.prototype.destroy = function() {
    this.thumb.removeEventListener('mousedown', this.mouseDownHandler)
    this.thumb.removeEventListener('mouseup', this.mouseUpHandler)
}