import React from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DonutChart = (props) => {

        console.log(props.table);
        let data = props.table.map(team => {
            return {name : team.team_name, y: team.wins};
        })
        console.log(data);  

        const options = {
            animationEnabled: true,
            title: {
                text: "Win split of all the teams",
                fontSize: 20,
            },
            subtitles: [{
                text: "",
                verticalAlign: "center",
                fontSize: 18,
                dockInsidePlotArea: true
            }],
            data: [{
                type: "doughnut",
                showInLegend: true,
                yValueFormatString: "####",
                dataPoints: data
            }]
        }
        
        return (
        <div>
            <CanvasJSChart options = {options} />
        </div>
        );	
}

export default DonutChart;  