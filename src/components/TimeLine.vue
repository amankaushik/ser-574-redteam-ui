<template>
    <v-card>
        <v-container width="100%">
            <h4>{{title}}</h4>
            <v-layout justify-center>
                <div id="timeline"> <v-btn @click="show">show</v-btn></div>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "TimeLine",
        props: ["data", "title"],
        data() {
            return {
                tasks:[
                    [ 'task 1', 'created', new Date(2019, 3, 27), new Date(2019, 4, 1)],
                    [ 'task 1', 'in process', new Date(2019, 4, 1), new Date(2019, 4, 10)],
                    [ 'task 1', 'test', new Date(2019, 4, 10), new Date(2019, 4, 13)],
                    [ 'task 2', 'created', new Date(2019, 3, 28), new Date(2019, 4, 3)],
                    [ 'task 2', 'in process', new Date(2019, 4, 3), new Date(2019, 4, 9) ],
                    [ 'task 2', 'test', new Date(2019, 4, 9), new Date(2019, 4, 12) ],
                    [ 'task 3', 'created', new Date(2019, 4, 2), new Date(2019, 4, 10)],
                    [ 'task 3', 'in process', new Date(2019, 4, 10), new Date(2019, 4, 15)],
                    [ 'task 3', 'test', new Date(2019, 4, 15), new Date(2019, 4, 16)]],

                options:{
                    legend: { position: 'left', maxLines:4},
                    width: 700,
                    height: 450,
                    chartArea:{
                        left:10,
                        top:40,
                        right:100,
                        bottom:40,
                        width:800,
                        height:450
                    }
                }
            }
        },
        mounted() {
            let recaptchaScript = document.createElement('script');
            recaptchaScript.setAttribute('src', 'https://www.gstatic.com/charts/loader.js');
            document.head.appendChild(recaptchaScript);
        },
        methods: {
            show: function(){
                google.charts.load('current', {'packages':['timeline']});;
                google.charts.setOnLoadCallback(()=>{
                    const container = document.getElementById('timeline');
                    const chart = new google.visualization.Timeline(container);
                    const dataTable = new google.visualization.DataTable();

                    dataTable.addColumn({ type: 'string', id: 'task' });
                    dataTable.addColumn({ type: 'string', id: 'state' });
                    dataTable.addColumn({ type: 'date', id: 'Start' });
                    dataTable.addColumn({ type: 'date', id: 'End' });
                    dataTable.addRows(this.tasks);
                    chart.draw(dataTable, this.options);
                });
            },
        }
    }
</script>

<style scoped>

</style>
