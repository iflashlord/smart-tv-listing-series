import { fireEvent, getByText, waitFor } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'

let _app = require('../features/splash/splashView.js');
let _splashView;
describe('splashView.js', () => {
    beforeEach(() => {
        document.body.innerHTML =
            `<div> 
               <div id="splash_dot">Loading</div> 
             </div>`;

        _splashView = new _app._test.splashView(function() {})
    })

    it('check splash movement item loader', async() => {

        // start
        _splashView.splashStart()

        await waitFor(() => {
            expect(_splashView.splashMovementDot.style.left).toEqual("135px")
        })

        // force movement
        _splashView.move()

        await waitFor(() => {
            expect(_splashView.splashMovementDot.style.left).toEqual("165px")
        })
    })

})