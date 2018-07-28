import { Component, OnInit } from '@angular/core';
import { PrevisonService } from './prevision.service';
import { ProviderModel } from '../provider/provider.model';
import { ProviderService } from '../provider/provider.service';

@Component({
  selector: 'app-prevision',
  templateUrl: './prevision.component.html',
  styleUrls: ['./prevision.component.css']
})
export class PrevisionComponent implements OnInit {

  providers: ProviderModel[];

  constructor( private previsionService: PrevisonService, private providerService: ProviderService) { }

  ngOnInit() {

    this.getProvider();
  }

  getProvider(): void{
    this.providerService.getAllProviders()
        .subscribe(pro => this.providers = pro);
  }

}
