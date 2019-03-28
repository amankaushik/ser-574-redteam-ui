<template>
    <v-container width="90%">
        <v-card height="50%" py-0 px-2>
            <v-card-title primary-title>
                <div class="title font-weight-regular">{{ title }}</div>
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
                    height="90%"
            >
                <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.name }}</td>
                    <!--<td class="text-xs-left">{{ props.item.property1 }}</td>
                    <td class="text-xs-left">{{ props.item.property2 }}</td>
                    <td class="text-xs-left">{{ props.item.property3 }}</td>-->
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
        name: "DataTable",
        props: ["data", "headers", "title", "leadColumn"],
        data() {
            return {
                search: ''
            }
        }
    }
</script>
