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
                        label="Project Name"
                        required
                ></v-text-field>

                <br>
                <v-text-field
                        v-model="projectData.taigaSlug"
                        :counter="50"
                        label="Taiga Slug"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="projectData.githubSlug"
                        :counter="50"
                        label="Github Slug"
                        required
                ></v-text-field>
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
                        :loading="isLoading"
                        class="white--text"
                        color="deep-purple accent-4"
                        depressed
                        v-on:click="$emit('createProject', projectData)"
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
                    taigaSlug:"",
                    githubSlug:"",
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
