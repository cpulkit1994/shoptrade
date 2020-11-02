import { NgModule }               from '@angular/core'
import { Routes, 
         RouterModule
       }                          from '@angular/router'
import { CartComponent }          from './cart/cart.component'
import { ProductListComponent }   from './product-list/product-list.component'

const routes: Routes = [
  {
    path      : 'product-list',
    component : ProductListComponent
  },
  {
    path      : 'cart',
    component : CartComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
