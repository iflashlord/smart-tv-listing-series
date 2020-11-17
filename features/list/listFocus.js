function listFocus() {
    this.definedType = 'list'

    this.currentKeyId = null

    this.pageMax = 0
    this.page = 0

    this.itemPerPage = 10

    this.menuMax = 0
    this.menuId = 0

    this.focus = 0
    this.focusX = 0
    this.focusY = 0
    this.position = 0

    this.oldIndicator
    this.mouseEvent = true
    this.fixedWidth = 1135
}

/**
 * set current default initiators
 */
listFocus.prototype.currentSet = function() {
    this.page = 0
    this.menuId = 0
    this.focus = 0
    this.focusX = 0
    this.focusY = 0
    this.position = 0
    this.mouseEvent = true

    this.currentKeyId = 'list0'
    this.focusIn('list0')
}

listFocus.prototype.focusIn = function(currentObject) {

    if (_focusType != this.definedType) {
        _focusType = this.definedType
        this.focusOut()
    }

    // get id from string dom element list{NUMBER}
    this.menuId = Number(currentObject.substr(4, 3))

    if (document.getElementById(this.currentKeyId)) {
        document.getElementById(this.currentKeyId).getElementsByClassName('focus_all')[0].style.display = 'none'
        document.getElementById(this.currentKeyId).getElementsByClassName('normal_all')[0].style.display = 'block'
    }
    if (document.getElementById(currentObject)) {
        document.getElementById(currentObject).getElementsByClassName('focus_all')[0].style.display = 'block'
        document.getElementById(currentObject).getElementsByClassName('normal_all')[0].style.display = 'none'
    }

    // update current key
    this.currentKeyId = currentObject

    //change focus
    this.focus = currentObject.substr(currentObject.length - 1, 1)
}

/**
 * focus out
 */
listFocus.prototype.focusOut = function() {
    if (this.currentKeyId && document.getElementById('listPage0')) {
        document.getElementById(this.currentKeyId).getElementsByClassName('focus_all')[0].style.display = 'none'
        document.getElementById(this.currentKeyId).getElementsByClassName('normal_all')[0].style.display = 'block'
    }
}

/**
 * down handler to move focused item up
 */
listFocus.prototype.upHandler = function() {
    if (this.focus > 4) {
        this.menuId -= 5
        this.focusIn('list' + this.menuId)
    }
}

/**
 * down handler to move focused item down
 */
listFocus.prototype.downHandler = function() {
    if (this.focus < 5) {
        var currentId = parseInt(this.menuId)
        currentId += 5

        if (document.getElementById('list' + currentId)) {
            this.focusIn('list' + currentId)
            return
        }

        if (this.focus < 5) {
            this.focusIn('list' + (this.menuMax - 1))
        }
    }
}

/**
 * left handler check focus and move to left
 */
listFocus.prototype.rightHandler = function() {
    if (document.getElementById('list' + Number(this.menuId + 1)) != this.menuMax - 1) {
        if (this.focus == 4) {
            if (this.page < (this.pageMax - 1)) {
                this.menuId += 6
                this.left()
                return
            }
        }

        if (this.focus == 9) {
            if (this.page < (this.pageMax - 1)) {
                if ((this.menuId + 6) > (this.menuMax - 1)) {
                    this.menuId += 1
                } else {
                    this.menuId += 6
                }

                this.left()
                return
            }
        }

        if (this.focus >= 0 && this.focus < 4 || this.focus >= 4 && this.focus < 9) {
            if (document.getElementById('list' + Number(this.menuId + 1))) {
                this.menuId += 1
                this.focusIn('list' + this.menuId)
            }
        }
    }
}

/**
 * left handler check focus and move to right
 */
listFocus.prototype.leftHandler = function() {
    if (document.getElementById('list' + Number(this.menuId - 1)) != -1) {
        if (this.focus == 0) {
            if (document.getElementById('list' + Number(this.menuId - 6))) {
                this.menuId -= 6
                this.focusIn('list' + this.menuId)
                this.right()
                return
            }
        }

        if (this.focus == 5) {
            if (document.getElementById('list' + Number(this.menuId - 6))) {
                this.menuId -= 6
                this.focusIn('list' + this.menuId)
                this.right()
                return
            }
        }

        if (this.focus <= 4 && this.focus > 0 || this.focus <= 9 && this.focus > 5) {
            this.menuId -= 1
            this.focusIn('list' + this.menuId)
        }
    }
}

/**
 * move list to left and check if next page is new to generate otherwise use the generate DOM item
 */
listFocus.prototype.left = function() {
    if (this.page != (this.pageMax - 1)) {
        this.page++

            // if status is complete we have a node on html DOM for that and there is no need to generate that page again
            if (dataService.data.series_list[_mainId].status == 'complete') {

                // try to find node if it is not available we generate page
                if (document.getElementById('listPage' + this.page) == null) {
                    _listView.generatePage(this.page)
                }

                this.pageMove('left')
                this.focusIn('list' + this.menuId)
            } else {
                if (dataService.data.series_list[_mainId].lists.length < (this.page * this.itemPerPage) + 1) {
                    dataLoading(true)
                    this.pageUpdate()
                } else {
                    if (document.getElementById('listPage' + this.page) == null) {
                        _listView.generatePage(this.page)
                    }
                    _listFocus.pageMove('left')
                    _listFocus.focusIn('list' + _listFocus.menuId)
                }
            }
    }
}

