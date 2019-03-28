<template>
    <v-layout row wrap>
        <v-flex>
            <TableChartSprintDetails :data="data" :headers="headers" :title="title" :leadColumn="leadColumn">
            </TableChartSprintDetails>
            <v-layout justify-center align-center>
                <v-card blue-grey lighten-4 width="94%">
                    <!--<p class="headline mb-0 text-xs-center" style="background-color: gainsboro">Project Code Quality: 82</p>-->
                </v-card>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    import  TableChartSprintDetails from "../components/TableChartSprintDetails"
    export default {
        name: "TaigaSprintDetails",
        components: {TableChartSprintDetails},
        props: {data: Array, headers: Array, title:String, leadColumn: String},
    }
</script>

<style scoped>

</style>
