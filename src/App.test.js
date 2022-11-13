import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Header from './interface/components/header';
import { header, home, game } from './interface/constant-text/text'
import Home from './interface/components/Home';
import { BrowserRouter } from "react-router-dom";
// import Game from './interface/components/Game';

test('renders title', () => {
  render(<Header />);
  const textElement = screen.getByText(header.title.toUpperCase());
  expect(textElement).toBeInTheDocument();
});

test('renders welcome text', () => {
  render(<Home />, { wrapper: BrowserRouter });
  const textElement = screen.getByText(home.welcomeTxt);
  expect(textElement).toBeInTheDocument();
});

test('renders description', () => {
  render(<Home />, { wrapper: BrowserRouter });
  const textElement = screen.getByText(home.description);
  expect(textElement).toBeInTheDocument();
});

test('click the button "enter" and show the pop-up error', () => {
  render(<Home />, { wrapper: BrowserRouter });
  const button = screen.getByTestId("home-btn-enter");
  fireEvent.click(button);
  const textElement = screen.getByText(home.dialogText);
  expect(textElement).toBeInTheDocument();
});

// test('play game', () => {
//   const namePlayerTest = "NombrePrueba";
//   render(<Game namePlayerTest={namePlayerTest} />, { wrapper: BrowserRouter });
//   const textElement = screen.getByText(game.title);
//   expect(textElement).toBeInTheDocument();
//   const button = screen.getByTestId(game.rock);
//   fireEvent.click(button);
//   const botThinks = screen.getByText(game.botThinks);
//   expect(botThinks).toBeInTheDocument();
// });





