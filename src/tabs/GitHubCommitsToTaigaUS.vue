<template>
    <v-container>
        <v-layout justify-center column>
            <v-card>
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
                <h1 v-else>Check</h1>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "GitHubCommitsToTaigaUS",
        props: {data: Object, headers: Array, title: String, gitHubSlug: String},
        data() {
            return {
                isLoading: false,
                donePercent: 0.0,
                taigaSlug: null,
                resources: {},
                usCommits: []
            }
        },
        methods: {
            getUSCommitDetails: function () {
                let ep = process.env.VUE_APP_GITHUB_BASE + process.env.VUE_APP_GITHUB_COMMITS_ON_TAIGA_US +
                    this.taigaSlug + "&repoName=" + this.gitHubSlug;
                this.$resource(ep).get({}).then(response => {
                    this.usCommits = response.body;
                    this.data.hasData = true;
                    console.log(this.usCommits);
                }).catch((errorHashes) => {
                    this.usCommits = [];
                    console.log(errorHashes);
                });
            }
        }
    }
</script>

<style scoped>

</style>
