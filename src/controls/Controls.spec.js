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
        // creating a Mocked version of the toggleClosed function to pass in and call from our virtual Controls component
        const toggleClosedMock = jest.fn()
        // creating/rendering our virtual <Controls/> component and setting up the props to match the scenario we want to test
        // also deconstructing the get/query/findBY methods to reference them easier 
        const { getByText, queryByText, findByText } = render(
            <Controls locked={false} closed={false} toggleClosed={toggleClosedMock} />)
        // checking that the close gate button is displayed if locked and closed are both false
        expect(queryByText(/close gate/i)).toBeTruthy();
        // checking that the close gate button is active if locked and closed are both false
        expect(queryByText(/close gate/i)).not.toBeDisabled()
        // clicking the close gate button
        await fireEvent.click(getByText(/close gate/i))
        // making sure the toggleClosed() got called correctly when user clicks the button
        expect(toggleClosedMock).toHaveBeenCalled();
        // looking for the close gate button to have been replaced with the open gate button
        expect(findByText(/open gate/i));
    }
    )

    test(`can click close gate and enable open button and lock button`, async () => {
        const toggleClosedMock = jest.fn()
       
        const { getByText, findByText, queryByText } = render(
            <Controls locked={false} closed={false} toggleClosed={toggleClosedMock} />)
        const closeGate = getByText(/close gate/i)
        await fireEvent.click(closeGate)
        expect(toggleClosedMock).toHaveBeenCalled();
        const lockGate = getByText(/lock gate/i)
        const openGate = findByText(/open gate/i)
        expect(openGate).toBeTruthy()
        expect(lockGate).toBeTruthy() 
        expect(lockGate).toBeDisabled(null)
        
      
      

    })
    test(`LockGate disables after opening`, async () => {
        const toggleClosedMock = jest.fn()
        const controls = render(
            < Controls locked={false} closed={true} toggleClosed={toggleClosedMock} />)
        const openGate = controls.getByText("Open Gate")
        const lockedGate = controls.getByText(/lock gate/i)
        expect(lockedGate).not.toBeDisabled()
        await fireEvent.click(openGate)
        expect(toggleClosedMock).toHaveBeenCalled()
        const lockGate = controls.queryByText(/lock gate/i)
        expect(lockGate).not.toBeDisabled()
    })


    test(`Locking gate enables unlock control`, async () => {
        const toggleLockedMock = jest.fn()
        const { getByText, queryByText, findByText } = render(
            <Controls locked={false} closed={true} toggleLocked={toggleLockedMock} />)
        const lockGate = getByText(/lock gate/i)
        await fireEvent.click(lockGate);
        expect(toggleLockedMock).toHaveBeenCalled()
        expect(findByText(/unlock gate/i)).toBeTruthy()
    })
    test(`Open gate enables after unlock`, async () => {
        const toggleLockedMock = jest.fn()
        const controls = render(
            <Controls locked={true} closed={true} toggleLocked={toggleLockedMock} />)
        const unlockGate = controls.getByText(/unlock gate/i)
        await fireEvent.click(unlockGate)
        expect(toggleLockedMock).toHaveBeenCalled()
        expect(controls.getByText(/open gate/i)).toBeDisabled()
    })

})
