import { render, screen } from '@testing-library/react';
import App from '../src/pages/_app';
import '@testing-library/jest-dom';

describe('_app', () => {
  test('renders PasswordManager and Generator components', () => {
    render(<App />);
    
    const passwordManagerElement = screen.getByTestId('password-manager');
    expect(passwordManagerElement).toBeInTheDocument();

    const generatorElement = screen.getByTestId('generator');
    expect(generatorElement).toBeInTheDocument();
  });
});
