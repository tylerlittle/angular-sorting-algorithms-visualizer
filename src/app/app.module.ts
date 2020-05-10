import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { BarComponent } from './bar/bar.component';
import { BarContainerComponent } from './bar-container/bar-container.component';

@NgModule({
  declarations: [AppComponent, BarComponent, BarContainerComponent],
  imports: [BrowserModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
