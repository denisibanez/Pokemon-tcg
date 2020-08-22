import { Routes } from '@angular/router'

import { ListComponent } from './components/list/list.component'
import { DetailComponent } from './components/detail/detail.component'

export const ROUTES: Routes = [
    { path: '', component: ListComponent },
    { path: 'detalhe/:id', component: DetailComponent },
]