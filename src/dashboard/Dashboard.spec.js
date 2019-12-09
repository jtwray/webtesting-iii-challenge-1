import React from 'react'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Dashboard from './Dashboard'

describe('Dashboard', () => {
    test('renders correctly', () => {
        const dashboard = render(<Dashboard />);
        expect(dashboard).toMatchSnapshot();
    })
    test('renders Controls', () => {
        const {queryByText,findByText,getAllByText} = render(<Dashboard />);
        expect(findByText(/Gate/i));
    })
    test('renders Display', () => {
        const {getByText} = render(<Dashboard />);
        expect(getByText(/locked/i));
    })
})
