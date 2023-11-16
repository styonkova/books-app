import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type ControlsOf<T extends Record<any, any>> = {
  [K in keyof T]-?: T[K] extends Array<infer R>
    ? FormArray<
        R extends Record<any, any> ? FormGroup<ControlsOf<R>> : FormControl<R>
      >
    : T[K] extends Record<any, any>
    ? FormGroup<ControlsOf<T[K]>>
    : FormControl<T[K]>;
};
