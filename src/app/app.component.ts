import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { ALGORITHMS, ARRAY_TYPES } from './data';
import { Bar, SortButtonType } from './models';
import { ArrayGeneratorService, SortFacade } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  SORT_BUTTON_TYPE = SortButtonType;
  algorithmsDataSource = ALGORITHMS;
  arrayTypeDataSource = ARRAY_TYPES;
  numberOfBars: number;
  sortButtonType = SortButtonType.Sort;
  state: Bar[] = [];

  form = this.fb.group({
    algorithmId: [null, Validators.required],
    arrayTypeId: [null, Validators.required],
    speed: [5],
  });

  private arrayTypeSelected$: Observable<number> = this.form
    .get('arrayTypeId')
    .valueChanges.pipe(distinctUntilChanged());
  private handler = null;
  private originalState: Bar[] = [];
  private subscription = new Subscription();

  constructor(
    private arrayGeneratorService: ArrayGeneratorService,
    private fb: FormBuilder,
    private sortFacade: SortFacade
  ) {}

  ngOnInit() {
    this.calculateBars(window.innerWidth);
    this.subscription
      .add(
        this.arrayTypeSelected$.subscribe({
          next: (id: number) => {
            this.onArrayTypeIdChange(id);
            this.sortButtonType = SortButtonType.Sort;
          },
        })
      )
      .add(
        this.arrayGeneratorService.generatedArray$.subscribe({
          next: (generatedArray: Bar[]) => {
            this.originalState = generatedArray;
            this.state = generatedArray;
          },
        })
      )
      .add(
        this.sortFacade.arrayStates$.subscribe({
          next: (states: Bar[][]) => {
            this.onStatesUpdated(states);
          },
        })
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const innerWidth: number = event.target.innerWidth;
    this.calculateBars(innerWidth);
  }

  onGenerate() {
    const arrayTypeId = this.form.value.arrayTypeId;
    this.arrayGeneratorService.generateArray(arrayTypeId, this.numberOfBars);
    this.sortButtonType = SortButtonType.Sort;
  }

  onSort() {
    if (this.sortButtonType === SortButtonType.Stop) {
      clearInterval(this.handler);
      this.form.enable();
      this.sortButtonType = SortButtonType.Reset;
      return;
    }
    if (this.sortButtonType === SortButtonType.Reset) {
      this.state = this.originalState;
      this.sortButtonType = SortButtonType.Sort;
      return;
    }
    this.form.disable();
    const selectedAlgorithmId = +this.form.get('algorithmId').value;
    this.sortFacade.sort(selectedAlgorithmId, this.state);
  }

  trackByFn(index: number, item: Bar) {
    return item.value;
  }

  private calculateBars(availableWidth: number) {
    const clippedWidth = availableWidth - 30; // 15px padding per side
    let bars = Math.floor(clippedWidth / (5 + 4)); // bar width + 2px margin per side
    if (bars > 100) {
      bars = 100;
    }

    this.numberOfBars = bars;
    this.onGenerate();
  }

  private onArrayTypeIdChange(arrayTypeId: number) {
    this.arrayGeneratorService.generateArray(arrayTypeId, this.numberOfBars);
  }

  private onStatesUpdated(states: Bar[][]) {
    const speed = this.form.get('speed').value;
    this.sortButtonType = SortButtonType.Stop;
    let i = 0;
    this.handler = setInterval(() => {
      const nextState = states[i++ % states.length];
      this.state = nextState;
      if (i === states.length) {
        clearInterval(this.handler);
        this.sortButtonType = SortButtonType.Reset;
        this.form.enable();
      }
    }, speed);
  }
}
