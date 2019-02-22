<template>
    <div>
        <v-toolbar color="grey lighten-2" tabs>
            <v-toolbar-title>{{ toolbarTitle }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tabs slot="extension" grow v-model="tabModel" color="grey lighten-3">
                <v-tabs-slider color="brown darken-4"></v-tabs-slider>
                <v-tab v-for="(_content, key) in tabTitles" :key="key">
                    {{ key }}
                </v-tab>
            </v-tabs>
        </v-toolbar>
        <v-tabs-items v-model="tabModel">
            <v-tab-item v-for="(details, key) in tabTitles" :key="key">
                <component v-bind:is="details.component" v-bind:data="details.data"
                           v-bind:headers="details.headers"></component>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
    export default {
        name: "Tab",
        props: {tabTitles: Object, toolbarTitle: String},
        data() {
            return {
                tabModel: null
            }
        },
    }
</script>
