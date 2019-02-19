<template>
    <v-flex xs2>
        <v-navigation-drawer permanent absolute>
            <v-toolbar flat>
                <v-list>
                    <v-list-tile color="success">
                        <v-list-tile-title class="title">
                            Github Analysis
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
        name: "GitHub",
	data() {
            return {
                paths: [{name: 'Code Quality', route: '/quality', icon: 'dashboard'},
                    {name: 'Commits', route: '/comments', icon: 'dashboard'},
                    {name: 'Code Complexity', route: 'complexity', icon: 'dashboard'}]
            }
        }
    }
</script>

<style scoped>

</style>
