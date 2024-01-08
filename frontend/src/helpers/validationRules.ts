import {
  helpers,
  required,
  email as emailValidation,
  maxLength,
  minLength
} from '@vuelidate/validators';

export const required$ = helpers.withMessage(
  'To pole nie może być puste.',
  required
);
export const minLength$ = (len: number) =>
  helpers.withMessage(() => `Minimalna ilość znaków: ${len}.`, minLength(len));
export const maxLength$ = (len: number) =>
  helpers.withMessage(() => `Maksymalna ilość znaków: ${len}.`, maxLength(len));

export const email = {
  required: required$,
  email: helpers.withMessage(
    `Nieprawidłowy format adresu email.`,
    emailValidation
  ),
  minLength: minLength$(6),
  maxLength: maxLength$(100)
};

export const password = {
  required: required$,
  minLength: minLength$(8),
  maxLength: maxLength$(60)
};

export const wordValidation = {
  required: required$,
  minLength: minLength$(2),
  maxLength: maxLength$(40)
};
