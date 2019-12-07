import React from 'react'
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Controls from './Controls'

afterEach(cleanup);

describe('Controls Operate as expected', () => {

    test(`renders correctly`, () => {
        const controls = render(<Controls />);
        expect(controls).toMatchSnapshot();
    })

    test(`Door operates correctly on user interaction`, () => {
        const controls = render(<Controls locked={false} closed={false} />)
        const closeGate = controls.getByText(/close gate/i)
        fireEvent.click(closeGate)
        expect(controls.getByText(/lock gate/i)).toBeEnabled()
        expect(controls.getByText(/open gate/i)).toBeEnabled()
    })
    test(`Locking gate enables unlock control`, () => {
        const controls = render(<Controls locked={false} closed={true} />)
      
        const lockGate = controls.getByText(/lock gate/i)
        fireEvent.click(lockGate)
        expect(controls.getByText(/unlock gate/i)).toBeEnabled()
    })
    test(`Open gate enables after unlock`, () => {
        const controls = render(<Controls locked={true} closed={true} />)
        const unlockGate = controls.getByText(/unlock gate/i)
        fireEvent.click(unlockGate)
        expect(controls.getByText(/open gate/i)).toBeEnabled()
    })
    test(`LockGate disables after opening`, () => {
        const controls = render(<Controls locked={false} closed={true} />)
        const openGate = controls.getByText(/open gate/i)
        fireEvent.click(openGate)
        expect(controls.getByText(/lock gate/i)).not.toBeEnabled()
    })
})
