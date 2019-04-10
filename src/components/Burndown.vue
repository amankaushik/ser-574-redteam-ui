<template>
    <v-card>
        <v-container width="100%">
            <h4>{{title}}</h4>
            <v-layout justify-center>
                <GChart
                        type="LineChart"
                        :data="storyPoints"
                        :options="{
                                title: 'Burn down chart',
                                legend: { position: 'right' },
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
        name: "BurnDown",

        components: {
            GChart
        },
        props: ["data"],
        data() {
            return {
                storyPoints: [
                    ['day', 'Story points'],
                    ['1', 40],
                    ['2', 37],
                    ['3', 35],
                    ['4', 30],
                    ['5', 27],
                    ['6', 23],
                    ['7', 20],
                    ['8', 16],
                    ['9', 10],
                    ['10', 8],
                    ['11', 2],
                    ['12', 1],
                    ['13', 1],
                    ['14', 0]
                ],
            }
        }
    }
</script>

<style scoped>

</style>
