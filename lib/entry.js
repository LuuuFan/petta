import {renderYear} from './bar';
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
   let i = 1;
  $(window).on('resize', ()=>renderYear(i++));
  $(window).on('scroll', ()=> window.pageYOffset > 5 ? $('.top').fadeIn(800) :$('.top').fadeOut(800))
})

$('.buttons #year').click(()=>$('body, html').animate({ scrollTop: $('.year').offset().top -20 }, "slow"))
$('.buttons #map').click(()=>$('body, html').animate({ scrollTop: $('.map').offset().top -20 }, "slow"))
$('.buttons #sunburst').click(()=>$('body, html').animate({ scrollTop: $('.sunburst').offset().top - 20 }, "slow"))
$('.top').click(()=>$('body, html').animate({ scrollTop: 0 }, "slow"))

