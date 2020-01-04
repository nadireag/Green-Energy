


var greenEnergyURL = "api/green_energy";
var energyComparisonURL ="api/energy_comparison"

function buildCharts(state) {
    
    d3.json(energyComparisonURL, ecData => {

        // Create bar chart variables
        var allStates = ecData.state;
        var selState = allStates.filter(selectedState => selectedState == state);
        var stateIndex = allStates.indexOf(selState[0])
        var totalConsumption = ecData.total_energy_consumed_gwh[stateIndex]
        var totalRenewable = ecData.renewable_total[stateIndex]
        var energyDifference = ecData.energy_difference[stateIndex]

        // Create the bar chart using Chart.js
        var ctx = document.getElementById('barChart').getContext('2d');
        var barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [`Energy Comparison for ${selState}`],
            datasets: [{
                label: 'Tot. Consumed',
                data: [totalConsumption],
                backgroundColor: ['#ef3b2c'],
                borderColor: ['#ef3b2c'],
                borderWidth: 1
            }, {
                label: 'Tot. Renewable',
                data: [totalRenewable],
                backgroundColor: ['#74c476'],
                borderColor: ['#74c476' ],
                borderWidth: 1
            }, {
                label: 'Energy Diff.',
                data: [energyDifference],
                backgroundColor: ['#2b8cbe'],
                borderColor: ['#2b8cbe'],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: "Energy Comparison by State (Gwhs)",
                fontSize: 18
            },
            legend: {
                position: 'right',
                alignment: 'center',
                labels: {
                    boxWidth: 10
                },
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true 
                        },
                    scaleLabel: {
                        display: true,
                        labelString: "Giga-watt Hours (Gwhs)",
                        padding: 10
                    }
                }]
            },
        }
      });
    return barChart;
    });

    d3.json(greenEnergyURL, geData => {
        var allStates = geData.state;
        var selState = allStates.filter(selectedState => selectedState == state);
        var stateIndex = allStates.indexOf(selState[0])

        var bioPowerGas = geData.biopower_gaseous[stateIndex];
        var bioPowerSolid = geData.biopower_solid[stateIndex];
        var cspSolar = geData.csp_solar[stateIndex];
        var egsGeoThermal = geData.egs_geothermal[stateIndex];
        var geoThermalHydrothermal = geData.geotermal_hydrothermal[stateIndex];
        var hydropower = geData.hydropower[stateIndex];
        var offshoreWind = geData.offshore_wind[stateIndex];
        var onshoreWind = geData.onshore_wind[stateIndex];
        var rooftopSolar = geData.rooftop_solar[stateIndex];
        var ruralSolar = geData.rural_solar[stateIndex];
        var urbanSolar = geData.urban_solar[stateIndex];

        var pieDataArr = [

            bioPowerGas,// 1
            bioPowerSolid, // 2
            cspSolar,// 3
            egsGeoThermal,// 4
            geoThermalHydrothermal, //5
            hydropower, //6
            offshoreWind, //7
            onshoreWind, //8
            rooftopSolar, //9
            ruralSolar,//10
            urbanSolar//11  

        ]

        var ctx = document.getElementById('pieChart').getContext('2d');
        var myPieChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: pieDataArr,
                    backgroundColor: [
                        'rgb(191, 63, 63)',
                        'rgb(86, 239, 35)',
                        'rgb(239, 188, 35)',
                        'rgb(35, 86, 239)',
                        'rgb(239, 86, 35)',
                        'rgb(188, 35, 239)',
                        '#74c476',
                        '#4eb3d3',
                        '#E96C05',
                        'rgba(235, 235, 9, 0.8)',
                        'rgba(235, 122, 9, 0.8)'
                        
                    ]
                }],
                labels: [
                    "Biopower - Gas",
                    "Biopower - Solid",
                    "CSP Solar",
                    "EGS Geothermal",
                    "Hydrothermal Geothermal",
                    "Hydropower",
                    "Wind - Offshore",
                    "Wind - Onshore",
                    "Solar - Rooftop",
                    "Solar - Rural",
                    "Solar - Urban"
                ]
            },
            options: {
                title: {
                    display: true,
                    text: "Renewables by State (Gwhs)",
                    fontSize: 18
                },
                legend: {
                    position: 'right',
                    alignment: 'center',
                    labels: {
                        boxWidth: 10
                    }
                }
            }
        });
        return myPieChart
    });
};


// Populate the State DropDown & create initial plots 
function init() {
    // Grab a reference to the DropDown
    var selector = d3.select("#selDataset");
    // Grab the State Names and populate the dropdown
    d3.json(energyComparisonURL, ecData => {
        var states = ecData.state.sort(d3.ascending)
        
        states.forEach( state => {
            selector
            .append("option")
            .text(state)
            .property("value", state);
        });
        // Create default chart
        var defaultState = states[0];
        buildCharts(defaultState);

    });
};

function stateChange(newState) {
    // Remove previous chart by removing canvas element
    d3.select("#barChart").remove();
    d3.select("#pieChart").remove();
    // Add canvas elements back
    d3.select("#plot1")
    .append('canvas')
    .attr('id','barChart')
    .attr('width','400')
    .attr('height','400');

    d3.select("#plot2")
    .append('canvas')
    .attr('id','pieChart')
    .attr('width','400')
    .attr('height','400');

    // Fetch new data each time a new state is selected 
    buildCharts(newState);
}

init();




