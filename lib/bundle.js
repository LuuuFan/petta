/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var appendPie = exports.appendPie = function appendPie(d) {
  if ($('.year-pie').length !== 0) {
    $('.year-pie').remove();
    // renderPie(type(d));
  }
  // } else {
  $('<div/>', {
    'class': 'year-pie',
    'id': '' + d.Year,
    'text': d.Year + ' NUMBER OF PETS BY TYPE OF ANIMAL' }).appendTo('.monthly-pie-append');
  renderPie(type(d));
  // }
};

var renderPie = function renderPie(data) {
  var outerWidth = $('.year-pie').width();
  var outerHeight = $('.year-pie').height();
  var margin = { top: 10, right: 10, bottom: 10, left: 10 };
  var innerWidth = outerWidth - margin.left - margin.right;
  var innerHeight = outerHeight - margin.top - margin.bottom;
  var radius = Math.min(innerWidth, innerHeight - 60) / 2;

  var outerRadius = radius * 0.8;
  var innerRadius = outerRadius / 2;

  var legendRectSize = radius * 0.05;
  var legendSpacing = radius * 0.02;

  var svg = d3.select('.year-pie').append('svg').attr('width', outerWidth).attr('height', outerHeight);

  var g = svg.append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

  var pieG = g.append('g').attr('id', 'pieG');

  var xScale = d3.scalePoint().range([0, innerWidth]);
  var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  var pie = d3.pie();
  var arc = d3.arc();
  arc.outerRadius(outerRadius);
  arc.innerRadius(innerRadius);

  var dataValues = Object.values(data).slice(2, 10);
  var dataKeys = Object.keys(data).slice(2, 10);

  xScale.domain(dataValues);
  colorScale.domain(['pet'].concat(dataKeys));
  // pie.value(d=>(d));

  var pieData = pie(dataValues);

  var finalData = [];

  pieData.forEach(function (e, i) {
    return finalData.push({ key: dataKeys[i], value: e });
  });

  pieG.attr('transform', 'translate(' + innerWidth / 2 + ', ' + (innerHeight / 2 - 50) + ')');

  var slice = pieG.selectAll('path').data(finalData);
  slice.enter().insert('path').attr('d', function (d) {
    return arc(d.value);
  }).style('fill', function (d) {
    return colorScale(d.key);
  });

  d3.select('d').on('mouseover', function (d) {
    // console.log(d);
  });

  slice.exit().remove();

  var legends = svg.append('g').attr('transform', 'translate(10, ' + (innerHeight - 30) + ')');

  var legend = legends.selectAll('.legend').data(dataKeys).enter().append('g').attr('class', 'legend').attr('transform', function (d, i) {
    var height = legendRectSize + legendSpacing;
    var horz = void 0;
    var vert = void 0;
    if (i < 4) {
      horz = (legendRectSize + 80) * i;
      vert = height - 60;
    } else {
      horz = (legendRectSize + 80) * (i - 4);
      vert = height - 30;
    }
    return 'translate(' + horz + ', ' + vert + ')';
  });

  legend.append('rect').attr('width', legendRectSize).attr('height', legendRectSize).style('fill', function (d) {
    return colorScale(d);
  }).style('stroke', function (d) {
    return colorScale(d);
  });

  legend.append('text').attr('x', legendRectSize + legendSpacing).attr('y', legendRectSize - legendSpacing + 3).text(function (d) {
    return d;
  });
  legend.exit().remove();
};

var changeData = function changeData(data) {
  var prePieById = _.reduce(pie(prevData));
};

