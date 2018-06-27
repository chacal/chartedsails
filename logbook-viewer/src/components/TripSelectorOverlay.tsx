import DeckGL, { PathLayer } from 'deck.gl'
import * as moment from 'moment'
import * as React from 'react'
import { Marker } from 'react-map-gl';
import { TripOverview } from '../model/TripOverview'

export interface TripSelectorOverlayProps {
  viewport: any
  tripOverviews: TripOverview[]
  onTripOverviewSelected: (t: TripOverview) => void
}

export default class TripSelectorOverlay extends React.Component<TripSelectorOverlayProps> {
  public render() {
    console.log("rendering selector overlay", this.props.tripOverviews)
    const layers = [
      new PathLayer({
        autoHighlight: true,
        data: this.props.tripOverviews,
        pickable: true,
        widthScale: 20,
        widthMinPixels: 3,
        getPath: (d:TripOverview) => d.path,
        getColor: () => [30, 150, 100],
        highlightColor: [200, 150, 100, 200],
        id: 'path-layer'
      })
    ];

    const overviewMarkers : any[] = []
    this.props.tripOverviews.forEach((trip, index) => {
      if (trip.path.length > 0) {
        overviewMarkers.push(<Marker
          key={index}
          latitude={trip.path[0][1]}
          longitude={trip.path[0][0]}
          >
          <div className="pt-card pt-elevation-2" >
            <a onClick={ () => this.props.onTripOverviewSelected(trip) }>{trip.label}</a>
            <div>
              { moment(trip.startTime).calendar() } - { moment(trip.startTime).from(trip.endTime, true)}
            </div>
            <div>
              {trip.description}
            </div>
          </div>
        </Marker>)
      }
    })

    return [
      <DeckGL
        key='deck'
        {...this.props.viewport}
        layers={layers}
        onWebGLInitialized={this._initialize}
        pickingRadius={20}
        onLayerClick={ (x: any) => x !== null && this.props.onTripOverviewSelected(x.object) }
        /*
        onLayerHover={ (x : any) => this.props.onHover ? this.props.onHover(x) : false }
        */
       />,
       overviewMarkers]
  }

  private _initialize(gl : any) {
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
  }
}