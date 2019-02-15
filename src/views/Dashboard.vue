<template>
    <v-container>
        <v-layout>
            <NavDrawerPermanent></NavDrawerPermanent>
            <v-layout>
                <v-flex xs12 sm6 offset-sm3>
                    <v-card>
                        <v-container v-bind="{ [`grid-list-${gridSize}`]: true }" fluid>
                            <v-layout row wrap>
                                <v-flex
                                        v-for="(card, index) in cards"
                                        :key="index"
                                        xl
                                >
                                        <v-card hover flat color="grey lighten-4">
                                            <router-link :to="card.route">
                                                <v-img height="125px" width="300px" contain :src="card.img" :alt="card.name"></v-img>
                                            </router-link>
                                        </v-card>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-container>
</template>

<script>
    import NavDrawerPermanent from "@/components/NavDrawerPermanent";

    export default {
        name: "Dashboard",
        components: {NavDrawerPermanent},
        data() {
            return {
                hover: true,
                gridSize: 'xl',
                cards: [
                    {
                        name: 'GitHub',
                        route: '/github',
                        button: 'Explore',
                        img: '/assets/github.png'
                    },
                    {
                        name: 'Taiga',
                        route: '/taiga',
                        button: 'Explore',
                        img: '/assets/taiga.png'
                    }
                ]
            }
        },
        computed: {
            binding() {
                const binding = {};
                if (this.$vuetify.breakpoint.mdAndUp) binding.column = true;
                return binding
            }
        }
    }
</script>

<style scoped>

</style>
