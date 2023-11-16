import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { BooksListComponent } from './components/books-list/books-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full', 
    redirectTo: 'books', 
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'books', component: BooksListComponent ,
      data: {
        title: 'Books',
      },
      // children: [
      //   {
      //     path: ':id',
      //     component: ChatDetailsComponent,
      //   },
      // ]
    }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
