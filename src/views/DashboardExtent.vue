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
                        <v-list-tile v-for="(course, index) in courses" :key="course.name">
                            <v-btn dark block :color="activeCourse===index?'green darken-3':'green'"
                                   @click="showCourse(index)">
                                <v-icon dark pr-3>{{ 'dashboard' }}</v-icon>{{ (index+1) + '. ' +course.name }}
                            </v-btn>
                        </v-list-tile>
                        <hr>
                        <v-list-tile>
                            <v-btn dark block color="lime" @click="showNewCourse=!showNewCourse">
                                <v-icon dark>add</v-icon> add course
                            </v-btn>
                        </v-list-tile>
                        <v-list-tile v-if="this.showNewCourse">
                            <v-text-field
                                    v-model="newCourseName"
                            ></v-text-field>
                            <v-btn @click="addCourse()">
                                add
                            </v-btn>
                        </v-list-tile>
                        <v-list-tile>
                            <v-btn dark block color="lime" @click="showRemoveCourse=!showRemoveCourse">
                                <v-icon dark>remove</v-icon> remove course
                            </v-btn>
                        </v-list-tile>
                        <v-list-tile v-if="this.showRemoveCourse">
                            <v-text-field
                                    v-model="removeCourseIndex"
                            ></v-text-field>
                            <v-btn @click="removeCourse()">
                                remove
                            </v-btn>
                        </v-list-tile>
                        <v-list-tile>
                            <v-btn dark block color="lime" @click="showNewProject=!showNewProject">
                                <v-icon dark>add</v-icon> add project
                            </v-btn>
                        </v-list-tile>
                        <v-list-tile>
                            <v-btn dark block color="lime" @click="showRemoveProject=!showRemoveProject">
                                <v-icon dark>remove</v-icon> remove project
                            </v-btn>
                        </v-list-tile>
                        <v-list-tile v-if="this.showRemoveProject">
                            <v-text-field
                                    v-model="removeProjectIndex"
                            ></v-text-field>
                            <v-btn @click="removeProject()">
                                remove
                            </v-btn>
                        </v-list-tile>
                    </v-list>
                </v-navigation-drawer>
            </v-flex>
            <v-flex xs12 sm12 offset-sm1>
                <new-project-form
                        v-on:createProject="createProject"
                        v-if="this.showNewProject"></new-project-form>
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
    import NewProjectForm from "../components/NewProjectForm";
    import ProjectSummary from "../components/ProjectSummary";
    import {COURSES} from "../constants";

    export default {
        name: "DashboardExtent",
        components: {ProjectSummary, NewProjectForm},
        data() {
            return {
                courses:[],
                activeProject:{
                    name: 'project 1', route: '/github', icon: 'dashboard'
                },
                activeCourse:0,
                showNewCourse:false,
                showNewProject:false,
                newCourseName: 'course name',
                showRemoveCourse:false,
                showRemoveProject:false,
                removeCourseIndex: 'course index',
                removeProjectIndex: 'project index',
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
                    console.log(JSON.stringify(this.courses));
                    localStorage.setItem('courses', JSON.stringify(this.courses));
                    },
                deep: true,
            },
        },
        methods:{
            showCourse: function (index) {
                this.activeCourse = index;
            },
            addCourse: function () {
                this.courses.push({
                    name: this.newCourseName,
                    projects:[]
                });
                this.showNewCourse=false;
            },
            removeCourse: function () {
                if(!isNaN(this.removeCourseIndex)){
                    this.courses.splice(this.removeCourseIndex-1, 1);
                    this.showRemoveCourse=false;
                }
            },
            createProject:function(project){
                console.log({
                    name: project.projectName,
                    githubSlug: project.githubSlug,
                    taigaSlug: project.taigaSlug,
                    description: project.description
                });
                this.courses[this.activeCourse].projects.push({
                    name: project.projectName,
                    githubSlug: project.githubSlug,
                    taigaSlug: project.taigaSlug,
                    description: project.description
                });
                this.showNewProject=false;
            },
            removeProject: function (index) {
                console.log("remove project "+this.removeProjectIndex);
                if(!isNaN(this.removeProjectIndex)){
                    this.courses[this.activeCourse].projects.splice(index-1, 1);
                    this.showRemoveProject=false;
                }
            }
        },
        created() {
            if (localStorage.getItem('courses')) this.courses = JSON.parse(localStorage.getItem('courses'));
        }
    }
</script>

<style scoped>

</style>

