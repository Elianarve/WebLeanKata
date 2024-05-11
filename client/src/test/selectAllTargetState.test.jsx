// // SelectAllTargetState.test.js
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import SelectAllTargetState from '../components/selectall/selectAlllTargetStates';
// import { getTargetState } from '../../services/targetStateServices';
// import jest from 'jest';
// import { describe, test, expect } from 'jest';

// // Mock the getTargetState service function
// jest.mock('../../services/targetStateServices' , () => ({
//     getTargetState: jest.fn(),
// }));

// describe('SelectAllTargetState', () => {
//   test('renders and handles select change', async () => {
//     const mockOnTargetStateSelect = jest.fn();
//     const mockTargetStates = [
//       { id: '1', description: 'Target State 1' },
//       { id: '2', description: 'Target State 2' },
//     ];

//     // Make getTargetState return the mock target states
//     getTargetState.mockResolvedValueOnce(mockTargetStates);

//     const { getByText, getByRole } = render(
//       <SelectAllTargetState onTargetStateSelect={mockOnTargetStateSelect} challengeId="1" />
//     );

//     // Wait for the target states to be loaded
//     await waitFor(() => getByText('Target State 1'));

//     // Simulate a change in the select element
//     fireEvent.change(getByRole('combobox'), { target: { value: '2' } });

//     // Check that onTargetStateSelect was called with the correct target state
//     expect(mockOnTargetStateSelect).toHaveBeenCalledWith(mockTargetStates[1]);
//   });
// });