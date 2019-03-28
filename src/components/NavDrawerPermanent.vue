<template>
    <v-flex xs2>
        <v-navigation-drawer permanent absolute>
            <v-toolbar flat>
                <v-list>
                    <v-list-tile color="success">
                        <v-list-tile-title class="title">
                            Analyser
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list dense class="pt-0">
                <v-list-tile v-for="card in cards" :key="card.name">
                    <v-list-tile-action>
                        <v-icon>{{ card.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <SingleInputModal :title=title :custom-object=card></SingleInputModal>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </v-flex>
</template>

<script>
    import SingleInputModal from "@/components/SingleInputModal";

    export default {
        name: "NavDrawerPermanent",
        components: {SingleInputModal},
        props: {title: String, cards: Array},
        data() {
            return {
                repoName: ''
            }
        }
    }
</script>

<style scoped>

</style>
