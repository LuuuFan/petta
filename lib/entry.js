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
  $(window).on('resize', ()=>{
    console.log('resizing~~~~~~~');
    renderYear();
  });
  $(window).on('scroll', ()=>{
  	if (window.pageYOffset > 5) {$('.top').fadeIn(800)}
  	else {$('.top').fadeOut(800)}
  })
})

$('.buttons #year').click(()=>$('body, html').animate({ scrollTop: $('.year').offset().top }, "slow"))
$('.buttons #map').click(()=>$('body, html').animate({ scrollTop: $('.map').offset().top }, "slow"))
$('.buttons #sunburst').click(()=>$('body, html').animate({ scrollTop: $('.sunburst').offset().top }, "slow"))
$('.top').click(()=>$('body, html').animate({ scrollTop: 0 }, "slow"))

