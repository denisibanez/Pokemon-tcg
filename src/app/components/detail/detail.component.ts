import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/services/items.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [ ItemsService ]
})
export class DetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private itemsService: ItemsService) {}

  public detailPokemon: any = null

  ngOnInit(): void {
    this.getItems(`${this.route.snapshot.params.id}`)
  }

  getItems(params: string): void {
    this.itemsService.getItemById(params)
      .subscribe((response: any) => {
        this.detailPokemon = response.card
    })
  }

}
