<template>
    <v-container>
        <v-layout>
            <NavDrawerPermanent :title=title :cards=cards></NavDrawerPermanent>
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
                                        <SingleInputModal :title=title :custom-object=card :has-image=true></SingleInputModal>
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
    import SingleInputModal from "@/components/SingleInputModal";

    export default {
        name: "Dashboard",
        components: {SingleInputModal, NavDrawerPermanent},
        data() {
            return {
                hover: true,
                gridSize: 'xl',
                repoName: '',
                title: 'Enter Search Slug',
                cards: [
                    {
                        name: 'GitHub',
                        slug: ' Repository Name',
                        route: 'github',
                        button: 'Explore',
                        img: '/assets/github.png',
                        dialog: false,
                        icon: "dashboard"
                    },
                    {
                        name: 'Taiga',
                        slug: ' Board Name',
                        route: 'taiga',
                        button: 'Explore',
                        img: '/assets/taiga.png',
                        dialog: false,
                        icon: "dashboard"
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
