import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appEditable][attributeName]',
  host: {
    'contenteditable': 'true'
  }
})
export class EditableDirective<ElementType = HTMLElement, AttributeType extends string = string> {

  @Input() attributeName!: AttributeType;

  // noinspection JSUnusedGlobalSymbols
  constructor(public elementRef: ElementRef<ElementType>) {
  }

}
