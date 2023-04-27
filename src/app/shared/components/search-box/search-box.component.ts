import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = '';

  @Output()
  public onSendText: EventEmitter<string> = new EventEmitter<string>();

  // @ViewChild('txtValue')
  // public tagInputText!: ElementRef<HTMLInputElement>;

  public emitValue(value: string): void {
    // const newTerm = this.tagInputText.nativeElement.value;
    this.onSendText.emit(value);
  }
}
