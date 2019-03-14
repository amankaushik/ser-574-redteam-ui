<template>
    <v-card height="50%">
        <v-container width="100%">
            <v-container>
                <v-layout justify-center>
                    <pie-chart :data="data[0]" title="contribution by pull request"></pie-chart>
                    <pie-chart :data="data[1]" title="contribution by commit"></pie-chart>
                </v-layout>
            </v-container>
        </v-container>
    </v-card>

</template>

<script>
    import PieChart from "../components/PieChart"
    export default {
        name: "GithubContribution",
        components: {
            PieChart
        },
        props: ["data"]
    }
</script>
