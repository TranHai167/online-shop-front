import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appScrollTrack]'
})
export class ScrollTrackDirective {

  @Input() scrollingItems = 10;
  @Output() scrolledToBottom = new EventEmitter<void>();

  emited = false;
  constructor(private el: ElementRef) { }

  @HostListener('scroll', [])
  onScroll():void {
    console.log('scroll');
    if (!this.scrollingItems || this.scrollingItems === 0) {
      return;
    }

    const height = this.el.nativeElement.offsetHeight;
    const scrollTop = this.el.nativeElement.scrollTop;
    const totalHeight = this.scrollingItems * this.el.nativeElement.children[0].offsetHeight;

    if (scrollTop + height >= totalHeight && !this.emited) {
      this.emited = true;
      this.scrolledToBottom.emit();
    } else if (scrollTop + height < totalHeight) {
      this.emited = false
    }
  }
}
