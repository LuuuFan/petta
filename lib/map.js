
const width = $('.map').width();
const height = $('.map').height();
const margin = {top: 150, right: 10, bottom: 10, left: 80};

const svg = d3.select('.map')
                .append('svg')
                .attr('id', 'map-svg')
                .attr('width', width)
                .attr('height', height);

const g = d3.select('#map-svg').append('g');
              // .attr('transform', `translate(${margin.left}, ${margin.top})`);

const projection = d3.geoAlbersUsa()
                        // .translate([width / 2.5, height / 3])
                        // .scale(10000);

const path = d3.geoPath()
                .pointRadius(2)
                .projection(projection);

const lineProjection = d3.geoMercator();

const linePath = d3.geoPath()
                .pointRadius(4.5)
                .projection(projection);

const colorScale = d3.scaleOrdinal(d3.schemeCategory20c);

export const renderMap = (error, data, breeder, dog) => {

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
      .style('fill', 'lightgray')
      .on('mouseover', (d)=>{
        d3.select(`#state-${d.id}`)
            .style('fill', (d)=>colorScale(d.id))
      })
      .on('mouseleave', ()=>{
        d3.selectAll('.state')
            .style('fill', 'lightgray')
      });

  g.selectAll('.breeder')
    .data(breeder)
    .enter().append('circle')
    .attr('class', 'breeder')
    .attr('id', (d)=>(`breeder-${d.id}`))
    .attr('r', 8)
    .attr('cx', (d) => {
      const geocode = projection([d.lng, d.lat]);
      return geocode[0]
    })
    .attr('cy', (d) => {
      const geocode = projection([d.lng, d.lat]);
      return geocode[1]
    })
    .style('fill', (d)=>colorScale(d.id))
    .attr('fill-opacity', 0.7)
    .on('mouseover', (d)=>drawDog(d))
    .on('mouseleave', ()=>{
      d3.selectAll('.dog').remove();
      d3.selectAll('.route').remove();
    });


  const drawDog = (breeder) => {

    let babyDog = dog.filter(d=>d.id == breeder.id);

    babyDog.forEach(d => {
      g.append('circle')
        .attr('class', 'dog')
        .attr('id', `dog-${d.id}`)
        .attr('r', 4)
        .style('fill', colorScale(d.id))
        .attr('fill-opacity', 0.7)
        .attr('cx', projection([d.lng, d.lat])[0])
        .attr('cy', projection([d.lng, d.lat])[1]);
    })

    babyDog.forEach(dog => {
      drawPath(breeder, dog);
    });
  }

  const drawPath = (org, des) => {
    g.append('path')
      .datum({type: 'LineString', coordinates: [[+org.lng, +org.lat], getMidPoint(org, des), [+des.lng, +des.lat]]})
      .attr('class', 'route')
      .attr('d', linePath)
      .style('fill', 'none')
      .style('stroke', colorScale(org.id))
      .style('stroke-width', 2)
      .call(transition)
  }

  
  g.selectAll('.route')
    .attr('d', (d) => {
      console.log(d.coordinates);
      console.log('===========');
      return linePath(d);
    })
}

const getMidPoint = (org, des) => {
  // const sw = org.lat < des.lat ? new google.maps.LatLng({lat: +org.lat, lng: +org.lng}) : new google.maps.LatLng({lat: +des.lat, lng: +des.lng});
  // console.log(sw.lat(), sw.lng())
  // const ne = org.lat < des.lat ? new google.maps.LatLng({lat: +des.lat, lng: +des.lng}) : new google.maps.LatLng({lat: +org.lat, lng: +org.lng})
  // console.log(ne.lat(), ne.lng())
  // const bounds = new google.maps.LatLngBounds(sw, ne);
  // const mid = bounds.getCenter();
  // console.log(mid.lat(), mid.lng())
  // console.log([(+org.lng + +des.lng)/2, (+org.lat + +des.lat)/2 ].reverse())
  // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~')
  // return [mid.lng(), mid.lat()];
  return [(+org.lng + +des.lng)/2 + 0.5, (+org.lat + +des.lat)/2 + 0.5];
}

const transition = (line) => {
  line.transition()
        .duration(800)
        .attrTween("stroke-dasharray", tweenDash)
        .attr("stroke", line.stroke);
}

function tweenDash(){
  var l = this.getTotalLength(),
      i = d3.interpolateString("0," + l, l + "," + l);
  return (t)  => { return i(t); };
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
