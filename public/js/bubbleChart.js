var matrix = [
    [21621, 94559, 10683, 1056, 255],
    [10355, 330080, 154178, 18147,  4037],
    [750, 56902,  159571, 57805,  16661],
    [96,  4683, 22786,  45187,  34753],
    [21,  491,  2637, 9597, 44198]
    ];
    
    var chord = d3.layout.chord()
        .padding(.03)
        .sortSubgroups(d3.descending)
        .matrix(matrix);
    
    var width = 600,
        height = 600,
        innerRadius = Math.min(width, height) * .41,
        outerRadius = innerRadius * 1.1;
    
    var fill = d3.scale.ordinal()
        .domain(d3.range(5))
        .range(["#EDDEA4", "#534768", "#6C8351", "#C5876A", "#B9314F"]);
    
    var idade = [];
    
    var svg = d3.select("#chord").append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 600 600")
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    d3.selectAll(".legenda")
        .on("mouseover", fade(0))
        .on("mouseout", fade(.9));
    
    svg.append("g").selectAll("path")
        .data(chord.groups)
      .enter().append("path")
        .style("fill", function(d) { return fill(d.index); })
        .style("stroke", function(d) { return fill(d.index); })
        .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
        .on("mouseover", fade(.2))
        .on("mouseout", fade(1));
    
    var ticks = svg.append("g").selectAll("g")
        .data(chord.groups)
      .enter().append("g").selectAll("g")
        .data(groupTicks)
      .enter().append("g")
        .attr("transform", function(d) {
          return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
              + "translate(" + outerRadius + ",0)";
        });
    
    ticks.append("line")
        .attr("x1", 1)
        .attr("y1", 0)
        .attr("x2", 1)
        .attr("y2", 0)
        .style("stroke", "#ededed");
    
    ticks.append("text")
        .attr("x", 80)
        .attr("dy", ".35em")
        .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180)translate(-16)" : null; })
        .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
        .text(function(d) { return idade; });
    
    svg.append("g")
        .attr("class", "chord")
      .selectAll("path")
        .data(chord.chords)
      .enter().append("path")
        .attr("d", d3.svg.chord().radius(innerRadius))
        .style("fill", function(d) { return fill(d.target.index); })
        .style("opacity", 1);
    
    // Returns an array of tick angles and labels, given a group.
    function groupTicks(d) {
      var k = (d.endAngle - d.startAngle) / d.value;
      return d3.range(0, d.value, 1000).map(function(v, i) {
        return {
          angle: v * k + d.startAngle,
          label: ""
        };
      });
    }
    
    // Returns an event handler for fading a given chord group.
    function fade(opacity) {
      return function(g, i) {
        svg.selectAll(".chord path")
            .filter(function(d) { return d.source.index != i && d.target.index != i; })
          .transition()
            .style("opacity", opacity);
      };
    }