import { fireEvent, getByText, waitFor } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'

let _app = require('../features/list/listView.js');
let _listView;
let _fakeData;
describe('listView.js', () => {
    beforeEach(() => {
        document.body.innerHTML = `
        <div id="header">Header</div>
        <ul id='location'>
            <li id='location-first' class='main'>Home</li>
            <li class="arrow"></li>
            <li id='location-next' class='sub'></li>
        </ul>
        <section id='ListContainer'> 
        
        </section>`;

        _fakeData = [{
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
            },
            {
                "type": "series",
                "publicPath": "greys-anatomy",
                "content": {
                    "images": {
                        "boxart": {
                            "url": "https://i-viaplay-com.akamaized.net/viaplay-prod/990/580/1601988235-2e6920a94b2b30019f47c286074c93ecdc0407d0.jpg?width=199&height=298&template=abcstudios",
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/990/580/1601988235-2e6920a94b2b30019f47c286074c93ecdc0407d0.jpg{?width,height}&template=abcstudios"
                        },
                        "landscape": {
                            "url": "https://i-viaplay-com.akamaized.net/viaplay-prod/440/976/1603974960-2dad0c0eef922590320e519ed36a633af15f49a6.jpg?width=960&height=540&template=abcstudios",
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/440/976/1603974960-2dad0c0eef922590320e519ed36a633af15f49a6.jpg{?width,height}&template=abcstudios"
                        },
                        "hero169": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/990/580/1601988205-4bc81439d53bcc4a66de4b8c67597cca536d2cc6.jpg{?width,height}"
                        },
                        "coverart23": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/990/580/1601988235-2e6920a94b2b30019f47c286074c93ecdc0407d0.jpg{?width,height}&template=abcstudios"
                        },
                        "coverart169": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/440/976/1603974960-2dad0c0eef922590320e519ed36a633af15f49a6.jpg{?width,height}&template=abcstudios"
                        }
                    },
                    "people": {
                        "actors": [
                            "Ellen Pompeo",
                            "Justin Chambers",
                            "Chandra Wilson",
                            "James Pickens Jr.",
                            "Patrick Dempsey",
                            "Kevin McKidd",
                            "Jesse Williams",
                            "Jessica Capshaw",
                            "Sandra Oh",
                            "Sarah Drew",
                            "Camilla Luddington",
                            "Caterina Scorsone",
                            "Kelly McCreary",
                            "Giacomo Gianniotti",
                            "Eric Dane"
                        ],
                        "participants": [
                            "Ellen Pompeo",
                            "Justin Chambers",
                            "Chandra Wilson",
                            "James Pickens Jr.",
                            "Patrick Dempsey",
                            "Kevin McKidd",
                            "Jesse Williams",
                            "Jessica Capshaw",
                            "Sandra Oh",
                            "Sarah Drew",
                            "Camilla Luddington",
                            "Caterina Scorsone",
                            "Kelly McCreary",
                            "Giacomo Gianniotti",
                            "Eric Dane"
                        ]
                    },
                    "parentalRating": "12",
                    "series": {
                        "title": "Grey's Anatomy",
                        "synopsis": "Flerfaldigt prisbelönad och högt rankad dramaserie. Läkarna på Seattle Grace Hospital hanterar dagligen liv och död medan de finner tröst, vänskap och romantik hos varandra.",
                        "season": {
                            "title": "Grey's Anatomy",
                            "availability": {
                                "svod": {
                                    "start": "2020-11-04T23:00:00.000Z",
                                    "end": "2021-11-04T23:00:00.000Z"
                                }
                            }
                        },
                        "seasons": 16,
                        "seriesGuid": "series-greys-anatomy"
                    },
                    "synopsis": "Flerfaldigt prisbelönad och högt rankad dramaserie. Läkarna på Seattle Grace Hospital hanterar dagligen liv och död medan de finner tröst, vänskap och romantik hos varandra.",
                    "imdb": {
                        "id": "tt0413573",
                        "rating": "7.6",
                        "votes": "242 614",
                        "url": "http://www.imdb.com/title/tt0413573?ref_ext_viaplay"
                    },
                    "production": {
                        "year": 2005
                    }
                },
                "user": {
                    "starred": false
                },
                "system": {
                    "availability": {
                        "start": "2020-05-04T22:00:00.000Z",
                        "end": "2021-11-04T23:00:00.000Z",
                        "planInfo": {
                            "isRental": false,
                            "isPurchase": false
                        },
                        "svod": {
                            "start": "2020-05-04T22:00:00.000Z",
                            "end": "2021-11-04T23:00:00.000Z",
                            "planInfo": {
                                "isRental": false,
                                "isPurchase": false
                            }
                        }
                    },
                    "flags": [],
                    "guid": "series-greys-anatomy",
                    "isKids": false
                },
                "_links": {
                    "self": {
                        "title": "Grey's Anatomy",
                        "href": "https://content.viaplay.se/pc-se/serier/greys-anatomy?partial=true"
                    },
                    "viaplay:page": {
                        "title": "Grey's Anatomy",
                        "href": "https://content.viaplay.se/pc-se/serier/greys-anatomy"
                    },
                    "viaplay:templatedPage": {
                        "title": "Grey's Anatomy",
                        "href": "https://content.viaplay.se/{deviceKey}/serier/greys-anatomy"
                    },
                    "viaplay:genres": [{
                            "title": "Drama",
                            "tagId": "98856440",
                            "href": "https://content.viaplay.se/pc-se/serier/drama"
                        },
                        {
                            "title": "Romantik",
                            "tagId": "99368206",
                            "href": "https://content.viaplay.se/pc-se/store/romantik"
                        }
                    ],
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
            },
            {
                "type": "series",
                "publicPath": "lyckoviken",
                "content": {
                    "images": {
                        "boxart": {
                            "url": "https://i-viaplay-com.akamaized.net/viaplay-prod/435/60/1600260180-1fdf519a914a5edd6ddef07a57eecd39f12ae337.jpg?width=199&height=298",
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/435/60/1600260180-1fdf519a914a5edd6ddef07a57eecd39f12ae337.jpg{?width,height}"
                        },
                        "landscape": {
                            "url": "https://i-viaplay-com.akamaized.net/viaplay-prod/435/60/1600260180-7a95d560a96c774ddea3b6a0b90ba0e1bbdf72d8.jpg?width=960&height=540",
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/435/60/1600260180-7a95d560a96c774ddea3b6a0b90ba0e1bbdf72d8.jpg{?width,height}"
                        },
                        "hero169": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/435/60/1600948848-23be3bd2ce5c4a9cba8925a1d47324164b3c181a.jpg{?width,height}"
                        },
                        "coverart23": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/435/60/1600260180-1fdf519a914a5edd6ddef07a57eecd39f12ae337.jpg{?width,height}"
                        },
                        "coverart169": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/435/60/1600260180-7a95d560a96c774ddea3b6a0b90ba0e1bbdf72d8.jpg{?width,height}"
                        }
                    },
                    "people": {
                        "actors": [
                            "Disa Östrand",
                            "Linda Santiago",
                            "Daniel Adolfsson",
                            "Jacques Karlberg",
                            "Ia Langhammer",
                            "Peter Lorentzon",
                            "Ella Rappich",
                            "Martin Stenmarck",
                            "Anna Söderling",
                            "Felicia Truedsson",
                            "Mirja Turestedt",
                            "Lars Väringer",
                            "Christopher Wollter",
                            "Emil Algpeus",
                            "Emma Broomé",
                            "Arman Fanni",
                            "Alexander Karim",
                            "Amanda Lindh"
                        ],
                        "participants": [
                            "Disa Östrand",
                            "Linda Santiago",
                            "Daniel Adolfsson",
                            "Jacques Karlberg",
                            "Ia Langhammer",
                            "Peter Lorentzon",
                            "Ella Rappich",
                            "Martin Stenmarck",
                            "Anna Söderling",
                            "Felicia Truedsson",
                            "Mirja Turestedt",
                            "Lars Väringer",
                            "Christopher Wollter",
                            "Emil Algpeus",
                            "Emma Broomé",
                            "Arman Fanni",
                            "Alexander Karim",
                            "Amanda Lindh"
                        ]
                    },
                    "parentalRating": "15",
                    "series": {
                        "title": "Lyckoviken",
                        "synopsis": "Polisen Johanna återvänder till hemorten Hammarvik för sin mors begravning, samtidigt som liket efter en försvunnen flicka hittas i den lilla idyllen där alla verkar bära på hemligheter…",
                        "season": {
                            "title": "Lyckoviken",
                            "availability": {
                                "svod": {
                                    "start": "2020-10-19T22:01:00.000Z",
                                    "end": "2030-10-19T22:00:00.000Z"
                                }
                            }
                        },
                        "availabilityInfo": "TIS",
                        "seasons": 1,
                        "seriesGuid": "series-lyckoviken"
                    },
                    "synopsis": "Polisen Johanna återvänder till hemorten Hammarvik för sin mors begravning, samtidigt som liket efter en försvunnen flicka hittas i den lilla idyllen där alla verkar bära på hemligheter…",
                    "production": {
                        "year": 2020
                    }
                },
                "user": {
                    "starred": false
                },
                "system": {
                    "availability": {
                        "start": "2020-10-20T02:00:00.000Z",
                        "end": "2030-10-19T22:00:00.000Z",
                        "planInfo": {
                            "isRental": false,
                            "isPurchase": false
                        },
                        "svod": {
                            "start": "2020-10-20T02:00:00.000Z",
                            "end": "2030-10-19T22:00:00.000Z",
                            "planInfo": {
                                "isRental": false,
                                "isPurchase": false
                            }
                        }
                    },
                    "flags": [],
                    "guid": "series-lyckoviken",
                    "isKids": false
                },
                "_links": {
                    "self": {
                        "title": "Lyckoviken",
                        "href": "https://content.viaplay.se/pc-se/serier/lyckoviken?partial=true"
                    },
                    "viaplay:page": {
                        "title": "Lyckoviken",
                        "href": "https://content.viaplay.se/pc-se/serier/lyckoviken"
                    },
                    "viaplay:templatedPage": {
                        "title": "Lyckoviken",
                        "href": "https://content.viaplay.se/{deviceKey}/serier/lyckoviken"
                    },
                    "viaplay:genres": [{
                            "title": "Drama",
                            "tagId": "98856440",
                            "href": "https://content.viaplay.se/pc-se/serier/drama"
                        },
                        {
                            "title": "Kriminaldrama",
                            "tagId": "99368197",
                            "href": "https://content.viaplay.se/pc-se/serier/kriminaldrama"
                        }
                    ],
                    "viaplay:peopleSearch": {
                        "href": "https://content.viaplay.se/pc-se/search?query=\"{person}\"",
                        "templated": true
                    },
                    "viaplay:trailerStream": {
                        "href": "https://play.viaplay.se/api/stream/byguid{?deviceId,deviceName,deviceType,userAgent,deviceKey,availabilityContext,cmaf,cse}&guid=10-5240-2228-1750-1987-5089-BC80-S&returnurl=https%3A%2F%2Fcontent.viaplay.se%2Fpc-se%2Fserier%2Fsamtliga%3FpageNumber%3D1%26productsPerPage%3D10&producturl=https%3A%2F%2Fcontent.viaplay.se%2Fpc-se%2Fbyguid%2F10-5240-2228-1750-1987-5089-BC80-S%3FparentProgramGuid%3Dseries-lyckoviken&templatedproducturl=https%3A%2F%2Fcontent.viaplay.se%2F%7BdeviceKey%7D%2Fbyguid%2F10-5240-2228-1750-1987-5089-BC80-S%3FparentProgramGuid%3Dseries-lyckoviken&sectionPath=%2Fserier&defaultAvailabilityContext=svod",
                        "templated": true
                    },
                    "viaplay:trailerSelf": {
                        "title": "Lyckoviken",
                        "href": "https://content.viaplay.se/pc-se/byguid/10-5240-2228-1750-1987-5089-BC80-S?parentProgramGuid=series-lyckoviken&partial=true"
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
            },
            {
                "type": "series",
                "publicPath": "hawaii-five-0",
                "content": {
                    "images": {
                        "boxart": {
                            "url": "https://i-viaplay-com.akamaized.net/viaplay-prod/569/760/1562165585-a9a9f530b29dc8ea6da29c07c669b97c86404782.jpg?width=199&height=298",
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/569/760/1562165585-a9a9f530b29dc8ea6da29c07c669b97c86404782.jpg{?width,height}"
                        },
                        "landscape": {
                            "url": "https://i-viaplay-com.akamaized.net/viaplay-prod/569/760/1562165583-ea7339ff5b7ebaeb57f13f3ffa112632747c98a9.jpg?width=960&height=540",
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/569/760/1562165583-ea7339ff5b7ebaeb57f13f3ffa112632747c98a9.jpg{?width,height}"
                        },
                        "hero169": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/569/760/1589974624-95bd5479f798d9cbd02a28a3c914987666729a4c.jpg{?width,height}"
                        },
                        "coverart23": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/569/760/1562165585-a9a9f530b29dc8ea6da29c07c669b97c86404782.jpg{?width,height}"
                        },
                        "coverart169": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/569/760/1562165583-ea7339ff5b7ebaeb57f13f3ffa112632747c98a9.jpg{?width,height}"
                        }
                    },
                    "people": {
                        "actors": [
                            "Alex O'Loughlin",
                            "Scott Caan",
                            "Daniel Dae Kim",
                            "Grace Park",
                            "Taylor Wily",
                            "Chi McBride",
                            "Dennis Chun",
                            "Masi Oka",
                            "Jorge Garcia",
                            "Ian Anthony Dale"
                        ],
                        "participants": [
                            "Alex O'Loughlin",
                            "Scott Caan",
                            "Daniel Dae Kim",
                            "Grace Park",
                            "Taylor Wily",
                            "Chi McBride",
                            "Dennis Chun",
                            "Masi Oka",
                            "Jorge Garcia",
                            "Ian Anthony Dale"
                        ]
                    },
                    "parentalRating": "12",
                    "series": {
                        "title": "Hawaii Five-0",
                        "synopsis": "Kriminalinspektören Steve McGarrett återvänder till Oahu för att utreda mordet på sin far och övertalas av guvernören att stanna för att att leda en ny specialstyrka.",
                        "season": {
                            "title": "Hawaii Five-0",
                            "availability": {
                                "svod": {
                                    "start": "2020-07-05T18:00:00.000Z",
                                    "end": "2022-05-31T21:59:00.000Z"
                                }
                            }
                        },
                        "seasons": 9,
                        "seriesGuid": "series-hawaii-five-0"
                    },
                    "synopsis": "Kriminalinspektören Steve McGarrett återvänder till Oahu för att utreda mordet på sin far och övertalas av guvernören att stanna för att att leda en ny specialstyrka.",
                    "imdb": {
                        "id": "tt1600194",
                        "rating": "7.3",
                        "votes": "65 965",
                        "url": "http://www.imdb.com/title/tt1600194?ref_ext_viaplay"
                    },
                    "production": {
                        "year": 2010
                    }
                },
                "user": {
                    "starred": false
                },
                "system": {
                    "availability": {
                        "start": "2020-07-05T18:00:00.000Z",
                        "end": "2022-05-31T21:59:00.000Z",
                        "planInfo": {
                            "isRental": false,
                            "isPurchase": false
                        },
                        "svod": {
                            "start": "2020-07-05T18:00:00.000Z",
                            "end": "2022-05-31T21:59:00.000Z",
                            "planInfo": {
                                "isRental": false,
                                "isPurchase": false
                            }
                        }
                    },
                    "flags": [],
                    "guid": "series-hawaii-five-0",
                    "isKids": false
                },
                "_links": {
                    "self": {
                        "title": "Hawaii Five-0",
                        "href": "https://content.viaplay.se/pc-se/serier/hawaii-five-0?partial=true"
                    },
                    "viaplay:page": {
                        "title": "Hawaii Five-0",
                        "href": "https://content.viaplay.se/pc-se/serier/hawaii-five-0"
                    },
                    "viaplay:templatedPage": {
                        "title": "Hawaii Five-0",
                        "href": "https://content.viaplay.se/{deviceKey}/serier/hawaii-five-0"
                    },
                    "viaplay:genres": [{
                            "title": "Drama",
                            "tagId": "98856440",
                            "href": "https://content.viaplay.se/pc-se/serier/drama"
                        },
                        {
                            "title": "Kriminaldrama",
                            "tagId": "99368197",
                            "href": "https://content.viaplay.se/pc-se/serier/kriminaldrama"
                        }
                    ],
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
            },
            {
                "type": "series",
                "publicPath": "vampire-diaries-the",
                "content": {
                    "images": {
                        "boxart": {
                            "url": "https://i-viaplay-com.akamaized.net/viaplay-prod/986/456/1542721791-7f9b125fad38acee5b2cb7622bba4e5299627b5e.jpg?width=199&height=298",
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/986/456/1542721791-7f9b125fad38acee5b2cb7622bba4e5299627b5e.jpg{?width,height}"
                        },
                        "landscape": {
                            "url": "https://i-viaplay-com.akamaized.net/viaplay-prod/444/784/TheVampireDiaries8_Packshot.jpg?width=960&height=540",
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/444/784/TheVampireDiaries8_Packshot.jpg{?width,height}"
                        },
                        "hero169": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/444/784/TheVampireDiaries8_Hero.jpg{?width,height}"
                        },
                        "coverart23": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/986/456/1542721791-7f9b125fad38acee5b2cb7622bba4e5299627b5e.jpg{?width,height}"
                        },
                        "coverart169": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/444/784/TheVampireDiaries8_Packshot.jpg{?width,height}"
                        }
                    },
                    "originalTitle": "Vampire Diaries, The",
                    "people": {
                        "actors": [
                            "Paul Wesley",
                            "Ian Somerhalder",
                            "Kat Graham",
                            "Candice King",
                            "Zach Roerig",
                            "Michael Trevino",
                            "Nina Dobrev",
                            "Steven R. McQueen"
                        ],
                        "participants": [
                            "Paul Wesley",
                            "Ian Somerhalder",
                            "Kat Graham",
                            "Candice King",
                            "Zach Roerig",
                            "Michael Trevino",
                            "Nina Dobrev",
                            "Steven R. McQueen"
                        ]
                    },
                    "parentalRating": "15",
                    "series": {
                        "title": "The Vampire Diaries",
                        "synopsis": "Två vampyrbröder, en ond och en god, återvänder till hemstaden Mystic Falls. Där förälskar de sig i samma tjej, Elena. Kampen är ett faktum och nu är det upp till Elena – vem ska hon välja?",
                        "season": {
                            "title": "The Vampire Diaries",
                            "availability": {
                                "svod": {
                                    "start": "2019-12-01T23:00:00.000Z",
                                    "end": "2020-12-31T23:00:00.000Z"
                                }
                            }
                        },
                        "seasons": 8,
                        "seriesGuid": "series-vampire-diaries-the"
                    },
                    "synopsis": "Två vampyrbröder, en ond och en god, återvänder till hemstaden Mystic Falls. Där förälskar de sig i samma tjej, Elena. Kampen är ett faktum och nu är det upp till Elena – vem ska hon välja?",
                    "imdb": {
                        "id": "tt1405406",
                        "rating": "7.7",
                        "votes": "277 839",
                        "url": "http://www.imdb.com/title/tt1405406?ref_ext_viaplay"
                    },
                    "production": {
                        "year": 2009
                    }
                },
                "user": {
                    "starred": false
                },
                "system": {
                    "availability": {
                        "start": "2019-11-30T23:00:00.000Z",
                        "end": "2021-05-31T22:00:00.000Z",
                        "planInfo": {
                            "isRental": false,
                            "isPurchase": false
                        },
                        "svod": {
                            "start": "2019-11-30T23:00:00.000Z",
                            "end": "2021-05-31T22:00:00.000Z",
                            "planInfo": {
                                "isRental": false,
                                "isPurchase": false
                            }
                        }
                    },
                    "flags": [],
                    "guid": "series-vampire-diaries-the",
                    "isKids": false
                },
                "_links": {
                    "self": {
                        "title": "The Vampire Diaries",
                        "href": "https://content.viaplay.se/pc-se/serier/vampire-diaries-the?partial=true"
                    },
                    "viaplay:page": {
                        "title": "The Vampire Diaries",
                        "href": "https://content.viaplay.se/pc-se/serier/vampire-diaries-the"
                    },
                    "viaplay:templatedPage": {
                        "title": "The Vampire Diaries",
                        "href": "https://content.viaplay.se/{deviceKey}/serier/vampire-diaries-the"
                    },
                    "viaplay:genres": [{
                            "title": "Drama",
                            "tagId": "98856440",
                            "href": "https://content.viaplay.se/pc-se/serier/drama"
                        },
                        {
                            "title": "Thriller",
                            "tagId": "99368200",
                            "href": "https://content.viaplay.se/pc-se/serier/thriller"
                        }
                    ],
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
            },
            {
                "type": "series",
                "publicPath": "i-huvudet-pa-en-mordare",
                "content": {
                    "images": {
                        "boxart": {
                            "url": "https://i-viaplay-com.akamaized.net/viaplay-prod/1012/356/1602747394-53eabb6ce52f834bd6ca48da91b6e53e48ccad52.jpg?width=199&height=298",
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/1012/356/1602747394-53eabb6ce52f834bd6ca48da91b6e53e48ccad52.jpg{?width,height}"
                        },
                        "landscape": {
                            "url": "https://i-viaplay-com.akamaized.net/viaplay-prod/1012/356/1602747392-19a5a14cd9c0df2ee6a11df1190d4be4e5ca8f8f.jpg?width=960&height=540",
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/1012/356/1602747392-19a5a14cd9c0df2ee6a11df1190d4be4e5ca8f8f.jpg{?width,height}"
                        },
                        "hero169": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/320/640/1571991619-f4a9aec062c93168d551bd037c093d0d9ecbc68e.jpg{?width,height}"
                        },
                        "coverart23": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/1012/356/1602747394-53eabb6ce52f834bd6ca48da91b6e53e48ccad52.jpg{?width,height}"
                        },
                        "coverart169": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/1012/356/1602747392-19a5a14cd9c0df2ee6a11df1190d4be4e5ca8f8f.jpg{?width,height}"
                        }
                    },
                    "people": {},
                    "parentalRating": "12A",
                    "series": {
                        "title": "I huvudet på en mördare",
                        "synopsis": "I den här dokumentärserien granskas några av Sveriges mest uppmärksammade mordfall ur helt nya synvinklar, däribland fallen med mördarna Peter Mangs och Jonna Henningsson.",
                        "season": {
                            "title": "I huvudet på en mördare",
                            "availability": {
                                "svod": {
                                    "start": "2020-10-21T22:01:00.000Z",
                                    "end": "2025-10-21T22:00:00.000Z"
                                }
                            }
                        },
                        "seasons": 4,
                        "seriesGuid": "series-i-huvudet-pa-en-mordare"
                    },
                    "synopsis": "I den här dokumentärserien granskas några av Sveriges mest uppmärksammade mordfall ur helt nya synvinklar, däribland fallen med mördarna Peter Mangs och Jonna Henningsson.",
                    "production": {
                        "year": 2018
                    }
                },
                "user": {
                    "starred": false
                },
                "system": {
                    "availability": {
                        "start": "2018-10-04T19:00:00.000Z",
                        "end": "2023-10-02T22:00:00.000Z",
                        "planInfo": {
                            "isRental": false,
                            "isPurchase": false
                        },
                        "svod": {
                            "start": "2018-10-04T19:00:00.000Z",
                            "end": "2023-10-02T22:00:00.000Z",
                            "planInfo": {
                                "isRental": false,
                                "isPurchase": false
                            }
                        }
                    },
                    "flags": [],
                    "guid": "series-i-huvudet-pa-en-mordare",
                    "isKids": false
                },
                "_links": {
                    "self": {
                        "title": "I huvudet på en mördare",
                        "href": "https://content.viaplay.se/pc-se/serier/i-huvudet-pa-en-mordare?partial=true"
                    },
                    "viaplay:page": {
                        "title": "I huvudet på en mördare",
                        "href": "https://content.viaplay.se/pc-se/serier/i-huvudet-pa-en-mordare"
                    },
                    "viaplay:templatedPage": {
                        "title": "I huvudet på en mördare",
                        "href": "https://content.viaplay.se/{deviceKey}/serier/i-huvudet-pa-en-mordare"
                    },
                    "viaplay:genres": [{
                            "title": "Kriminaldrama",
                            "tagId": "99368197",
                            "href": "https://content.viaplay.se/pc-se/serier/kriminaldrama"
                        },
                        {
                            "title": "Dokumentärserier",
                            "tagId": "127528063",
                            "href": "https://content.viaplay.se/pc-se/serier/dokumentarserier"
                        }
                    ],
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
            },
            {
                "type": "series",
                "publicPath": "alska-mig",
                "content": {
                    "images": {
                        "boxart": {
                            "url": "https://i-viaplay-com.akamaized.net/viaplay-prod/17/304/1596795702-577201db61cc5f1f95f9ec36629d37a158836a77.jpg?width=199&height=298",
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/17/304/1596795702-577201db61cc5f1f95f9ec36629d37a158836a77.jpg{?width,height}"
                        },
                        "landscape": {
                            "url": "https://i-viaplay-com.akamaized.net/viaplay-prod/17/304/1596795697-95c6d1db9d1fd5e325681b5e5691fda3d75b45a6.jpg?width=960&height=540",
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/17/304/1596795697-95c6d1db9d1fd5e325681b5e5691fda3d75b45a6.jpg{?width,height}"
                        },
                        "hero169": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/668/432/1599210753-7917ddcd6fc90452b43392a7bf87ed800416e16f.jpg{?width,height}"
                        },
                        "coverart23": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/17/304/1596795702-577201db61cc5f1f95f9ec36629d37a158836a77.jpg{?width,height}"
                        },
                        "coverart169": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/17/304/1596795697-95c6d1db9d1fd5e325681b5e5691fda3d75b45a6.jpg{?width,height}"
                        },
                        "coverart11": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/17/304/1596795698-aacbdc19bbf231f0c177610c1fc336dfe2123513.jpg{?width,height}"
                        }
                    },
                    "people": {
                        "actors": [
                            "Josephine Bornebusch",
                            "Johan Ulveson",
                            "Gustav Lindh",
                            "Sverrir Gudnason",
                            "Ia Langhammer",
                            "Görel Crona",
                            "Dilan Gwyn",
                            "Sofia Karemyr"
                        ],
                        "participants": [
                            "Josephine Bornebusch",
                            "Johan Ulveson",
                            "Gustav Lindh",
                            "Sverrir Gudnason",
                            "Ia Langhammer",
                            "Görel Crona",
                            "Dilan Gwyn",
                            "Sofia Karemyr"
                        ]
                    },
                    "series": {
                        "title": "Älska mig",
                        "synopsis": "Hur hanterar olika generationer kärlek, sorg, passion och relationer? Möt överläkaren Clara som dejtar utan att hitta rätt, störtförälskade lillebror Aron, och pappa Sten som finner oväntad passion.",
                        "season": {
                            "title": "Älska mig",
                            "availability": {
                                "svod": {
                                    "start": "2020-09-12T22:00:00.000Z",
                                    "end": "2030-09-12T22:00:00.000Z"
                                }
                            }
                        },
                        "seasons": 2,
                        "seriesGuid": "series-alska-mig"
                    },
                    "synopsis": "Hur hanterar olika generationer kärlek, sorg, passion och relationer? Möt överläkaren Clara som dejtar utan att hitta rätt, störtförälskade lillebror Aron, och pappa Sten som finner oväntad passion.",
                    "imdb": {
                        "id": "tt9325320",
                        "rating": "8.0",
                        "votes": "1 629",
                        "url": "http://www.imdb.com/title/tt9325320?ref_ext_viaplay"
                    },
                    "production": {
                        "year": 2019
                    }
                },
                "user": {
                    "starred": false
                },
                "system": {
                    "availability": {
                        "start": "2019-10-10T22:00:00.000Z",
                        "end": "2029-10-10T21:59:00.000Z",
                        "planInfo": {
                            "isRental": false,
                            "isPurchase": false
                        },
                        "svod": {
                            "start": "2019-10-10T22:00:00.000Z",
                            "end": "2029-10-10T21:59:00.000Z",
                            "planInfo": {
                                "isRental": false,
                                "isPurchase": false
                            }
                        }
                    },
                    "flags": [],
                    "guid": "series-alska-mig",
                    "isKids": false
                },
                "_links": {
                    "self": {
                        "title": "Älska mig",
                        "href": "https://content.viaplay.se/pc-se/serier/alska-mig?partial=true"
                    },
                    "viaplay:page": {
                        "title": "Älska mig",
                        "href": "https://content.viaplay.se/pc-se/serier/alska-mig"
                    },
                    "viaplay:templatedPage": {
                        "title": "Älska mig",
                        "href": "https://content.viaplay.se/{deviceKey}/serier/alska-mig"
                    },
                    "viaplay:genres": [{
                            "title": "Drama",
                            "tagId": "98856440",
                            "href": "https://content.viaplay.se/pc-se/serier/drama"
                        },
                        {
                            "title": "Romantik",
                            "tagId": "99368206",
                            "href": "https://content.viaplay.se/pc-se/store/romantik"
                        }
                    ],
                    "viaplay:peopleSearch": {
                        "href": "https://content.viaplay.se/pc-se/search?query=\"{person}\"",
                        "templated": true
                    },
                    "viaplay:trailerStream": {
                        "href": "https://play.viaplay.se/api/stream/byguid{?deviceId,deviceName,deviceType,userAgent,deviceKey,availabilityContext,cmaf,cse}&guid=10-5240-BF42-C856-5969-7847-6592-9&returnurl=https%3A%2F%2Fcontent.viaplay.se%2Fpc-se%2Fserier%2Fsamtliga%3FpageNumber%3D1%26productsPerPage%3D10&producturl=https%3A%2F%2Fcontent.viaplay.se%2Fpc-se%2Fbyguid%2F10-5240-BF42-C856-5969-7847-6592-9%3FparentProgramGuid%3Dseries-alska-mig&templatedproducturl=https%3A%2F%2Fcontent.viaplay.se%2F%7BdeviceKey%7D%2Fbyguid%2F10-5240-BF42-C856-5969-7847-6592-9%3FparentProgramGuid%3Dseries-alska-mig&sectionPath=%2Fserier&defaultAvailabilityContext=svod",
                        "templated": true
                    },
                    "viaplay:trailerSelf": {
                        "title": "Älska mig",
                        "href": "https://content.viaplay.se/pc-se/byguid/10-5240-BF42-C856-5969-7847-6592-9?parentProgramGuid=series-alska-mig&partial=true"
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
            },
            {
                "type": "series",
                "publicPath": "private-practice",
                "content": {
                    "images": {
                        "boxart": {
                            "url": "https://i-viaplay-com.akamaized.net/viaplay-prod/70/648/1601370829-644173c883109c5c5fc67814cd5c4ef238d13ade.jpg?width=199&height=298&template=abcstudios",
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/70/648/1601370829-644173c883109c5c5fc67814cd5c4ef238d13ade.jpg{?width,height}&template=abcstudios"
                        },
                        "landscape": {
                            "url": "https://i-viaplay-com.akamaized.net/viaplay-prod/70/148/1601370826-f1a8a6ea86adc6bfd1b43a82f3fa936eaace5639.jpg?width=960&height=540&template=abcstudios",
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/70/148/1601370826-f1a8a6ea86adc6bfd1b43a82f3fa936eaace5639.jpg{?width,height}&template=abcstudios"
                        },
                        "hero169": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/973/880/1595324930-547c2e9d00c53ce99cf491543e999f70d0264433.jpg{?width,height}"
                        },
                        "coverart23": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/70/648/1601370829-644173c883109c5c5fc67814cd5c4ef238d13ade.jpg{?width,height}&template=abcstudios"
                        },
                        "coverart169": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/70/148/1601370826-f1a8a6ea86adc6bfd1b43a82f3fa936eaace5639.jpg{?width,height}&template=abcstudios"
                        }
                    },
                    "people": {
                        "actors": [
                            "Kate Walsh",
                            "Paul Adelstein",
                            "Taye Diggs",
                            "Amy Brenneman",
                            "Tim Daly",
                            "KaDee Strickland",
                            "Brian Benben",
                            "Audra McDonald",
                            "Caterina Scorsone",
                            "Chris Lowell"
                        ],
                        "participants": [
                            "Kate Walsh",
                            "Paul Adelstein",
                            "Taye Diggs",
                            "Amy Brenneman",
                            "Tim Daly",
                            "KaDee Strickland",
                            "Brian Benben",
                            "Audra McDonald",
                            "Caterina Scorsone",
                            "Chris Lowell"
                        ]
                    },
                    "parentalRating": "15",
                    "series": {
                        "title": "Private Practice",
                        "synopsis": "Dr Addison Forbes Montgomery lämnar sjukhuset Seattle Grace för att starta ett nytt liv på en privatpraktik i LA. Där jobbar hon med sina nyskilda vänner från läkarutbildningen och möter en ny stad och nya arbetsmetoder.",
                        "season": {
                            "title": "Private Practice",
                            "availability": {
                                "svod": {
                                    "start": "2020-10-06T22:00:00.000Z",
                                    "end": "2021-08-16T22:00:00.000Z"
                                }
                            }
                        },
                        "seasons": 6,
                        "seriesGuid": "series-private-practice"
                    },
                    "synopsis": "Dr Addison Montgomery lämnar Seattle Grace och sitt havererade äktenskap och beger sig till LA för att jobba ihop med sina nyskilda vänner på deras praktik, där hon ställs inför många nya utmaningar.",
                    "imdb": {
                        "id": "tt0972412",
                        "rating": "6.6",
                        "votes": "22 035",
                        "url": "http://www.imdb.com/title/tt0972412?ref_ext_viaplay"
                    },
                    "production": {
                        "year": 2007
                    }
                },
                "user": {
                    "starred": false
                },
                "system": {
                    "availability": {
                        "start": "2020-08-16T22:00:00.000Z",
                        "end": "2021-02-16T22:59:00.000Z",
                        "planInfo": {
                            "isRental": false,
                            "isPurchase": false
                        },
                        "svod": {
                            "start": "2020-08-16T22:00:00.000Z",
                            "end": "2021-02-16T22:59:00.000Z",
                            "planInfo": {
                                "isRental": false,
                                "isPurchase": false
                            }
                        }
                    },
                    "flags": [],
                    "guid": "series-private-practice",
                    "isKids": false
                },
                "_links": {
                    "self": {
                        "title": "Private Practice",
                        "href": "https://content.viaplay.se/pc-se/serier/private-practice?partial=true"
                    },
                    "viaplay:page": {
                        "title": "Private Practice",
                        "href": "https://content.viaplay.se/pc-se/serier/private-practice"
                    },
                    "viaplay:templatedPage": {
                        "title": "Private Practice",
                        "href": "https://content.viaplay.se/{deviceKey}/serier/private-practice"
                    },
                    "viaplay:genres": [{
                            "title": "Drama",
                            "tagId": "98856440",
                            "href": "https://content.viaplay.se/pc-se/serier/drama"
                        },
                        {
                            "title": "Romantik",
                            "tagId": "99368206",
                            "href": "https://content.viaplay.se/pc-se/store/romantik"
                        }
                    ],
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
            },
            {
                "type": "series",
                "publicPath": "walking-dead-the",
                "content": {
                    "images": {
                        "boxart": {
                            "url": "https://i-viaplay-com.akamaized.net/viaplay-prod/630/860/1601384177-5a8d0b4a3515876ef7f7942ff2bc2852d20f842e.jpg?width=199&height=298",
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/630/860/1601384177-5a8d0b4a3515876ef7f7942ff2bc2852d20f842e.jpg{?width,height}"
                        },
                        "landscape": {
                            "url": "https://i-viaplay-com.akamaized.net/viaplay-prod/630/860/1601384176-48009ade5a5358eb72c52b9756738db93aebe11f.jpg?width=960&height=540",
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/630/860/1601384176-48009ade5a5358eb72c52b9756738db93aebe11f.jpg{?width,height}"
                        },
                        "hero169": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/630/860/1601638878-176cb32c04d7536b7d7beb6fe84588dc08b25b1e.jpg{?width,height}"
                        },
                        "coverart23": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/630/860/1601384177-5a8d0b4a3515876ef7f7942ff2bc2852d20f842e.jpg{?width,height}"
                        },
                        "coverart169": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/630/860/1601384176-48009ade5a5358eb72c52b9756738db93aebe11f.jpg{?width,height}"
                        }
                    },
                    "originalTitle": "Walking Dead, The",
                    "people": {
                        "actors": [
                            "Andrew Lincoln",
                            "Norman Reedus",
                            "Melissa McBride",
                            "Lauren Cohan",
                            "Danai Gurira",
                            "Chandler Riggs",
                            "Alanna Masterson",
                            "Josh McDermitt",
                            "Christian Serratos",
                            "Steven Yeun",
                            "Seth Gilliam"
                        ],
                        "participants": [
                            "Andrew Lincoln",
                            "Norman Reedus",
                            "Melissa McBride",
                            "Lauren Cohan",
                            "Danai Gurira",
                            "Chandler Riggs",
                            "Alanna Masterson",
                            "Josh McDermitt",
                            "Christian Serratos",
                            "Steven Yeun",
                            "Seth Gilliam"
                        ]
                    },
                    "parentalRating": "15",
                    "series": {
                        "title": "The Walking Dead",
                        "synopsis": "Baserad på serietidningen med samma namn. Efter en zombieepidemi är USA totalt i spillror. De få som har klarat sig måste göra allt för att värja sig mot zombierna och försöka överleva.",
                        "season": {
                            "title": "The Walking Dead",
                            "availability": {
                                "svod": {
                                    "start": "2020-10-06T22:00:00.000Z",
                                    "end": "2022-04-06T22:00:00.000Z"
                                }
                            }
                        },
                        "seasons": 10,
                        "seriesGuid": "series-walking-dead-the"
                    },
                    "synopsis": "Baserad på serietidningen med samma namn. Efter en zombieepidemi är USA totalt i spillror. De få som har klarat sig måste göra allt för att värja sig mot zombierna och försöka överleva.",
                    "imdb": {
                        "id": "tt1520211",
                        "rating": "8.2",
                        "votes": "839 302",
                        "url": "http://www.imdb.com/title/tt1520211?ref_ext_viaplay"
                    },
                    "production": {
                        "year": 2010
                    }
                },
                "user": {
                    "starred": false
                },
                "system": {
                    "availability": {
                        "start": "2020-10-06T22:00:00.000Z",
                        "end": "2022-04-06T22:00:00.000Z",
                        "planInfo": {
                            "isRental": false,
                            "isPurchase": false
                        },
                        "svod": {
                            "start": "2020-10-06T22:00:00.000Z",
                            "end": "2022-04-06T22:00:00.000Z",
                            "planInfo": {
                                "isRental": false,
                                "isPurchase": false
                            }
                        }
                    },
                    "flags": [],
                    "guid": "series-walking-dead-the",
                    "isKids": false
                },
                "_links": {
                    "self": {
                        "title": "The Walking Dead",
                        "href": "https://content.viaplay.se/pc-se/serier/walking-dead-the?partial=true"
                    },
                    "viaplay:page": {
                        "title": "The Walking Dead",
                        "href": "https://content.viaplay.se/pc-se/serier/walking-dead-the"
                    },
                    "viaplay:templatedPage": {
                        "title": "The Walking Dead",
                        "href": "https://content.viaplay.se/{deviceKey}/serier/walking-dead-the"
                    },
                    "viaplay:genres": [{
                            "title": "Drama",
                            "tagId": "98856440",
                            "href": "https://content.viaplay.se/pc-se/serier/drama"
                        },
                        {
                            "title": "Thriller",
                            "tagId": "99368200",
                            "href": "https://content.viaplay.se/pc-se/serier/thriller"
                        }
                    ],
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
            },
            {
                "type": "series",
                "publicPath": "office-the",
                "content": {
                    "images": {
                        "boxart": {
                            "url": "https://i-viaplay-com.akamaized.net/viaplay-prod/167/896/1563352740-0af3d40bbe406957c36c57f3a433509cb0f2921f.jpg?width=199&height=298",
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/167/896/1563352740-0af3d40bbe406957c36c57f3a433509cb0f2921f.jpg{?width,height}"
                        },
                        "landscape": {
                            "url": "https://i-viaplay-com.akamaized.net/viaplay-prod/167/896/1563352737-793ce02cb5c133743d5367eb1973ef383a866960.jpg?width=960&height=540",
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/167/896/1563352737-793ce02cb5c133743d5367eb1973ef383a866960.jpg{?width,height}"
                        },
                        "hero169": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/167/896/1565268610-9b029bdbac0fbd0b3295054ead65201a224bd601.jpg{?width,height}"
                        },
                        "coverart23": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/167/896/1563352740-0af3d40bbe406957c36c57f3a433509cb0f2921f.jpg{?width,height}"
                        },
                        "coverart169": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/167/896/1563352737-793ce02cb5c133743d5367eb1973ef383a866960.jpg{?width,height}"
                        },
                        "coverart11": {
                            "template": "https://i-viaplay-com.akamaized.net/viaplay-prod/485/220/1563352737-46414227b5f62b7933e16da044833c1d9eba7a8b.jpg{?width,height}"
                        }
                    },
                    "people": {
                        "actors": [
                            "Steve Carell",
                            "John Krasinski",
                            "Rainn Wilson",
                            "Jenna Fischer",
                            "Leslie David Baker",
                            "Brian Baumgartner",
                            "Angela Kinsey",
                            "Phyllis Smith",
                            "Kate Flannery",
                            "Creed Bratton",
                            "Oscar Nuñez",
                            "B.J. Novak",
                            "Mindy Kaling",
                            "Ed Helms",
                            "Paul Lieberstein",
                            "Craig Robinson",
                            "Ellie Kemper",
                            "Zach Woods",
                            "Melora Hardin",
                            "Andy Buckley",
                            "Rashida Jones",
                            "James Spader",
                            "Jack Coleman"
                        ],
                        "participants": [
                            "Steve Carell",
                            "John Krasinski",
                            "Rainn Wilson",
                            "Jenna Fischer",
                            "Leslie David Baker",
                            "Brian Baumgartner",
                            "Angela Kinsey",
                            "Phyllis Smith",
                            "Kate Flannery",
                            "Creed Bratton",
                            "Oscar Nuñez",
                            "B.J. Novak",
                            "Mindy Kaling",
                            "Ed Helms",
                            "Paul Lieberstein",
                            "Craig Robinson",
                            "Ellie Kemper",
                            "Zach Woods",
                            "Melora Hardin",
                            "Andy Buckley",
                            "Rashida Jones",
                            "James Spader",
                            "Jack Coleman"
                        ]
                    },
                    "parentalRating": "12",
                    "series": {
                        "title": "The Office",
                        "synopsis": "Mockumentär som följer den tidvis absurda vardagen för en grupp kontorsarbetare, på jobbet och privat. Egon krockar, folk beter sig olämpligt och tristess bryts av galna upptåg och spratt.",
                        "season": {
                            "title": "The Office",
                            "availability": {
                                "svod": {
                                    "start": "2019-08-15T22:00:00.000Z",
                                    "end": "2021-07-31T21:59:00.000Z"
                                }
                            }
                        },
                        "seasons": 9,
                        "seriesGuid": "series-office-the"
                    },
                    "synopsis": "Mockumentär som följer den tidvis absurda vardagen för en grupp kontorsarbetare, på jobbet och privat. Egon krockar, folk beter sig olämpligt och tristess bryts av galna upptåg och spratt.",
                    "imdb": {
                        "id": "tt0386676",
                        "rating": "8.9",
                        "votes": "390 354",
                        "url": "http://www.imdb.com/title/tt0386676?ref_ext_viaplay"
                    },
                    "production": {
                        "year": 2005
                    }
                },
                "user": {
                    "starred": false
                },
                "system": {
                    "availability": {
                        "start": "2019-08-15T22:00:00.000Z",
                        "end": "2021-07-31T21:59:00.000Z",
                        "planInfo": {
                            "isRental": false,
                            "isPurchase": false
                        },
                        "svod": {
                            "start": "2019-08-15T22:00:00.000Z",
                            "end": "2021-07-31T21:59:00.000Z",
                            "planInfo": {
                                "isRental": false,
                                "isPurchase": false
                            }
                        }
                    },
                    "flags": [],
                    "guid": "series-office-the",
                    "isKids": false
                },
                "_links": {
                    "self": {
                        "title": "The Office",
                        "href": "https://content.viaplay.se/pc-se/serier/office-the?partial=true"
                    },
                    "viaplay:page": {
                        "title": "The Office",
                        "href": "https://content.viaplay.se/pc-se/serier/office-the"
                    },
                    "viaplay:templatedPage": {
                        "title": "The Office",
                        "href": "https://content.viaplay.se/{deviceKey}/serier/office-the"
                    },
                    "viaplay:genres": [{
                        "title": "Komedi",
                        "tagId": "99368193",
                        "href": "https://content.viaplay.se/pc-se/serier/komedi"
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
        ];

        window._mainView = {
            titles: ['Test1', 'Test2']
        }

        window._mainId = 0;

        window._focusType = "";
        window._listFocus = {}

        window.dataService = {
            data: {
                series_list: [{
                    total: 10,
                    pages: 1,
                    lists: _fakeData
                }]
            }
        }

        window._header = document.body.querySelector("#header")
        window._location = document.body.querySelector("#location")

        window._listFocus = {
            currentSet: function() {},
            indicatorFocus: function() {}
        }

        _listView = new _app._test.listView()

    })


    it('check series list render 10 items and check first and last data', async() => {

        _listView.generate();

        await waitFor(() => {
            console.log(document.body.querySelector("#listPage0").querySelectorAll("li")[9].querySelector(".normal_all .bottom_text").innerHTML)

            // has it 10 rendered item from json?
            expect(document.body.querySelector("#listPage0").querySelectorAll("li").length).toEqual(10);

            // check title first item
            expect(document.body.querySelector("#listPage0").querySelector("li .normal_all .bottom_text").innerHTML).toEqual("Paradise Hotel");

            // check title last item 
            expect(document.body.querySelector("#listPage0").querySelectorAll("li")[9].querySelector(".normal_all .bottom_text").innerHTML).toEqual("The Office");

        })

    })



})