export class LineOptions {
  public color: string = '#0099CC';
  public weight: number = 2;
  public opacity: number = 1;
  public addWaypoints: boolean = false;
  public dashArray: string = '7,12';
  constructor(pathInfo: any) {
    const source: any = pathInfo;
    const copy: any = this;
    if (source !== null) {
      for (const key in source) {
        if (source[key] !== undefined) {
          copy[key] = source[key];
        }
      }
    }
  }
  public get styles() {
    let color = this.color;
    let weight = this.weight;
    let opacity = this.opacity;
    return [{ color, weight, opacity }]
  }
  public set styles([{ color, weight, opacity }]) {
    this.color = color;
    this.weight = weight;
    this.opacity = opacity;
  }
  public get missingRouteStyles() {
    return this.styles;
  }
  public set missingRouteStyles([{ color, weight, opacity }]) {
    this.styles = [{ color, weight, opacity }];
  }
}
