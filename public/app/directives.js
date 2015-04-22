angular.module('watson')

    .directive('dThree', [function() {
    
        return {
        
            restrict: 'EA',
            templateUrl: 'templates/graph.html',
            link: function(scope, element, attrs) {
                //console.log("I'm linked");
                
                
                var data = [1, 2, 3, 4, 5];
                //d3.select(".chart").append("p").text("New paragraph!");
                /*
                var chart = d3.select(".chart");
                
                chart.append("p").text("something in paragraph");
                */
                //console.log(chart);
                    
                /*
                    .data(data)
                    .enter()
                    .append("div")
                    .attr("class", "bar");
                    .style("height", function(d) { return d + "px"; });
                    
                */
                
            }
        };
    }])

    .directive('chatDownDirective', function() {

        return {
            link: function(scope, element, attrs) {
                
                if (scope.$last) {
                    elem = document.getElementById("chat-log");
                    elem.scrollTop = elem.scrollHeight;
                    console.log("scroll top is:" + elem.scrollTop + " scroll height is:" + elem.scrollHeight);
                }
            }
        };
    })

;
