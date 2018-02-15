
const width = $('.map').width();
const height = $('.map').height();
const margin = {top: 150, right: 10, bottom: 10, left: 80};

const svg = d3.select('.map')
                .append('svg')
                .attr('width', width)
                .attr('height', height);


const g = d3.select('svg').append('g')
              .attr('transform', `translate(${margin.left}, ${margin.top})`);

const projection = d3.geoAlbersUsa()
                        // .translate([width / 2.5, height / 3])
                        // .scale(10000);

const path = d3.geoPath()
                .pointRadius(2000000000000)
                .projection(projection);

const colorScale = d3.scaleOrdinal(d3.schemeCategory20c);

export const renderMap = (error, data, breeder) => {

  if (error) throw error;

  g.append('g')
    .attr('class', 'states')
    .selectAll('path')
    .data(topojson.feature(data, data.objects.states).features)
    .enter().append('path')
      .attr('d', (d)=>{
        return path(d);
      })
      .attr('class', 'state')
      .attr('id', (d)=>(`state-${d.id}`))
      .style('stroke', 'white')
      .style('stroke-width', 0.5)
      .style('fill', 'gray')
      .on('mouseover', (d)=>{
        d3.select(`#state-${d.id}`)
            .style('fill', (d)=>colorScale(d.id))
      })
      .on('mouseleave', ()=>{
        d3.selectAll('.state')
            .style('fill', 'gray')
      });

  g.selectAll('.breeder')
    .data(breeder)
    .enter().append('circle')
    .attr('class', 'breeder')
    .attr('id', `breeder-`)
    .attr('r', 2)
    .attr('cx', (d) => {
      const geocode = projection([d.lng, d.lat]);
      return geocode[0]
    })
    .attr('cy', (d) => {
      const geocode = projection([d.lng, d.lat]);
      return geocode[1]
    });

  g.append('path')
    .datum({type: 'LineString', coordinates: [[-122.0856086, 37.4224082], [-74.0059728, 40.7127753]]})
    .attr('class', 'route')
    .attr('d', (d)=>{
      return path(d);
    })
    .style('fill', 'none')
    .style('stroke', 'white')
    .style('stroke-width', 2)
    .curve(d3.curveCardinal);
}

const getGeocode = (d) => {
  let result;
  $.ajax({
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    data: {
        sensor: false,
        address: d.address,
        key: 'AIzaSyDLlQ5S9-HyPBI5Z7TCxZpscLb3HTJpB5k'
    },
    dataType:'json',
    success: (data) => {
      result = [data.results[0].geometry.location.lng, data.results[0].geometry.location.lat];
      debugger
    }
  })
  return result;
}
