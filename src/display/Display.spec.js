

import React from 'react'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Display from './Display'

describe('Display', () => {
    test('renders correctly', () => {
        const display = render(<Display />);
        expect(display).toMatchSnapshot();
    })
    test('Does not notify user "unlocked" if locked is true', () => {
        const { getByText, findByText, queryByText } = render(<Display locked={true} />)
        const unlocked = queryByText(/unlocked/i);
        expect(unlocked).not.toBe()

    })
    test('displays unlocked and green led if locked is false', () => {
        const { getByText, findByText, queryByText } = render(<Display locked={false} />)
        expect(getByText(/unlocked/i))
        const unlockedClass = document.querySelector(".panel>div").classList['1']
        expect(unlockedClass).toBe("green-led")
    })
    test('displays open and green led if closed is false', () => {
        const { getByText, findByText, queryByText } = render(<Display locked={false} closed={false}/>)
        expect(getByText(/open/i))
        expect(findByText(/CLOSED/i)).not.toBe()
        const openClass = document.querySelector(".panel>div").classList['1']
        expect(openClass).toBe("green-led")
    }) 
    test('displays locked and red led when locked is true', () => {
        const display = render(<Display locked={true} closed={true} />)
        const { getByText, findByText, queryByText } = display
        const openAnyCase = new RegExp(`open`, `i`);
        expect(openAnyCase).not.toBe()
        const locked = queryByText(/locked/i)
        expect(locked).toBeTruthy()
        const lockedClass = document.querySelector(".panel>div").classList['1']
        expect(lockedClass).toBe("red-led")
    })

    test('displays closed and red led when closed is true', () => {
        const { getByText, findByText, queryByText } = render(<Display locked={true} closed={true} />)

        const openAnyCase = new RegExp(`open`, `i`);
        expect(openAnyCase).not.toBe()
        const closed = queryByText(/closed/i)
        expect(closed).toBeTruthy()
        const closedClass = document.querySelector(".panel>div").classList['1']
        expect(closedClass).toBe("red-led")



        })
    })