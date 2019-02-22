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
                tabs: {
                    'Commits': {data: USER_STORIES, component: DataTable, headers: HEADERS, title: 'Commits in Tasks'},
                    'Contribution': {data: PROCESSES, component: CircleChart, title: 'Contributions', headers: null},
                    'Burn Down Chart': {data: GRADIENT, component: SparkLine, title: 'Burn Down Chart', headers: null},
                    'Process': {data: PROCESSES, component: BarChart, title: 'User Stories', headers: null}
                }
            }
        }
    }

</script>
