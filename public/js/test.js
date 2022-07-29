      // Initialize the echarts instance based on the prepared dom
      var myChart = echarts.init(document.getElementById('card-body-main'));
      var option;
      
      var PATH = 'http://localhost/PortfolioVirtualisation-main/ressources/product_connections.json';
      myChart.showLoading();
      console.log(PATH);
      $.getJSON(PATH, function (graph) {
        myChart.hideLoading();
        graph.nodes.forEach(function (node) {
          node.label = {
            show: node.symbolSize > 30
          };
        });
        option = {
          /*title: {
            text: 'Les Miserables',
            subtext: 'Circular layout',
            top: 'bottom',
            left: 'right'
          },*/
          tooltip: {},
          legend: [
            {
              data: graph.categories.map(function (a) {
                return a.name;
              })
            }
          ],
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
              name: 'Les Miserables',
              type: 'graph',
              layout: 'circular',
              circular: {
                rotateLabel: true
              },
              data: graph.nodes,
              links: graph.links,
              categories: graph.categories,
              roam: true,
              label: {
                position: 'right',
                formatter: '{b}'
              },
              lineStyle: {
                color: 'source',
                curveness: 0.3
              }
            }
          ]
        };
        myChart.setOption(option);
      });
      
      option && myChart.setOption(option);
      