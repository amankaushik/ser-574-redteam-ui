<template>
    <v-container>
        <v-layout justify-center column>
            <v-card>
                <v-container v-if="isLoading">
                    <v-layout align-center justify-center>
                        <v-progress-circular
                                :size="70"
                                :width="7"
                                color="purple"
                                indeterminate
                        ></v-progress-circular>
                    </v-layout>
                </v-container>
                <template v-if="!data.hasData">
                    <v-container>
                        <v-layout justify-space-around>
                            <v-form>
                                <v-layout>
                                    <v-flex>
                                        <v-text-field
                                                v-model="taigaSlug"
                                                label="Taiga Slug"
                                                required
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex>
                                        <v-btn @click="getUSCommitDetails()" outline color="green">Get
                                            Details
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-form>
                            <v-progress-circular v-if="isLoading"
                                                 :rotate="360"
                                                 :size="200"
                                                 :width="150"
                                                 :value="donePercent"
                                                 color="teal"
                            >
                                {{ donePercent }}
                            </v-progress-circular>
                        </v-layout>
                    </v-container>
                </template>
                <v-layout v-if="data.hasData && !isLoading" row>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-card>
                            <v-toolbar flat>
                                <v-toolbar-title>US - GitHub Commits</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-btn icon>
                                    <v-icon>search</v-icon>
                                </v-btn>
                            </v-toolbar>
                            <template v-for="(item, i) in usCommits">
                                <v-container :key="i" fluid grid-list-sm>
                                    <v-subheader>{{item.subject}}</v-subheader>
                                    <v-layout row wrap>
                                        <v-flex xs4>
                                            <v-card elevation="4">
                                                <v-card-title>US Number</v-card-title>
                                                <v-card-text>{{item.number}}</v-card-text>
                                            </v-card>
                                        </v-flex>
                                        <v-flex xs4>
                                            <v-card elevation="4">
                                                <v-card-title>Start Date</v-card-title>
                                                <v-card-text>{{formatDate(item.start_date)}}</v-card-text>
                                            </v-card>
                                        </v-flex>
                                        <v-flex xs4>
                                            <v-card elevation="4">
                                                <v-card-title>End Date</v-card-title>
                                                <v-card-text>{{formatDate(item.end_date)}}</v-card-text>
                                            </v-card>
                                        </v-flex>
                                        <v-flex xs4>
                                            <v-card elevation="4">
                                                <v-card-title>Commit Count</v-card-title>
                                                <v-card-text>{{item.commit_count}}</v-card-text>
                                            </v-card>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </template>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "GitHubCommitsToTaigaUS",
        props: {data: Object, headers: Array, title: String, leadColumn: String},
        data() {
            return {
                isLoading: false,
                taigaSlug: null,
                resources: {},
                usCommits: []
            }
        },
        methods: {
            getUSCommitDetails: function () {
                this.data.hasData = true;
                this.isLoading = true;
                let ep = process.env.VUE_APP_GITHUB_BASE + process.env.VUE_APP_GITHUB_COMMITS_ON_TAIGA_US +
                    this.taigaSlug + "&repoName=" + this.leadColumn;
                let promises = [];
                promises.push(new Promise((resolve, reject) => {
                    this.$resource(ep).get({})
                        .then(response => resolve(response))
                        .catch(() => reject)
                }));
                let usCommits = null;
                let isLoading = null;
                Promise.all(promises).then(function (response) {
                    usCommits = response[0].data;
                    isLoading = false;
                }).finally(() => {
                        this.isLoading = isLoading;
                        this.usCommits = usCommits;
                    }
                );
            },
            formatDate: function (date) {
                if (date == null)
                    return "N/A";
                date = date.toString();
                // JS date months start from 0
                let formattedDate = new Date(date.slice(0, 4), parseInt(date.slice(4, 6)) - 1, date.slice(6, 8));
                return formattedDate.toDateString();
            }
        },
    }
</script>

<style scoped>

</style>
