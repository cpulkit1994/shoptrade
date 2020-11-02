import { Component, 
         OnInit 
       }                                from '@angular/core'
import { UiProductList, 
         TAGS 
       }                                from '../e-commerce-interface'
import { ECommerceService }             from '../e-commerce.service'

enum SORT_TYPE {
  LOW_TO_HIGH = 'Price Low To High',
  HIGH_TO_LOW = 'Price High To Low'
}

interface TagsType {
  id         : TAGS
  value      : string
}

@Component({
  selector    : 'app-product-list',
  templateUrl : './product-list.component.html',
  styleUrls   : ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {

  isApiFinished : boolean 
  selectedTag   : TAGS            = TAGS.ALL_PRODUCTS
  productList   : UiProductList[] = []
  filteredList  : UiProductList[] = []
  showError     : boolean         = false
  tagsTypeList  : TagsType[]      = []
  sortTypeData  : SORT_TYPE[]     = [SORT_TYPE.LOW_TO_HIGH, SORT_TYPE.HIGH_TO_LOW]
  cartBadge     : number          = 0

  constructor(private eCommServ : ECommerceService) { 

  }

  ngOnInit() {
    this.cartBadge = this.eCommServ.getCartItemsNumber()
    this.getAllProductList()
  }

  /*============================================================================
                                    Private
  ============================================================================*/

  private async getAllProductList() {
    this.isApiFinished  = false
    const resp          = await this.eCommServ.getAllProducts({})

    if (resp.productList) {
      resp.productList.map(product => {
        this.productList.push({... product, 
          discountPerc : this.calculteDiscountPerc(Number(product.compare_at_price), Number(product.price))})
      })

      this.productList.sort((a : UiProductList, b : UiProductList) => {
        return Number(a.price) - Number(b.price)
      })

      this.filteredList.push(... this.productList)
      this.createTagList()
    } else {
      this.showError = true
    }

    this.isApiFinished = true
  }

  private calculteDiscountPerc(actualPrice : number, priceAfterDiscount : number) : string {
    const discountPerc : number = ((actualPrice - priceAfterDiscount)/ actualPrice) * 100
    return discountPerc.toString().includes('.') ? `${discountPerc.toFixed(2)} %` : `${discountPerc} %`
  }

  private async createTagList() {
    const list : TagsType[] = [
      {
        id        : TAGS.ALL_PRODUCTS,
        value     : 'All Products'
      },
      {
        id    : TAGS.T_SHIRT,
        value : 'Tee Shirt'
      },
      {
        id    : TAGS.DENIM,
        value : 'Denim'
      },
      {
        id    : TAGS.SWEAT_SHIRT,
        value : 'Sweatshirts',
      },
      {
        id    : TAGS.POLO_T_SHIRT,
        value : 'Polo Tee Shirt'
      },
      {
        id    : TAGS.JACKET,
        value : 'Jacket'
      },
      {
        id    : TAGS.SHIRT,
        value : 'Shirt'
      }
    ]

    this.tagsTypeList = list
  }

  private filterProductsByTags() {

    let list : UiProductList[] = []

    switch(this.selectedTag) {

      case TAGS.ALL_PRODUCTS :
        list.push(...this.productList)
        break

      case TAGS.DENIM : 
        list = this.productList.filter(product => {
          return product.tag === TAGS.DENIM
        })
        break

      case TAGS.JACKET : 
        list = this.productList.filter(product => {
          return product.tag === TAGS.JACKET
        })
        break

      case TAGS.POLO_T_SHIRT : 
        list = this.productList.filter(product => {
          return product.tag === TAGS.POLO_T_SHIRT
        })
        break

      case TAGS.SHIRT : 
        list = this.productList.filter(product => {
          return product.tag === TAGS.SHIRT
        })
        break

      case TAGS.SHIRT : 
        list = this.productList.filter(product => {
          return product.tag === TAGS.SWEAT_SHIRT
        })
        break

      case TAGS.SHIRT : 
        list = this.productList.filter(product => {
          return product.tag === TAGS.T_SHIRT
        })
        break
    }

    this.filteredList = list

  }

  /*============================================================================
                                    HTML
  ============================================================================*/

  onApiError() {
    this.showError = false
    this.getAllProductList()
  }

  onAddToCart() {
    this.cartBadge = this.eCommServ.getCartItemsNumber()
  }

  onTagsClick(type : TagsType) {
    this.selectedTag = type.id
    this.filterProductsByTags()
  }

  onSortByPrice(event : any) {
    let list : UiProductList[] = []

    switch (event.target.value) {
      case SORT_TYPE.LOW_TO_HIGH :
        list = this.filteredList.sort((a : UiProductList, b : UiProductList) => {
          return Number(a.price) - Number(b.price)
        })
        this.productList.sort((a : UiProductList, b : UiProductList) => {
          return Number(a.price) - Number(b.price)
        })
        break

      case SORT_TYPE.HIGH_TO_LOW :
        list = this.filteredList.sort((a : UiProductList, b : UiProductList) => {
          return Number(b.price) - Number(a.price)
        })
        this.productList.sort((a : UiProductList, b : UiProductList) => {
          return Number(b.price) - Number(a.price)
        })
        break
    }

    this.filteredList = []
    this.filteredList = list
  }

  handleLink() {
    window.open("https://shoptrade.co/", "_blank")
  }

  onSearchText(text : string) {
    const filtList = this.productList.filter(product => {
      return (product.name.toLowerCase().search(text.toLowerCase()) !== -1 
        || product.vendor.toLowerCase().search(text.toLowerCase()) !== -1) 
    })

    this.filteredList = filtList
  }
}
