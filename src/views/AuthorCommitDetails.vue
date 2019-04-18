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
                                <v-card
                                        class="mx-auto text-xs-center"
                                        color="cyan"
                                        dark
                                        max-width="600"
                                >
                                    <v-card-text>
                                        <v-sheet color="rgba(0, 0, 0, .12)">
                                            <v-sparkline
                                                    :value="Object.values(sparklineLOC[i])"
                                                    color="rgba(255, 255, 255, .7)"
                                                    height="100"
                                                    padding="24"
                                                    stroke-linecap="round"
                                                    smooth
                                            >
                                                <template v-slot:label="item">
                                                    {{ item.value }}
                                                </template>
                                            </v-sparkline>
                                        </v-sheet>
                                    </v-card-text>
                                    <v-card-text>
                                        <div class="display-1 font-weight-thin">Day-to-Day LOC by {{i}}</div>
                                    </v-card-text>
                                </v-card>
                                <v-divider class="my-2"></v-divider>
                                <v-card
                                        class="mx-auto text-xs-center"
                                        color="green"
                                        dark
                                        max-width="600"
                                >
                                    <v-card-text>
                                        <v-sheet color="rgba(0, 0, 0, .12)">
                                            <v-sparkline
                                                    :value="Object.values(sparklineCommits[i])"
                                                    color="rgba(255, 255, 255, .7)"
                                                    height="100"
                                                    padding="24"
                                                    stroke-linecap="round"
                                                    smooth
                                            >
                                                <template v-slot:label="item">
                                                    {{ item.value }}
                                                </template>
                                            </v-sparkline>
                                        </v-sheet>
                                    </v-card-text>
                                    <v-card-text>
                                        <div class="display-1 font-weight-thin">Day-to-Day Commits by {{i}}</div>
                                    </v-card-text>
                                </v-card>
                                <v-divider class="my-2"></v-divider>
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
                sparklineCommits: {},
                sparklineLOC: {}
            }
        },
        mounted() {
            let sparklineCommits = {};
            let sparklineLOC = {};
            for (let author in this.dataBundleByAuthor) {
                if (this.dataBundleByAuthor.hasOwnProperty(author)) {
                    sparklineCommits[author] = {};
                    sparklineLOC[author] = {};
                    let dates = [];
                    let commits = [];
                    let loc = [];
                    for (let node in this.dataBundleByAuthor[author]) {
                        if (this.dataBundleByAuthor[author].hasOwnProperty(node)) {
                            for (let aux in this.dataBundleByAuthor[author][node]) {
                                if (this.dataBundleByAuthor[author][node].hasOwnProperty(aux)) {
                                    let bundle = this.dataBundleByAuthor[author][node][aux];
                                    if (bundle.text === "Committed On") {
                                        dates.push(bundle.value);
                                    } else if (bundle.text === "LOC Added") {
                                        loc.push(bundle.value);
                                    }
                                    commits.push(1);
                                }
                            }
                        }
                    }
                    dates.forEach(function (node, index) {
                        if (sparklineLOC[author].hasOwnProperty(node)) {
                            sparklineLOC[author][node] += loc[index];
                        } else {
                            sparklineLOC[author][node] = loc[index];
                        }
                        if (sparklineCommits[author].hasOwnProperty(node)) {
                            sparklineCommits[author][node] += commits[index];
                        } else {
                            sparklineCommits[author][node] = commits[index];
                        }
                    })
                }
            }

            this.sparklineLOC = sparklineLOC;
            this.sparklineCommits = sparklineCommits;
        }
    }
</script>

<style scoped>
    .v-sheet--offset {
        position: relative;
    }
</style>
