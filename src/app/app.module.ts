import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './shared/angular-material.module';
import { LayoutComponent } from './components/layout/layout.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { booksReducer } from './components/+state/books.reducer';
import { BooksEffects } from './components/+state/books.effects';
import { HttpClientModule } from '@angular/common/http';
import { BookAddComponent } from './components/book-add/book-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';
import { BookViewComponent } from './components/book-view/book-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    BooksListComponent,
    BookAddComponent,
    BookViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(
      { booksApp: booksReducer, router: routerReducer },
      {
        metaReducers: [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([BooksEffects]),
    StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule.forRoot(),
    NgxMaskDirective,
    NgxMaskPipe

  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
