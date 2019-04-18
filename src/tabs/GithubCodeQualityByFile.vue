<template>
    <v-layout row wrap>
        <v-flex>
            <TableChartFileComplexity :data="tableData" :baselines="baselines" :headers="headers" :title="title" :itemKey="leadColumn" :leadColumn="leadColumn">
            </TableChartFileComplexity>
        </v-flex>
    </v-layout>
</template>

<script>
    import TableChartFileComplexity from "../components/TableChartFileComplexity";

    export default {
        name: "GithubCodeQualityByFile",
        components: {TableChartFileComplexity},
        props: {data: Object, headers: Array, title:String, leadColumn: String},
        computed: {
            tableData: function () {
                return this.data.tableData;
            },
            baselines: function () {
                return this.data.baselines;
            }
        },
    }
</script>

<style scoped>

</style>
