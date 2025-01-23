// Feedpage.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Feedpage from './Feedpage';
import postData from '../postItem/post.json';

// mock
jest.mock("../topmenu/Topmenu", () => () => <div>Topmenu Component</div>);
jest.mock("../leftmenu/Leftmenu", () => () => <div>Leftmenu Component</div>);
jest.mock("../postItem/PostItem", () => () => <div>PostItem Component</div>);

//check that all posts are rendered
describe('Feedpage post rendered', () => {
  test('renders posts', () => {
    render(<Feedpage />);
    const postItems = screen.getAllByText("PostItem Component");
    expect(postItems.length).toBe(postData.length); 
  });

  test('switch to dark mode', () => {
    render(<Feedpage />);

    // check that initially we have light mode
    expect(screen.getByText('Switch to Dark Mode')).toBeInTheDocument();

    // check that dark mode button switched to dark mode
    fireEvent.click(screen.getByText('Switch to Dark Mode'));
    expect(screen.getByText('Switch to Light Mode')).toBeInTheDocument();
  });
});
