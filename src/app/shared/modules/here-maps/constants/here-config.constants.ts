import * as _ from "lodash";

export const CIRCULAR_GEO = "circular";
export const POLYGONAL_GEO = "polygonal";
export const DEFAULT_GEO_RADIUS = 1609;
export const MIN_GEO_RADIUS = 1000;
export const MAX_GEOFENCE_COUNT = 10;
export const DEFAULT_ZOOM_CIRCULAR = 17;
export const DEFAULT_ZOOM_POLYGONAL = 17;
export const GEOFENCE_DEFAULT = 8046.72;
export const DEFAULT_PROX_RADIUS = 100;

export const HereMapAuthToken = {
  app_id: 'eBWPXwy5NTgs66Q56LPO',
  app_code: 'sRJPc2zq91rLlD61rf2SkQ'
}

export const HereMapConfig = {
  libraries: 'mapevents,ui',
  useHTTPS: true
};

export const DEFAULT_PROX = {
  prox: "39.828,-98.579,3800000"
}

export const HereMapUrls = {
  reversegeocoder: "https://reverse.geocoder.api.here.com/6.2/",
  geocoder: "https://geocoder.api.here.com/6.2/",
  autocompleteGeocoder: "https://autocomplete.geocoder.api.here.com/6.2/"
}

export const LAT_LNG_REGEX_PATTERN = /^-?[0-9]{1,3}(?:\.[0-9]{1,15})?$/;

export const GEOFENCE_POINTER_IMG = `assets/images/here-maps/geofence_pointer.png`;

export const AERIS = {
  appUrl: 'https://maps.aerisapi.com/',
  appId: 'TPRXjpHE3Chieeze5Sfg9_lETxT4qNjaH5iycUX9N5DZDKT3OvTQUcHFEIM3O8',
  type: '/radar/',
  imageName: '/current.png',
  weatherEnabledCompanies: ['gap-inc', 'meijer']
};

export const hereLayers = [
  {
    base: 'base',
    type: 'maptile',
    scheme: 'normal.day'
  },
  {
    base: 'base',
    type: 'maptile',
    scheme: 'normal.day.transit'
  },
  {
    base: 'base',
    type: 'maptile',
    scheme: 'pedestrian.day'
  },
  {
    base: 'aerial',
    type: 'maptile',
    scheme: 'terrain.day'
  },
  {
    base: 'aerial',
    type: 'maptile',
    scheme: 'satellite.day'
  },
  {
    base: 'aerial',
    type: 'maptile',
    scheme: 'hybrid.day'
  }, {
    base: 'base',
    type: 'maptile',
    scheme: 'reduced.day'
  }
];

export const HERE_LAYER_URL = (options = { scheme: "reduced.day", resource: "mapnopttile" }) => {
  const appId = HereMapAuthToken.app_id;
  const appCode = HereMapAuthToken.app_code;
  const tileResolution = 256;
  const format = 'png8';
  const mapId = 'newest';
  const tilePath = `/maptile/2.1/${options.resource}/${mapId}/${options.scheme}/{z}/{x}/{y}/${tileResolution}/${format}?app_id=${appId}&app_code=${appCode}`;
  const schemeStart = options.scheme.split('.')[0];
  let tileServer = 'base.maps.api.here.com';
  if( schemeStart == 'satellite' || schemeStart == 'terrain' || schemeStart == 'hybrid' ){
    tileServer = 'aerial.maps.api.here.com';
  }
  const s = _.random(3)+1;
  const attributionPath = `https://developer.here.com/`;
  return { tile: `https://${s}.${tileServer}${tilePath}`, attribution: `<a href="${attributionPath}">HERE</a>` };
}
