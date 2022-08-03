let chartDom3 = document.getElementById('radialTree');
let myChart3 = echarts.init(chartDom3);
let option3;

let PATHRADIAL = 'http://localhost:8888/PortfolioVirtualisation/ressources/radialTree.json';
$.get(PATHRADIAL, function (data) {
  myChart3.hideLoading();
  myChart3.setOption(
    (option3 = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series: [
        {
          type: 'tree',
          data: [data],
          top: '18%',
          bottom: '14%',
          layout: 'radial',
          symbol: 'emptyCircle',
          symbolSize: 7,
          initialTreeDepth: 3,
          animationDurationUpdate: 750,
          emphasis: {
            focus: 'descendant'
          }
        }
      ]
    })
  );
});

option3 && myChart3.setOption(option3);
