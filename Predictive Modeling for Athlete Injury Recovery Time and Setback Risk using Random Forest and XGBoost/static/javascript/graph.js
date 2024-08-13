
  window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer",
    {

      title:{
      text: ""
      },
      axisX: {
        valueFormatString: "MM",
        interval:1,
        intervalType: "month"
      },
      axisY:{
        includeZero: false

      },
      data: [
      {
        type: "line",

        dataPoints: [
        { x: new Date(2012, 2008, 1), y: 300 },
        { x: new Date(2012, 2009, 1), y: 250},
          { x: new Date(2012, 2010, 1), y: 200, indexLabel: "lowest",markerColor: "DarkSlateGrey", markerType: "cross"},
        { x: new Date(2012, 2011, 1), y: 400 },
        { x: new Date(2012, 2012, 1), y: 420 },
        { x: new Date(2012, 2013, 1), y: 470 },
        { x: new Date(2012, 2014, 1), y: 500 },
        { x: new Date(2012, 2016, 1), y: 480 },
        { x: new Date(2012, 2017, 1), y: 520 },
        { x: new Date(2012, 2018, 1), y: 550, indexLabel: "Highest",markerColor: "red", markerType: "triangle" }
        
        ]
      }
      ]
    });

    chart.render();
  }

  