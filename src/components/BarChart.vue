<template>
        <v-card height="50%"  py-0 px-2>
            <v-container width="90%">
                <v-layout justify-center>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0 orange&#45;&#45;text">{{ title }}</h3>
                        </div>
                    </v-card-title>
                </v-layout>
                <v-progress-linear
                        v-for="(proc, index) in data" :key="proc"
                        color="green"
                        height="25"
                        :value="proc"
                >user story {{index+1}} : {{ proc }}%
                </v-progress-linear>
            </v-container>
        </v-card>
</template>

<script>
    export default {
        name: "BarChart",
        props: ["data", "headers", "title"],
    }
</script>
