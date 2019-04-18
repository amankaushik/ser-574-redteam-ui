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
            <Tab v-bind:tabTitles=tabs v-bind:toolbarTitle="title" v-bind:repoURL="repoURL"></Tab>
        </template>
    </div>
</template>

<script>
    import Tab from "@/components/Tab";
    import GithubCodeQualityByFile from "@/tabs/GithubCodeQualityByFile";
    import GithubCodeQualityByAuthor from "@/tabs/GithubCodeQualityByAuthor";
    import GitHubDetails from "@/tabs/GitHubDetails";
    import GitHubCommitDetails from "@/tabs/GitHubCommitDetails";
    import GitHubCommitsToTaigaUS from "@/tabs/GitHubCommitsToTaigaUS";
    import GithubContribution from "@/tabs/GithubContribution";

    export default {
        name: "Github",
        components: {Tab},
        data() {
            return {
                isLoading: true,
                interval: {},
                donePercent: 0,
                titlePrefix: "Github Statistics",
                title: null,
                repoURL: null,
                resources: {},
                nameToTotalCommits: {},
                gitIdToName: {},
                nameToCommitDistribution: {},
                slug: this.$route.params.slug,
                /* this is used to calculate the progress bar */
                tabKeys:
                    {
                        commits: 'Commits', codeQualityByFiles:
                            'Code Quality By Files', details:
                            'Repo Details',
                        codeQualityByAuthors:
                            'Code Quality By Authors',
                        usCommits: 'US Commits',
                        commitDetails: 'Commit Details'
                    }
                ,
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
                if (data === null) {
                    return [];
                } else {
                    let collaborators = data["collaborators"];
                    let commits = data["commits"];
                    let gitIdToName = {};
                    let nameToTotalCommits = {};
                    let nameToCommitDistribution = {};
                    collaborators.forEach(function (node) {
                        gitIdToName[node.githubId] = node.name;
                    });
                    commits.forEach(function (node) {
                        nameToTotalCommits[gitIdToName[node.githubId]] = node.numberOfCommits;
                        nameToCommitDistribution[gitIdToName[node.githubId]] = node.distribution;
                    });
                    let pieChartData = [];
                    pieChartData.push(['Contributors', 'Commits']);
                    for (let name in nameToTotalCommits) {
                        if (nameToTotalCommits.hasOwnProperty(name)) {
                            pieChartData.push([name, nameToTotalCommits[name]]);
                        }
                    }
                    this.nameToTotalCommits = nameToTotalCommits;
                    this.gitIdToName = gitIdToName;
                    this.nameToCommitDistribution = nameToCommitDistribution;
                    return pieChartData;
                }
            },
            prepareFilesComplexityDataForRender: function (data) {
                let renderDataObj = {};
                renderDataObj['data'] = [];
                renderDataObj['baselines'] = {};
                if (data === null) {
                    return renderDataObj;
                } else {
                    const BASELINES = "baselines";
                    const EXTRACT_KEY = "complexities";
                    renderDataObj[BASELINES] = data[BASELINES];
                    data = data[EXTRACT_KEY];
                    const LEAD = "fileName";
                    const SKIP_KEY = "repositoryName";

                    data.forEach(function (node, nodeIndex) {
                        delete node[SKIP_KEY];
                        let renderData = {};
                        for (let key in node) {
                            if (node.hasOwnProperty(key)) {
                                renderData[key] = node[key];
                                if (key === LEAD) {
                                    renderData['leadValue'] = key;
                                }
                            }
                        }
                        renderDataObj['data'].push(renderData);
                    });
                }
                return renderDataObj;
            },
            prepareDetailsDataForRender: function (data) {
                const EXTRACT_KEY = "collaborators";
                const REPO_URL_KEY = "repoURL";
                if (data === null) {
                    return [];
                } else {
                    this.repoURL = data[REPO_URL_KEY];
                    data = data[EXTRACT_KEY];
                    return data;
                }
            },
            preparePlaceholderData: function () {
                return {hasData: false};
            },
            prepareAuthorsComplexityDataForRender: function (data) {
                let renderDataObj = {};
                renderDataObj['data'] = [];
                renderDataObj['baselines'] = {};
                if (data === null) {
                    return renderDataObj;
                } else {
                    const LEAD = "author";
                    const EXTRACT_KEY = "complexities";
                    const SKIP_KEY = "repositoryName";
                    const BASELINES = "baselines";
                    renderDataObj[BASELINES] = data[BASELINES];
                    data = data[EXTRACT_KEY];
                    data.forEach(function (node, nodeIndex) {
                        delete node[SKIP_KEY];
                        let renderData = {};
                        for (let key in node) {
                            if (node.hasOwnProperty(key)) {
                                renderData[key] = node[key];
                                if (key === LEAD) {
                                    renderData['leadValue'] = key;
                                }
                            }
                        }
                        renderDataObj['data'].push(renderData);
                    });
                }
                return renderDataObj;
            },
            fillTabData: function (data, component, headers, title, leadColumn) {
                return {data, component, headers, title, leadColumn};
            },
            addToProgress: function () {
                return 100.0 / (Object.keys(this.tabKeys).length - 2);
            },
            addCommitDataToDetails: function () {
                let aux = this.nameToTotalCommits;
                this.tabs[this.tabKeys['details']].data.forEach(function (node) {
                    node['totalCommits'] = aux[node.name];
                });
            },
            addPRDataToDetails: function () {
            }
        },
        mounted() {
            // Form Page Title
            this.title = `${this.titlePrefix} - ${this.slug}`;

            // Initialize resources
            this.resources[this.tabKeys['commits']] = this.$resource(this.getCommitsAPI());
            this.resources[this.tabKeys['codeQualityByFiles']] = this.$resource(this.getAllFilesComplexityAPI());
            this.resources[this.tabKeys['codeQualityByAuthors']] = this.$resource(this.getAllAuthorsComplexityAPI());
            this.resources[this.tabKeys['details']] = this.$resource(this.getDetailsAPI());
            // Progress Bar
            this.interval = setInterval(() => {
                if (this.donePercent >= 100.0) {
                    this.isLoading = false;
                    this.addCommitDataToDetails();
                    return (this.donePercent = 0.0)
                }
            }, 1000);

            // Get GitHub data
            this.resources[this.tabKeys['commits']].get({}).then(response => {
                this.tabs[this.tabKeys['commits']] = this.fillTabData(
                    this.prepareCommitsDataForRender(response.body), GithubContribution, ['Contribution', 'commits'], null);
            }).catch((errorCommits) => {
                this.tabs[this.tabKeys['commits']] = this.fillTabData(
                    this.prepareCommitsDataForRender(null), GithubContribution, ['Contribution', 'commits'], null);
                console.log(errorCommits);
            }).finally(() => {
                this.donePercent += this.addToProgress();
            });
            this.resources[this.tabKeys['codeQualityByFiles']].get({}).then(response => {
                const COMPLEXITY_KEY = "metric";
                let auxData = this.prepareFilesComplexityDataForRender(response.body);
                let tableData = [];
                let headers = [];
                let leadValue = '';
                auxData.data.forEach(function (node, _index) {
                    let tmp = {};
                    leadValue = node.leadValue;
                    tmp[leadValue] = node[leadValue];
                    delete node.leadValue; // pop key
                    for (let key in node[COMPLEXITY_KEY]) {
                        if (node[COMPLEXITY_KEY].hasOwnProperty(key)) {
                            tmp[key] = node[COMPLEXITY_KEY][key];
                        }
                    }
                    delete node[COMPLEXITY_KEY]; // pop key
                    tableData.push(tmp);
                });
                Object.keys(tableData[0]).forEach(function (key) {
                    headers.push({
                        text: key.charAt(0).toUpperCase() + key.slice(1),
                        value: key
                    });
                });

                this.tabs[this.tabKeys['codeQualityByFiles']] = this.fillTabData({
                        tableData: tableData, baselines: auxData['baselines']
                    }
                    , GithubCodeQualityByFile, headers, "By Files", leadValue);
            }).catch((errorCQ) => {
                this.tabs[this.tabKeys['codeQualityByFiles']] = this.fillTabData(
                    this.prepareFilesComplexityDataForRender(null), GithubCodeQualityByFile, null, null);
                console.log(errorCQ)
            }).finally(() => {
                this.donePercent += this.addToProgress();
            });
            this.resources[this.tabKeys['codeQualityByAuthors']].get({}).then(response => {
                const COMPLEXITY_KEY = "metric";
                let auxData = this.prepareAuthorsComplexityDataForRender(response.body);
                let tableData = [];
                let headers = [];
                let leadValue = '';
                auxData.data.forEach(function (node, _index) {
                    let tmp = {};
                    leadValue = node.leadValue;
                    tmp[leadValue] = node[leadValue];
                    delete node.leadValue; // pop key
                    for (let key in node[COMPLEXITY_KEY]) {
                        if (node[COMPLEXITY_KEY].hasOwnProperty(key)) {
                            tmp[key] = node[COMPLEXITY_KEY][key];
                        }
                    }
                    delete node[COMPLEXITY_KEY]; // pop key
                    tableData.push(tmp);
                });
                Object.keys(tableData[0]).forEach(function (key) {
                    headers.push({
                        text: key.charAt(0).toUpperCase() + key.slice(1),
                        value: key
                    });
                });
                this.tabs[this.tabKeys['codeQualityByAuthors']] = this.fillTabData({
                        tableData: tableData, baselines: auxData['baselines']
                    }
                    , GithubCodeQualityByAuthor, headers, "By Authors", leadValue);
            }).catch((errorCQA) => {
                this.tabs[this.tabKeys['codeQualityByAuthors']] = this.fillTabData(
                    this.prepareAuthorsComplexityDataForRender(null), GithubCodeQualityByAuthor, null, null);
                console.log(errorCQA)
            }).finally(() => {
                this.donePercent += this.addToProgress();
            });
            this.resources[this.tabKeys['details']].get({}).then(response => {
                this.tabs[this.tabKeys['details']] = this.fillTabData(
                    this.prepareDetailsDataForRender(response.body), GitHubDetails,
                    ['Member Name', 'Repository Link', 'Total Commits', 'Total PRs'], "Repository Details", null);
            }).catch((errorDetails) => {
                this.tabs[this.tabKeys['details']] = this.fillTabData(
                    this.prepareDetailsDataForRender(null), GitHubDetails,
                    [{text: 'Member Name', value: 'name'}], "Repository Details", null);
                console.log(errorDetails)
            }).finally(() => {
                this.donePercent += this.addToProgress();
            });
            /* These tabs will be filled at runtime */
            this.tabs[this.tabKeys['commitDetails']] = this.fillTabData(this.preparePlaceholderData(), GitHubCommitDetails, [], "Commit Details",
                this.slug);
            this.tabs[this.tabKeys['usCommits']] = this.fillTabData(this.preparePlaceholderData(), GitHubCommitsToTaigaUS, [], "US Commits",
                this.slug);

            /* Mix the data */
            /*this.addPRDataToDetails();*/
        },
        beforeDestroy: function () {
            clearInterval(this.interval);
        }
    }

</script>
