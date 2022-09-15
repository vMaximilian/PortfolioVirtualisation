//{a}: series name.
//{b}: the name of a data item.
//{c}: the value of a data item.
//{@xxx}: the value of a dimension named 'xxx', for example, {@product} refers the value of 'product' dimension.
//{@[n]}: the value of a dimension at the index of n, for example, {@[3]} refers the value at dimensions[3].

let chartDom = document.getElementById('mainV2');
let myChart = echarts.init(chartDom);
let option;
//Local path & hosted path
//let PATH = 'http://localhost:8888/PortfolioVirtualisation/ressources/lesMiserablesV2.json';
//let PATH = 'http://localhost:8888/PortfolioVirtualisation/ressources/test.json';
//let PATH = 'https://raw.githubusercontent.com/vMaximilian/PortfolioVirtualisation/main/ressources/lesMiserablesV2.json';
let PATH = 'https://raw.githubusercontent.com/vMaximilian/PortfolioVirtualisation/f9529b0cfb7ce4f4482180353a83da208dbb1860/ressources/test.json';

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
            text: '',
            subtext: '',
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
                name: '',
                type: 'graph',
                layout: 'none',
                data: graph.nodes,
                links:  graph.links,
                categories: graph.categories,
                roam: true,
                label: {
                    position: 'inside', // This was set to right before
                    formatter: '{b}' // This is the name of the product
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
