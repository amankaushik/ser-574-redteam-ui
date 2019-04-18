<template>
    <v-container>
        <v-layout>
            <v-flex xs2>
                <v-navigation-drawer permanent absolute>
                    <v-toolbar flat>
                        <v-list>
                            <v-list-tile color="success">
                                <v-list-tile-title class="title">
                                    Analyser
                                </v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-list dense class="pt-0">
                        <course-list
                                :courses="this.courses"
                                :active-course="this.activeCourse"
                                @showCourse="showCourse"
                        ></course-list>
                        <control-panel
                                @addCourse="addCourse"
                                @removeCourse="removeCourse"
                                @showNewProjectForm="showNewProject=!showNewProject"
                                @removeProject="removeProject"
                        ></control-panel>
                    </v-list>
                </v-navigation-drawer>
            </v-flex>
            <v-flex xs12 sm12 offset-sm1>
                <new-project-form
                        v-on:createProject="createProject"
                        v-if="this.showNewProject">
                </new-project-form>
                <v-layout row wrap>
                    <v-flex
                            v-for="(project, index) in this.courses[this.activeCourse].projects"
                            :key="project.name"
                            xs6
                            pa-4
                    >
                        <project-summary :project="project" :index="index+1"></project-summary>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import CourseList from "../components/CourseList";
    import ControlPanel from "../components/ControlPanel";
    import NewProjectForm from "../components/NewProjectForm";
    import ProjectSummary from "../components/ProjectSummary";

    import {COURSES} from "../constants";

    export default {
        name: "DashboardExtent",
        components: {CourseList, ProjectSummary, NewProjectForm, ControlPanel},
        data() {
            return {
                courses:[],
                activeProject:{
                    name: 'project 1', route: '/github', icon: 'dashboard'
                },
                activeCourse:0,
                showNewProject:false,
                hover: true,
                gridSize: 'xl'
            }
        },
        computed: {
            binding() {
                const binding = {};
                if (this.$vuetify.breakpoint.mdAndUp) binding.column = true;
                return binding
            }
        },
        watch: {
            courses: {
                handler() {
                    localStorage.setItem('courses', JSON.stringify(this.courses));
                    },
                deep: true,
            },
        },
        methods:{
            showCourse: function (index) {
                this.activeCourse = index;
            },
            addCourse: function (project) {
                this.courses.push({
                    name: project.name,
                    projects:[]
                });
                this.showNewCourse=false;
            },
            removeCourse: function (index) {
                this.courses.splice(index-1, 1);
                this.showRemoveCourse=false;
            },
            createProject:function(project){
                this.courses[this.activeCourse].projects.push({
                    name: project.projectName,
                    githubSlug: project.githubSlug,
                    taigaSlug: project.taigaSlug,
                    description: project.description
                });
                this.showNewProject=false;
            },
            removeProject: function (index) {
                this.courses[this.activeCourse].projects.splice(index-1, 1);
                this.showRemoveProject=false;
            }
        },
        created() {
            if (localStorage.getItem('courses')) this.courses = JSON.parse(localStorage.getItem('courses'));
            else this.courses = COURSES;
        }
    }
</script>

<style scoped>

</style>

