<template>
    <div>
        <v-layout row>
            <NavDrawerTemporary></NavDrawerTemporary>
            <v-flex xs6>
                <v-card height="50%" py-0 px-2>
                    <v-container width="90%" >
                        <v-layout justify-center>
                            <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0 orange--text">Commits in Tasks</h3>
                                </div>
                            </v-card-title>
                        </v-layout>
                        <v-data-table
                                :headers="headers"
                                :items="desserts"
                                class="elevation-1"
                                height="90%"
                        >
                            <template slot="items" slot-scope="props">
                                <td class="text-xs-center">{{ props.item.name }}</td>
                                <td class="text-xs-left">{{ props.item.property1 }}</td>
                                <td class="text-xs-left">{{ props.item.property2 }}</td>
                                <td class="text-xs-left">{{ props.item.property3 }}</td>
                            </template>
                        </v-data-table>
                    </v-container>
                </v-card>
                <v-card height="50%">
                    <v-container width="90%">
                        <v-layout justify-center>
                            <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0 orange--text">Contribution</h3>
                                </div>
                            </v-card-title>
                        </v-layout>
                        <v-layout align-center justify-space-around row fill-height>
                            <v-progress-circular
                                    v-for="proc in processes" :key="proc"
                                    :rotate="360"
                                    :size="150"
                                    :width="15"
                                    :value="proc"
                                    color="lime"
                            >
                                {{ proc }} commits
                            </v-progress-circular>
                        </v-layout>
                        <v-layout align-center justify-space-around row fill-height>
                            <p v-for="(proc, index) in processes" :key="proc">member {{index+1}}</p>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
            <v-flex xs6>
                <v-card height="50%">
                    <v-container width="90%">
                        <v-layout justify-center>
                            <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0 orange--text">Processes</h3>
                                </div>
                            </v-card-title>
                        </v-layout>
                        <v-progress-linear
                                v-for="(proc, index) in processes" :key="proc"
                                color="green"
                                height="25"
                                :value="proc"
                        >user story {{index+1}} :   {{ proc }}%</v-progress-linear>
                    </v-container>
                </v-card>
                <v-card height="50%">
                    <v-container width="90%">
                        <v-layout justify-center>
                            <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0 orange--text">burn down chart</h3>
                                </div>
                            </v-card-title>
                        </v-layout>
                        <v-container fluid>
                            <v-sparkline
                                    :value="[20, 18, 15, 12, 12, 10, 7, 4, 1, 1, 0, 0]"
                                    :gradient="gradients[5]"
                                    :smooth="1 || false"
                                    :padding="8"
                                    :line-width="2"
                                    :stroke-linecap="'round'"
                                    :gradient-direction="'top'"
                                    auto-draw
                            ></v-sparkline>
                            <v-divider></v-divider>
                        </v-container>
                        <v-layout align-center justify-space-around row fill-height>
                            <p v-for="(proc, index) in [20, 18, 15, 12, 12, 10, 7, 4, 1, 1, 0, 0]"
                               :key="proc">day {{index+1}}</p>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
            <v-layout row wrap>
            </v-layout>
        </v-layout>
    </div>
</template>

<script>
    import NavDrawerTemporary from "@/components/NavDrawerTemporary";
    export default {
        name: "Taiga",
        components: {NavDrawerTemporary},
        data() {
            return {
                title: "Taiga statistic",
                tags:[
                    "scrum",
                    "meeting",
                    "user story",
                    "task",
                    "commits",
                    "contribution"
                ],
                headers: [
                    {
                        text: 'User story',
                        align: 'center',
                        sortable: false,
                        value: 'name'
                    },
                    { text: 'task 1', value: 'property1' },
                    { text: 'task 2', value: 'property2' },
                    { text: 'task 3', value: 'property3' }
                ],
                desserts: [
                    {
                        name: 'user story 1',
                        property1: 15,
                        property2: 6,
                        property3: 24
                    },
                    {
                        name: 'user story 2',
                        property1: 23,
                        property2: 9,
                        property3: 37
                    },
                    {
                        name: 'user story 3',
                        property1: 26,
                        property2: 16,
                        property3: 23
                    }
                ],
                processes:[
                    30,
                    45,
                    60,
                    75,
                    90
                ],
                gradients : [
                    ['#222'],
                    ['#42b3f4'],
                    ['red', 'orange', 'yellow'],
                    ['purple', 'violet'],
                    ['#00c6ff', '#F0F', '#FF0'],
                    ['#f72047', '#ffd200', '#1feaea']
                ]
            }
        }
    }

</script>

<style scoped>
    .v-progress-circular{
        margin: 1rem
    }


</style>
