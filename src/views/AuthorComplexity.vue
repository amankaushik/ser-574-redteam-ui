<template>
    <v-layout row wrap>
        <v-flex>
            <TableChartAuthorComplexity :data="tableData" :baselines="baselines" :headers="headers" :title="title"
                                        :itemKey="leadColumn" :leadColumn="leadColumn" :show-author="false">
            </TableChartAuthorComplexity>
        </v-flex>
    </v-layout>
</template>

<script>
    import TableChartAuthorComplexity from "../components/TableChartAuthorComplexity";

    export default {
        name: "AuthorComplexity",
        components: {TableChartAuthorComplexity},
        data() {
            return {
                tableData: this.$route.params.payload.data,
                baselines: this.$route.params.payload.baselines,
                headers: this.$route.params.payload.headers,
                title: this.$route.params.payload.title,
                leadColumn: this.$route.params.payload.leadColumn
            }
        },
        mounted() {
            console.log(this.$route.params)
        }
    }
</script>

<style scoped>

</style>
