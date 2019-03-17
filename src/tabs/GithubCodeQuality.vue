<template>
    <v-layout row wrap>
        <v-flex xs6>
            <TableChart :data="data.data1" :headers="data.header1" title="By Members"></TableChart>
            <v-layout justify-center align-center>
                <v-card blue-grey lighten-4 width="94%">
                    <p class="headline mb-0 text-xs-center" style="background-color: gainsboro">Project Code Quality: 82</p>
                </v-card>
            </v-layout>
        </v-flex>
        <v-flex xs6>
            <TableChart :data="data.data2" :headers="data.header2" title="By Files"></TableChart>
        </v-flex>

    </v-layout>
</template>

<script>
    import TableChart from "../components/TableChart";
    export default {
        name: "GithubCodeQuality",
        components: {TableChart},
        props: ["data"]
    }
</script>

<style scoped>

</style>
