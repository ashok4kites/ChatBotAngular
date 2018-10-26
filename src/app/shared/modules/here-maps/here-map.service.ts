import { HttpClient } from '@angular/common/http';
import * as _ from "lodash";
import { Injectable } from '@angular/core';
import { DEFAULT_PROX, DEFAULT_PROX_RADIUS, HereMapUrls, HereMapAuthToken } from 'app/shared/modules/here-maps/constants/here-config.constants';
import { LineOptions } from "./models/line-options.model";

declare var L:any; import {} from "@types/leaflet";

@Injectable()
export class HereMapService {

  private readonly autocompleteSuggestUrl = "suggest.json"
	private readonly geocodeUrl = "geocode.json"
  private readonly reverseGeocodeUrl = "reversegeocode.json"

  public static readonly Router = L.Routing.here(HereMapAuthToken.app_id, HereMapAuthToken.app_code, { mode: 'fastest;truck' });

  constructor(private http: HttpClient) { }

  public autocompleteSuggest(query, resultType='street'): Promise<{[key: string] :any}[]> {
    let params = {
      query,
      resultType,
      ...HereMapAuthToken,
      ...DEFAULT_PROX,
      language: 'en'
    }
    return this.http.get(this.getFullAutocompleteUrl(), { params })
      .toPromise()
      .then((response) => {
        let suggestions = response['suggestions'];
        if(suggestions) {
          suggestions.forEach((value) => {
            value.label = value.label.split(",").reverse().join(", ")
          })
        }
        return suggestions;
      })
      .catch(this.handleError)
  }

  public geocodeLocation(locationid): Promise<{[key: string]: any}> {
    let params = {
      locationid,
      ...HereMapAuthToken,

    }
    return this.http.get(this.getFullGeocodeUrl(), { params })
      .toPromise()
      .then((response) => {
        let LatLong;
        try {
          LatLong = response['Response']['View'][0]['Result'][0]['Location']['DisplayPosition']
        } catch (e) {
          console.warn('error resolving geocode');
          LatLong = { Latitude: null, Longitude: null }
        } finally {
          return LatLong
        }
      })
      .catch(this.handleError)
  }

  public reverseGeocodeCoordinates(latitude, longitude): Promise<{[key: string] :any}> {
    let params: {[key: string] :any} = {
      ...HereMapAuthToken,
      xnlp: "CL_JSMv3.0.17.0",
      prox: `${latitude},${longitude},${DEFAULT_PROX_RADIUS}`,
      mode: "retrieveAddresses",
      maxresults: 1
    }
    let paramsString = _.map(params, (val, key) => (`${encodeURIComponent(key)}=${encodeURIComponent(val)}`)).join('&');
    return this.http.jsonp(`${this.getFullReverseGeocodeUrl()}?${paramsString}`, 'jsoncallback')
      .toPromise()
      .then((response) => {
        let Address;
        try {
          Address = response['Response']['View'][0]['Result'][0]['Location']['Address']
          Address['Country'] = _.result(_.find(Address['AdditionalData'], (d) => (d['key'] == 'CountryName')), 'value')
          Address['State'] = _.result(_.find(Address['AdditionalData'], (d) => (d['key'] == 'StateName')), 'value')
        } catch(e) {
          console.warn('error resolving geocode');
          Address = { Country: '', State: '', County: '', City: '', District: '', Street: '', HouseNumber: '', PostalCode: '' }
        } finally {
          return Address
        }
      })
      .catch(this.handleError)
  }

  public getRoute(waypointsLatLng: [number, number][], lineOptions: LineOptions = new LineOptions(null)){
    const waypoints = waypointsLatLng.map((waypoint) => this.prepareHereWaypoint(waypoint))
    return new Promise((resolve, reject) => {
      if(_.isEmpty(waypoints) || waypoints.length < 2) {
        reject({ message: 'not enough waypoints' });
        return null
      }
      HereMapService.Router.route(waypoints, (err, routes) => {
        if(!err){
          const lines = new L.Routing.Line(_.first(routes), lineOptions)
          resolve(lines)
        } else {
          reject(err);
        }
      }, this, { mode: 'fastest;truck' })
    })
  }

	public getUniqueId(point) {
    return `${point.lat}_${point.lng}`;
  }

  private getFullAutocompleteUrl(){
    return `${HereMapUrls.autocompleteGeocoder}${this.autocompleteSuggestUrl}`
  }

  private getFullGeocodeUrl(){
    return `${HereMapUrls.geocoder}${this.geocodeUrl}`
  }

  private getFullReverseGeocodeUrl(){
    return `${HereMapUrls.reversegeocoder}${this.reverseGeocodeUrl}`
  }

  private prepareHereWaypoint([lat, lng]){
    // return L.latLng(lat, lng)
    const LatLng = new L.LatLng(lat, lng);
    const name = this.getUniqueId({lat, lng})
    return new L.Routing.Waypoint(LatLng, name)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
