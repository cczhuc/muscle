/**
 * Created by Administrator on 2017/3/6.
 */
'use strict';
angular.module('admin')
.directive('chart',function ($timeout) {
    return {
        restrict:'EA',
        replace:true,
        scope:{
            idType: '@',
            //得分
            chartData: '=',
            //标题，格式：[{text:'技能评测',max:100},{text:'项目经验',max:100}]
            indicatro: '=',
            //姓名,可不传入
            name:"@",
            //圆旋转的度数，默认为0
            startAngle:'=?',
            //大小，数组[宽度，高度]
            size:'=',
            //在画布中的大小
            radius:'@',
            //画布中的位置
            center:'=?'

        },
        template:"<div>"+
        "<canvas id='{{idType}}' width='{{ size[0] }}' height='{{ size[1] }}'></canvas></div>",
        link : function (scope) {
            $timeout(function () {
                //console.log(scope.size)
                var myChart = echarts.init(document.getElementById(scope.idType));
                var option = {
                    radar: [
                        {
                            //标题
                            indicator:scope.indicatro,
                            //大小
                            radius: scope.radius||'68%',
                            startAngle: scope.startAngle||0,
                            shape: 'circle',
                            nameGap:8,
                            splitNumber:5,
                            //偏移
                            center:scope.center||['50%','55%'],
                            name: {
                                //文字显示样式
                                formatter: "{value}",
                                //文字颜色，支持rgba
                                textStyle: {
                                    color: 'black',
                                    fontWeight:'400',
                                    fontSize:12
                                }
                            },
                            //各个区域的颜色，支持每个区域不同颜色
                            splitArea: {
                                areaStyle: {
                                    color: ['white'],
                                    shadowColor: 'rgba[0,0,0,0,3]',
                                    shadowBlur: 10
                                }
                            },
                            //坐标轴
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(225,225,225,0.5)'
                                }
                            },
                            spliteLine: {
                                lineStyle: {
                                    color: 'rgba(225,225,225,0.5)'
                                }
                            }
                        }
                    ],
                    series: [{
                        name: '得分',
                        type: 'radar',
                        itemStyle:{
                            lineStyle:{
                                width:4
                            }
                        },
                        data:[
                            {
                                //得分
                                value:scope.chartData,
                                //姓名
                                name:scope.name||'张三',
                                symbol:'circle',
                                symbolSize:5,
                                lineStyle:{
                                    normal:{
                                        color:'#9fedd7',
                                    }
                                },
                                //显示得分
                                label:{
                                    normal:{
                                        show:true,
                                    }
                                }
                            }
                        ]
                    }]
                };
                //每当数据有变化就执行一次
                scope.$watch('chartData',function () {
                    myChart.setOption(option);
                })
            });
        }
    }
});