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
                <v-layout v-else row>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-card>
                            <v-toolbar flat>
                                <v-btn icon>
                                    <v-icon>arrow_back</v-icon>
                                </v-btn>
                                <v-toolbar-title>Albums</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-btn icon>
                                    <v-icon>search</v-icon>
                                </v-btn>
                            </v-toolbar>
                            <v-subheader>May</v-subheader>
                            <v-container fluid grid-list-sm>
                                <v-layout row wrap>
                                    <v-flex v-for="i in 6" :key="i" xs4>
                                        <img :src="`https://randomuser.me/api/portraits/men/${i + 20}.jpg`" class="image" alt="lorem" width="100%" height="100%">
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <v-subheader>June</v-subheader>
                            <v-container fluid grid-list-sm>
                                <v-layout row wrap>
                                    <v-flex v-for="i in 6" :key="i" xs4>
                                        <img :src="`https://randomuser.me/api/portraits/women/${i + 5}.jpg`" class="image" alt="lorem" width="100%" height="100%">
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <v-footer class="mt-5"></v-footer>
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
                donePercent: 0.0,
                taigaSlug: null,
                resources: {},
                usCommits: []
            }
        },
        methods: {
            getUSCommitDetails: function () {
                console.log(this.data);
                console.log(this.headers);
                console.log(this.title);
                console.log(this.leadColumn);
                let ep = process.env.VUE_APP_GITHUB_BASE + process.env.VUE_APP_GITHUB_COMMITS_ON_TAIGA_US +
                    this.taigaSlug + "&repoName=" + this.leadColumn;
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