/**
 * set on complete call back and use update page method
 */
listFocus.prototype.pageUpdate = function() {
    dataService.callBackOnComplete = this.pageComplete
    dataService.updatePage(_mainId, parseInt(this.page))
}

/**
 * on page loaded complete
 */
listFocus.prototype.pageComplete = function() {

    // set loading to false
    dataLoading(false)

    // clear call back
    dataService.callBackOnComplete = null

    // generate page
    _listView.generatePage(_listFocus.page)

    //
    _listFocus.pageMove('left')

    // focus on selected position on the page
    _listFocus.focusIn('list' + _listFocus.menuId)
}

/**
 * move to next/right page
 */
listFocus.prototype.right = function() {
    if (this.page > 0) {
        this.page--
            this.pageMove('right')
    }
}

/**
 * arrow left button
 */
listFocus.prototype.arrowLeft = function() {
    if (this.page != this.pageMax - 1) {
        this.page++

            // check the selected section data status
            if (dataService.data.series_list[_mainId].status == 'complete') {
                if (document.getElementById('listPage' + this.page) == null) {
                    _listView.generatePage(this.page)
                }

                this.pageMove('left')
                this.menuId = parseInt(this.page * this.itemPerPage)
                this.focusIn('list' + this.menuId)
            } else {
                if (dataService.data.series_list[_mainId].lists.length < (this.page * this.itemPerPage) + 1) {
                    dataLoading(true)
                    this.arrowUpdate()
                } else {
                    if (document.getElementById('listPage' + this.page) == null) {
                        _listView.generatePage(this.page)
                    }

                    this.pageMove('left')
                    this.menuId = parseInt(this.page * this.itemPerPage)
                    this.focusIn('list' + this.menuId)
                }
            }
    }
}

/**
 * update page data and set call back 
 */
listFocus.prototype.arrowUpdate = function() {
    dataService.updatePage(_mainId, parseInt(this.page))
    dataService.callBackOnComplete = this.arrowComplete
}

/**
 * on complete call back to generate page 
 */
listFocus.prototype.arrowComplete = function() {

    // set loading to false
    dataLoading(false)

    // clear call back
    dataService.callBackOnComplete = null

    // generate page
    _listView.generatePage(_listFocus.page)

    //
    _listFocus.pageMove('left')

    // set data to current menu id
    _listFocus.menuId = parseInt(_listFocus.page * this.itemPerPage)

    // focus on selected position on the page
    _listFocus.focusIn('list' + _listFocus.menuId)
}


listFocus.prototype.arrowRight = function() {
    if (this.page > 0) {
        this.page--
            this.pageMove('right')
    }

    this.menuId = parseInt(this.page * this.itemPerPage) + 9
    this.focusIn('list' + this.menuId)
}

/**
 * left/right arrow focus class changes
 */
listFocus.prototype.arrowFocus = function() {
    console.log(this.page, this.pageMax - 1)
    if (this.page == this.pageMax - 1) {
        _listView.arrowRightButton.className = 'arrow_right_normal_all'
    }

    if (this.page == 0) {
        _listView.arrowLeftButton.className = 'arrow_left_normal_all'
    }
}

/**
 * update current page on the indicator
 */
listFocus.prototype.indicatorFocus = function() {
    if (this.oldIndicator) {
        this.oldIndicator.className = 'indicator_normal'
    }
    document.getElementById('indicator' + this.page).className = 'indicator_focused'
    this.oldIndicator = document.getElementById('indicator' + this.page)
}

/**
 * move page either to left or right
 * @param {string} type 
 */
listFocus.prototype.pageMove = function(type) {
    var lists = document.getElementById('listPage')
    lists.className = 'listPage_move'

    // arrow left next page
    if (type == 'left') {
        this.position -= this.fixedWidth

        if (this.page == 0) {
            _listView.arrowRightButton.className = 'arrow_right_focused_all'
            _listView.arrowLeftButton.className = 'arrow_left_normal_all'
        } else {
            _listView.arrowLeftButton.className = 'arrow_left_focused_all'
        }
    }

    // arrow right next page
    if (type == 'right') {
        this.position += this.fixedWidth

        if (this.page == this.pageMax - 1) {
            _listView.arrowLeftButton.className = 'arrow_left_normal_all'
        } else {
            _listView.arrowLeftButton.className = 'arrow_left_focused_all'
        }

        if (this.page > 0) {
            _listView.arrowRightButton.className = 'arrow_right_focused_all'
        }

    }

    // set focus on the current indicator
    this.indicatorFocus()

    this.mouseEvent = true

    // define target and set scope to current
    var target = document.getElementById('listPage')
    target.style.marginLeft = this.position + 'px'
    target.scope = this

    // add event for transition end
    target.addEventListener('webkitTransitionEnd', this.addEvent, false)

    // update left/right arrow view
    this.arrowFocus()
}

/**
 * add mouse event to true to the current scope
 */
listFocus.prototype.addEvent = function() {
    this.scope.mouseEvent = true
}

/**
 * selected item handler to open detail view
 */
listFocus.prototype.selectedHandler = function() {
    _detailFocus.pagePosition = 0
    _detailId = this.menuId
    _detailView.generate()
}

/**
 * destroy events / intervals / etc. for the sake of the performance
 */
listFocus.prototype.destroy = function() {}