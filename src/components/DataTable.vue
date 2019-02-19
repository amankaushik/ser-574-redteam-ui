<template>
    <v-card height="50%" py-0 px-2>
        <v-container width="90%">
            <v-layout justify-center>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0 orange&#45;&#45;text">{{ title }}</h3>
                    </div>
                </v-card-title>
            </v-layout>
            <v-data-table
                    :headers="headers"
                    :items="data"
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
</template>

<script>
    export default {
        name: "DataTable",
        props: ["data", "headers", "title"],
    }
</script>
