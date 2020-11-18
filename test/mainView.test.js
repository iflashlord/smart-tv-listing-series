import { fireEvent, getByText, waitFor } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'


let _app = require('../features/main/mainView.js');
let _mainView;
let _beforeAddMenu;
describe('mainView.js', () => {
    beforeEach(() => {
        _mainView = new _app._test.mainView()
        _beforeAddMenu = '<div class="MainMenu"></div>'
        document.body.innerHTML = _beforeAddMenu;
    })

    it('main view title available and equal two', () => {
        expect(_mainView.titles).not.toBeNull()
        expect(_mainView.titles.length).toEqual(2)
    })

    it('check new menu and set title correctly', async() => {

        // first item
        _mainView.addMenu(0);

        await waitFor(() => {
            // something appended to item
            expect(document.body.innerHTML).not.toEqual(_beforeAddMenu)

            // check title data set correctly 
            expect(document.body.querySelector(".menu_item_title").innerHTML).toEqual(_mainView.titles[0])
        })

        // second item
        _mainView.addMenu(1);

        await waitFor(() => {
            // check title data set correctly 
            expect(document.body.querySelector("#main1 .menu_item_title").innerHTML).toEqual(_mainView.titles[1])
        })


    })

})