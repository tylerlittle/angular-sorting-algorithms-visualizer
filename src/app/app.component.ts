import { Component } from '@angular/core';
import { BubbleSortService } from './bubble-sort.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-algorithms-visualizer';
  state = [];

  constructor(private service: BubbleSortService) {
    this.service.stateUpdated.subscribe(
      (data: number[]) => (this.state = data)
    );
  }

  onGenerate() {
    this.service.getArray();
  }

  onSort() {
    this.service.sort();
  }
}
