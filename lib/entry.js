import {renderYear} from './year';
import {renderSunburst} from './sunburst';
import {renderMap} from './map';

renderYear();
renderSunburst();
queue()
.defer(d3.json, './lib/us-full.json')
.defer(d3.csv, './lib/breeder.csv')
.defer(d3.csv, './lib/breeder-dog.csv')
.await(renderMap);

$(document).ready(()=>{
  console.log('Document is ready~~~~~~~');
  $(window).on('resize', ()=>{
    console.log('resizing~~~~~~~');
    renderYear();
  });
})
