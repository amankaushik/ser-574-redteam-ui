<template>
    <v-layout row wrap>
        <v-flex>
            <TableChartAuthorComplexity :data="data" :headers="headers" :title="title" :itemKey="leadColumn" :leadColumn="leadColumn">
            </TableChartAuthorComplexity>
            <v-layout justify-center align-center>
                <v-card blue-grey lighten-4 width="94%">
                    <!--<p class="headline mb-0 text-xs-center" style="background-color: gainsboro">Project Code Quality: 82</p>-->
                </v-card>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    import TableChartAuthorComplexity from "../components/TableChartAuthorComplexity";

    export default {
        name: "GithubCodeQualityByAuthor",
        components: {TableChartAuthorComplexity},
        props: {data: Array, headers: Array, title:String, leadColumn: String},
    }
</script>

<style scoped>

</style>
