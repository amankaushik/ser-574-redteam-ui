<template>
    <v-card>
        <v-container width="100%">
            <h3>{{title}} timeline</h3>
            <v-layout justify-center>
                <GChart
                        type="ComboChart"
                        :data="data"
                        :options="{
                                vAxis: {
                                    textPosition: 'in',
                                    title: 'count'
                                },
                                seriesType: 'bars',
                                series: {3: {type: 'line'}},
                                width: 700,
                                height: 450,
                                chartArea:{
                                    top: 20,
                                    bottom: 50,
                                    left: 120,
                                    right: 120,
                                },
                             }"
                />
            </v-layout>
        </v-container>
    </v-card>
</template>
<script>
    import { GChart } from 'vue-google-charts'
    export default {
        name: "ComboChart",
        components: {
            GChart
        },
        props: ["data", "title"]
    }
</script>
