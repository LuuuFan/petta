import {renderYear} from './year';
import {renderSunburst} from './sunburst';
import {renderMap} from './map';



$(document).ready(()=>{
  renderYear();
  renderSunburst();
  queue()
    .defer(d3.json, './lib/us-full.json')
    .defer(d3.csv, './lib/breeder.csv')
    .defer(d3.csv, './lib/breeder-dog.csv')
    .await(renderMap);
  console.log('Document is ready~~~~~~~');
  $(window).on('resize', ()=>{
    console.log('resizing~~~~~~~');
  });
})
