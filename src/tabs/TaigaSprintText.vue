<template>
    <v-container>
        <v-layout justify-center column>
            <v-card>
                <v-toolbar flat>
                    <v-toolbar-title>{{title}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                        <v-icon>search</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-expansion-panel popout focusable>
                    <v-expansion-panel-content
                            v-for="(_data, i) in data"
                            :key="i"
                            hide-actions
                    >
                        <template v-slot:header>
                            <div v-html="_data.name"></div>
                        </template>
                        <v-card>
                            <v-card color="blue-grey lighten-5" class="black--text" v-for="(us, j) in _data['user_stories']" :key="j">
                                <v-card-title primary-title>
                                    <div>
                                        <div class="headline">
                                            US Description:
                                            {{us.Description}}
                                        </div>
                                    </div>
                                </v-card-title>
                                <v-card-text>
                                    <div>
                                        <span>Create Date: {{formatDate(us.Create_Date)}}</span><br/>
                                        <span>Complete Date: {{formatDate(us.Complete_Date)}}</span>
                                    </div>
                                    <br/>
                                    <v-divider :key="j" inset></v-divider>
                                    <br/>
                                    <v-layout row wrap>
                                        <v-flex xs4 v-for="(task, k) in us.Tasks" :key="k">
                                            <v-card :color="colorPallet[k%10]" class="white--text" elevation="8"
                                                    hover="true">
                                                <v-card-title primary-title>
                                                    <div>
                                                        <div class="headline">
                                                            Task Description:
                                                            {{task.Description}}
                                                        </div>
                                                        <span>CreateDate: {{formatDate(task.Create_Date)}}</span><br/>
                                                        <span>Complete Date: {{formatDate(task.Complete_Date)}}</span>
                                                    </div>
                                                </v-card-title>
                                            </v-card>
                                        </v-flex>
                                    </v-layout>
                                    <br/>
                                    <v-divider :key="k" inset></v-divider>
                                    <br/>
                                </v-card-text>
                            </v-card>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "TaigaSprintText",
        props: {data: Array, headers: Array, title: String, leadColumn: String},
        data() {
            return {
                isLoading: false,
                colorPallet: ["red lighten-2", "pink darken-2", "purple darken-2", "blue darken-3",
                "indigo darken-1", "deep-purple darken-1", "cyan darken-3", "teal darken-3", "brown darken-1",
                "blue-grey darken-2"]
            }
        },
        methods: {
            formatDate: function (date) {
                if (date == null)
                    return "N/A";
                date = date.split('-');
                // JS date months start from 0
                let formattedDate = new Date(date[0], parseInt(date[1]) - 1, date[2]);
                return formattedDate.toDateString();
            }
        },
    }
</script>

<style scoped>

</style>
