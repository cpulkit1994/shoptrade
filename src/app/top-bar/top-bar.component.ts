import { Component, 
         Input,
         Output,
         EventEmitter
       }                from '@angular/core'
import { Router }       from '@angular/router'

@Component({
  selector    : 'app-top-bar',
  templateUrl : './top-bar.component.html',
  styleUrls   : ['./top-bar.component.scss']
})

export class TopBarComponent {

  @Input() showCartCont     : boolean = true
  @Input() cartBadge        : number  = 0
  @Output() searchText      : EventEmitter<string> = new EventEmitter<string>()

  showSearchBox : boolean

  constructor(private router  : Router) { }

  /*============================================================================
                              HTML
  ============================================================================*/

  handleLink() {
    window.open("https://shoptrade.co/", "_blank")
  }

  onCartClick() {
    this.router.navigate(['cart'])
  }

  onSearchClick() {
    this.showSearchBox = true
  }

  onSearch(event : any) {
    this.searchText.emit(event.target.value)
  }
}