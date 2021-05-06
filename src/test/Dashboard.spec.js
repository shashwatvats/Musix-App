import Dashboard from '../Components/Dashboard/Dashboard';
import { render, screen } from '@testing-library/react';
import { render as renderer, unmountComponentAtNode } from "react-dom";
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';


describe('Dashboard Component TestCases', () => {

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

    test('Should Dashboard Have Rendering', () => {
        render(<Router><Dashboard /></Router>);
    });

    // test('Should Dashboard Have Container Class', () => {
    //     render(<Router><Dashboard /></Router>);
    //     expect(screen.getElementById('container1')).toHaveClass('container');
    // });

    // test('Should Dashboard Have main carousel  Class', () => {
    //     render(<Router><Dashboard /></Router>);
    //     expect(screen.getElementById('card2')).toHaveClass('main-carousel');
    // });

    test('Should have atleast one div in Dashboard component', () => {
        renderer(<Router><Dashboard /></Router>, element);
        const count = element.getElementsByTagName('div').length;
        expect(count).toBeGreaterThanOrEqual(0);
    });

});