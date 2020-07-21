import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent {
  @Input() bar: { compare: boolean; final: boolean; value: number };

  constructor() {}

  getBarColor() {
    return this.bar.compare ? 'compare' : this.bar.final ? 'final' : 'initial';
  }
}
