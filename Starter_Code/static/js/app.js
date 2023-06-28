//Place url in a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Using D3 to fetch and logging it
d3.json(url).then(function(data) {
  console.log(data);
});

//Initializing the dashboard at startup 
function init() {

    //Use D3 to select the dropdown menu
    let dropdown = d3.select("#selDataset");

    //D3 to retrieve names and populate the dropdown selector
    d3.json(url).then((data) => {
        
        //Variable for the sample names
        let names = data.names;

        //Adding samples to the menu
        names.forEach((id) => {

            //Id for each iteration of the loop
            console.log(id);

            dropdown.append("option")
            .text(id)
            .property("value",id);
        });

        //First sample from the list
        let sample_1 = names[0];

        //Logging the value of sample_1
        console.log(sample_1);

        //Building the initial plots
        Metadata(sample_1);
        BarChart(sample_1);
        BubbleChart(sample_1);
        GaugeChart(sample_1);

    });
};

//Metadata info
function Metadata(sample) {

    //Performing D3 to get all of the data
    d3.json(url).then((data) => {

        //Retrieving all metadata
        let metadata = data.metadata;

        //Filtering based on the value of the sample
        let value = metadata.filter(result => result.id == sample);

        //Log the array of metadata objects after the have been filtered
        console.log(value)

        //First index from the array
        let DataValue = value[0];

        //Clear out metadata
        d3.select("#sample-metadata").html("");

        //Adding each key/value to the panel
        Object.entries(DataValue).forEach(([key,value]) => {

            // Log the individual key/value pairs as they are being appended to the metadata panel
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};

//Building the bar chart
function BarChart(sample) {

    //Performing D3 to retrieve all of the data
    d3.json(url).then((data) => {

        //Getting all sample data
        let InfoSample = data.samples;

        //Filtering based on the value of the sample
        let value = InfoSample.filter(result => result.id == sample);

        //First index from the array
        let DataValue = value[0];

        //The otu_ids, lables, and sample values
        let otu_ids =  DataValue.otu_ids;
        let otu_labels =  DataValue.otu_labels;
        let sample_values = DataValue.sample_values;

        //Logging the data 
        console.log(otu_ids,otu_labels,sample_values);

        //TOP 10 items in descending order
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
        //Trace for the bar chart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        //Setup the layout
        let layout = {
            title: "Top 10 Samples OTUs"
        };

        // Call Plotly to plot the bar chart
        Plotly.newPlot("bar", [trace], layout)
    });
};

//Building the Bubble Chart
function BubbleChart(sample) {

    //D3 to retrieve the data
    d3.json(url).then((data) => {
        
        //Retrieving all sample data
        let InfoSample = data.samples;

        //Filtering based on the value of the sample
        let value = InfoSample.filter(result => result.id == sample);

        //Getting the first index from the array
        let DataValue = value[0];

        //Get the otu_ids, lables, and sample values
        let otu_ids = DataValue.otu_ids;
        let otu_labels = DataValue.otu_labels;
        let sample_values = DataValue.sample_values;

        //Logging the data
        console.log(otu_ids,otu_labels,sample_values);
        
        //Trace for bubble chart
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        //Layout
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        //Ploting the bubble chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};

//Updates the dashboard when we change the sample
function optionChanged(value) { 

    //Logging the new value
    console.log(value); 

    // Call all functions 
    Metadata(value);
    BarChart(value);
    BubbleChart(value);
    GaugeChart(value);
};

//Init function
init();

