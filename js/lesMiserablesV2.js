let chartDom = document.getElementById('mainV2');
let myChart = echarts.init(chartDom);
let option;
//Local path & hosted path
//let PATH = 'http://localhost:8888/PortfolioVirtualisation/ressources/lesMiserablesV2.json';
let PATH = 'https://raw.githubusercontent.com/vMaximilian/PortfolioVirtualisation/main/ressources/lesMiserablesV2.json';
myChart.showLoading();
$.getJSON(PATH, function (graph) {
    myChart.hideLoading();
    graph.nodes.forEach(function (node) {
        node.label = {
            show: node.symbolSize > 30
        };
    });
    option = {
        title: {
            text: 'you can higlight the lines!',
            subtext: 'Default layout',
            top: 'top',
            left: 'left'
        },
        tooltip: {},
        legend: [
            {
                // selectedMode: 'single',
                data: graph.categories.map(function (a) {
                    return a.name;
                })
            }
        ],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                name: 'Les Miserables',
                type: 'graph',
                layout: 'none',
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
                },
                emphasis: {
                    focus: 'adjacency',
                    lineStyle: {
                        width: 10
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
});

option && myChart.setOption(option);