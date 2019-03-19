<template>
    <v-card height="50%">
        <v-container width="100%">
            <v-container>
                <v-layout justify-center>
                    <ComboChart :data="data[0]" title="commit"></ComboChart>
                    <ComboChart :data="data[1]" title="pull request"></ComboChart>
                </v-layout>
            </v-container>
        </v-container>
    </v-card>

</template>

<script>
    import ComboChart from "../components/ComboChart"
    export default {
        name: "GithubTimeline",
        components: {
            ComboChart
        },
        props: ["data"]
    }
</script>
