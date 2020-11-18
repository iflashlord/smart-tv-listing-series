function detailView() {
    this.page
}
/**
 * replace template in url with specific query string
 * @param {string} template 
 * @param {string} replaceBy 
 * @param {string} toRemove 
 */
detailView.prototype.replaceTemplateImage = function(template, replaceBy, toRemove) {
    return template.replace(toRemove, replaceBy)
}

/**
 * generate detail view
 */
detailView.prototype.generate = function(data) {
    var itemData;
    // make code testable
    if (data) {
        itemData = data;
    } else {
        itemData = dataService.data.series_list[_mainId].lists[_detailId]
    }

    // get item data from data model

    var itemContent = itemData['content'] || []

    // ready data to use
    var title = itemContent['series']['title']
    var originalTitle = itemContent['originalTitle'] || title
    var synopsis = itemContent['synopsis']
    var actors = itemContent['people']['actors'] || ['Not Available']
    actors = actors.join(', ')

    var participants = itemContent['people']['participants'] || ['Not Available']
    participants = participants.join(', ')

    var production = itemContent['production']['year']
    var seasons = itemContent['series']['seasons']
    var imdb = (itemContent['imdb']) ? itemContent['imdb']['rating'] : 'Not Available'
    var cover_template = itemContent['images']['coverart23']['template']
    var cover = this.replaceTemplateImage(cover_template, '?width=400', '{?width,height}')

    // set current focus
    _focusType = 'detail'

    this.page = document.getElementById('detail')

    // html template
    this.page.innerHTML = "<div class='bg_overlay'>" +
        "<div id='backButton' class='backButton'></div>" +

        "<div id='series_info' class='series_content'> " +

        "<div id='series_title' class='series_title'> " +
        '<h1>' + title + '</h1>' +
        '<h4> Production: ' + production +

        ' | Seasons: ' + seasons +

        ' </h4>' +
        '</div>' +

        "<div id='series_imdb' class='series_imdb'> " +
        '<h3>IMDB: ' + imdb + '</h3>' +
        '</div>' +

        "<div id='series_cover' class='series_cover'> " +
        "<img src='" + cover + "' />" +
        '</div>' +

        "<div id='detailScroll' class='scroll_long_scroll series'> </div>" +
        "<div id='detailInfo' class='scroll_long_container series'  >" +
        "<table id='long_info' class='scroll_long_content series' >" +
        ' <tbody>' +
        ' <tr>' +
        " <td valign='top'>" +

        '<p>' +
        '<h3>Synopsis: </h3>' +
        synopsis +
        '<br/>' +

        '<br/>' +
        '<h3>Actors: </h3>' +
        actors +
        '<br/>' +

        '<br/>' +
        '<h3>Participants: </h3>' +
        participants +
        '<br/>' +

        '<br/>' +
        '<h3>Original Title: </h3>' +
        originalTitle +
        '<br/><br/>' +

        '</p>' +

        '</td></tr></tbody></table>' +

        '</div></div>' +

        "<div id='backButtonBottom' class='backButtonBottom'> </div>" +

        '</div>'

    // add event for imgs to replace with placeholder image if we had problem in load images
    var _tempArray = this.page.getElementsByTagName('img')
    var _length = _tempArray.length

    for (var i = 0; i < _length; i++) {
        _tempArray[i].addEventListener('error', this.loadErrorHandler, false)
    }

    // set back button evebts
    this.backButtonH = document.getElementById('backButton')
    this.backButtonH.addEventListener('mousedown', this.backButtonFunc, false)

    var backButtonDownLeft = document.getElementById('backButtonBottom')
    backButtonDownLeft.addEventListener('mousedown', this.backButtonFunc, false)

    var long_info = document.getElementById('long_info')

    // active scroll section if needed
    if (long_info.offsetHeight > 450) {
        // custom scroll bar 
        _detailScroll = new ScrollBarCustom('detailScroll', 'detailScrollAPI')
        _detailScroll.x = 370
        _detailScroll.y = 100
        _detailScroll.thumbRatio = 0.2
        _detailScroll.trackHeight = 370
        _detailScroll.trackColor = '#aaaaaa'
        _detailScroll.thumbColor = '#db016b'
        _detailScroll.init()
        _detailScroll.updateCallBack = this.detailScrollMoveHandler
        _detailScroll.updateMouseUp = this.detailScrollUp
        _detailScroll.thumb.addEventListener('mouseover', this.over, false)
        _detailFocus.menu2 = document.getElementById('detailScroll')
        _detailFocus.menuMax = 2

        document.getElementById('detailInfo').addEventListener('mouseover', this.over, false)

        _detailFocus.focusIn(2)
    } else {
        _detailFocus.menuMax = 2
    }
}

