<template>
    <div>
        <Tab v-bind:tabTitles=tabs v-bind:toolbarTitle="title"></Tab>
    </div>
</template>

<script>
    import Tab from "@/components/Tab";
    import DataTable from "@/components/DataTable";
    import CircleChart from "@/components/CircleChart";
    import GithubContribution from "../tabs/GithubContribution"
    import {HEADERS1} from "../constants";
    import {MEMBERS} from "../constants";
    import {COMPLEXITY} from "../constants";
    import {PIEDATA} from "../constants";


    export default {
        name: "Github",
        components: {Tab},
        data() {
            return {
                title: "Github Statistic",
                resources: {},
                tabsKeys: {Commits: 'commits', 'Code Complexity': 'codeComplexity', Details: 'details',
                    Contributions: 'contributions'},
                tabsData: {},
                tabs: {
                    'Commits': this.fillTabData(MEMBERS, DataTable, HEADERS1, ),
                    'Code Complexity': this.fillTabData(COMPLEXITY, CircleChart , null, 'Contributions'),
                    'Contribution': this.fillTabData(PIEDATA, GithubContribution, null, null)
                }
            }
        },
        methods: {
            getCommitsAPI: function () {
                return process.env.VUE_APP_GITHUB_EP + process.env.VUE_APP_COMMIT_KEY
            },
            getCodeComplexityAPI: function () {
                return process.env.VUE_APP_GITHUB_EP + process.env.VUE_APP_CODE_COMPLEXITY_KEY
            },
            getContributionsAPI: function () {
                return process.env.VUE_APP_GITHUB_EP + process.env.VUE_APP_CONTRIBUTIONS_KEY
            },
            getDetailsAPI: function () {
                return process.env.VUE_APP_GITHUB_EP + process.env.VUE_APP_DETAILS_KEY
            },
            prepareCommitsDataForRender: function () {
                return {}
            },
            prepareContributionsDataForRender: function () {
                return {}
            },
            prepareDetailsDataForRender: function () {
               return {}
            },
            prepareCodeComplexityDataForRender: function () {
               return {}
            },
            fillTabData: function (data, component, header, title) {
                return {data, component, header, title};
            }
        },
        created() {
            // Initialize resources
            this.resources['commits'] = this.$resource(this.getCommitsAPI());
            this.resources['codeComplexity'] = this.$resource(this.getCodeComplexityAPI());
            this.resources['contributions'] = this.$resource(this.getContributionsAPI());
            this.resources['details'] = this.$resource(this.getDetailsAPI());
        },
        mounted() {
            // Get GitHub data
            this.resources['commits'].save({}).then(response => {this.tabsData['Commits'] = response.body},
                error => {console.log(error)});
            this.resources['codeComplexity'].save({}).then(response => {this.tabsData['CodeComplexity'] = response.body},
                error => {console.log(error)});
            this.resources['contributions'].save({}).then(response => {this.tabsData['Contributions'] = response.body},
                error => {console.log(error)});
            this.resources['details'].save({}).then(response => {this.tabsData['Details'] = response.body},
                error => {console.log(error)});
        }
    }

</script>
