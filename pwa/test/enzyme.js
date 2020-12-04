/**
 * Reference: https://enzymejs.github.io/enzyme/docs/installation/#working-with-react-16
 */
const Enzyme = require('enzyme')

/**
 * We use @wojtekmaj/enzyme-adapter-react-17 until a proper adapter has been implemented for React 17
 * See issue https://github.com/enzymejs/enzyme/issues/2429
 */
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17')

Enzyme.configure({ adapter: new Adapter() })
