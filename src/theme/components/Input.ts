import { Input, InputWrapper, Textarea } from '@mantine/core';
import classes from './Input.module.css';

export const InputExtension = Input.extend({
  defaultProps: {
    radius: 'pill',
    size: 'lg',
  },
  classNames: {
    input: classes.input,
  },
});

export const InputWrapperExtension = InputWrapper.extend({
  classNames: {
    label: classes.label,
    required: classes.required,
    error: classes.error,
  },
});

export const TextareaExtension = Textarea.extend({
  defaultProps: {
    radius: 'lg',
    autosize: true,
    minRows: 5,
  },
});
