<template>
    <v-dialog v-model="customObject.dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
            <template v-if="hasImage">
                <v-img height="125px" width="300px" contain :src="customObject.img"
                       :alt="customObject.name" v-on="on">
                </v-img>
            </template>
            <template v-else>
                <v-btn flat v-on="on">{{customObject.name}}</v-btn>
            </template>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">{{ title }}</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                            <v-text-field :label="customObject.name + customObject.slug"
                                          v-model="repoName"
                                          required></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="customObject.dialog = false">Close
                </v-btn>
                <router-link :to="{name: customObject.route, params: {slug: repoName}}"
                             props>
                    <v-btn color="blue darken-1" flat @click="customObject.dialog = false">Save
                    </v-btn>
                </router-link>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "SingleInputModal",
        props: {title: String, customObject: Object, hasImage: Boolean},
        data() {
            return {
                repoName: ''
            }
        }
    }
</script>

<style scoped>

</style>
