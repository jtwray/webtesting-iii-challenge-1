// Test away!


import React from 'react'
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Display from './Display'

describe('Display',()=>{
    test('renders correctly',()=>{
        const display =render(<Display/>);
        expect(display).toMatchSnapshot();
    })
test('Does not notify user "Open" if locked is true',()=>{
    const display=render(<Display locked={true}/>)
    const lockGate = new RegExp(`open`,`i`);
    expect(lockGate).not.toBeEnabled()
   
})
test('displays green if not locked',()=>{
    const display=render(<Display locked={true}/>)
    const openClass = display.getByText(`openClass`)
})
test('Does not notify user "Open" if locked is true',()=>{
    const display=render(<Display locked={true}/>)
    const openAnyCase = new RegExp(`open`,`i`);
    expect(display).not.toBe(openAnyCase)
   
})
})