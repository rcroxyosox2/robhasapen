import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  AppStructure,
  render,
  screen,
  userEvent,
  fireEvent
} from 'testHelpers';
import * as polished from 'polished';
import {
  Form,
} from '../../';

// Default Input
describe('Input', () => {

  const ControledInput = (props) => {
    const [val, setVal] = useState();
    return <Form.Input {...props} value={val} onChange={(e,{value}) => setVal(value)} />;
  }

  it('can render', () => {
    render(<Form.Input placeholder="hello" />);
    const input = screen.getByRole('textbox', {  name: /hello/i});
    expect(input).toBeInTheDocument();
  })

  it('can increment and decrement', async () => {
    render(<ControledInput placeholder="hello" incrementable />);
    const input = screen.getByRole('textbox', {  name: /hello/i});
    expect(input).toBeInTheDocument();
    const incrementButton = screen.getByRole('button', {
      name: /increment/i
    });
    const decrementButton = screen.getByRole('button', {
      name: /decrement/i
    });

    userEvent.click(incrementButton);
    expect(input.value).toBe("1");

    userEvent.click(decrementButton);
    expect(input.value).toBe("0");

    await userEvent.type(input, '{arrowup}');
    expect(input.value).toBe("1");

    await userEvent.type(input, '{arrowdown}');
    expect(input.value).toBe("0");
  })

  it('can have a mask', () => {
    render(<ControledInput placeholder="hello" incrementable mask="number" maskOptions={{ format: 'currency' }}/>);
    const incrementButton = screen.getByRole('button', {
      name: /increment/i
    });
    const input = screen.getByRole('textbox', {  name: /hello/i});
    userEvent.click(incrementButton);
    expect(input.value).toBe('$1');
  })

  it('mask on blur', async () => {
    render(<ControledInput placeholder="hello" mask="number" maskOptions={{ format: 'currency' }} maskOnEvent="blur" />);
    const input = screen.getByRole('textbox', {  name: /hello/i});
    await userEvent.type(input, '1000');
    expect(input.value).toBe('$1000');
    fireEvent.blur(input);
    expect(input.value).toBe('$1,000');
  })

  it('can blur', async () => {
    render(<ControledInput placeholder="hello" />);
    const input = screen.getByRole('textbox', {  name: /hello/i});
    await userEvent.type(input, 'hello');
    expect(input.value).toBe('hello');
    fireEvent.blur(input);
  })

  it('can hande invalid values on blur', async () => {
    const min = 10;
    const max = 20;
    render(<ControledInput placeholder="hello" min={min} max={20} />);
    const input = screen.getByRole('textbox', {  name: /hello/i});

    await userEvent.type(input, '5');
    fireEvent.blur(input);
    expect(input.value).toBe(String(min));

    await userEvent.type(input, '{selectall}');
    await userEvent.type(input, '{del}');

    await userEvent.type(input, '25');
    fireEvent.blur(input);
    expect(input.value).toBe(String(max));
  })

  it('can getKeyCode', async () => {
    const handleKeyDown = (e) => {
      const keyCode = Form.getKeyCode(e);
      const keyCodeNull = Form.getKeyCode();
      expect(keyCode).toBe('Enter');
      expect(keyCodeNull).toBeNull;
    }
    render(<input aria-label="hello" onKeyDown={handleKeyDown} />)
    const input = screen.getByRole('textbox', {  name: /hello/i});
    await userEvent.type(input, '{enter}');
  })

  it('can eventHasKeyCode', async () => {
    const handleKeyDown = (e) => {
      const hasKeyCode = Form.eventHasKeyCode(e, Form.KEYCODES.ENTER);
      const doesntHaveKeyCode = Form.eventHasKeyCode(e, [Form.KEYCODES.SPACE, Form.KEYCODES.TAB]);
      expect(hasKeyCode).toBe(true);
      expect(doesntHaveKeyCode).toBe(false);
    }
    render(<input aria-label="hello" onKeyDown={handleKeyDown} />)
    const input = screen.getByRole('textbox', {  name: /hello/i});
    await userEvent.type(input, '{enter}');
  })
})