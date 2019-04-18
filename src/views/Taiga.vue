<template>
    <div>
        <v-container v-if="isLoading">
            <v-layout align-center justify-center>
                <v-progress-circular
                        :rotate="360"
                        :size="400"
                        :width="150"
                        :value="donePercent"
                        color="teal"
                >
                    {{ donePercent }}
                </v-progress-circular>
            </v-layout>
        </v-container>
        <template v-else>
            <Tab v-bind:tabTitles=tabs v-bind:toolbarTitle="title"></Tab>
        </template>
    </div>
</template>

<script>
    import Tab from "@/components/Tab";
    import TaigaSprintDetails from "@/tabs/TaigaSprintDetails"
    import TaigaTaskDistribution from "@/tabs/TaigaTaskDistribution";
    import TaigaSprintText from "@/tabs/TaigaSprintText";

    export default {
        name: "Taiga",
        components: {Tab},
        data() {
            return {
                isLoading: true,
                interval: {},
                donePercent: 0,
                titlePrefix: "Taiga Statistics",
                title: null,
                resources: {},
                slug: this.$route.params.slug,
                tabKeys: {
                    sprintDetails: 'Sprint Details',
                    taskDistribution: 'Task Distribution',
                    sprintUSTask: 'Sprint - US - Tasks',
                    sprintUS: 'Sprint - US',
                    sprintStoryPoints: 'Sprint Story Points'
                },
                tabs: {}
            }
        },
        methods: {
            getCommitsAPI: function () {
                return process.env.VUE_APP_TAIGA_BASE + process.env.VUE_APP_COMMIT_KEY
            },
            getSprintUSTaskAPI: function () {
                return process.env.VUE_APP_TAIGA_BASE + process.env.VUE_APP_TAIGA_SPRINT_US_TASKS + this.slug;
            },
            getSprintStoryPointAPI: function () {
                return process.env.VUE_APP_TAIGA_BASE + process.env.VUE_APP_TAIGA_SPRINT_STORY_POINT + this.slug;
            },
            getSprintUSAPI: function () {
                return process.env.VUE_APP_TAIGA_BASE + process.env.VUE_APP_TAIGA_SPRINT_US + this.slug;
            },
            getSprintDetailsAPI: function () {
                return process.env.VUE_APP_TAIGA_BASE + process.env.VUE_APP_TAIGA_SPRINT_DETAILS + this.slug;
            },
            getTaskDistributionAPI: function () {
                return process.env.VUE_APP_TAIGA_BASE + process.env.VUE_APP_TAIGA_TASK_DISTRIBUTION + this.slug;
            },
            prepareSprintDataForRender: function (data, headers, key) {
                let renderData = [];
                if (data === null) {
                    return renderData;
                } else {
                    if (key != null)
                        data = data[key];
                    data.forEach(function (node, _index) {
                        let tmp = {};
                        headers.forEach(function (header, _hindex) {
                            tmp[header] = node[header];
                        });
                        renderData.push(tmp);
                    });
                    return renderData;
                }
            },
            prepareTaskDistributionDataForRender: function (data) {
                let renderData = [['Members', '#Tasks']];
                let distribution = {};
                if (data === null) {
                    return renderData;
                } else {
                    data = data['TASK'];
                    for (let key in data) {
                        if (!(data[key].assigned_to in distribution)) {
                            distribution[data[key].assigned_to] = 1;
                        } else {
                            distribution[data[key].assigned_to] += 1
                        }
                    }
                    for (let key in distribution) {
                        renderData.push([key, distribution[key]]);
                    }
                }
                return renderData;
            },
            prepareSprintUSTaskDataForRender: function (data) {
                if (data == null) {
                    return [];
                } else {
                    return data['sprint_user_task_details'];
                }
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
            fillTabData: function (data, component, headers, title, leadColumn) {
                return {data, component, headers, title, leadColumn};
            },
            addToProgress: function () {
                return 100.0 / Object.keys(this.tabKeys).length;
            },
            mergeSprintDetailsData: function () {
                let sprintUSData = this.tabs[this.tabKeys['sprintUS']].data;
                let sprintUSHeaders = this.tabs[this.tabKeys['sprintUS']].headers;
                let sprintStoryPointsData = this.tabs[this.tabKeys['sprintStoryPoints']].data;
                let sprintStoryPointsHeaders = this.tabs[this.tabKeys['sprintStoryPoints']].headers;
                let mergedHeader = sprintUSHeaders;
                sprintStoryPointsHeaders.forEach(function (node) {
                    if (node.value !== "name") {
                        mergedHeader.push(node);
                    }
                });
                let mergedData = [];
                for (let outerKey in sprintUSData) {
                    if (sprintUSData.hasOwnProperty(outerKey)) {
                        for (let innerKey in sprintStoryPointsData) {
                            if (sprintStoryPointsData.hasOwnProperty(innerKey)) {
                                if (sprintStoryPointsData[innerKey].name === sprintUSData[outerKey].name) {
                                    let tmp = {};
                                    mergedHeader.forEach(function (node) {
                                        if (sprintUSData[outerKey][node.value] == null) {
                                            tmp[node.value] = sprintStoryPointsData[innerKey][node.value];
                                        } else {
                                            tmp[node.value] = sprintUSData[innerKey][node.value];
                                        }
                                    });
                                    mergedData.push(tmp);
                                }
                            }
                        }
                    }
                }
                delete this.tabs[this.tabKeys['sprintUS']];
                delete this.tabs[this.tabKeys['sprintStoryPoints']];
                this.tabs['Sprint Statistics'] = this.fillTabData(mergedData, TaigaSprintDetails, mergedHeader,
                    "Sprint Statistics", "name");
            }
        },
        mounted() {
            // Form Page Title
            this.title = `${this.titlePrefix} - ${this.slug}`;

            // Initialize resources
            this.resources[this.tabKeys['sprintDetails']] = this.$resource(this.getSprintDetailsAPI());
            this.resources[this.tabKeys['taskDistribution']] = this.$resource(this.getTaskDistributionAPI());
            this.resources[this.tabKeys['sprintUSTask']] = this.$resource(this.getSprintUSTaskAPI());
            this.resources[this.tabKeys['sprintUS']] = this.$resource(this.getSprintUSAPI());
            this.resources[this.tabKeys['sprintStoryPoints']] = this.$resource(this.getSprintStoryPointAPI());

            // Progress Bar
            this.interval = setInterval(() => {
                if (this.donePercent >= 100.0) {
                    this.isLoading = false;
                    this.mergeSprintDetailsData();
                    return (this.donePercent = 0.0)
                }
            }, 1000);

            // Get Taiga data
            this.resources[this.tabKeys['sprintDetails']].get({}).then(response => {
                let headers = ["sprint_name", "status", "created_date", "estimated_start",
                    "estimated_finish", "gap"];
                let headersRender = [{text: "Sprint Name", value: "sprint_name"}, {text: "Status", value: "status"},
                    {text: "Created Date", value: "created_date"}, {text: "Estimated Start", value: "estimated_start"},
                    {text: "Estimated Finish", value: "estimated_finish"}, {text: "Gap", value: "gap"}];
                this.tabs[this.tabKeys['sprintDetails']] = this.fillTabData(
                    this.prepareSprintDataForRender(response.body, headers, 'sprintDetails'),
                    TaigaSprintDetails, headersRender, "Sprint Details", "sprint_name");
            }).catch((error) => {
                let headersRender = [{text: "Sprint Name", value: "sprint_name"}, {text: "Status", value: "status"},
                    {text: "Created Date", value: "created_date"}, {text: "Estimated Start", value: "estimated_start"},
                    {text: "Estimated Finish", value: "estimated_finish"}, {text: "Gap", value: "gap"}];
                this.tabs[this.tabKeys['sprintDetails']] = this.fillTabData(this.prepareSprintDataForRender(null),
                    TaigaSprintDetails, headersRender, "Sprint Details", null);
                console.log(error);
            }).finally(() => {
                this.donePercent += this.addToProgress();
            });

            this.resources[this.tabKeys['taskDistribution']].get({}).then(response => {
                this.tabs[this.tabKeys['taskDistribution']] = this.fillTabData(
                    this.prepareTaskDistributionDataForRender(response.body),
                    TaigaTaskDistribution, null, "Task Distribution By Members", null);
            }).catch((error) => {
                this.tabs[this.tabKeys['taskDistribution']] = this.fillTabData(this.prepareSprintDetailsDataForRender(null),
                    TaigaTaskDistribution, null, "Task Distribution By Members", null);
                console.log(error);
            }).finally(() => {
                this.donePercent += this.addToProgress();
            });

            this.resources[this.tabKeys['sprintUSTask']].get({}).then(response => {
                this.tabs[this.tabKeys['sprintUSTask']] = this.fillTabData(
                    this.prepareSprintUSTaskDataForRender(response.body),
                    TaigaSprintText, null, "Sprint, US and Tasks", null);
            }).catch((error) => {
                this.tabs[this.tabKeys['sprintUSTask']] = this.fillTabData(this.prepareSprintUSTaskDataForRender(null),
                    TaigaSprintText, null, "Sprint, US and Tasks", null);
                console.log(error);
            }).finally(() => {
                this.donePercent += this.addToProgress();
            });

            this.resources[this.tabKeys['sprintUS']].get({}).then(response => {
                let headers = ["name", "closed_user_stories", "no_of_user_stories", "open_user_stories"];
                let headersRender = [{text: "Sprint Name", value: "name"}, {
                    text: "Closed User Stories",
                    value: "closed_user_stories"
                },
                    {text: "No Of User Stories", value: "no_of_user_stories"},
                    {text: "Open User Stories", value: "open_user_stories"}];
                this.tabs[this.tabKeys['sprintUS']] = this.fillTabData(
                    this.prepareSprintDataForRender(response.body, headers, "sprint_user_story_info"),
                    TaigaSprintDetails, headersRender, "Sprint Details", "sprint_name");
            }).catch((error) => {
                let headersRender = [{text: "Sprint Name", value: "name"}, {
                    text: "Closed User Stories",
                    value: "closed_user_stories"
                },
                    {text: "No Of User Stories", value: "no_of_user_stories"},
                    {text: "Open User Stories", value: "open_user_stories"}];
                this.tabs[this.tabKeys['sprintUS']] = this.fillTabData(this.prepareSprintDataForRender(null),
                    TaigaSprintDetails, headersRender, "Sprint Details", null);
                console.log(error);
            }).finally(() => {
                this.donePercent += this.addToProgress();
            });

            this.resources[this.tabKeys['sprintStoryPoints']].get({}).then(response => {
                let headers = ["name", "closed_points", "total_points"];
                let headersRender = [{text: "Sprint Name", value: "name"}, {
                    text: "Closed Points",
                    value: "closed_points"
                },
                    {text: "Total Points", value: "total_points"}];
                this.tabs[this.tabKeys['sprintStoryPoints']] = this.fillTabData(
                    this.prepareSprintDataForRender(response.body, headers, "story"),
                    TaigaSprintDetails, headersRender, "Sprint Statistics", "sprint_name");
            }).catch((error) => {
                let headersRender = [{text: "Sprint Name", value: "name"}, {
                    text: "Closed Points",
                    value: "closed_points"
                },
                    {text: "Total Points", value: "total_points"}];
                this.tabs[this.tabKeys['sprintStoryPoints']] = this.fillTabData(this.prepareSprintDataForRender(null),
                    TaigaSprintDetails, headersRender, "Sprint Statistics", null);
                console.log(error);
            }).finally(() => {
                this.donePercent += this.addToProgress();
            });
        }
    }

</script>
