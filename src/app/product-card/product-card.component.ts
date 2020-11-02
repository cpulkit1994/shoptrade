import { Component,
         Input,
         Output,
         EventEmitter,
         OnInit
       }                            from '@angular/core'
import { ProductOptions, 
         UiProductList 
       }                            from '../e-commerce-interface'
import { ECommerceService }         from '../e-commerce.service'

@Component({
  selector    : 'app-product-card',
  templateUrl : './product-card.component.html',
  styleUrls   : ['./product-card.component.scss']
})

export class ProductCardComponent implements OnInit {

  showSizes     : boolean
  sizeSelect    : boolean
  options       : ProductOptions[] = []
  selectedSize  : string

  @Input() product                    : UiProductList
  @Output('onAddToCart') onAddToCart  : EventEmitter<null> = new EventEmitter()

  constructor(private eCommServ : ECommerceService) { 

  }

  ngOnInit() {
    this.options.push(...this.product.options)
  }

  /*============================================================================
                                    HTML
  ============================================================================*/

  onMouseEnter() {
    this.showSizes = true

    if ((Number(this.options[0].value) === NaN || this.options[0].value.charAt(0).toLowerCase() !== 'u')) {
      this.options.forEach(option => {
        option.value = option.value.length > 2 ? option.value.slice(0, 1) : option.value.slice(0, 2)
      })
    }
  }

  onMouseLeave() {
    if (!this.sizeSelect) this.showSizes = false
  }

  onSizeSelect(size : string) {
    this.selectedSize = size
    this.sizeSelect   = true
  }

  addToCart() {
    this.sizeSelect   = false
    this.showSizes    = false

    const selectedOption : ProductOptions = this.options.find(option => {
      return option.value === this.selectedSize
    })

    if (selectedOption) {
      const addedProd : UiProductList = Object.assign({}, this.product)
      addedProd.options = []
      addedProd.options.push(selectedOption)
      this.eCommServ.setCartItems(addedProd)
    }

    this.onAddToCart.emit()
    this.selectedSize = ''
  }
}
