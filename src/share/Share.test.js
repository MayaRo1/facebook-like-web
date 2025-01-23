// Share.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Share from './Share';

describe('Share', () => {
  test('renders the share buttons', () => {
    render(<Share />);

    // check that all buttons on share page exist
    const emailButton = screen.queryByText(/email/i);
    const whatsappButton = screen.queryByText(/whatsapp/i);
    const instagramButton = screen.queryByText(/instagram/i);
    const skypeButton = screen.queryByText(/skype/i);
    const youtubeButton = screen.queryByText(/youtube/i);

    expect(emailButton).toBeInTheDocument();
    expect(whatsappButton).toBeInTheDocument();
    expect(instagramButton).toBeInTheDocument();
    expect(skypeButton).toBeInTheDocument();
    expect(youtubeButton).toBeInTheDocument();
  });
});
