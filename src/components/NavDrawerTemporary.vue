<template>
    <v-layout column>
        <v-container>
            <v-layout justify-start align-left>
                <v-btn fab color="indigo" @click.stop="drawer = !drawer">
                    <v-icon>add</v-icon>
                </v-btn>
            </v-layout>
        </v-container>
        <v-navigation-drawer v-model="drawer" :mini-variant="mini" absolute temporary>
            <v-list class="pa-1">
                <v-list-tile v-if="mini" @click.stop="mini = !mini">
                    <v-list-tile-action>
                        <v-icon>chevron_right</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
                <v-list-tile avatar tag="div">
                    <!--<v-list-tile-avatar>
                        <img src="">
                    </v-list-tile-avatar>-->
                    <v-list-tile-content>
                        <v-list-tile-title>Taiga</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-btn icon @click.stop="mini = !mini">
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
            <v-list class="pt-0" dense>
                <v-divider light></v-divider>
            </v-list>
        </v-navigation-drawer>
    </v-layout>
</template>

<script>
    export default {
        name: "NavDrawer",
        data() {
            return {
                drawer: null,
                mini: false
            }
        }
    }
</script>
