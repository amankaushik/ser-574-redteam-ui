<template>
    <v-card>
        <v-img
                class="white--text"
                height="150px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
            <v-container fill-height fluid>
                <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                        <span class="headline">{{index}}. {{project.name}}</span>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-img>
        <v-card-title>
            <div>
                <span class="grey--text">{{project.description}}</span><br>
            </div>
        </v-card-title>
        <v-card-actions>
            <v-btn flat color="orange" :href="'/github/'+project.githubSlug">Github</v-btn>
            <v-btn flat color="orange" :href="'/taiga/'+project.taigaSlug">Taiga</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "ProjectSummary",
        props: ["project", "index"],
    }
</script>

<style scoped>

</style>
