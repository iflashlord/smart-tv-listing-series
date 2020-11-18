import { fireEvent, getByText, waitFor } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'

let _app = require('../features/detail/detailView.js');
let _detailView;
let _fakeData;
describe('detailView.js', () => {
    beforeEach(() => {
        document.body.innerHTML = '<section id="detail"> </section>';

        _fakeData = {
            "type": "series",
            "publicPath": "paradise-hotel",
            "content": {
                "images": {
                    "boxart": {
                        "url": "https://i-viaplay-com.akamaized.net/viaplay-prod/247/776/1599038480-56380436449fc0bc76cc7c9ce2fbd54ed907a036.jpg?width=199&height=298",
                        "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/247/776/1599038480-56380436449fc0bc76cc7c9ce2fbd54ed907a036.jpg{?width,height}"
                    },
                    "landscape": {
                        "url": "https://i-viaplay-com.akamaized.net/viaplay-prod/247/776/1599038480-1ee09fd92009ff8dcf481a26eb6a7ff09130969e.jpg?width=960&height=540",
                        "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/247/776/1599038480-1ee09fd92009ff8dcf481a26eb6a7ff09130969e.jpg{?width,height}"
                    },
                    "hero169": {
                        "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/183/96/1600356529-596b64676b2dc4843e95d11ac7d367c416f86356.jpg{?width,height}"
                    },
                    "coverart23": {
                        "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/247/776/1599038480-56380436449fc0bc76cc7c9ce2fbd54ed907a036.jpg{?width,height}"
                    },
                    "coverart169": {
                        "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/247/776/1599038480-1ee09fd92009ff8dcf481a26eb6a7ff09130969e.jpg{?width,height}"
                    }
                },
                "originalTitle": "Paradise Hotel Sverige",
                "people": {},
                "parentalRating": "15",
                "series": {
                    "title": "Paradise Hotel",
                    "synopsis": "Ett gäng av glödheta singlar checkar in på lyxhotellet i Mexiko. Förbered er på kärlek, fest, svekfulla pakter och tårar. En halv miljon kronor står på spel och precis allt kan hända i paradiset.",
                    "season": {
                        "title": "Paradise Hotel",
                        "availability": {
                            "svod": {
                                "start": "2020-09-20T22:01:00.000Z",
                                "end": "2023-09-01T22:00:00.000Z"
                            }
                        }
                    },
                    "availabilityInfo": "MÅN-ONS 16.00",
                    "seasons": 5,
                    "seriesGuid": "series-paradise-hotel-sverige"
                },
                "synopsis": "Ett gäng av glödheta singlar checkar in på lyxhotellet i Mexiko. Förbered er på kärlek, fest, svekfulla pakter och tårar. En halv miljon kronor står på spel och precis allt kan hända i paradiset.",
                "imdb": {
                    "id": "tt0478441",
                    "rating": "4.0",
                    "votes": "319",
                    "url": "http://www.imdb.com/title/tt0478441?ref_ext_viaplay"
                },
                "production": {
                    "year": 2013
                }
            },
            "user": {
                "starred": false
            },
            "system": {
                "availability": {
                    "start": "2018-09-03T16:50:00.000Z",
                    "end": "2021-01-01T22:59:00.000Z",
                    "planInfo": {
                        "isRental": false,
                        "isPurchase": false
                    },
                    "svod": {
                        "start": "2018-09-03T16:50:00.000Z",
                        "end": "2021-01-01T22:59:00.000Z",
                        "planInfo": {
                            "isRental": false,
                            "isPurchase": false
                        }
                    }
                },
                "flags": [],
                "guid": "series-paradise-hotel-sverige",
                "isKids": false
            },
            "_links": {
                "self": {
                    "title": "Paradise Hotel",
                    "href": "https://content.viaplay.se/pc-se/serier/paradise-hotel?partial=true"
                },
                "viaplay:page": {
                    "title": "Paradise Hotel",
                    "href": "https://content.viaplay.se/pc-se/serier/paradise-hotel"
                },
                "viaplay:templatedPage": {
                    "title": "Paradise Hotel",
                    "href": "https://content.viaplay.se/{deviceKey}/serier/paradise-hotel"
                },
                "viaplay:genres": [{
                    "title": "Reality",
                    "tagId": "108071975",
                    "href": "https://content.viaplay.se/pc-se/serier/reality"
                }],
                "viaplay:peopleSearch": {
                    "href": "https://content.viaplay.se/pc-se/search?query=\"{person}\"",
                    "templated": true
                }
            },
            "notice": {
                "message": "User must login to view content",
                "code": 1002,
                "_links": {
                    "curies": [{
                        "name": "viaplay",
                        "href": "http://docs.viaplay.tv/rel/{rel}",
                        "templated": true
                    }],
                    "viaplay:accountPurchasePackage": {
                        "href": "/package?recommended=viaplay",
                        "templated": false,
                        "redirect": false
                    }
                }
            }
        }

        _detailView = new _app._test.detailView()

    })


    it('check series detail render data', async() => {

        //global function requests
        window._focusType = "";
        window._detailFocus = {}
        _detailView.generate(_fakeData);

        await waitFor(() => {
            expect(_detailView.page.querySelector("#series_title h1").innerHTML).toEqual("Paradise Hotel")
        })

    })

    it('check about detail render data', async() => {

        //global function requests
        window._focusType = "";
        window._detailFocus = {}

        _detailView.generateAbout();

        await waitFor(() => {
            expect(_detailView.page.querySelector("#long_info h1").innerHTML).toEqual("About Viaplay")
        })

    })


})