<template>
    <v-container grid-list-md text-xs-center>
        <v-layout align-center justify-center row fill-height>
            <v-layout align-center column>
                <v-flex>
                    <v-btn round color="success" large>Login</v-btn>
                </v-flex>
                <v-divider inset></v-divider>
                <v-flex>
                    <v-btn round outline color="blue" large href="/dashboard">Continue Without Login</v-btn>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "landing"
    }
</script>

<style scoped>

</style>
