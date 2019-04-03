<template>
    <container>
        <v-card
                class="mx-auto"
        >
            <v-system-bar
                    color="deep-purple darken-4"
                    dark
            ></v-system-bar>
            <v-toolbar
                    color="deep-purple accent-4"
                    cards
                    dark
                    flat
            >
                <v-card-title class="title font-weight-regular">Create a project</v-card-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    class="pa-3 pt-4"
            >
                <v-text-field
                        type=""
                        v-model="projectData.projectName"
                        :counter="50"
                        :rules="rules.nameRules"
                        label="Project Name"
                        required
                ></v-text-field>

                <br>
                <v-text-field
                        v-model="projectData.taigaProjectName"
                        :counter="50"
                        :rules="rules.nameRules"
                        label="Taiga Project Name"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="projectData.taigaUsername"
                        :counter="50"
                        :rules="rules.nameRules"
                        label="Taiga Username"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="projectData.taigaPassword"
                        :counter="50"
                        label="Taiga Password"
                        required
                ></v-text-field>
                <v-btn
                        :disabled="!valid"
                        color="success"
                        @click="validate"
                >
                    Check Taiga
                </v-btn>
                <v-text-field
                        v-model="projectData.githubProjectName"
                        :counter="50"
                        :rules="rules.nameRules"
                        label="Github Project Name"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="projectData.githubUsername"
                        :counter="50"
                        :rules="rules.nameRules"
                        label="Github Username"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="projectData.githubPassword"
                        :counter="50"
                        label="Github Password"
                        color="green"
                        required
                ></v-text-field>
                <v-btn
                        :disabled="!valid"
                        color="success"
                        @click="validate"
                >
                    Check Github
                </v-btn>
                <v-textarea
                        v-model="projectData.description"
                        :counter="500"
                        label="Project Description"
                        auto-grow
                ></v-textarea>
            </v-form>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn
                        flat
                        @click="$refs.form.reset()"
                >
                    Clear
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                        :disabled="!form"
                        :loading="isLoading"
                        class="white--text"
                        color="deep-purple accent-4"
                        depressed
                >Submit</v-btn>
            </v-card-actions>
        </v-card>

    </container>
</template>

<script>
    export default {
        name: "NewProjectForm",
        data(){
            return {
                valid: true,
                projectData:{
                    projectName: "",
                    taigaProjectName:"",
                    taigaUsername:"",
                    taigaPassword:"",
                    githubProjectName:"",
                    githubUsername:"",
                    githubPassword:"",
                    description:""
                },
                rules:{
                    nameRules:[
                        v => !!v || 'Name is required',
                        v => (v && v.length <= 20) || 'Name must be less than 50 characters'
                    ],

                }
            }
        }
    }
</script>

<style scoped>

</style>
