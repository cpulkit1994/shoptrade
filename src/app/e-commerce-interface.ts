export enum TAGS {
  ALL_PRODUCTS  = 'All Product',
  T_SHIRT       = 'T-shirt',
  DENIM         = 'Denim',
  SHIRT         = 'shirt',
  JACKET        = 'jacket',
  SWEAT_SHIRT   = 'sweat shirt',
  POLO_T_SHIRT  = 'Polo Tee Shirt'
}

export interface ProductOptions {
  id    : string
  name  : string
  value : string
}

export interface ProductList {
  id                : string
  vendor            : string
  name              : string
  image_src         : string[]
  price             : string
  tag               : TAGS
  compare_at_price  : string       // compare with this price to show the percent discount
  options           : ProductOptions[]
}

export interface UiProductList extends ProductList {
  discountPerc : string
}

export namespace GetAllProductList {

  export type params = {
    
  }

  export type retval = {
    productList : ProductList[]
  }
}
