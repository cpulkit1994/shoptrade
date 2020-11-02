import { Component, 
         OnInit 
       }                            from '@angular/core'
import { UiProductList }            from '../e-commerce-interface'
import { ECommerceService }         from '../e-commerce.service'
import { Location }                 from '@angular/common'

@Component({
  selector    : 'app-cart',
  templateUrl : './cart.component.html',
  styleUrls   : ['./cart.component.scss']
})

export class CartComponent implements OnInit {

  addedProduct : UiProductList[] = []

  constructor(private eCommServ : ECommerceService,
    private location            : Location) { }

  ngOnInit() {
    this.addedProduct = JSON.parse(JSON.stringify(this.eCommServ.getCartItems()))
  }

  /*============================================================================
                                  HTML
  ============================================================================*/

  onBackPress() {
    this.location.back()
  }

  incrementProduct(product : UiProductList) {
    product.options.push(product.options[0])
    this.eCommServ.setCartItems(product)
  }

  decrementProduct(product : UiProductList) {
    if (product.options.length === 1) return

    product.options.splice(0, 1)
    this.eCommServ.removeCartItems(product)
  } 

  removeProduct(product : UiProductList) {
    const index : number = this.addedProduct.findIndex(prod => {
      return prod.id === product.id
    })

    this.addedProduct.splice(index, 1)

    this.eCommServ.removeCartItems(product, true)
  }

  placeOrder() {
    window.open("https://shoptrade.co/", "_blank")
  }
}
