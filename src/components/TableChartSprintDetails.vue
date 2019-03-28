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
                    class="elevation-1"
            >
                <template v-slot:items="props">
                    <td>{{ props.item["sprint_name"] }}</td>
                    <td class="text-xs-left">{{ props.item["status"] }}</td>
                    <td class="text-xs-left">{{ props.item["created_date"] }}</td>
                    <td class="text-xs-left">{{ props.item["estimated_start"] }}</td>
                    <td class="text-xs-left">{{ props.item["estimated_finish"] }}</td>
                    <td class="text-xs-left">{{ props.item["gap"] }}</td>
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
        name: "TableChartSprintDetails",
        props: ["data", "headers", "title", "leadColumn"],
        data() {
            return {
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
