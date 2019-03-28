<template>
            <PieChart :data="data" title="Task Distribution"></PieChart>
</template>

<script>
    import PieChart from "../components/PieChart"
    export default {
        name: "TaigaSprintDetails",
        components: {PieChart},
        props: {data: Array, title:String},
    }
</script>

<style scoped>

</style>
