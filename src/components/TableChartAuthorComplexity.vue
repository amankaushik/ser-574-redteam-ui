<template>
    <v-container>
        <v-card>
            <v-card-title>
                <div class="title font-weight-regular">{{title}}</div>
                <v-spacer></v-spacer>
                <v-text-field
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                        v-model="search"
                ></v-text-field>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="data"
                    :search="search"
                    item-key="itemKey"
                    class="elevation-1"
            >
                <template slot="headerCell" slot-scope="props">
                    <v-tooltip left>
                        <template v-slot:activator="{ on }">
                          <span v-on="on">
                            {{ props.header.text }}
                          </span>
                        </template>
                        <span>
                              Baseline Value: {{ getBaseline(props.header.value) }}
                            </span>
                    </v-tooltip>
                </template>
                <template v-slot:items="props">
                    <td>{{ props.item.author }}</td>
                    <td class="text-xs-center"
                        :style="getColor('booleanExpressionComplexity', props.item.booleanExpressionComplexity)">
                        {{ props.item.booleanExpressionComplexity }}
                    </td>
                    <td class="text-xs-center"
                        :style="getColor('classFanOutComplexity', props.item.classFanOutComplexity)">
                        {{ props.item.classFanOutComplexity }}
                    </td>
                    <td class="text-xs-center"
                        :style="getColor('cyclomaticComplexity', props.item.cyclomaticComplexity)">{{
                        props.item.cyclomaticComplexity }}
                    </td>
                    <td class="text-xs-center"
                        :style="getColor('javaNCSS', props.item.javaNCSS)">{{
                        props.item.javaNCSS }}
                    </td>
                    <td class="text-xs-center"
                        :style="getColor('nPathComplexity', props.item.nPathComplexity)">{{
                        props.item.nPathComplexity }}
                    </td>
                    <td class="text-xs-center"
                        :style="getColor('classDataAbstractionCoupling', props.item.classDataAbstractionCoupling)">{{
                        props.item.classDataAbstractionCoupling }}
                    </td>
                    <td class="text-xs-center"
                        :style="getColor('javaWarnings', props.item.javaWarnings)">{{
                        props.item.javaWarnings }}
                    </td>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
            </v-data-table>
        </v-card>

    </v-container>

</template>

<script>
    import {getBaseline , getColor} from "../utils";

    export default {
        name: "TableChartAuthorComplexity",
        props: ["data", "headers", "title", "itemKey", "leadColumn", "baselines"],
        data() {
            return {
                expand: false,
                search: ''
            }
        },
        methods: {
            getBaseline(key) {
                return getBaseline(key, this.baselines);
            },
            getColor(key, value) {
                return getColor(key, value, this.baselines);
            }
        }
    }
</script>

<style scoped>
    table.v-table thead {
        font-size: 24px;
    }

    table.v-table tbody tr td {
        font-size: 14px;
    }
</style>
