import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Directive({
  selector: '[ngInclude]',
})
export class NgIncludeDirective implements OnInit {
  @Input('ngInclude') src: string = '';

  constructor(private el: ElementRef, private http: HttpClient) {}

  ngOnInit() {
    if (this.src) {
      this.http.get(this.src, { responseType: 'text' }).subscribe((svg) => {
        this.el.nativeElement.innerHTML = svg;
      });
    }
  }
}
