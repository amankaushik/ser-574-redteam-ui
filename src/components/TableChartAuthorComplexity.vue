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
                <template v-slot:items="props">
                    <td>{{ props.item.author }}</td>
                    <td class="text-xs-center">{{ props.item.booleanExpressionComplexity }}</td>
                    <td class="text-xs-center">{{ props.item.classFanOutComplexity }}</td>
                    <td class="text-xs-center">{{ props.item.cyclomaticComplexity }}</td>
                    <td class="text-xs-center">{{ props.item.javaNCSS }}</td>
                    <td class="text-xs-center">{{ props.item.nPathComplexity }}</td>
                    <td class="text-xs-center">{{ props.item.classDataAbstractionCoupling }}</td>
                    <td class="text-xs-center">{{ props.item.javaWarnings }}</td>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
            </v-data-table>
        </v-card>

    </v-container>

</template>

<script>
    export default {
        name: "TableChartAuthorComplexity",
        props: ["data", "headers", "title", "itemKey", "leadColumn"],
        data() {
            return {
                expand: false,
                search: ''
            }
        },
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