var type = exports.type = function type(d) {
  Object.keys(d).forEach(function (key) {
    d[key] = +d[key];
  });
  return d;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _year = __webpack_require__(2);

var _sunburst = __webpack_require__(4);

var _map = __webpack_require__(5);

(0, _year.renderYear)();
(0, _sunburst.renderSunburst)();
queue().defer(d3.json, './lib/us-full.json').defer(d3.csv, './lib/breeder.csv').defer(d3.csv, './lib/breeder-dog.csv').await(_map.renderMap);

$(document).ready(function () {
  console.log('Document is ready~~~~~~~');
  $(window).on('resize', function () {
    console.log('resizing~~~~~~~');
    (0, _year.renderYear)();
  });
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderYear = undefined;

var _pie = __webpack_require__(0);

var _monthly = __webpack_require__(3);

//NUMBER OF U.S. HOUSEHOLDS THAT OWN A PET, BY TYPE OF ANIMAL
var outerWidth = $('.year').width();
var outerHeight = $('.year').height();
var margin = { top: 10, right: 10, bottom: 100, left: 40 };
var innerWidth = outerWidth - margin.left - margin.right;
var innerHeight = outerHeight - margin.top - margin.bottom;
var svg = d3.select('.year').append('svg').attr('id', 'year-chart').attr('width', outerWidth).attr('height', outerHeight);

var x = d3.scaleBand().rangeRound([0, innerWidth]).padding(0.1);
var y = d3.scaleLinear().rangeRound([innerHeight, 0]);

var g = svg.append('g').attr('width', innerWidth).attr('height', innerHeight).attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

var renderYear = exports.renderYear = function renderYear() {
  d3.csv('./lib/year.csv', function (d) {
    d.Total = +d.Total;
    return d;
  }, function (error, data) {
    if (error) throw error;
    x.domain(data.map(function (d) {
      return d.Year;
    }));
    y.domain([80, d3.max(data, function (d) {
      return d.Total;
    }) + 10]);

    g.append('g').attr('class', 'axis axis--x').attr('transform', 'translate(0, ' + innerHeight + ')').call(d3.axisBottom(x));

    g.append('g').attr('class', 'axis axis--y').call(d3.axisLeft(y)).append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '0.71em').attr('text-anchor', 'end').text('Total (Million)');

    var bar = g.append('g').attr('class', 'bars');

    bar.selectAll('.bar').data(data).enter().append('rect').attr('class', 'bar').attr('id', function (d) {
      return 'year' + d.Year;
    }).attr('x', function (d) {
      return x(d.Year);
    }).attr('y', function (d) {
      return y(d.Total);
    }).transition().duration(2000).attr('width', x.bandwidth()).attr('height', function (d) {
      return innerHeight - y(d.Total);
    });

    bar.selectAll('.bar').on('click', function (d) {
      (0, _monthly.appendMonthly)(d);
      (0, _pie.appendPie)(d);
    });

    bar.selectAll('text').data(data).enter().append('text').attr('x', function (d) {
      return x(d.Year) + x.bandwidth() / 4;
    }).attr('y', function (d) {
      return y(d.Total) + 20;
    }).attr('fill', 'white').transition().duration(2000).delay(2000).text(function (d) {
      return '' + d.Total;
    });
  });
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendMonthly = undefined;

var _pie = __webpack_require__(0);

var appendMonthly = exports.appendMonthly = function appendMonthly(d) {
  if ($('.month-line').length !== 0) {
    $('.month-line').remove();
    // changeData(type(d));
  }
  // } else {
  $('<div/>', {
    'class': 'month-line',
    'id': '' + d.Year,
    'text': d.Year + ' MONTHLY NUMBER CHANGE OF PETS' }).appendTo('.monthly-pie-append');
  renderMonthly((0, _pie.type)(d));
};

var renderMonthly = function renderMonthly(data) {
  var outerWidth = $('.month-line').width();
  var outerHeight = $('.month-line').height();
  var margin = { left: 30, top: 10, right: 10, bottom: 70 };
  var innerWidth = outerWidth - margin.left - margin.right;
  var innerHeight = outerHeight - margin.top - margin.bottom;

  var svg = d3.select('.month-line').append('svg').attr('width', outerWidth).attr('height', outerHeight);

  var g = svg.append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

  var x = d3.scaleBand().rangeRound([0, innerWidth]).domain(Object.keys(data).slice(12));
  var y = d3.scaleLinear().rangeRound([innerHeight, 0]).domain([100, d3.max(Object.values(data).slice(12)) + 20]);

  g.append('g').attr('class', 'axis axis--x').attr('transform', 'translate(0, ' + innerHeight + ')').call(d3.axisBottom(x).tickSizeOuter(0));

  g.append('g').attr('class', 'axis axis--y').call(d3.axisLeft(y)).append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '0.71em').attr('text-anchor', 'end').text('Total (Million)');
  var path = g.append('path').attr('class', 'line');

  var pathDataX = Object.values(data).slice(12);
  var pathDataY = Object.keys(data).slice(12);

  var lineData = [];

  pathDataX.forEach(function (x, i) {
    lineData.push({ month: pathDataY[i], value: x });
  });

  var line = d3.line().x(function (d) {
    return x(d.month);
  }).y(function (d) {
    return y(d.value);
  }).curve(d3.curveCardinal);

  path.attr('d', line(lineData)).style('fill', 'none').style('stroke', 'black').style('stroke-width', '1px').transition().duration(2000);
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// import {type} from './pie';

var renderSunburst = exports.renderSunburst = function renderSunburst() {

  var outerWidth = $('.sunburst').width();
  var outerHeight = $('.sunburst').height();
  var margin = { top: 10, right: 10, bottom: 10, left: 10 };

  var radius = Math.min(outerWidth, outerHeight) * 0.35;
  var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  var totalSize = 0;

  var svg = d3.select('.sunburst').append('svg').attr('width', outerWidth).attr('height', outerHeight);

  var imgG = svg.append('clipPath').attr('id', 'imgG').attr('transform', 'translate(120, 120)');

  imgG.append('circle').attr('r', 100);

  svg.append('svg:image').attr('id', 'avatar').attr('clip-path', 'url(#imgG)').attr('height', 250).attr('width', 250).style('opacity', 0.8);

  svg.append('g').attr('transform', 'translate(' + (outerWidth / 2 - 60) + ' , 80)').append('text').attr('id', 'name').text('').style("color", "#333").style("font-size", "24px").style("font-weight", "bold");

  svg.append('g').attr('class', 'explanation').attr('transform', 'translate(' + (outerWidth / 2 - 30) + ' , ' + outerHeight * 0.53 + ')').append('text').attr('id', 'percentage').text('').style("font-size", "30px").style("font-weight", "bold").style("color", "#333").style("fill", "24px");

  var g = svg.append('g').attr('transform', 'translate(' + outerWidth / 2 + ', ' + outerHeight * 0.52 + ')');

  var partition = d3.partition().size([2 * Math.PI, radius]);

  var arc = d3.arc().startAngle(function (d) {
    return d.x0;
  }).endAngle(function (d) {
    return d.x1;
  }).innerRadius(function (d) {
    return d.y0;
  }).outerRadius(function (d) {
    return d.y1;
  });

  d3.json('./lib/sunburst-2.json', function (error, data) {
    if (error) throw error;
    var root = d3.hierarchy(data).sum(function (d) {
      return d.size;
    });

    partition(root);
    var path = g.selectAll('path').data(root.descendants()).enter().append('path').attr('id', 'sunburstPath').attr('display', function (d) {
      return d.depth ? null : "none";
    }).attr('d', function (d) {
      return arc(d);
    }).style('stroke', '#fff').style('fill', function (d) {
      return colorScale((d.children ? d : d.parent).data.name);
    }).style('fill-rule', 'evenodd').on('mouseover', mouseOver);

    g.on('mouseleave', mouseLeave);

    totalSize = path.datum().value;
  });

  var mouseOver = function mouseOver(d) {
    var percentage = (100 * d.value / totalSize).toPrecision(2);
    var percentageString = percentage + "%";
    var name = d.data.name;

    if (percentage < 0.1) {
      percentageString = "< 0.1%";
    }

    d3.select('#avatar').attr('src', '' + d.data.img);

    d3.select('.explanation').style('visibility', null);
    d3.select('#name').style('visibility', null);
    d3.select('#imgG').style('visibility', null);
    d3.select('.avatar').style("visibility", null);

    if (d.data.img) {
      d3.select('#avatar').attr("xlink:href", '' + d.data.img);
    } else {
      d3.select('#avatar').attr("xlink:href", "");
    }

    d3.select('#name').transition().duration(1000).text(name);

    d3.select('#percentage').transition().duration(1000).text(percentageString);

    var sequenceArray = d.ancestors().reverse();
    sequenceArray.shift();

    d3.selectAll('#sunburstPath').style('opacity', 0.3);
    g.selectAll('#sunburstPath').filter(function (node) {
      return sequenceArray.indexOf(node) >= 0;
    }).style('opacity', 1);
  };

  var mouseLeave = function mouseLeave() {
    d3.selectAll('#sunburstPath').on('mouseOver', null);

    d3.selectAll('#sunburstPath').transition().duration(1000).style('opacity', 1).on('end', function () {
      d3.select(undefined).on('mouseover', mouseOver);
    });

    d3.select("#name").style("visibility", "hidden");
    d3.select(".explanation").style("visibility", "hidden");
    d3.select('#imgG').style("visibility", "hidden");
    d3.select('.avatar').style("visibility", "hidden");
  };
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var width = $('.map').width();
var height = $('.map').height();
var margin = { top: 150, right: 10, bottom: 10, left: 80 };

var svg = d3.select('.map').append('svg').attr('id', 'map-svg').attr('width', width).attr('height', height);

var g = d3.select('#map-svg').append('g');
// .attr('transform', `translate(${margin.left}, ${margin.top})`);

var projection = d3.geoAlbersUsa();
// .translate([width / 2.5, height / 3])
// .scale(10000);

var path = d3.geoPath().pointRadius(2).projection(projection);

var lineProjection = d3.geoMercator();

var linePath = d3.geoPath().pointRadius(4.5).projection(projection);

var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

var renderMap = exports.renderMap = function renderMap(error, data, breeder, dog) {

  if (error) throw error;

  g.append('g').attr('class', 'states').selectAll('path').data(topojson.feature(data, data.objects.states).features).enter().append('path').attr('d', function (d) {
    return path(d);
  }).attr('class', 'state').attr('id', function (d) {
    return 'state-' + d.id;
  }).style('stroke', 'white').style('stroke-width', 0.5).style('fill', 'lightgray').on('mouseover', function (d) {
    d3.select('#state-' + d.id).style('fill', function (d) {
      return colorScale(d.id);
    });
  }).on('mouseleave', function () {
    d3.selectAll('.state').style('fill', 'lightgray');
  });

  var node = g.selectAll('.breeder').data(breeder);

  var nodeEnter = node.enter().append('svg:g').attr('class', 'breeder').attr('id', function (d) {
    return 'breeder-' + d.id;
  }).attr('x', function (d) {
    return projection([d.lng, d.lat])[0] * 1;
  }).attr('y', function (d) {
    return projection([d.lng, d.lat])[1] * 1;
  }).on('mouseover', function (d) {
    drawDog(d);
  }).on('mouseleave', function () {
    d3.selectAll('.dog').remove();
    d3.selectAll('.route').remove();
  });

  var circles = nodeEnter.append('circle').attr('r', 8).attr('cx', function (d) {
    return projection([d.lng, d.lat])[0] * 1;
  }).attr('cy', function (d) {
    return projection([d.lng, d.lat])[1] * 1;
  }).style('fill', function (d) {
    return colorScale(d.id);
  }).attr('fill-opacity', 0.7);

  var texts = nodeEnter.append("text").attr('class', 'nodetext').attr('x', function (d) {
    return projection([d.lng, d.lat])[0] + 15;
  }).attr('y', function (d) {
    return projection([d.lng, d.lat])[1] + 15;
  }).attr('fill', '#140c0E').text(function (d) {
    return d.name;
  });

  // not working
  var bbox = texts.node().getBBox();
  var rect = nodeEnter.insert("rect", "text").attr("x", bbox.x - 2).attr("y", bbox.y - 2).attr("width", bbox.width + 2 * 2).attr("height", bbox.height + 2 * 2).style("fill", "red");

  var drawDog = function drawDog(breeder) {
    var babyDog = dog.filter(function (d) {
      return d.id == breeder.id && d.lat && d.lng;
    });
    babyDog.forEach(function (d) {
      g.append('circle').attr('class', 'dog').attr('id', 'dog-' + d.id).attr('r', 4).style('fill', colorScale(d.id)).attr('fill-opacity', 0.7).attr('cx', projection([d.lng, d.lat])[0]).attr('cy', projection([d.lng, d.lat])[1]);
    });

    babyDog.forEach(function (dog) {
      drawPathNew(breeder, dog);
    });
  };

  var lineGenerator = d3.line().curve(d3.curveCatmullRom.alpha(1));

  var drawPathNew = function drawPathNew(org, des) {
    var point = [[projection([org.lng, org.lat])[0], projection([org.lng, org.lat])[1]], [projection(getMidPoint(org, des))[0], projection(getMidPoint(org, des))[1]], [projection([des.lng, des.lat])[0], projection([des.lng, des.lat])[1]]];
    g.append('path').attr('class', 'route').attr('d', lineGenerator(point)).style('fill', 'none').style('stroke', colorScale(org.id)).style('stroke-width', 2).call(transition);
  };

  var drawPath = function drawPath(org, des) {
    g.append('path')
    // getMidPoint(org, des),
    .datum({ type: 'LineString', coordinates: [[+org.lng, +org.lat], [+des.lng, +des.lat]] }).attr('class', 'route').attr('d', linePath).style('fill', 'none').style('stroke', colorScale(org.id)).style('stroke-width', 2).call(transition);
  };

  drawDog(breeder[0]);
  // document.querySelectorAll('.route').forEach(route => {
  //   const d = route.getAttribute('d');
  //   lineGenerator(d);    
  // })
};

var getMidPoint = function getMidPoint(org, des) {
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
  return [(+org.lng + +des.lng) / 2 + 1, (+org.lat + +des.lat) / 2 + 1];
};

function transition(line) {
  line.transition().duration(800).attrTween("stroke-dasharray", tweenDash).attr("stroke", line.stroke);
}

function tweenDash() {
  var l = this.getTotalLength(),
      i = d3.interpolateString("0," + l, l + "," + l);
  return function (t) {
    return i(t);
  };
}

var getGeocode = function getGeocode(d) {
  var result = void 0;
  $.ajax({
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    data: {
      sensor: false,
      address: d.address,
      key: 'AIzaSyDLlQ5S9-HyPBI5Z7TCxZpscLb3HTJpB5k'
    },
    dataType: 'json',
    success: function success(data) {
      result = [data.results[0].geometry.location.lng, data.results[0].geometry.location.lat];
      debugger;
    }
  });
  return result;
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map