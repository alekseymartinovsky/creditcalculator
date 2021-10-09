import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import { InpFormComponent } from './inpForm/inpForm.component';
import { ResultCreditComponent } from './result-credit/result-credit.component';
import { DetailsComponent } from './details/details.component';
import { HttpClientModule } from '@angular/common/http';
import { MoneyComponent } from './money/money.component'
 
@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule ],
    declarations: [ AppComponent, InpFormComponent, ResultCreditComponent, DetailsComponent, MoneyComponent ],
    bootstrap:    [ AppComponent ]
})

export class AppModule {}