import {renderYear} from './year';
import {renderSunburst} from './sunburst';
import {renderMap} from './map';

renderYear();
renderSunburst();
// renderMap();

queue()
  .defer(d3.json, 'https://d3js.org/us-10m.v1.json')
  .await(renderMap);
