import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/services/items.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ ItemsService ]
})
export class ListComponent implements OnInit {

  public listPokemon: any = {}
  public currentItem: number = 1

  constructor(private itemsService: ItemsService) {}

  ngOnInit() :void {
   this.getItems('?pageSize=6&page=1')
  }

  getItems(params: string): void {
    this.itemsService.getItems(params)
      .subscribe((response: any) => {
        this.listPokemon = response
        console.log(this.listPokemon)
    })
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  currentPage(i: number): void {
    this.currentItem = i + 1
    this.getItems(`?pageSize=6&page=${this.currentItem}`)
  }

  prev(): void {
    this.currentItem = this.currentItem > 1 ? this.currentItem - 1 : this.currentItem
    this.getItems(`?pageSize=6&page=${this.currentItem}`)
  }

  next(): void {
    this.currentItem = this.currentItem < 10 ? this.currentItem + 1 : this.currentItem
    this.getItems(`?pageSize=6&page=${this.currentItem}`)
  }

}
