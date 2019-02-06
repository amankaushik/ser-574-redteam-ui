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
                <v-list-tile v-for="path in paths" :key="path.name" :href="path.route">
                    <v-list-tile-action>
                        <v-icon>{{ path.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        {{ path.name }}
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </v-flex>
</template>

<script>
    export default {
        name: "NavDrawerPermanent",
        data() {
            return {
                paths: [{name: 'GitHub', route: '/github', icon: 'dashboard'}, {
                    name: 'Taiga',
                    route: '/taiga',
                    icon: 'dashboard'
                }]
            }
        }
    }
</script>

<style scoped>

</style>
