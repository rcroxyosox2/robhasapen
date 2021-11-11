import React, { useState } from 'react';
import { buttonStyleTypes } from '../../Button';
import { InputMask } from '../../Utils';
import Header from '../../Header';
import { linkTo } from '@storybook/addon-links';
import { useArgs } from '@storybook/client-api';
import Button from '../../Button';
import { inputStyleTypes } from './constants';
import { default as InputComponent, inputIconTypes } from './index';

const errorHelpTextArr = [
  "Note that these messages clear when the field is focused which does not come out of the box, but should always be the behavior implemented.",
  "Another error. The helptext prop can be an array or string.",
];

export default {
  title: 'PDS/Form/Input',
  component: InputComponent,
  argTypes: {
    focused: {
      description: 'Will set focus to the input on mount if true. See the default story for example use',
    },
    styleType: {
      options: inputStyleTypes,
      defaultValue: 'gray',
    },
    iconType: {
      options: [...inputIconTypes,  null],
      control: {
        type: 'radio',
      }
    },
    value: {
      control: {
        disable: true,
      },
      description: 'Because this is a controlled component, a value must be passed in from props',
      table: {

      }
    },
    helptext: {
      control: {
        type: 'array',
      }
    },
    incrementable: {
      description: 'Adds UI controls to the sides of the input. Controls allow for adding and subtracting `step` amount from the value',
    },
    step: {
      description: 'The amount to add or subtract from the value when either `incrementable` controls are used, or the up and down arrow keys',
    },
    controlStyleType: {
      description: 'Changes the button style of the increment/decrement buttons seen when incrementable is set to `true`',
      options: buttonStyleTypes, //https://github.com/storybookjs/storybook/issues/14092
      table: {
        type: {
            summary: buttonStyleTypes.join(' | ')
        }
      },
    },
    onChange: {
      description: 'Because this is a controlled component, a onChange handler must be used, and a value must be passed in from props',
      table: {
        defaultValue: {
          summary: null
        },
        type: {
            detail: 'func(event, {value, unformatted})'
        }
      },
    },
    mask: {
      table: {
        type: {
            summary: InputMask.getEngineNames().join(' | ')
        }
      },
      options: InputMask.getEngineNames(),
    },
    maskOnEvent: {
      description: `This allows for input masking to happen only when the user blurs the field instead of change. Useful for when masks complicate the input process with the extra chars being added and removed. See the Percentage Mask story for usage`,
    },
    trim: {
      defaultValue: true,
    }
  },
  parameters: { actions: { argTypesRegex: '^on.*' } },
  decorators: [
     (Story) => {
      // const [, updateArgs] = useArgs();
      return (
        <div style={{ margin: '3em' }}>
          { Story() }
        </div>
      );
    }
  ],
};

const Template = (args, story) => {
  // TODO: figure out why useArgs breaks the docs
  // const [_, updateArgs] = useArgs();
  const [value, setValue] = useState(args.value ?? '');
  const handleChange = (e, { value }) => {
    setValue(value)
  };
  // const handleClick = () => updateArgs({error: true, helptext: errorHelpTextArr});
  // const handleFocus = () => updateArgs({error: false, helptext: []});
  return (
    <>
      <Header styleSize="large">Input field</Header>
      <InputComponent {...args}
        onChange={(...params) => {
          const [event, values] = params;
          const { value, unformatted } = values;
          args.onChange(...params);
          setValue(value);
        }}
        value={value}
      />
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non enim ac leo ultrices dignissim ac faucibus dui. Nullam mattis blandit molestie. Morbi consectetur efficitur dictum. Curabitur non rutrum nibh. Ut et ex eget turpis convallis volutpat. Nulla a molestie tellus, vel venenatis leo.
      </div>
      {/* <Button onClick={handleClick}>Click</Button> */}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  focused: true,
  helptext: [],
  styleType: 'gray',
  placeholder: `I'm an input placeholder`
};

export const CurrencyMask = Template.bind({});
CurrencyMask.args = {
  helptext: [],
  styleType: 'gray',
  placeholder: 'How much is your home worth?',
  mask: 'number',
  maskOptions: {
    "format": "currency",
    "precision": 2,
    "chopZeros": false,
  }
};

export const PercentageMask = Template.bind({});
PercentageMask.args = {
  styleType: 'gray',
  placeholder: 'How much percent?',
  mask: 'number',
  maskOnEvent: 'blur',
  helptext: 'Note this will mask onBlur and unmask on focus. This is done with maskOnEvent prop',
  maskOptions: {
    "format": "percentage",
    "precision": 1,
    "chopZeros": false,
  }
};

export const SSNMask = Template.bind({});
SSNMask.args = {
  styleType: 'gray',
  placeholder: 'Enter the last 4 of your SSN',
  mask: 'ssn',
  maskOptions: {
    "last4": true
  }
};

export const Incrementable = Template.bind({});
Incrementable.args = {
  helptext: [],
  styleType: 'gray',
  placeholder: 'Incrementable with step and mask',
  mask: 'number',
  incrementable: true,
  step: 1000,
};

export const ErrorWithMessages = Template.bind({});
ErrorWithMessages.args = {
  styleType: 'gray',
  helptext: errorHelpTextArr,
  error: true,
  placeholder: 'Placeholder text',
};

