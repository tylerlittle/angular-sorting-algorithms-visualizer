import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BubbleSortService } from './bubble-sort.service';
import { BubbleSortOptimizedService } from './bubble-sort-optimized.service';
import { HeapSortService } from './heap-sort.service';
import { InsertionSortService } from './insertion-sort.service';
import { SelectionSortService } from './selection-sort.service';
import { SortingAlgorithmEnum, Bar } from '../models';

@Injectable({ providedIn: 'root' })
export class SortFacade {
  private arrayStatesSubject = new Subject<Bar[][]>();
  arrayStates$ = this.arrayStatesSubject.asObservable();
  private states: Bar[][] = [];

  constructor(
    private bubbleSortService: BubbleSortService,
    private bubbleSortOptimizedService: BubbleSortOptimizedService,
    private heapSortService: HeapSortService,
    private insertionSortService: InsertionSortService,
    private selectionSortService: SelectionSortService
  ) {}

  sort(algorithmId: number, state: Bar[]) {
    switch (algorithmId) {
      case SortingAlgorithmEnum.BubbleSort:
        this.states = this.bubbleSortService.sort(state);
        break;
      case SortingAlgorithmEnum.BubbleSortOptimized:
        this.states = this.bubbleSortOptimizedService.sort(state);
        break;
      case SortingAlgorithmEnum.HeapSort:
        this.states = this.heapSortService.sort(state);
        break;
      case SortingAlgorithmEnum.InsertionSort:
        this.states = this.insertionSortService.sort(state);
        break;
      case SortingAlgorithmEnum.SelectionSort:
        this.states = this.selectionSortService.sort(state);
    }
    this.arrayStatesSubject.next(this.states);
  }
}
