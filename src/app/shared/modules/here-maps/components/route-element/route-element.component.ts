import { Component, Input, Output, EventEmitter, Optional, ElementRef, ViewChild, DoCheck, ChangeDetectionStrategy } from '@angular/core';
import { LeafletElement } from '@fourkites/frontend-client-leaflet-module';
import { LeafletGroup } from '@fourkites/frontend-client-leaflet-module';
import { MapService } from '@fourkites/frontend-client-leaflet-module';
import { GroupService } from '@fourkites/frontend-client-leaflet-module';
import { PopupService } from '@fourkites/frontend-client-leaflet-module';
import { GuidService } from '@fourkites/frontend-client-leaflet-module';
import { HelperService } from '@fourkites/frontend-client-leaflet-module';
import { CoordinateHandler } from '@fourkites/frontend-client-leaflet-module';
import { LineOptions } from "../../models/line-options.model";
import { HereMapService } from "../../here-map.service";

@Component({
  selector: 'route-element',
  template: `<div #ngel><ng-content></ng-content></div>`,
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RouteElement extends CoordinateHandler implements DoCheck {
  @Input() public latlngs: [number, number][] = [];
  @Input() public Options: any = new LineOptions(null);
  // @Input() public mouseover: string | undefined = undefined;
  // @Input() public onclick: string | undefined = undefined;
  @Output() public onRoutingComplete?: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('ngel') public ngEl: ElementRef;
  public polyline: any = null;
  public originalObject: any = [...this.latlngs];
  public globalId: string = this.guidService.newGuid();

  constructor(
    private mapService: MapService,
    private popupService: PopupService,
    private guidService: GuidService,
    private helperService: HelperService,
    private hereMapService: HereMapService,
    @Optional() private groupService?: GroupService,
    @Optional() private leafletElement?: LeafletElement,
    @Optional() private leafletGroup?: LeafletGroup) {
    super();
  }

  public ngDoCheck() {
    const map = this.mapService.getMap();

    const same: boolean = this.helperService.arrayCompare(this.originalObject, this.latlngs);

    if (!same) {
      this.originalObject = [...this.latlngs];
      // if the layer is part of a group
      this.Options.fill = false;
      const inheritedOptions: any = new LineOptions(this.Options);

      if (this.leafletGroup) {
        this.hereMapService.getRoute(this.latlngs, inheritedOptions).then((line) => {
          this.polyline = line;
          this.polyline && this.groupService.addOLayersToGroup(this.polyline, map, this.mapService, this.leafletGroup, true, this.globalId);
          this.onRoutingComplete.emit(true);
        }).catch((err) => this.routeingError(err));
      } else {
        this.polyline && map.removeLayer(this.polyline);
        this.hereMapService.getRoute(this.latlngs, inheritedOptions).then((line) => {
          this.polyline = line;
          this.polyline && this.polyline.addTo(map);
          this.onRoutingComplete.emit(true);
        }).catch((err) => this.routeingError(err));
      }
    }
  }

  private routeingError(err){
    this.onRoutingComplete.emit(true);
    console.info(err.message);
  }
}
