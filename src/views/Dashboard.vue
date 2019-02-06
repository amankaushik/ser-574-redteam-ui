<template>
    <v-container grid-list text-xs-center fluid>
        <v-layout row>
            <NavDrawerPermanent></NavDrawerPermanent>
            <v-flex >
                <v-layout justify-space-around align-center row fill-height>
                    <v-card v-for="card in cards" :key="card" elevation="15">
                        <v-img :src="card.img"></v-img>
                        <v-card-title primary-title>
                            <h3 class="headline mb-0">{{ card.name }}</h3>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn flat color="orange" :href="card.route">{{ card.button }}</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-layout>
            </v-flex>
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
                cards: [{name: 'GitHub', route: '/github', button: 'Explore', img: '/assets/github.png'}, {
                    name: 'Taiga',
                    route: '/taiga',
                    button: 'Explore',
                    img: '/assets/taiga.png'
                }]
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
