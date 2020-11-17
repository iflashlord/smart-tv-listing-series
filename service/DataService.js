/**
 * DataService
 * manage and serve data based on the requests
 * use proxy method to remove the CROS limitation
 * have _isLocalDebug variable to manage local test
 */
function DataService() {
    this._isLocalDebug = false // set false in production

    PAGE = 0
    ROWS = 10

    if (this._isLocalDebug) {
        // LOCAL SIMULATE 8 PAGES WITH 75 ITEMS

        DATA_RESULT_000 = 'json/data_result_1.json' // page 1 stored local
        DATA_RESULT_001 = 'json/data_result_2.json' // page 2 stored local
        DATA_RESULT_002 = 'json/data_result_3.json' // page 3 stored local
        DATA_RESULT_003 = 'json/data_result_4.json' // page 4 stored local
        DATA_RESULT_004 = 'json/data_result_5.json' // page 5 stored local
        DATA_RESULT_005 = 'json/data_result_6.json' // page 6 stored local
        DATA_RESULT_006 = 'json/data_result_7.json' // page 7 stored local
        DATA_RESULT_007 = 'json/data_result_8.json' // page 8 stored local
    } else {
        // PRODUCTION 

        // Series list with the help of the proxy to eliminate the CROS limitation :)
        DATA_RESULT_0 = 'https://thingproxy.freeboard.io/fetch/' + encodeURI('https://content.viaplay.se/pc-se/serier/samtliga')

        // Series list without proxy it hast CROS limitation
        // DATA_RESULT_0 = "https://content.viaplay.se/pc-se/serier/samtliga"

    }

    // XMLHttpRequest browser api request
    this._request = new XMLHttpRequest()
    this._request.withCredentials = false

    // callback on complete 
    this.callBackOnComplete

    // callback on init 
    this.callBackInit

    // init loops 
    this.initLoops = 0

    // data model
    this.data = {
        series_list: new Array({
            name: 'Series List',
            page: 0, // currentPage
            pages: 0, // pageCount
            total: 0, // totalProductCount
            rows: 0, // pageCount
            lists: [], // _embedded -> viaplay:products
            status: '' // set as complete when a page loaded 
        })
    }

    this.firstDepth = 0
    this.secondDepth = -1

    DataService.instance = null
}

/**
 * make a new data service
 */
DataService.getInstance = function() {
    if (DataService.instance == null) {
        DataService.instance = new DataService()
    }
    return DataService.instance
}

/**
 *  data service constructor
 */
DataService.prototype.init = function() {
    if (this.initLoops == 1) {
        this.callBackInit = null
        this.callBackOnComplete()
        return
    }

    this.callBackInit = this.init
    this.getList(this.initLoops, -1)
    this.initLoops++
}

/**
 * get list inf data 
 * @param {number} first 
 * @param {number} second 
 */
DataService.prototype.getList = function(first, second) {
    this.firstDepth = parseInt(first)
    this.secondDepth = parseInt(second)

    // define request url
    var url
    if (this.secondDepth == -1) {
        if (this._isLocalDebug == false) {
            url = eval('DATA_RESULT_' + first)
            url = url + '?pageNumber=' + (PAGE + 1) + '&productsPerPage=' + ROWS
        } else {
            url = eval('DATA_RESULT_0' + this.firstDepth + '' + PAGE)
        }
    } else {
        if (this._isLocalDebug == false) {
            url = eval('DATA_RESULT_' + first)
            url = url + '?pageNumber=' + (PAGE + 1) + '&productsPerPage=' + ROWS
        } else {
            url = eval('DATA_RESULT_0' + first + '' + PAGE)
        }
    }

    DataService.getInstance().loadData(url)
}

/**
 * update page number
 * @param {number} first 
 * @param {number} pageNum 
 */
DataService.prototype.updatePage = function(first, pageNum) {
    if (
        // this.firstDepth != 4 &&
        this.data.series_list[first].lists.length != 0 &&
        this.data.series_list[first].lists.length == this.data.series_list[first].total
    ) {
        if (((this.callBackOnComplete) == undefined)) {
            return
        }

        // parsing complete call back
        this.callBackOnComplete()

        return
    }

    PAGE = parseInt(pageNum)
    this.getList(first, 0)
}

/**
 * load data
 * @param {*} url 
 */
DataService.prototype.loadData = function(url) {
    this._request.onreadystatechange = function() {
        var req = DataService.getInstance()._request

        // if everything is alright! 
        if (req.readyState == 4 && req.status == 200) {
            var responseText = req.responseText

            // clear event
            DataService.getInstance()._request.onreadystatechange = null

            // parse loaded data
            DataService.getInstance().parseData(responseText)
        }
    }

    // get request
    this._request.open('GET', url, true)
    this._request.send(null)
}

/**
 * parse and handel call back
 * @param {string} text 
 */
DataService.prototype.parseData = function(text) {
    this.updateData(text)

    if (this.callBackInit != undefined) {
        this.callBackInit()
        return
    }

    if (this.callBackOnComplete == undefined) {
        return
    }

    // run call back function
    this.callBackOnComplete()
}

/**
 * json data to parse and set to our data model
 * @param {string} text 
 */
DataService.prototype.updateData = function(text) {
    if (this._isLocalDebug == true) {
        ROWS = 10
    }

    if (PAGE == 0) {
        this.data.series_list[this.firstDepth].lists = []
    }

    var jsonData = {}
    jsonData = JSON.parse(text)

    // base data json select
    var listItems = jsonData._embedded['viaplay:blocks'][0]._embedded['viaplay:products']
    var listData = jsonData._embedded['viaplay:blocks'][0]

    // set current page
    this.data.series_list[this.firstDepth].page = listData.currentPage

    // set total
    this.data.series_list[this.firstDepth].total = listData.totalProductCount - 1

    // calculate rows
    // var totalRows = this.data.series_list[this.firstDepth].total

    // the rest of that
    // var rest = ((totalRows % 10) == 0) ? 0 : 1

    // calculate pages
    // this.data.series_list[this.firstDepth].pages = ((totalRows - (totalRows % 10)) / 10) + rest

    // use from json
    this.data.series_list[this.firstDepth].pages = listData.pageCount

    for (var i = 0; i < listItems.length; i++) {
        this.data.series_list[this.firstDepth].lists.push(listItems[i])
    }

    if (this.data.series_list[this.firstDepth].lists.length == this.data.series_list[this.firstDepth].total) {
        this.data.series_list[this.firstDepth].status = 'complete'
    }
}