<template>
    <v-container>
        <template v-if="!data.hasData">
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-btn align="center" @click="getCommitDetails()" outline color="green">Get Details</v-btn>
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
        <v-timeline align-top v-else>
            <v-timeline-item
                    v-for="(item, i) in dataBundleByDateBadgeDisplay"
                    :key="i"
                    :color="getRandomColor()"
                    dark
                    small
                    fill-dot
            >
                <v-card
                        :color="currentColor"
                        dark
                >
                    <v-card-title class="title">{{i}}</v-card-title>
                    <v-card-text class="white text--primary">
                        <v-container>
                            <v-layout>
                                <v-flex xs8>
                                    <v-chip :color="currentColor" v-for="(node, i) in item" :key="i" text-color="white">
                                        <v-avatar class="darken-4" :color="currentColor">{{node.value}}</v-avatar>
                                        {{node.text}}
                                    </v-chip>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-btn
                                :color="currentColor"
                                class="mx-0"
                                outline
                                :to="{name:'authorCommitDetails', params: {payload: {dataBundleByAuthor}}, props: true}">
                            View Details By Author
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-timeline-item>
        </v-timeline>
    </v-container>
</template>

<script>
    export default {
        name: "GitHubCommitDetails",
        props: {data: Object, headers: Array, title: String, repoName: String},
        data() {
            return {
                resources: {},
                isLoading: false,
                interval: {},
                donePercent: 0,
                hashCodes: [],
                details: {},
                dataBundleByDate: {},
                dataBundleByAuthor: {},
                dataBundleByDateBadgeDisplay: {},
                currentColor: ''
            }
        },
        methods: {
            getRandomColor() {
                let colors = ["red lighten-3", "indigo lighten-3", "purple lighten-3", "teal lighten-3",
                    "green lighten-3", "orange lighten-3", "brown lighten-3", "blue-grey lighten-3", "deep-orange lighten-3"];
                this.currentColor = colors[Math.floor(Math.random() * colors.length)];
                return this.currentColor;
            },
            getHashesAPI: function () {
                return process.env.VUE_APP_GITHUB_LIST_COMMIT_HASHES + this.slug;
            },
            addToProgress: function () {
                return 100.0 / this.hashCodes.length;
            },
            getCommitDetails: function () {
                let donePercent = 0.0;
                let _len = this.hashCodes.length;
                this.isLoading = true;
                this.data.hasData = true;
                this.interval = setInterval(() => {
                    if (donePercent >= 100.0) {
                        this.isLoading = false;
                        return (donePercent = 0.0)
                    }
                }, 1000);
                let details = {};
                this.hashCodes.forEach(function (node, _index) {
                    //let ep = this.getHashDetailsAPI(node);
                    //this.$resource(ep).get({}).then(response => {
                    // response is an array with a single element
                    //this.details[node] = response.body[0];
                    details[node] = {
                        'hash': '70f13b111e1147611b70f9c9f1f76ddb00fcbe27',
                        'repositoryID': 168214867,
                        'author': 'sarthak-tiwari',
                        'message': 'Added gitignore for python to the source directory',
                        'date': 20190207, 'timeCommitted': '2019-02-07T23:39:00Z',
                        'files': '[".gitignore"]',
                        'additions': 116,
                        'deletions': 0
                    };
                    donePercent += 100.0 / _len;
                    /*}).catch((errorDetails) => {
                        console.log(errorDetails);
                    }).finally(() => {
                        this.donePercent = this.addToProgress();
                    })*/
                });
                this.details = details;
                this.makeDataBundle();
            },
            getHashDetailsAPI: function (hashCode) {
                return process.env.VUE_APP_GITHUB_VIEW_COMMIT_DETAILS + this.slug + "&hash=" + hashCode;
            },
            formatDate(date) {
                date = date.toString();
                let formattedDate = new Date(date.slice(0, 4), date.slice(4, 6), date.slice(6, 8));
                return formattedDate.toDateString();
            },
            makeDataBundle: function () {
                let dataBundleByDate = {};
                let dataBundleByAuthor = {};
                console.log(this.details);
                for (let hashCode in this.details) {
                    if (this.details.hasOwnProperty(hashCode)) {
                        if (dataBundleByDate.hasOwnProperty(hashCode)) {
                            dataBundleByDate[this.formatDate(this.details[hashCode].date)]['additions'] +=
                                this.details[hashCode]['additions'];
                            dataBundleByDate[this.formatDate(this.details[hashCode].date)]['deletions'] +=
                                this.details[hashCode]['deletions'];
                            dataBundleByDate[this.formatDate(this.details[hashCode].date)]['files'] +=
                                this.details[hashCode]['files'].length;
                            dataBundleByDate[this.formatDate(this.details[hashCode].date)]['commits'] += 1;
                            dataBundleByDate[this.formatDate(this.details[hashCode].date)]['authors'].add(
                                this.details[hashCode]['author']);
                            dataBundleByDate[this.formatDate(this.details[hashCode].date)]['authorCount'] =
                                dataBundleByDate[this.formatDate(this.details[hashCode].date)]['authors'].length;
                        } else {
                            dataBundleByDate[this.formatDate(this.details[hashCode].date)] = {
                                'additions': {value: this.details[hashCode]['additions'], text: 'Additions'},
                                'deletions': {value: this.details[hashCode]['deletions'], text: 'Deletions'},
                                'files': {value: this.details[hashCode]['files'].length, text: 'Files'},
                                'commits': {value: 1, text: 'Commits'},
                                'authors': {value: new Set(this.details[hashCode]['author']), text: 'Authors'},
                                'authorCount': {value: 1, text: 'Author(s)'}
                            }
                        }
                    }
                }

                for (let hashCode in this.details) {
                    if (this.details.hasOwnProperty(hashCode)) {
                        if (dataBundleByAuthor.hasOwnProperty(hashCode)) {
                            dataBundleByAuthor[this.details[hashCode].author].push([{
                                value: this.details[hashCode].files,
                                text: 'Files Modified'
                            }, {value: this.details[hashCode].additions, text: 'LOC Added'},
                                {value: this.details[hashCode].deletions, text: 'LOC Deleted'},
                                {value: this.details[hashCode].message, text: 'Commit Message'},
                                {value: this.formatDate(this.details[hashCode].date), text: 'Committed On'}]);
                        } else {
                            dataBundleByAuthor[this.details[hashCode].author] = [[{
                                value: this.details[hashCode].files,
                                text: 'Files Modified'
                            }, {value: this.details[hashCode].additions, text: 'LOC Added'},
                                {value: this.details[hashCode].deletions, text: 'LOC Deleted'},
                                {value: this.details[hashCode].message, text: 'Commit Message'},
                                {value: this.formatDate(this.details[hashCode].date), text: 'Committed On'}]]
                        }
                    }
                }
                this.dataBundleByDate = dataBundleByDate;
                let dataBundleByDateBadgeDisplay = JSON.parse(JSON.stringify(dataBundleByDate));
                for (let node in dataBundleByDateBadgeDisplay) {
                    if (dataBundleByDateBadgeDisplay.hasOwnProperty(node)) {
                        delete dataBundleByDateBadgeDisplay[node]['authors'];
                    }
                }
                this.dataBundleByDateBadgeDisplay = dataBundleByDateBadgeDisplay;
                console.log(this.dataBundleByDateBadgeDisplay);
                this.dataBundleByAuthor = dataBundleByAuthor;
            }
        },
        mounted() {
            /* HARD CODING - REMOVE */
            this.hashCodes = ["70f13b111e1147611b70f9c9f1f76ddb00fcbe27"];
            /* Initialize Resources */
            /*this.resources['hashCodes'] = this.$resource(this.getHashesAPI());*/

            /* Get Commit Hashes */
            /*this.resources['hashCodes'].get({}).then(response => {
                /* response is a single element array. The element has one dictionary with "hashes" as the
                outermost key */
            /*
            this.hashCodes = response.body[0]["hashes"]
            console.log(this.hashCodes)
        }).catch((errorHashes) => {
            this.hasCodes = {};
            console.log(errorHashes);
        });*/
        },
        beforeDestroy: function () {
            clearInterval(this.interval);
        }
    }
</script>

<style scoped>

</style>
