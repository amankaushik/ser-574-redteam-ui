<template>
    <v-container>
        <v-layout align-center justify-space-around
                  wrap>
            <v-subheader></v-subheader>
            <v-expansion-panel popout focusable>
                <v-expansion-panel-content
                        v-for="(_data, i) in data"
                        :key="i"
                        hide-actions
                >
                    <template v-slot:header v-slot:badge>
                        <v-flex xs4 sm2 md1>
                            <v-avatar>
                                <v-icon>account_circle</v-icon>
                            </v-avatar>
                        </v-flex>
                        <v-flex sm5 md3 hidden-xs-only>
                            <strong v-html="_data.name"></strong>
                        </v-flex>
                        <v-flex
                                class="grey--text"
                                ellipsis
                                sm5 md3 hidden-xs-only
                        >
                            <a :href="baseURL + _data.name" target="_blank">{{ baseURL + _data.name }}</a>
                        </v-flex>
                        <v-flex sm5 md3 hidden-xs-only>
                            <strong v-html="commits"></strong>
                            <span class="grey--text"> ({{ _data.totalCommits }}) </span>
                        </v-flex>
                        <v-flex sm5 md3 hidden-xs-only>
                            <strong v-html="pullR"></strong>
                            <span class="grey--text"> ({{ _data.totalPR }}) </span>
                        </v-flex>
                    </template>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "GitHubDetails",
        data() {
            return {
                baseURL: process.env.VUE_APP_GITHUB,
                commits: "Commits",
                pullR: "Pull Requests"
            }
        },
        props: {data: Array, headers: Array, title: String, leadColumn: String, url: String},
    }
</script>

<style scoped>

</style>
