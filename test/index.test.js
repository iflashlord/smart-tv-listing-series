import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

let dom
let container

describe('index.html', () => {
    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: 'dangerously' })
        container = dom.window.document.body
    })

    it('renders a logo-viaplay element', () => {
        expect(container.querySelector('.logo-viaplay')).not.toBeNull()
    })

    it('renders a location element', () => {
        expect(container.querySelector('#location-first')).not.toBeNull()
        expect(getByText(container, 'Home')).toBeInTheDocument()
    })

    it('renders splash place_holder element', () => {
        expect(container.querySelector('.place_holder')).not.toBeNull()
    })

})