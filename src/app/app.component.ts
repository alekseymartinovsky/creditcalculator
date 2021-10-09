import { Component } from "@angular/core";
import { CalculationService } from "./calculation.service";
import { DataService } from "./data.service";

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    providers: [DataService, CalculationService]
})

export class AppComponent {}