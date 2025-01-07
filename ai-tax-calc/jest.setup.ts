import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder
// @ts-expect-error
global.TextDecoder = TextDecoder

// Object.defineProperty(globalThis, "IS_REACT_ACT_ENVIRONMENT", {
//     get() {
//         if (typeof globalThis.self !== 'undefined') {
//             // @ts-expect-error
//             return globalThis.self.IS_REACT_ACT_ENVIRONMENT
//         }
//     },
//     set(value) {
//         if (typeof globalThis.self !== 'undefined') {
//             // @ts-expect-error
//             globalThis.self.IS_REACT_ACT_ENVIRONMENT = value
//         }
//     }
// })
// // @ts-expect-error
// globalThis.IS_REACT_ACT_ENVIRONMENT = true