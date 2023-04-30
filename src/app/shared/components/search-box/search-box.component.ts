import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder: string = '';
  
  @Input()
  public initialValue: string = '';

  @Output()
  public onSendText: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer.pipe(debounceTime(300)).subscribe((value) => {
      this.onDebounce.emit(value);
    });
  }

  // @ViewChild('txtValue')
  // public tagInputText!: ElementRef<HTMLInputElement>;

  public emitValue(value: string): void {
    // const newTerm = this.tagInputText.nativeElement.value;
    this.onSendText.emit(value);
  }

  /**
   * el debounce es una forma de ejecutar una función cuando el usuario deja de escribir.
   */
  public onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }
}
