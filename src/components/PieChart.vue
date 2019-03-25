<template>
    <v-card height="50%">
        <v-container width="100%">
            <h4>{{title}}</h4>
            <v-layout justify-center>
                <GChart
                        type="PieChart"
                        :data="data"
                        :options="{
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
                             }"
                />
            </v-layout>
        </v-container>
    </v-card>

</template>

<script>
    import { GChart } from 'vue-google-charts'
    export default {
        name: "PieChart",
        components: {
            GChart
        },
        props: ["data", "title"]
    }
</script>
