// 这次不demo，未做完
angular.module('admin').controller('PatientReportDetailsCtrl',['$rootScope','$state','$http','portService',
    function ($rootScope,$state,$http,portService) {
        var vm = this;
        var judgeDefault = 1;
        vm.judgeHead=judgeDefault;
        vm.judgeFoot=judgeDefault;

        vm.changeHead = function (tab) {
            vm.judgeHead=tab;
        };
        vm.changeFoot = function (tab) {
            vm.judgeFoot=tab;
        };
        // Echarts
        // 头部数据
        // 头部rig图
        var headChart = echarts.init(document.getElementById('hardness-head1'));
        var head1Option = {
            tooltip: {
                trigger: "axis"
            },
            legend: {
                data: ["-"]
            },
            toolbox: {
                feature: {
                    dataView: {
                        readOnly: true
                    },
                    magicType: {
                        type: ["line", "bar"],
                            show: false
                    }
                }
            },
            xAxis: [
                {
                    type: "category",
                    data: ["0", "1min", "2min", "3min", "4min", "5min", "6min", "7min", "8min", "9min", "10min", "11min", "12min", "13min", "14min", "15min", "16min", "17min", "18min", "19min", "20min", "21min", "22min", "23min", "24min", "25min", "26min", "27min", "28min", "29min", "30min", "31min", "32min", "33min", "34min", "35min", "36min", "37min", "38min", "39min", "40min", "41min", "42min", "43min", "44min", "45min", "46min", "47min", "48min", "49min", "50min", "51min", "52min", "53min", "54min", "55min", "56min", "57min", "58min", "59min", "60min", "61min", "62min", "63min", "64min", "65min", "66min", "67min", "68min", "69min", "70min", "71min", "72min", "73min", "74min", "75min", "76min", "77min", "78min", "79min", "80min", "81min", "82min", "83min", "84min", "85min", "86min", "87min", "88min", "89min", "90min", "91min", "92min", "93min", "94min", "95min", "96min", "97min", "98min", "99min", "100min", "101min", "102min", "103min", "104min", "105min", "106min", "107min", "108min", "109min", "110min", "111min", "112min", "113min", "114min", "115min", "116min", "117min", "118min", "119min", "120min"],
                    axisLabel: {
                        interval: 14,
                        show: true
                    }
                }
            ],
                yAxis: [
            {
                type: "value",
                name: "rig（%）"
            }
            ],
            series: [
            {
                name: "-",
                type: "bar",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 73, 71, 69, 89, 77, 60, 65, 69, 75, 86, 84, 81, 84, 66, 83, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70, 61, 68, 87, 80, 63, 74, 81, 61, 89, 71, 63, 73, 79, 68, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81, 80, 77, 79, 72, 66, 81, 83, 90, 71, 72, 88, 60, 74, 60, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                barWidth: 4
            }
            ],
            grid: {
                x: 45,
                x2: 45
            }
        };
        headChart.setOption(head1Option);
        // 头部tum图
        var headChart = echarts.init(document.getElementById('hardness-head2'));
        var head2Option = {
            tooltip: {
                trigger: "axis"
            },
            legend: {
                data: ["-"]
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: {
                        readOnly: true
                    },
                    magicType: {
                        type: ["line", "bar"],
                        show: false
                    }
                }
            },
            xAxis: [
                {
                    type: "category",
                    boundaryGap: false,
                    data: ["0", "1min", "2min", "3min", "4min", "5min", "6min", "7min", "8min", "9min", "10min", "11min", "12min", "13min", "14min", "15min", "16min", "17min", "18min", "19min", "20min", "21min", "22min", "23min", "24min", "25min", "26min", "27min", "28min", "29min", "30min", "31min", "32min", "33min", "34min", "35min", "36min", "37min", "38min", "39min", "40min", "41min", "42min", "43min", "44min", "45min", "46min", "47min", "48min", "49min", "50min", "51min", "52min", "53min", "54min", "55min", "56min", "57min", "58min", "59min", "60min", "61min", "62min", "63min", "64min", "65min", "66min", "67min", "68min", "69min", "70min", "71min", "72min", "73min", "74min", "75min", "76min", "77min", "78min", "79min", "80min", "81min", "82min", "83min", "84min", "85min", "86min", "87min", "88min", "89min", "90min", "91min", "92min", "93min", "94min", "95min", "96min", "97min", "98min", "99min", "100min", "101min", "102min", "103min", "104min", "105min", "106min", "107min", "108min", "109min", "110min", "111min", "112min", "113min", "114min", "115min", "116min", "117min", "118min", "119min", "120min"],
                    axisLabel: {
                        interval: 14,
                        rotate: 0
                    }
                }
            ],
            yAxis: [
                {
                    type: "value",
                    name: "tum（cm）",
                    max: 15,
                    min: 0
                }
            ],
            series: [
                {
                    name: "-",
                    type: "line",
                    data: [8, 5, 6, 9, 7, 4, 7, 5, 8, 7, 3, 4, 7, 4, 9, 3, 5, 5, 8, 7, 6, 8, 6, 7, 4, 8, 4, 9, 4, 4, 7, 5, 4, 6, 9, 5, 6, 3, 8, 5, 7, 7, 6, 3, 6, 3, 4, 9, 5, 5, 8, 4, 3, 7, 9, 6, 3, 4, 5, 3, 9, 6, 7, 6, 9, 6, 4, 7, 5, 5, 5, 5, 4, 5, 4, 9, 5, 3, 8, 3, 9, 3, 5, 6, 9, 4, 3, 6, 4, 9, 7, 6, 5, 3, 6, 9, 5, 9, 6, 4, 9, 6, 6, 7, 3, 6, 5, 6, 8, 5, 6, 4, 6, 3, 3, 7, 8, 5, 6, 9, 7],
                    symbolSize: 0
                }
            ],
            grid: {
                x: 45,
                x2: 45
            }
        };
        headChart.setOption(head2Option);
        // 根部数据
        var footChart = echarts.init(document.getElementById('hardness-foot'));
        var foot1Option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        footChart.setOption(foot1Option);
        // 敏感度
        var sensitivityChart = echarts.init(document.getElementById('sensitivity'));
        var sensitivityOption = {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow"
                }
            },
            legend: {
                data: ["冷痛","冷觉", "热痛", "热觉"],
                selectedMode: "multiple"
            },
            toolbox: {
                feature: {
                    dataView: {
                        readOnly: true
                    },
                    magicType: {
                        type: ["line", "bar", "stack", "tiled"],
                        show: false
                    }
                }
            },
            calculable: false,
            xAxis: [
                {
                    type: "category",
                    data: ["", "1", "2", "3", "4", "5", "6"],
                    min: 0,
                    max: 6,
                    nameTextStyle: {
                        baseline: "middle"
                    },
                    splitLine: {
                        show: false
                    },
                    boundaryGap: false,
                    axisTick: {
                        show: true,
                        inside: false,
                        length: 10,
                        // interval: 100,
                        lineStyle: {
                            color: "#333",
                            width: 1
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: "value",
                    name: "温度（℃）",
                    nameLocation: "end",
                    min: 32,
                    max: 45,
                    // min: 0,
                    // max: 13,
                    // axisLabel: {
                    //     formatter: function (value) {
                    //         return value + 32;
                    //     }
                    // },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: true
                    }
                }
            ],
            series: [
                {
                    name: "冷痛",
                    type: "bar",
                    // stack: "冷",
                    data: ["-", 24.3, "-", 24.3, "-", 24.3, "-"],
                    markPoint: {
                        data: []
                    },
                    itemStyle: {
                        normal: {
                            color:"rgb(0, 153, 153)",
                            label: {
                                position: "bottom",
                                show: true
                            }
                        }
                    },
                    barWidth:10
                },
                {
                    name: "冷觉",
                    type: "bar",
                    data: ["-", 28.9, "-", 28.9, "-", 28.9, "-"],
                    // stack: "冷",
                    itemStyle: {
                        normal: {
                            color:"rgb(126, 202, 202)",
                            label: {
                                position: "right",
                                show: true
                            }
                        }
                    },
                    markLine: {
                        data: [{
                            yAxis: 32
                        }],
                        lineStyle: {
                            normal: {
                                color:"#f00"
                            }
                        }
                    },
                    barWidth:10,
                    barGap:"-100%"
                },
                {
                    name: "热痛",
                    type: "bar",
                    // stack: "热",
                    data: ["-", "-", 35.7, "-", 35.7, "-", 35.7],
                    itemStyle: {
                        normal: {
                            color:"rgb(255, 102, 0)",
                            label: {
                                position: "top",
                                show: true
                            }
                        }
                    },
                    barWidth:10
                },
                {
                    name: "热觉",
                    type: "bar",
                    // stack: "热",
                    data: ["-", "-", 34.1, "-", 34.1, "-", 34.1],
                    itemStyle: {
                        normal: {
                            color:"rgb(253, 177, 126)",
                            label: {
                                show: true,
                                position: "left"
                            }
                        }
                    },
                    barWidth:10,
                    barGap:"-100%"
                }


            ],
            grid: {
                x: 45,
                x2: 45,
                y2: 200
            }
        };
        sensitivityChart.setOption(sensitivityOption);

    }]);