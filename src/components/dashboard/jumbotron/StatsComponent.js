import React, { Component } from 'react';
import { getTripEvents } from '../../../redux/getters/getEvents';
import {
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
  VictoryLabel,
  VictoryVoronoiContainer,
  VictoryAxis,
  VictoryScatter,
  VictoryTheme
} from 'victory';
/**
 * Displays Time untill upcoming trip
 */

export default class StatsComponent extends Component {
  /**************************** Helper functions ****************************/

  graph_cost_line() {
    let data = [];
    let cumsum = 0;
    let numEvents = this.props.events.length;
    if (numEvents === 0) {
      return <p> No Current Trip! </p>;
    }
    for (let i = 0; i < numEvents; i++) {
      let event = this.props.events[i];
      if (event.cost === undefined) {
        let obj = { x: i, y: cumsum, label: event.dscript };
        console.log(event.description);
        data.push(obj);
        continue;
      }
      cumsum = cumsum + this.props.events[i].cost;
      let obj = { x: i, y: cumsum, label: event.dscript };
      data.push(obj);
    }
    return (
      <VictoryChart
        domainPadding={20}
        containerComponent={<VictoryVoronoiContainer />}
        theme={VictoryTheme.material}
      >
        <VictoryLabel text={'Current Trip: Cost Curve '} x={20} y={20} />
        <VictoryLine
          labelComponent={<VictoryTooltip />}
          data={data}
          labels={(d) => d.label}
          style={{
            data: { stroke: ' #f88379' },
            parent: { border: '1px solid #ccc' }
          }}
        />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    );
  }

  getTotalTripCost(trip_id) {
    let events = getTripEvents(this.props.coolState, trip_id);
    let cumsum = 0;
    for (let i = 0; i < events.length; i++) {
      let cost = events[i].cost;
      if (cost === undefined) {
        continue;
      }
      cumsum = cumsum + cost;
    }
    return cumsum;
  }

  graph_trips_scatter() {
    let data = [];
    let trips = this.props.trips.active.concat(this.props.trips.inactive);
    let numTrips = trips.length;
    for (let i = 0; i < numTrips; i++) {
      let start = trips[i].trip_start;
      let end = trips[i].trip_end;
      if (start === null || end === null) {
        continue;
      }
      let diffDays = Math.floor(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );
      console.log(trips[i].trip_id);
      data.push({
        duration: Math.round(diffDays),
        cost: this.getTotalTripCost(trips[i].trip_id),
        label: trips[i].dscript
      });
    }

    return (
      <VictoryChart
        domainPadding={20}
        containerComponent={<VictoryVoronoiContainer />}
        theme={VictoryTheme.material}
      >
        <VictoryLabel text={'Trip Expense vs. Duration'} x={20} y={20} />
        <VictoryScatter
          data={data}
          x={'duration'}
          y={'cost'}
          style={{ data: { fill: '#17c4a9' } }}
        />
        <VictoryAxis />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    );
  }

  getStatsDiv() {
    if (this.props.trips === undefined) {
      return <p> Nothing to show, go make some trips! </p>;
    } else {
      return (
        <div>
          <div>{this.graph_cost_line()}</div>
          <div>{this.graph_trips_scatter()}</div>
        </div>
      );
    }
  }

  /**************************** Visual component ****************************/
  render() {
    return (
      <div>
        <div>{this.getStatsDiv()}</div>
      </div>
    );
  }
}
