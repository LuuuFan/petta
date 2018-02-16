import {renderYear} from './year';
import {renderSunburst} from './sunburst';
import {renderMap} from './map';

renderYear();
renderSunburst();
// renderMap();

// .defer(d3.json, 'https://d3js.org/us-10m.v1.json')
queue()
  .defer(d3.json, './lib/us-full.json')
  .defer(d3.csv, './lib/breeder.csv')
  .defer(d3.csv, './lib/breeder-dog.csv')
  .await(renderMap);
