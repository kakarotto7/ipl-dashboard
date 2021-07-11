import React from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;


const SplineChart = (props) => {

        console.log(props.seasonWisePerformances);
        let data = props.seasonWisePerformances.map(season => {
            return {x : season.season_id + 2007 , y: season.wins};
        })
        console.log(data);  


		const options = {
			animationEnabled: true,
			title:{
                text: "Seasonwise Performance",
                fontSize: 18,
			},
			axisX: {
                title: "Season",
                fontSize: 10,
				valueFormatString: "####"
			},
			axisY: {
                title: "Wins",
                fontSize: 10,
                valueFormatString: "####",
				includeZero: false
			},
			data: [{
				yValueFormatString: "#### Matches Won",
				xValueFormatString: "####",
				type: "spline",
				dataPoints: data
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options} />
		</div>
		);

}

export default SplineChart;    