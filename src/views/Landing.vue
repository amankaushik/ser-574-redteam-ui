<template >
    <v-container grid-list-md text-xs-center>
        <v-layout align-center justify-center row fill-height>
            <v-layout align-center column>
                <v-dialog v-model="dialog" persistent max-width="600px" dark>
                    <v-btn round color="success" slot="activator" large>Login</v-btn>
                    <v-card class="mx-auto">
                        <v-card-title>
                            <span class="headline">Login</span>
                        </v-card-title>
                        <v-card-text>
                            <v-form>
                                <v-text-field prepend-icon="fas fa-user" v-model="username" flat
                                              :error-messages="errorMessageUsername" label="username">

                                </v-text-field>
                                <v-text-field prepend-icon="fas fa-key" v-model="password" flat type="password"
                                              :error-messages="errorMessagePassword" label="password">
                                </v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn flat color="blue darken-1" @click="validateAndLogin">Login</v-btn>
                            <v-btn flat color="blue darken-1" @click="dialog=false">Close</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-divider inset></v-divider>
                <v-flex>
                    <v-btn round outline color="blue" large href="/dashboard">Continue Without Login</v-btn>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-container>
</template>

<script>
    import {required, minLength, alphaNum} from 'vuelidate/lib/validators';
    export default {
        name: "landing",
        data() {
            return {
                dialog: false,
                username: '',
                password: '',
                errorMessageUsername: null,
                errorMessagePassword: null
            }
        },
        validations: {
            username: {
                required,
                minLength: minLength(8)
            },
            password: {
                required,
                minLength: minLength(8),
                alphaNum
            }
        },
        methods: {
            validateAndLogin: function () {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.setErrorMessages();
                    console.log("INVALID");
                } else {
                    this.resetErrorMessages();
                }
            },
            setErrorMessages: function () {
                this.errorMessageUsername = 'Username is Invalid!';
                this.errorMessagePassword = 'Password is Invalid!';
            },
            resetErrorMessages: function () {
                this.errorMessageUsername = '';
                this.errorMessagePassword = '';
            }
        }
    }
</script>
