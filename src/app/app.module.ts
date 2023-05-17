import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StorageService } from './core/storage';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NotesComponent } from './shared/notes/notes.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
