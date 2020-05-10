import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {
  @Input() bar: { compare: boolean; final: boolean; value: number };

  constructor() {}

  ngOnInit(): void {}

  getBarColor() {
    return this.bar.compare ? 'compare' : this.bar.final ? 'final' : 'initial';
  }
}
