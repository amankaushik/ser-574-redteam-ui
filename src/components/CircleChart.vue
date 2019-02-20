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
            <v-layout align-center justify-space-around row fill-height>
                <v-progress-circular
                        v-for="proc in data" :key="proc"
                        :rotate="360"
                        :size="150"
                        :width="15"
                        :value="proc"
                        color="lime"
                >
                    {{ proc }} commits
                </v-progress-circular>
            </v-layout>
            <v-layout align-center justify-space-around row fill-height>
                <p v-for="(proc, index) in data" :key="proc">member {{index+1}}</p>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "CircleChart",
        props: ["data", "headers", "title"],
    }
</script>