/**
 * generate about page with static data about the company
 */
detailView.prototype.generateAbout = function() {
    _focusType = 'detail'

    this.page = document.getElementById('detail')

    this.page.innerHTML = "<div class='bg_overlay'>" +
        "<div id='backButton' class='backButton'></div>" +

        "<div id='about_info' class='about_content'> " +

        "<div id='detailScroll' class='scroll_long_scroll about'> </div>" +
        "<div id='detailInfo' class='scroll_long_container about'  >" +
        "<table id='long_info' class='scroll_long_content about' >" +
        ' <tbody>' +
        ' <tr>' +
        " <td valign='top'>" +

        '<p>' +
        '<h1>About Viaplay</h1> ' +
        '<h3>Viaplay is NENT Group’s premium online video streaming service and a leading on-demand streaming service in the Nordics.</h3>' +

        'Available in Sweden, Norway, Denmark, Finland and Iceland, Viaplay offers live sports, the latest international TV releases, original drama, all-time classics and film premieres, as well as kids’ most-loved animation and series.' +

        'Viaplay is available through its own website, connected TVs, smartphone and tablet apps (Android or iOS), games consoles and devices like Apple TV and Google Chromecast.' +
        'A European OTT pioneer, Viaplay offers the full range of on-demand products, including EST via Viaplay Rent & Buy and TVOD sports packages.' +

        "Our data-driven approach enables us to design and develop products and services with simplicity and clarity at their centre, putting our audiences' experience first." +
        '<br /><br />' +
        '<h3>Viaplay Sweden</h3> ' +

        'Viaplay in Sweden is available via subscription. It is home to Viaplay Originals, Hollywood drama, animation and the best of sports, including UEFA Champions League, Premier League, Formula 1, NFL and NHL.' +
        '<br /><br />' +
        '<h3>Viaplay Norway </h3> ' +

        'Viaplay in Norway is available via subscription. Platform’s first Norwegian series ‘Occupied’ (‘Okkupert) Season 2 is based on the original idea by the internationally bestselling crime novelist from Norway, Jo Nesbø.' +
        '<br /><br />' +
        '<h3>Viaplay Denmark</h3> ' +

        'Viaplay in Denmark is available via subscription or for free to Waoo subscribers. It is home to the best of Hollywood series, Viaplay Originals, high quality Nordic drama and sports, including UEFA Champions League, Premier League, Formula 1, NFL and World Boxing Super Series.' +
        '<br /><br />' +
        '<h3>Viaplay Finland </h3> ' +

        'Viaplay in Finland is available via subscription and offers film, series and sports subscriptions, including a Fighting Package. It is home to KHL, Premier League and World Boxing Super Series.        ' +
        '<br /><br />' +
        '<h3>Viaplay Iceland</h3> ' +

        'Viaplay viewers in Iceland can enjoy a unique combination of Viaplay Originals, films and series, and kids content, with world-class live sports to come. Viaplay is available in Iceland through direct subscriptions or third-party partnerships.' +

        '</p>' +

        '</td></tr></tbody></table>' +

        '</div></div>' +

        "<div id='backButtonBottom' class='backButtonBottom'> </div>" +

        '</div>'

    // add event for imgs to replace with placeholder image if we had problem in load images
    var _tempArray = this.page.getElementsByTagName('img')
    var _length = _tempArray.length

    for (var i = 0; i < _length; i++) {
        _tempArray[i].addEventListener('error', this.loadErrorHandler, false)
    }

    // set back button event
    this.backButtonH = document.getElementById('backButton')
    this.backButtonH.addEventListener('mousedown', this.backButtonFunc, false)

    var backButtonDownLeft = document.getElementById('backButtonBottom')
    backButtonDownLeft.addEventListener('mousedown', this.backButtonFunc, false)

    var long_info = document.getElementById('long_info')

    // active scroll section  if needed
    if (long_info.offsetHeight > 450) {

        // custom scroll bar 
        _detailScroll = new ScrollBarCustom('detailScroll', 'detailScrollAPI')
        _detailScroll.x = 0
        _detailScroll.y = 80
        _detailScroll.thumbRatio = 0.2
        _detailScroll.trackHeight = 370
        _detailScroll.trackColor = '#aaaaaa'
        _detailScroll.thumbColor = '#db016b'
        _detailScroll.init()
        _detailScroll.updateCallBack = this.detailScrollMoveHandler
        _detailScroll.updateMouseUp = this.detailScrollUp
        _detailScroll.thumb.addEventListener('mouseover', this.over, false)
        _detailFocus.menu2 = document.getElementById('detailScroll')
        _detailFocus.menuMax = 2

        document.getElementById('detailInfo').addEventListener('mouseover', this.over, false)

        _detailFocus.focusIn(2)
    } else {
        _detailFocus.menuMax = 2
    }
}

