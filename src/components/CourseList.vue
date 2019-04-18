<template>
    <v-list>
        <v-list-tile style="alignment: center">
            <h3 style="color:green">Course List</h3>
        </v-list-tile>
        <v-list-tile v-for="(course, index) in courses" :key="course.name">
            <v-btn dark block :color="activeCourse===index?'green darken-3':'green'"
                   @click="showCourse(index)">
                <v-icon dark pr-3>{{ 'dashboard' }}</v-icon>{{ (index+1) + '. ' +course.name }}
            </v-btn>
        </v-list-tile>
    </v-list>
</template>

<script>
    export default {
        name: "CourseList",
        props: ['courses', 'activeCourse'],
        methods: {
            showCourse: function (index) {
                this.$emit('showCourse', index);
            },
        }
    }
</script>

<style scoped>

</style>
