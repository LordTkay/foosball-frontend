import { FormControl } from "@angular/forms";

/**
 * Maps all attribute types of an object to a Angular FormControl type.
 */
export type ObjectToFormGroup<T extends object> = {
    [K in keyof T]-?: FormControl<T[K]>
}
