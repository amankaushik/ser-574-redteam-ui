<template>
    <div>
            <Tab v-bind:tabTitles=tabs v-bind:toolbarTitle="title"></Tab>
    </div>
</template>

<script>
    import Tab from "@/components/Tab";
    import DataTable from "@/components/DataTable";
    //import {HEADERS} from "@/constants";
    //import {USER_STORIES} from "@/constants";
    //import {PROCESSES} from "@/constants";
    //import {GRADIENT} from "@/constants";
    import CircleChart from "@/components/CircleChart";
    //import SparkLine from "@/components/SparkLine";
    //import BarChart from "@/components/BarChart";
    import GithubContribution from "../tabs/GithubContribution";
    import GithubTimeline from "../tabs/GithubTimeline";
    import {HEADERS1} from "../constants";
    import {MEMBERS} from "../constants";
    import {COMPLEXITY} from "../constants";
    import {PIEDATA} from "../constants";
    import {TIMELINE} from "../constants";


    export default {
        name: "Github",
        components: {Tab},
        data() {
            return {
                title: "Github Statistic",
                tabs: {
                    'Commits': {data: MEMBERS, component: DataTable, headers: HEADERS1, title: 'Commits in Sprints'},
                    'Code Complexity': {data: COMPLEXITY, component: CircleChart, title: 'Contributions', headers: null},
                    //'Pull Requests': {data: GRADIENT, component: SparkLine, title: 'Burn Down Chart', headers: null}
                    //'Comments': {data: PROCESSES, component: BarChart, title: 'User Stories', headers: null}
                    'Contribution': {data: PIEDATA, component: GithubContribution},
                    'Timeline': {data: TIMELINE, component: GithubTimeline}
                }
            }
        }
    }

</script>
