import {LayoutPublic} from '../components/layout/LayoutPublic';
import {describe, test, expect} from 'jest';
import { screen, render} from '@testing-library/react';


describe('<LayoutPublic />', () => {
test("renders layout component when visiting /", () => {
  render( <LayoutPublic /> );
  expect(screen.getByText("Inicio")).toBeInTheDocument();
});
});