import { BrowserModule }            from '@angular/platform-browser'
import { NgModule }                 from '@angular/core'
import { AppRoutingModule }         from './app-routing.module'
import { AppComponent }             from './app.component'
import { ProductCardComponent }     from './product-card/product-card.component'
import { CartComponent }            from './cart/cart.component'
import { ProductListComponent }     from './product-list/product-list.component'
import { TopBarComponent }          from './top-bar/top-bar.component'
import { LoadingComponent }         from './loading/loading.component'
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations'
import { MaterialModule }           from './material.module'

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    CartComponent,
    ProductListComponent,
    LoadingComponent,
    TopBarComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
