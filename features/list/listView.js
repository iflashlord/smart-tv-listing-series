function listView() {
    this.totalItemNum
    this.pageTotal
    this.arrowRightButton
    this.arrowLeftButton
    this.historyLength
    this.fixedWidth = 1135
    this.itemPerPage = 10
}

/**
 * generate list
 */
listView.prototype.generate = function() {

    // update breadcrumbs
    document.getElementById('location-next').innerHTML = _mainView.titles[_mainId]

    // get total adn pages from loaded data
    this.totalItemNum = dataService.data.series_list[_mainId].total
    this.pageTotal = dataService.data.series_list[_mainId].pages

    // make header and location visible
    _header.style.display = 'block'
    _location.style.display = 'block'

    // main html
    var generateTarget = document.getElementById('ListContainer')
    generateTarget.innerHTML = "<div class='ListContainer'>" +
        "<section class='arrow_r_all'><div id='arrow_right' class='arrow_right_focused_all'></div></section>" +
        "<section class='arrow_l_all'><div id='arrow_left' class='arrow_left_normal_all'></div></section>" +
        "<section class='Contents'>" +
        "<div class='indicator_all'><ul id='indicators' class='indicator-align'></ul></div>" +
        "<div id='listPageContainer'><div id='listPage' class='listPage'></div></div>" +
        '</section>' +
        '</div>'

    // arrow left/right button
    this.arrowRightButton = document.getElementById('arrow_right')
    this.arrowLeftButton = document.getElementById('arrow_left')

    // generate first page
    this.generatePage(0)

    // event initiate
    this.eventInitiate()

}

/**
 * generate list page
 * @param {number} id 
 */
listView.prototype.generatePage = function(id) {

    this.totalItemNum = dataService.data.series_list[_mainId].total
    this.pageTotal = dataService.data.series_list[_mainId].pages

    var pageContainer = document.getElementById('listPage')

    var pageElement = document.createElement('article')
    pageElement.id = 'listPage' + id
    pageElement.className = 'list_set_all'
    pageElement.innerHTML = '<ul> </ul>'
    pageElement.style.marginLeft = (id * this.fixedWidth) + 'px'
    pageContainer.appendChild(pageElement)

    for (var i = 0; i < this.itemPerPage; i++) {
        var itemNum = parseInt(id * this.itemPerPage) + i

        // generate list item
        this.generateItem(id, itemNum)

        if (itemNum == (this.totalItemNum)) {
            return
        }
    }

    this.historyLength = dataService.data.series_list[_mainId].lists.length
}

/**
 * replace template in url with specific query string
 * @param {string} template 
 * @param {string} replaceBy 
 * @param {string} toRemove 
 */
listView.prototype.replaceTemplateImage = function(template, replaceBy, toRemove) {
    return template.replace(toRemove, replaceBy)
}

/**
 * generate list item
 * @param {number} id 
 * @param {number} itemNum 
 */
listView.prototype.generateItem = function(id, itemNum) {
    var itemData = dataService.data.series_list[_mainId].lists[itemNum]
    var itemContent = itemData['content']
    var title = itemContent['series']['title']
    var image = itemContent['images']['boxart']['url']
    var imdb = (itemContent['imdb']) ? itemContent['imdb']['rating'] : 'Not Available'


    var itemContainer = document.getElementById('listPage' + id).getElementsByTagName('ul')[0]
    var itemElement = document.createElement('li')
    itemElement.id = 'list' + itemNum
    itemElement.innerHTML =
        "<div class='focus_all'>" +
        "<div class='List_item_all_focused'>" +
        "<div class='list_image'><img src='" + image + "'></div>" +
        "<div class='description_bg' >" +
        "<div class='description_data'>" +
        "<div class='thumb_description'>" + title + '</div>' +

        '</div>' +
        '</div>' +
        "<div class='text_bg'>" +
        "<div class='bottom_text'>" +
        "<span class='thumb_title'>IMDB: " + imdb + '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        "<div class='normal_all'  style='display:none'>" +
        "<div class='List_item_all'>" +
        "<div class='list_image'><img src='" + image + "'></div>" +
        "<div class='text_bg'>" +
        "<div class='bottom_text'>" + title + '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '</li>'

    // add event for imgs to replace with placeholder image if we had problem in load images
    var _tempArray = itemElement.getElementsByTagName('img')
    var _length = _tempArray.length

    for (var i = 0; i < _length; i++) {
        _tempArray[i].addEventListener('error', this.loadErrorHandler, false)
    }

    itemContainer.appendChild(itemElement)

    // set to normal mode
    itemElement.getElementsByClassName('focus_all')[0].style.display = 'none'
    itemElement.getElementsByClassName('normal_all')[0].style.display = 'block'

    // add mouse event
    itemElement.addEventListener('mouseover', this.over, false)
    itemElement.addEventListener('mousedown', this.down, false)
}

