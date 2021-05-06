import Header from '../Components/Header/Header';
import { render, screen } from '@testing-library/react';
import { render as renderer, unmountComponentAtNode, ReactDOM } from "react-dom";
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';



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
    });

    // Testcase1
    test('Should Header Have Rendering', () => {
        renderer(<Router><Header /></Router>, element);
    });

    // Testcase2
    test('Should render header component with musix App text', () => {
        renderer(<Router><Header /></Router>, element);
        expect(screen.getByText(/Miuzik Mania/)).toBeInTheDocument();
    });

    // Testcase3
    test('Should have nav-link in Header component', () => {
        renderer(<Router><Header /></Router>, element);
        const count = element.getElementsByTagName('nav').length;
        expect(count).toBe(1);
    });

    //TestCase 4
    // test('Should have class navbar in Header Component', () => {
    //     renderer(<Router><Header /></Router>, element);
    //     expect(screen.getByTestId('navid')).toHaveClassName('container-fluid');
    // });
  });