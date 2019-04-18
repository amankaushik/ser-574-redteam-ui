<template>
    <v-layout row wrap>
        <v-flex>
            <TableChartSprintStats :data="data" :headers="headers" :title="title" :leadColumn="leadColumn"
                                     v-if="leadColumn === 'name'">
            </TableChartSprintStats>
            <TableChartSprintDetails v-else :data="data" :headers="headers" :title="title" :leadColumn="leadColumn"
                                     >
            </TableChartSprintDetails>
        </v-flex>
    </v-layout>
</template>

<script>
    import TableChartSprintDetails from "../components/TableChartSprintDetails"
    import TableChartSprintStats from "../components/TableChartSprintStats"

    export default {
        name: "TaigaSprintDetails",
        components: {TableChartSprintDetails, TableChartSprintStats},
        props: ["data", "headers", "title", "leadColumn"],
    }

</script>

<style scoped>

</style>
