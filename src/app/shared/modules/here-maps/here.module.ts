import { NgModule } from '@angular/core';
import { ngxLeafletModule } from '@fourkites/frontend-client-leaflet-module';
import { HereMapService } from './here-map.service';
import { RouteElement } from './components/route-element/route-element.component';

// TODO: move to shared module on QA complete
@NgModule({
  imports: [
    ngxLeafletModule
  ],
  declarations: [
    RouteElement
  ],
  exports: [
    ngxLeafletModule,
    RouteElement
  ],
  providers: [HereMapService]
})
export class HereModule { }
