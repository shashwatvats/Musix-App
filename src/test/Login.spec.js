import Login from '../Components/Login/Login';
import { render, screen } from '@testing-library/react';
import { render as renderer, unmountComponentAtNode } from "react-dom";
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

export default Login;
describe('Login Component TestCases', () => {
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

    test('Should Login Have Rendering', () => {
        render(<Router><Login /></Router>);
    });

    test('Should have class flex in Login Component', () => {
        render(<Router><Login /></Router>);
   expect(screen.getByTestId('containerid')).toHaveClass('d-flex');

    });

    test('Should have atleast two textField in Login component', () => {
        renderer(<Router><Login /></Router>, element);
        screen.debug(element)
        const count = element.getElementsByTagName('span').length;
        expect(count).toBeGreaterThanOrEqual(2);
    });

    test('Should have login text on button of Login Component', () => {
        render(<Router><Login /></Router>);
        expect(screen.getByTestId('testid')).toHaveTextContent('Login');
    });

    test('Should render login component with SignUp', () => {
        render(<Router><Login /></Router>);
        expect(screen.getByText(/SignUp/)).toBeInTheDocument();
    });


});

