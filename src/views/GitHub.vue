<template>
    <div>
        <template v-if="isLoading">
            <div class="text-xs-center">
                <v-progress-circular
                        :rotate="360"
                        :size="100"
                        :width="15"
                        :value="donePercent"
                        color="teal"
                >
                    {{ donePercent }}
                </v-progress-circular>
            </div>
        </template>
        <template v-else>
            <Tab v-bind:tabTitles=tabs v-bind:toolbarTitle="title"></Tab>
        </template>
    </div>
</template>

<script>
    import Tab from "@/components/Tab";
    import DataTable from "@/components/DataTable";
    import CircleChart from "@/components/CircleChart";
    import GithubContribution from "../tabs/GithubContribution";
    import {HEADERS1} from "../constants";

    export default {
        name: "Github",
        components: {Tab},
        data() {
            return {
                isLoading: true,
                interval: {},
                donePercent: 0,
                title: "Github Statistic",
                resources: {},
                slug: this.$route.params.slug,
                tabKeys: {
                    Commits: 'commits', 'Code Quality - Files': 'codeQualityFiles', Details: 'details',
                    'Code Quality - Authors': 'codeQualityAuthors'
                },
                tabs: {}
            }
        },
        methods: {
            getCommitsAPI: function () {
                return process.env.VUE_APP_GITHUB_BASE + process.env.VUE_APP_GITHUB_COMMIT_VIEW
                    + this.slug;
            },
            getAllFilesComplexityAPI: function () {
                return process.env.VUE_APP_GITHUB_BASE + process.env.VUE_APP_GITHUB_COMPLEXITY_ALL_FILES
                    + this.slug;
            },
            getDetailsAPI: function () {
                return process.env.VUE_APP_GITHUB_BASE + process.env.VUE_APP_GITHUB_LIST_REPO_VIEW
                    + this.slug;
            },
            getAllAuthorsComplexityAPI: function () {
                return process.env.VUE_APP_GITHUB_BASE + process.env.VUE_APP_GITHUB_COMPLEXITY_ALL_AUTHORS
                    + this.slug;
            },
            prepareCommitsDataForRender: function (data) {
                return data;
            },
            prepareFilesComplexityDataForRender: function (data) {
                return data;
            },
            prepareDetailsDataForRender: function (data) {
                return data;
            },
            prepareAuthorsComplexityDataForRender: function (data) {
                return data;
            },
            fillTabData: function (data, component, header, title) {
                return {data, component, header, title};
            },
            addToPorgress: function () {
                return 100.0 / Object.keys(this.tabKeys).length;
            }
        },
        created() {
        },
        mounted() {

            // Initialize resources
            this.resources[this.tabKeys['Commits']] = this.$resource(this.getCommitsAPI());
            this.resources[this.tabKeys['Code Quality - Files']] = this.$resource(this.getAllFilesComplexityAPI());
            this.resources[this.tabKeys['Code Quality - Authors']] = this.$resource(this.getAllAuthorsComplexityAPI());
            this.resources[this.tabKeys['Details']] = this.$resource(this.getDetailsAPI());
            // Progress Bar
            this.interval = setInterval(() => {
                console.log("Running");
                if (this.donePercent >= 100.0) {
                    console.log("Done");
                    this.isLoading = false;
                    return (this.donePercent = 0.0)
                }
            }, 1000);

            // Get GitHub data
            this.resources[this.tabKeys['Commits']].save({}).then(response => {
                this.tabs[this.tabKeys['Commits']] = this.fillTabData(
                    this.prepareCommitsDataForRender(response.body), DataTable, HEADERS1, null);
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                this.donePercent += this.addToPorgress();
            });
            this.resources[this.tabKeys['Code Quality - Files']].save({}).then(response => {
                this.tabs[this.tabKeys['Code Quality - Files']] = this.fillTabData(
                    this.prepareFilesComplexityDataForRender(response.body), CircleChart, null, null);
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                this.donePercent += this.addToPorgress();
            });
            this.resources[this.tabKeys['Code Quality - Authors']].save({}).then(response => {
                this.tabs[this.tabKeys['Code Quality - Authors']] = this.fillTabData(
                    this.prepareAuthorsComplexityDataForRender(response.body), GithubContribution, null, null);
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                this.donePercent += this.addToPorgress();
            });
            this.resources[this.tabKeys['Details']].save({}).then(response => {
                this.tabs[this.tabKeys['Details']] = this.fillTabData(
                    this.prepareDetailsDataForRender(response.body), DataTable, HEADERS1, null);
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                this.donePercent += this.addToPorgress();
            });
        },
        beforeDestroy: function () {
            clearInterval(this.interval);
        }
    }

</script>
