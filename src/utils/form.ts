import { FormikErrors, FormikTouched } from "formik";

export const ErrorMessages = {
  required: (field: string) => `${field} is required`,
  invalid: (field: string) => `${field} is invalid`,
};

export const showFieldError = (
  touched:
    | boolean
    | FormikTouched<unknown>
    | FormikTouched<unknown>[]
    | undefined,
  error:
    | string
    | string[]
    | FormikErrors<unknown>
    | FormikErrors<unknown>[]
    | undefined
): string | undefined => {
  if (typeof touched !== "boolean") return undefined;
  if (touched && typeof error === "string") return error;
  return undefined;
};
