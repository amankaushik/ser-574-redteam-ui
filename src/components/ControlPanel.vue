<template>
    <v-list>
        <v-list-tile style="alignment: center">
            <h3 style="color:green">Control Panel</h3>
        </v-list-tile>
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
            <v-btn dark block color="lime" @click="showNewProjectForm">
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
</template>

<script>
    export default {
        name: "ControlPanel",
        data() {
            return {
                activeProject:{
                    name: 'project 1', route: '/github', icon: 'dashboard'
                },
                activeCourse:0,

                showNewCourse:false,
                showNewProject:false,
                showRemoveCourse:false,
                showRemoveProject:false,

                newCourseName: 'course name',
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
        methods:{
            showCourse: function (index) {
                this.activeCourse = index;
            },
            addCourse: function () {
                this.$emit('addCourse', {
                    name: this.newCourseName,
                    projects:[]
                });
                this.showNewCourse=false;
            },
            removeCourse: function () {
                console.log("remove course "+this.removeCourseIndex);
                if(!isNaN(this.removeCourseIndex)){
                    this.$emit('removeCourse', this.removeCourseIndex);
                    this.showRemoveCourse=false;
                }
            },
            showNewProjectForm:function(){
                this.$emit('showNewProjectForm');
            },
            removeProject: function () {
                console.log("remove project "+this.removeProjectIndex);
                if(!isNaN(this.removeProjectIndex)){
                    this.$emit('removeProject', this.removeProjectIndex);
                    this.showRemoveProject=false;
                }
            }
        },
    }
</script>

<style scoped>

</style>
