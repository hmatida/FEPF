import { EventEmitter, Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PredictionService } from '../prediction.service';

@Component({
  selector: 'app-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.css']
})
export class PlotsComponent implements OnInit {

  @Input() @Output() valor: number;
  @Input() @Output() vecto: Date;
  @Input() @Output() id: any;
  @Output() eve = new EventEmitter();

  formCadPlots: FormGroup;

  constructor(private formBuilder: FormBuilder, private predictionService: PredictionService) {
  }

  ngOnInit() {
    this.formCadPlots = this.formBuilder.group({
      value: this.formBuilder.control(this.valor, [Validators.required]),
      vcto: this.formBuilder.control(this.vecto.toISOString().substring(0,10) , [Validators.required]),
    })
  }

  delPlot(): void{
    this.eve.emit(this.id)
  }

  updateValues(): void {
    const plotsModel = this.formCadPlots.value;
    this.predictionService.getAllPlots()[this.id].value = plotsModel.value;
  }

  updateDate(): void{
    const plotsModel = this.formCadPlots.value;
    this.predictionService.getAllPlots()[this.id].vcto = plotsModel.vcto;
  }

}
