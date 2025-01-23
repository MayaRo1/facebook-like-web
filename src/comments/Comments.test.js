// Comments.test.js
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Comments from './Comments';

describe('check comments component', () => {
  const commentProps = {
    name: "Test User",
    comment: "test",
    user_img: "test_image_url.jpg",
    commentid: "1",
  };

  //check that comments are rendered
  test('renders comments', () => {
    render(<Comments {...commentProps} />);
    expect(screen.getByText(commentProps.comment)).toBeInTheDocument();
  });
});
