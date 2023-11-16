import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export class BookValidators {
  static fileType(
    fileTypes: string[] = ['application/pdf', 'image/jpeg']
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: File = control.value;

      if (value) {
        const { type } = value;

        const checkDocumentType = !fileTypes.find(
          (fileType) => fileType === type
        );

        if (checkDocumentType) {
          return { forbiddenDocumentType: { value } };
        } else {
          return null;
        }
      }

      return null;
    };
  }

  static fileSize(fileMaxSize: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: File = control.value;

      if (value) {
        const { size } = value;

        if (size > fileMaxSize) {
          return { forbiddenDocumentSize: { value } };
        } else {
          return null;
        }
      }

      return null;
    };
  }

  static onlyLetters(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.trim();

      if (value) {
        const onlyLettersRegExp = /^[a-zA-Z ]+$/;
        const onlyLetters = onlyLettersRegExp.test(value);
        return onlyLetters ? null : { onlyLetters: { value } };
      }
      return null;
    };
  }
  static noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isWhitespace =
        ((control && control.value && control.value.toString()) || '').trim()
          .length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { onlyWhiteSpace: true };
    };
  }

  static onlyNumbers(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value) {
        const onlyNumbersRegExp = /^[0-9]*$/g;
        const onlyNumbers = onlyNumbersRegExp.test(value);
        return onlyNumbers ? null : { onlyNumbers: { value } };
      }

      return null;
    };
  }

  static requiredISBN(prefix: string | null = ''): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value: string | null = control.value;

      if (prefix && value) {
        const checkIfValueStartWithPrefix = value.startsWith(prefix);

        if (checkIfValueStartWithPrefix) {
          value = value.slice(prefix.length);
        }
      }

      return value ? null : { required: true };
    };
  }

}
