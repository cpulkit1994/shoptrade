import { Injectable }               from '@angular/core'
import { GetAllProductList, 
         UiProductList 
       }                            from './e-commerce-interface'

@Injectable({
  providedIn: 'root'
})

export class ECommerceService {

  private cartItems : UiProductList[] = []
  private cartBadge : number          = 0
  private baseUrl   : string          = 'http://localhost:4200/s/files/1/0455/2176/4502/files/product.json?v=1604154041' // because of CORS proxy is being used for local 
  // private baseUrl   : string          = 'http://shoptrade.safespace.space/s/files/1/0455/2176/4502/files/product.json?v=1604154041' // url used for production

  constructor() { }

  setCartItems(product : UiProductList) {
    if (!this.cartItems.length) {
      this.cartItems.push(product)
      this.cartBadge += 1
    } else {
      const index : number = this.cartItems.findIndex(item => {
        return item.id === product.id && item.options[0].id === product.options[0].id
      })

      if (index !== -1) {
        this.cartItems[index].options.push(product.options[0])
      } else {
        this.cartItems.push(product)
        this.cartBadge += 1
      }
    }
  }

  getCartItems() : UiProductList[] {
    return this.cartItems
  }

  getCartItemsNumber() : number {
    return this.cartBadge
  }

  async getAllProducts(params : GetAllProductList.params) : Promise<GetAllProductList.retval> {
    const resp      : Response                  = await fetch(this.baseUrl, {method : 'GET'}),
          retval    : GetAllProductList.retval  = {} as GetAllProductList.retval

    retval.productList = await resp.json()

    return retval
  }

  removeCartItems(product : UiProductList, removeProduct : boolean = false) {
    const index : number = this.cartItems.findIndex(item => {
      return item.id === product.id
    })

    if (index !== -1) {
      if (this.cartItems[index].options.length > 1 && !removeProduct) {
        this.cartItems[index].options.splice(0, 1)
      } else {
        this.cartItems.splice(index, 1)
        this.cartBadge -= 1
      }
    }
  }
}