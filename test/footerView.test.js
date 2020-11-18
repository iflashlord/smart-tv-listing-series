import { fireEvent, getByText, waitFor } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'


let _app = require('../features/footer/footerView.js');
let _footerView;
describe('footerView.js', () => {
    beforeEach(() => {
        _footerView = new _app._test.footerView()
        document.body.innerHTML =
            `<ul id="footer"> 
               <li class="exit">Exit</li> 
               <li class="back">Back</li> 
               <li class="home">Home</li> 
             </ul>`;
        _footerView.addEvent();
    })

    it('check selector assign', () => {
        expect(_footerView.Exit.innerHTML).toEqual("Exit")
        expect(_footerView.Back.innerHTML).toEqual("Back")
        expect(_footerView.Home.innerHTML).toEqual("Home")
    })

    it('check focus event on exit button', async() => {

        // before mouse event
        expect(_footerView.Exit.className).toEqual("exit");

        // mouseover item
        fireEvent(_footerView.Exit, new MouseEvent('mouseover', {
            bubbles: true,
            cancelable: true,
        }))

        await waitFor(() => {
            // focused item
            expect(_footerView.Exit.className).toEqual("exit_focus")
        })

    })

    it('check focus event on back button', async() => {

        // before mouse event
        expect(_footerView.Back.className).toEqual("back");

        // mouseover item
        fireEvent(_footerView.Back, new MouseEvent('mouseover', {
            bubbles: true,
            cancelable: true,
        }))

        await waitFor(() => {
            // focused item
            expect(_footerView.Back.className).toEqual("back_focus")
        })

    })

    it('check focus event on home button', async() => {

        // before mouse event
        expect(_footerView.Home.className).toEqual("home");

        // mouseover item
        fireEvent(_footerView.Home, new MouseEvent('mouseover', {
            bubbles: true,
            cancelable: true,
        }))

        await waitFor(() => {
            // focused item
            expect(_footerView.Home.className).toEqual("home_focus")
        })

    })

})