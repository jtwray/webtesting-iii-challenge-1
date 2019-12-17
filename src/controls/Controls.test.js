import React from 'react'
import { render, cleanup, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Controls from './Controls'

afterEach(cleanup);

describe('Controls Operate as expected', () => {

    test(`renders correctly`, () => {
        const controls = render(<Controls />);
        expect(controls).toMatchSnapshot();
    })



    test("closeGate changes to openGate on click", async () => {
        const toggleClosedMock = jest.fn()
        const { getByText, queryByText, findByText } = render(
            <Controls locked={false} closed={false} toggleClosed={toggleClosedMock} />)

        expect(queryByText(/close gate/i)).toBeTruthy();
        await fireEvent.click(getByText(/close gate/i))
        expect(findByText(/open gate/i));
        expect(toggleClosedMock).toHaveBeenCalled();
    }
    )

    test(`can click close gate and enable open button`, async () => {
        const toggleClosedMock = jest.fn()
        const { getByText, findByText, queryByText } = render(<Controls locked={false} closed={false} toggleClosed={toggleClosedMock} />)
     
        expect(getByText(/close gate/i))
        expect(getByText(/lock gate/i)).toBeDisabled()
       

    })
    test(`LockGate disables after opening`, async () => {
        const toggleClosedMock = jest.fn()
        const controls = render(
            < Controls locked={false} closed={true} toggleClosed={toggleClosedMock} />)
        const openGate = controls.getByText("Open Gate")
        const lockedGate = controls.getByText(/lock gate/i)
        expect(lockedGate).not.toBeDisabled()
        await fireEvent.click(openGate)
        const lockGate = controls.queryByText(/lock gate/i)
        expect(lockGate).not.toBeDisabled()
    })


       test(`Locking gate enables unlock control`, async () => {
        const toggleLockedMock = jest.fn()
        const { getByText,queryByText,findByText } = render(<Controls locked={false} closed={true} toggleLocked={toggleLockedMock} />)

        const lockGate = getByText(/lock gate/i)
        await fireEvent.click(lockGate);
        expect(toggleLockedMock).toHaveBeenCalled()
        expect(findByText(/unlock gate/i)).toBeTruthy()
    })
    test(`Open gate enables after unlock`, () => {
        const toggleLockedMock = jest.fn()
        const controls = render(<Controls locked={true} closed={true} toggleLocked={toggleLockedMock} />)
        const unlockGate = controls.getByText(/unlock gate/i)
        fireEvent.click(unlockGate)
        expect(controls.getByText(/open gate/i)).toBeDisabled()
    })
   
})