/**
 * replace image source with the placeholder when we have trouble in load that
 * @param {error} event 
 */
listView.prototype.loadErrorHandler = function(event) {
    event.currentTarget.src = './assets/blank.svg'
}

/**
 * add events and generate indicator based on the pages
 */
listView.prototype.eventInitiate = function() {
    // generate indicator
    for (var i = 0; i < this.pageTotal; i++) {
        this.generateIndicator(i)
    }

    // no need to indicator
    if (this.pageTotal == 1) {
        document.getElementById('indicators').style.display = 'none'
        document.getElementById('arrow_right').style.display = 'none'
        document.getElementById('arrow_left').style.display = 'none'
    }

    // update list value
    _listFocus.pageMax = this.pageTotal
    _listFocus.menuMax = this.totalItemNum
    _listFocus.currentSet()

    //active focused item on indicator
    _listFocus.indicatorFocus()

    // arrows mouse events
    this.arrowRightButton.addEventListener('mouseover', this.arrowEvent, false)
    this.arrowRightButton.addEventListener('mouseout', this.arrowEvent, false)
    this.arrowRightButton.addEventListener('mousedown', this.arrowEvent, false)
    this.arrowLeftButton.addEventListener('mouseover', this.arrowEvent, false)
    this.arrowLeftButton.addEventListener('mouseout', this.arrowEvent, false)
    this.arrowLeftButton.addEventListener('mousedown', this.arrowEvent, false)
}

/**
 * generate indicator element
 * @param {number} id 
 */
listView.prototype.generateIndicator = function(id) {
    var addTarget = document.getElementById('indicators')
    var element = document.createElement('li')
    element.id = 'indicator' + id
    element.className = 'indicator_normal'
    addTarget.appendChild(element)
}

/**
 * add mouse event for arrow buttons
 * @param {mouse} event 
 */
listView.prototype.arrowEvent = function(event) {
    var arrow = event.currentTarget
    switch (event.type) {

        // mouse over on arrow left and right
        case 'mouseover':
            switch (event.currentTarget.id) {
                case 'arrow_right':
                    if (_listFocus.page == (_listFocus.pageMax - 1)) {
                        return
                    }
                    arrow.className = 'arrow_right_selected_all'
                    break
                case 'arrow_left':
                    if (_listFocus.page == 0) {
                        return
                    }
                    arrow.className = 'arrow_left_selected_all'
                    break
            }
            break

            // mouse out on arrow left and right
        case 'mouseout':
            switch (event.currentTarget.id) {
                case 'arrow_right':
                    if (_listFocus.page == (_listFocus.pageMax - 1)) {
                        return
                    }
                    arrow.className = 'arrow_right_focused_all'
                    break
                case 'arrow_left':
                    if (_listFocus.page == 0) {
                        return
                    }
                    arrow.className = 'arrow_left_focused_all'
                    break
            }
            break

            // mouse down on arrow left and right
        case 'mousedown':
            switch (event.currentTarget.id) {
                case 'arrow_right':
                    if (_listFocus.page == (_listFocus.pageMax - 1)) {
                        return
                    }
                    _listFocus.arrowLeft()
                    break
                case 'arrow_left':
                    if (_listFocus.page == 0) {
                        return
                    }
                    _listFocus.arrowRight()
                    break
            }
            break
    }
}

/**
 * mouse over handler
 */
listView.prototype.over = function(event) {
    if (_listFocus.mouseEvent == false) {
        return
    }

    var target = event.currentTarget
    _listFocus.focusIn(target.id)
}

/**
 * mouse down handler
 */
listView.prototype.down = function() {
    if (_listFocus.mouseEvent == false) {
        return
    }

    _listFocus.selectedHandler()
}

/**
 * remove page by set blank data to innerHTML
 */
listView.prototype.remove = function() {
    for (var i = 0; i < dataService.data.series_list[_mainId].lists.length; i++) {
        var target = document.getElementById('list' + i)
        if (target) {
            target.removeEventListener('mouseover', this.over, false)
            target.removeEventListener('mousedown', this.down, false)
        }
    }

    var listTarget = document.getElementById('ListContainer')
        // clear the target
    listTarget.innerHTML = ''
}

// export to make it accessible for test
exports._test = { listView }