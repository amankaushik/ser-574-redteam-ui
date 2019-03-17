<template>
    <v-container :width="700">
        <v-card>
            <v-card-title>
                Nutrition
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
                <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-left">{{ props.item.codeQuality }}</td>
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
        name: "TableChart",
        props: ["data", "headers", "title"],
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
