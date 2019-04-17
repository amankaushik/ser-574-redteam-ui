<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-toolbar color="cyan" dark>
                        <v-toolbar-title>Commits By Author</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>search</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-expansion-panel>
                        <v-expansion-panel-content
                                v-for="(item,i) in dataBundleByAuthor"
                                :key="i"
                        >
                            <template v-slot:header>
                                <div>{{i}}</div>
                            </template>
                            <v-card>
                                <v-card-text>
                                    <v-list>
                                        <template v-for="(node, j) in item">
                                            <template v-for="(aux, k) in node">
                                                <v-container :key="k" fluid>
                                                    <v-layout row>
                                                        <v-flex shrink pa-1>
                                                            <span><strong>{{aux.text}}: </strong></span>
                                                        </v-flex>
                                                        <v-flex grow pa-1>
                                                            <span>{{aux.value}}: </span>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-container>
                                            </template>
                                            <v-divider
                                                    :key="j"
                                            ></v-divider>
                                        </template>
                                    </v-list>
                                </v-card-text>
                            </v-card>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "AuthorCommitDetails",
        data() {
            return {
                dataBundleByAuthor: this.$route.params.payload.dataBundleByAuthor,
            }
        },
        mounted() {
            console.log(this.dataBundleByAuthor)
        }
    }
</script>

<style scoped>

</style>
