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
                        <v-layout align-center justify-center>
                            <v-btn :disabled="isDisabled" @click="getCommitDetails()" outline color="green">Get
                                Details
                            </v-btn>

                        </v-layout>
                    </v-container>
                </template>
                <v-timeline align-top v-else>
                    <v-timeline-item
                            v-for="(item, i) in dataBundleByDateBadgeDisplay"
                            :key="i"
                            :color="item.color"
                            dark
                            small
                            fill-dot
                    >
                        <v-card :color="item.color">
                            <v-card-title class="title">{{item.data.date}}</v-card-title>
                            <v-card-text class="white text--primary">
                                <v-container>
                                    <v-layout>
                                        <v-flex grow>
                                            <v-chip :color="item.color" v-for="(node, i) in item.data.data" :key="i"
                                                    text-color="white">
                                                <v-avatar class="darken-4" :color="item.color">{{node.value}}</v-avatar>
                                                {{node.text}}
                                            </v-chip>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                                <v-btn
                                        :color="item.color"
                                        class="mx-0"
                                        outline
                                        :to="{name:'authorCommitDetails', params: {payload: {dataBundleByAuthor}}, props: true}">
                                    View Details By Author
                                </v-btn>
                            </v-card-text>
                        </v-card>
                    </v-timeline-item>
                </v-timeline>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "GitHubCommitDetails",
        props: {data: Object, headers: Array, title: String, leadColumn: String},
        data() {
            return {
                resources: {},
                isLoading: false,
                interval: {},
                donePercent: 0,
                hashCodes: [],
                details: [],
                dataBundleByDate: {},
                dataBundleByAuthor: {},
                dataBundleByDateBadgeDisplay: [],
                currentColor: '',
                isDisabled: true
            }
        },
        methods: {
            getRandomColor() {
                let colors = ["red lighten-3", "indigo lighten-3", "purple lighten-3", "teal lighten-3",
                    "green lighten-3", "brown lighten-3", "blue-grey lighten-3", "deep-orange lighten-3"];
                return colors[Math.floor(Math.random() * colors.length)];
            },
            getHashesAPI: function () {
                return process.env.VUE_APP_GITHUB_BASE + process.env.VUE_APP_GITHUB_LIST_COMMIT_HASHES + this.leadColumn;
            },
            addToProgress: function () {
                return 100.0 / this.hashCodes.length;
            },
            getCommitDetails: function () {
                this.isLoading = true;
                this.data.hasData = true;
                let slug = this.leadColumn;
                let innerResource = this.$resource;
                let getHashDetailsAPI = this.getHashDetailsAPI;
                let makeDataBundle = this.makeDataBundle;
                let promises = [];
                this.hashCodes.forEach(function (node, _index) {
                    let ep = getHashDetailsAPI(slug, node);
                    promises.push(
                    new Promise((resolve, reject) => {
                        innerResource(ep).get({})
                            .then(response => resolve(response))
                            .catch(() => reject)
                    }));
                });
                Promise.all(promises).then(function (results) {
                    makeDataBundle(results)
                })
            },
            getHashDetailsAPI: function (slug, hashCode) {
                return process.env.VUE_APP_GITHUB_BASE + process.env.VUE_APP_GITHUB_VIEW_COMMIT_DETAILS +
                    slug + "&commit_hash=" + hashCode;
            },
            formatDate(date) {
                date = date.toString();
                // JS date months start from 0
                let formattedDate = new Date(date.slice(0, 4), parseInt(date.slice(4, 6)) - 1, date.slice(6, 8));
                return formattedDate.toDateString();
            },
            makeDataBundle: function (xDetails) {
                this.isLoading = false;
                let details = {};
                xDetails.forEach(function (node) {
                    details[node.data.hash] = node.data;
                });
                let formatDate = this.formatDate;
                let dataBundleByDate = {};
                let dataBundleByAuthor = {};
                for (let hashCode in details) {
                    if (details.hasOwnProperty(hashCode)) {
                        if (dataBundleByDate.hasOwnProperty(hashCode)) {
                            console.log(details[hashCode]);
                            dataBundleByDate[formatDate(details[hashCode].date)]['additions'] +=
                                details[hashCode]['additions'];
                            dataBundleByDate[formatDate(details[hashCode].date)]['deletions'] +=
                                details[hashCode]['deletions'];
                            dataBundleByDate[formatDate(details[hashCode].date)]['files'] +=
                                details[hashCode]['files'].length;
                            dataBundleByDate[formatDate(details[hashCode].date)]['commits'] += 1;
                            dataBundleByDate[formatDate(details[hashCode].date)]['authors'].add(
                                details[hashCode]['author']);
                            dataBundleByDate[formatDate(details[hashCode].date)]['authorCount'] =
                                dataBundleByDate[formatDate(details[hashCode].date)]['authors'].length;
                        } else {
                            console.log(details[hashCode]);
                            dataBundleByDate[formatDate(details[hashCode].date)] = {
                                'additions': {value: details[hashCode]['additions'], text: 'Addition(s)'},
                                'deletions': {value: details[hashCode]['deletions'], text: 'Deletion(s)'},
                                'files': {value: details[hashCode]['files'].length, text: 'File(s)'},
                                'commits': {value: 1, text: 'Commit(s)'},
                                'authors': {value: new Set(details[hashCode]['author']), text: 'Authors'},
                                'authorCount': {value: 1, text: 'Author(s)'}
                            }
                        }
                    }
                }

                for (let hashCode in details) {
                    if (details.hasOwnProperty(hashCode)) {
                        if (dataBundleByAuthor.hasOwnProperty(details[hashCode].author)) {
                            dataBundleByAuthor[details[hashCode].author].push([{
                                value: details[hashCode].files,
                                text: 'Files Modified'
                            }, {value: details[hashCode].additions, text: 'LOC Added'},
                                {value: details[hashCode].deletions, text: 'LOC Deleted'},
                                {value: details[hashCode].message, text: 'Commit Message'},
                                {value: formatDate(details[hashCode].date), text: 'Committed On'}]);
                        } else {
                            dataBundleByAuthor[details[hashCode].author] = [[{
                                value: details[hashCode].files,
                                text: 'Files Modified'
                            }, {value: details[hashCode].additions, text: 'LOC Added'},
                                {value: details[hashCode].deletions, text: 'LOC Deleted'},
                                {value: details[hashCode].message, text: 'Commit Message'},
                                {value: formatDate(details[hashCode].date), text: 'Committed On'}]]
                        }
                    }
                }
                this.dataBundleByDate = JSON.parse(JSON.stringify(dataBundleByDate));
                this.dataBundleByAuthor = JSON.parse(JSON.stringify(dataBundleByAuthor));
                let dataBundleByDateBadgeDisplay = JSON.parse(JSON.stringify(dataBundleByDate));
                let getRandomColor = this.getRandomColor;
                for (let node in dataBundleByDateBadgeDisplay) {
                    if (dataBundleByDateBadgeDisplay.hasOwnProperty(node)) {
                        delete dataBundleByDateBadgeDisplay[node]['authors'];
                        this.dataBundleByDateBadgeDisplay.push({
                            data: {date: node, data: dataBundleByDateBadgeDisplay[node]},
                            color: getRandomColor()
                        });
                    }
                }
            }
        },
        mounted() {
            /* Initialize Resources */
            this.resources['hashCodes'] = this.$resource(this.getHashesAPI());

            /* Get Commit Hashes */
            this.resources['hashCodes'].get({}).then(response => {
                /* response is a single element array. The element has one dictionary with "hashes" as the
                outermost key */
                this.hashCodes = response.body["hashes"];
            }).catch((errorHashes) => {
                this.hashCodes = {};
                console.log(errorHashes);
            }).finally(() => {
                this.isDisabled = false;
            });
        }
        ,
        beforeDestroy: function () {
            clearInterval(this.interval);
        }
    }
</script>

<style scoped>

</style>
