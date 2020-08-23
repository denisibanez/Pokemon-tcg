import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/services/items.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ ItemsService ]
})
export class ListComponent implements OnInit {
  public allPokemon: any = []
  public listPokemon: any = {}
  public filterList: any = []
  public currentItem: number = 1
  public formAtribute: FormGroup = new FormGroup({
    'search': new FormControl(null, [Validators.required])
  })

  constructor(private itemsService: ItemsService) {}

  ngOnInit() :void {
   this.getItemsPagination('1')
   this.getAllItems()
   this.formAtribute.valueChanges.subscribe(changes => {
     if(changes.search == '') this.searchByParam(this.listPokemon)
   });
  }

  getItemsPagination(params: string): void {
    this.clearSearch()
    this.itemsService.getItemsPagination(params)
      .subscribe((response: any) => {
        this.listPokemon = response
        this.searchByParam(this.listPokemon)
    })
  }

  getAllItems(): void {
    this.itemsService.getAllItems()
      .subscribe((response: any) => {
        this.allPokemon = response
    })
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  clearSearch(): void {
    this.formAtribute = new FormGroup({
      'search': new FormControl(null, [Validators.required])
    })
  }

  currentPage(i: number): void {
    this.currentItem = i + 1
    this.getItemsPagination(`${this.currentItem}`)
    this.clearSearch()
  }

  prev(): void {
    this.currentItem = this.currentItem > 1 ? this.currentItem - 1 : this.currentItem
    this.getItemsPagination(`${this.currentItem}`)
    this.clearSearch()
  }

  next(): void {
    this.currentItem = this.currentItem < 10 ? this.currentItem + 1 : this.currentItem
    this.getItemsPagination(`${this.currentItem}`)
    this.clearSearch()
  }

  searchByParam(param: any): void {
    const paramRetry = param || this.allPokemon
    paramRetry.cards.sort(function (a: any, b: any) {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
    
    if(paramRetry.cards && this.formAtribute.value.search) {
      let items = []
      paramRetry.cards.filter((item: any) => {
        let contains = item.name.toLowerCase().includes(this.formAtribute.value.search.toLowerCase())
        if(contains) items.push(item)
      })  
      this.filterList = items
    } else {
      this.filterList = paramRetry.cards
    }
  }
}
