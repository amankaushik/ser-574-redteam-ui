<template>
    <div>
            <Tab v-bind:tabTitles=tabs v-bind:toolbarTitle="title"></Tab>
    </div>
</template>

<script>
    import Tab from "@/components/Tab";
    import DataTable from "@/components/DataTable";
    import {HEADERS} from "@/constants";
    import {USER_STORIES} from "@/constants";
    import {PROCESSES} from "@/constants";
    import {GRADIENT} from "@/constants";
    import CircleChart from "@/components/CircleChart";
    import SparkLine from "@/components/SparkLine";
    import BarChart from "@/components/BarChart";

    export default {
        name: "Taiga",
        components: {Tab},
        data() {
            return {
                title: "Taiga Statistic",
                tabsData: {},
                tabs: {
                    'Commits': this.fillTabData(USER_STORIES, DataTable, HEADERS,'Commits in Tasks'),
                    'Contribution': this.fillTabData(PROCESSES, CircleChart, null, 'Contributions'),
                    'Burn Down Chart': this.fillTabData(GRADIENT, SparkLine, null, 'Burn Down Chart'),
                    'Process': this.fillTabData(PROCESSES, BarChart, null, 'User Stories')
                }
            }
        },
        methods: {
            getCommitsAPI: function () {
                return process.env.VUE_APP_GITHUB_EP + process.env.VUE_APP_COMMIT_KEY
            },
            getBurnDownChartAPI: function () {
                return process.env.VUE_APP_GITHUB_EP + process.env.VUE_APP_CODE_COMPLEXITY_KEY
            },
            getContributionsAPI: function () {
                return process.env.VUE_APP_GITHUB_EP + process.env.VUE_APP_CONTRIBUTIONS_KEY
            },
            getProcessAPI: function () {
                return process.env.VUE_APP_GITHUB_EP + process.env.VUE_APP_DETAILS_KEY
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
            prepareProcessDataForRender: function () {
               return {}
            },
            prepareBurnDownChartDataForRender: function () {
               return {}
            },
            prepareDetailsDataForRender: function () {
               return {}
            },
            fillTabData: function (data, component, header, title) {
                return {data, component, header, title};
            }
        },
        created() {
            // Initialize resources
            this.resources['commits'] = this.$resource(this.getCommitsAPI());
            this.resources['burnDownChart'] = this.$resource(this.getBurnDownChartAPI());
            this.resources['contributions'] = this.$resource(this.getContributionsAPI());
            this.resources['details'] = this.$resource(this.getDetailsAPI());
            this.resources['process'] = this.$resource(this.getProcessAPI());
        },
        mounted() {
            // Get GitHub data
            this.resources['commits'].save({}).then(response => {this.tabsData['Commits'] = response.body},
                error => {console.log(error)});
            this.resources['burnDownChart'].save({}).then(response => {this.tabsData['burnDownChart'] = response.body},
                error => {console.log(error)});
            this.resources['contributions'].save({}).then(response => {this.tabsData['Contributions'] = response.body},
                error => {console.log(error)});
            this.resources['details'].save({}).then(response => {this.tabsData['Details'] = response.body},
                error => {console.log(error)});
            this.resources['process'].save({}).then(response => {this.tabsData['Process'] = response.body},
                error => {console.log(error)});
        }
    }

</script>
