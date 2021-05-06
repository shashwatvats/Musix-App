import Register from '../Components/Register/Register';
import { render, screen } from '@testing-library/react';
import { render as renderer, unmountComponentAtNode } from "react-dom";
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';


export default Register;

describe('Header Component TestCases', () => {
    let element = '';

    beforeEach(() => {
        element = document.createElement('div');
        document.body.appendChild(element);
    });

    afterEach(() => {
        unmountComponentAtNode(element);
        element.remove();
        element = null;
    })

    test('Should Register Have Rendering', () => {
        render(<Router><Register /></Router>);
    });

    test('Should have class container in Register Component', () => {
        render(<Router><Register /></Router>);
        expect(screen.getByTestId('containerid')).toHaveClass('d-flex');
    });

    test('Should have atleast two input in Register component', () => {
        renderer(<Router><Register /></Router>, element);
        const count = element.getElementsByTagName('input').length;
        expect(count).toBeGreaterThanOrEqual(2);
    });

    // test('Should have Register text on button of Register Component', () => {
    //     render(<Router><Register /></Router>);
    //     expect(screen.getByTestId('registerBtn')).toHaveTextContent('Register');
    // });

    // test('Should render Register component with register', () => {
    //     render(<Router><Register /></Router>);
    //     expect(screen.getByText(/ Register/)).toBeInTheDocument();
    // });

});