/**
 * back button event
 * @param {mouse} event 
 */
detailView.prototype.backButtonFunc = function(event) {
    if (event.target.className == 'backButton' || event.target.className == 'backButtonBottom') {
        _footerView.backClick()
    }
}

/**
 * replace image source with the placeholder when we have trouble in load that
 * @param {error} event 
 */
detailView.prototype.loadErrorHandler = function(event) {
    event.currentTarget.src = './assets/blank.svg'
}

/**
 * back button event based on the scope
 */
detailView.prototype.backButtonEvent = function() {
    this.scope.remove()
}

/**
 * movement data by set the top in absolute position
 */
detailView.prototype.detailScrollMoveHandler = function() {
    var moveTarget = document.getElementById('long_info')
    moveTarget.style.top = (_detailScroll.getThumbPositionY() * (moveTarget.offsetHeight - 370)) * -1 + 'px'
}

/**
 * scroll up detail
 */
detailView.prototype.detailScrollUp = function() {
    var moveTarget = document.getElementById('long_info')
    _detailFocus.pagePosition = parseInt(moveTarget.style.top)
}

/**
 * destroy scroll and events
 */
detailView.prototype.detailScrollRemove = function() {
    var removeScroll = document.getElementById('detailScrollAPI')

    if (removeScroll) {
        _detailFocus.menuMax = 2
        _detailFocus.menu2 = null
        _detailScroll.thumb.removeEventListener('mouseover', _detailView.over, false)
        _detailScroll.destroy()
        removeScroll.parentNode.removeChild(removeScroll)
    }
}

/**
 * mouse over focus event
 * @param {mouse} event 
 */
detailView.prototype.over = function(event) {
    _detailFocus.menuId = 2
    _detailFocus.focusIn(2)
}

/**
 * remove page by set blank data to innerHTML
 */
detailView.prototype.remove = function() {
    // remove the scroll section
    this.detailScrollRemove()

    // clear the page
    this.page.innerHTML = ''

    switch (_pageType) {
        case 'main':
            _mainFocus.focusIn(_mainFocus.menuX, _mainFocus.menuY)
            break
        case 'list':
            _listFocus.focusIn('list' + _listFocus.menuId)
            break

    }
}

// export to make it accessible for test
exports._test = { detailView }