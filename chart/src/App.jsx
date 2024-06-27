import { Component } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

import jsonData from './data.json'
import './App.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  zoomPlugin
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    zoom: {
      pan: {
        enabled: true,
        mode: 'x'
      },
      zoom: {
        wheel: {
          enabled: true
        },
        pinch: {
          enabled: true
        },
        mode: 'x'
      }
    }
  }
};

class App extends Component {
  state={
    activeChart: "daily",
    activeLabels: [],
    chartData: jsonData.data
  }

  componentDidMount(){
    let dailyData = []
    let dailyLabels = []

    jsonData.data.forEach((eachData, i) => {
      dailyLabels.push(`Day ${i+1}`)
      dailyData.push(jsonData.data[i].value)
    })

    this.setState({
      activeChart: "daily",
      activeLabels: dailyLabels,
      chartData: dailyData
    })
  }

  changeActiveChart = (activateChartName) => {
    if(activateChartName === "daily"){
      let dailyLabels = [];
      let dailyData = []

      jsonData.data.forEach((eachData, i) => {
        dailyLabels.push(`Day ${i+1}`)
        dailyData.push(jsonData.data[i].value)
      })

      this.setState({
        activeChart: "daily",
        activeLabels: dailyLabels,
        chartData: dailyData
      })
    }

    else if(activateChartName === "weekly"){
      let weeklyLabels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let weeklyChartData = [0,0,0,0,0,0,0]

      jsonData.data.forEach(eachData => {
        let date = new Date(eachData.timestamp)
        let day = date.getDay()
        weeklyChartData[day] += eachData.value
      });

      this.setState({
        activeChart: "weekly",
        activeLabels: weeklyLabels,
        chartData: weeklyChartData
      })
    }

    else if(activateChartName === "monthly"){
      let monthlyLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "October", "November", "December"]
      let monthlyChartData = [0,0,0,0,0,0,0,0,0,0,0,0]

      jsonData.data.forEach(eachData => {
        let date = new Date(eachData.timestamp)
        let month = date.getMonth()
        monthlyChartData[month] += eachData.value
      });

      this.setState({
        activeChart: "monthly",
        activeLabels: monthlyLabels,
        chartData: monthlyChartData
      })
    }
  }

  render() {
    const { activeLabels, chartData, activeChart } = this.state
    return (
      <div className="appContainer">
        <h1>Charts</h1>
        <div className="timeframesButtons">
          <button onClick={() => this.changeActiveChart("daily")} className={`timeFrameButton ${activeChart === "daily" && "active"}`} type="button">
            Daily
          </button>
          <button onClick={() => this.changeActiveChart('weekly')} className={`timeFrameButton ${activeChart === "weekly" && "active"}`} type="button">
            Weekly
          </button>
          <button onClick={() => this.changeActiveChart('monthly')} className={`timeFrameButton ${activeChart === "monthly" && "active"}`} type="button">
            Monthly
          </button>
        </div>
        <div>
          <p>Pinch or scroll to Zoom</p>
          <p>Move to watch specifc section of the graph</p>
        </div>
        <div  className="barchart">
          <Bar options={options} data={{labels: activeLabels, datasets: [{label: activeChart, data: chartData, backgroundColor: 'rgba(53, 162, 235, 0.5)',}]}}/>
        </div>
      </div>
    );
  }
}

export default App;
