<template>
    <div id="Style">
      <b-navbar toggleable="md" class="fixed">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
          <b-navbar-brand href="#" id="LogoStyle" variant="dark"><p class="text-light font" >Tindog &#128021;</p></b-navbar-brand>
        <b-collapse is-nav id="nav_collapse" type="dark">
          <b-navbar-nav class="ml-auto" variant="dark">
            <b-button @click="ShowSignIn" class="spacing" variant="light">
                    Sign-In
            </b-button>

            <b-button @click="ShowSignUp" class="spacing" variant="light">
                    Sign-Up 
            </b-button>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <b-carousel id="carousel1"
        style="text-shadow: 1px 1px 2px #333;"
        controls
        indicators
        :interval="3000"
        img-width="1024"
        img-height="420"
        v-model="slide"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd">

   
        <b-carousel-slide img-src="https://picsum.photos/1024/450/?image=1062">
        </b-carousel-slide>

        <b-carousel-slide img-src="https://picsum.photos/1024/450/?image=837">
        </b-carousel-slide>

        <b-carousel-slide img-src="https://picsum.photos/1024/450/?image=659">
        </b-carousel-slide>

        <b-carousel-slide img-src="https://picsum.photos/1024/450/?image=237">
        </b-carousel-slide>

        <b-carousel-slide img-src="https://picsum.photos/1024/450/?image=169">
        </b-carousel-slide>

        </b-carousel>

        <b-card class="text-center">    
            <p class="text-dark style">
                Welcome to Tindog the Dog Selling / Dog Studding Finder App 
            </p>
        </b-card><br><br>

        <div class="intro">
            <p class="introduc">
                An application where you can post, you can sell and even can find a doggy mate for you pet. Come and Sign up now &#128221;.
            </p><br><br>
            <b-button variant="outline-success" class="button">More</b-button><br><br>
        </div>

        <div class="deckClass">
            <b-card-group deck class="mb-2">
                <b-card 
                        text-variant="white"
                        header="News feed &#9000;"
                        class="Deck1">
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </b-card>

                <b-card 
                        text-variant="white"
                        header="Selling &#128176;"
                        class="Deck2">
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </b-card>

                <b-card 
                        text-variant="white"
                        header="Dog Breeding &#128054;"
                        class="Deck3">
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </b-card>
            </b-card-group>
        </div><br><br><hr>

        <div class="aboutTindog">
            <p class="about">About Tindog</p>
            <p class="content">
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus deleniti dolorem vitae, exercitationem cumque esse? Autem doloribus corrupti fuga? Explicabo repudiandae debitis nemo nisi hic     molestias nulla, porro voluptatum vero facere id, accusantium odit quis consectetur pariatur, quo voluptatibus possimus voluptatem non recusandae dolores! Ratione ut illo tempora necessitatibus enim, id inventore maiores, modi quisquam a quidem dolores sed ea. Ea, ullam consectetur cumque earum repellendus officia, harum cupiditate consequuntur quia, deleniti quaerat accusamus itaque facere magni voluptatibus quo! Cupiditate provident illo praesentium neque, odio nobis, dignissimos est aut commodi dolores, incidunt repellendus! Natus doloremque, nobis asperiores cupiditate iusto esse!
            </p>
        </div>

        <b-modal ref="myModalRefSignin" hide-footer title="Sign-In" no-close-on-backdrop>
            <div class="d-block">
                <h3>Email</h3>
                <b-form-input size="sm" type="text" placeholder="Enter your email" v-model="signinEmail"></b-form-input>

                <h3>Password</h3>
                <b-form-input size="sm" type="password" placeholder="Enter your password" v-model="signinPassword"></b-form-input>
            </div>
            <b-btn class="mt-4" variant="outline-success" block @click="SigninUser">Sign-in</b-btn>
        </b-modal>

        
        <b-modal ref="myModalRefSignup" hide-footer title="Sign-Up" no-close-on-backdrop>
          <div class="d-block">

            <h3>Firstname</h3>
            <b-form-input id="" size="sm" type="text" placeholder="Enter your firstname" v-model="signupFirstname"></b-form-input>
  
            <h3>Lastname</h3>
            <b-form-input id="" size="sm" type="text" placeholder="Enter your lastname" v-model="signupLastname"></b-form-input>

            <h3>Email</h3>
            <b-form-input id="" size="sm" type="text" placeholder="Enter your email" v-model="signupEmail"></b-form-input>

            <h3>Password</h3>
            <b-form-input id="" size="sm" type="password" placeholder="Enter your password" v-model="signupPassword"></b-form-input>

          </div>
          <b-btn class="mt-3" variant="outline-success" block @click="signupUser">Sign-up</b-btn>
      </b-modal>

    </div>
  </template>

<script>

import firebase from 'firebase'

    export default 
    
    {
        data() {
            return {
                slide: 0,
                sliding: null,
                signupEmail: '',
                signupPassword: '',
                signinEmail: '',
                signinPassword: '',
                signupFirstname:'',
                signupLastname:'',
            }
        },
            methods:
            {
            onSlideStart (slide) {
            this.sliding = true
            },

            onSlideEnd (slide) {
            this.sliding = false
            },

            ShowSignIn () 
            {
                this.$refs.myModalRefSignin.show()
            },

            ShowSignUp ()
            {
                this.$refs.myModalRefSignup.show()
            },

            SigninUser ()
            {
                let logEmail = this.signinEmail
                let logPass = this.signinPassword
                
                firebase.auth().signInWithEmailAndPassword(logEmail, logPass)
                .then((user) => {
                    this.$router.push('/Home')
                })
                .catch(function(error) {
        
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(error)
                });

                this.signinEmail = ""
                this.signinPassword = ""
            },

            signupUser ()
            {
                let signFirstname = this.signupFirstname
                let signLastname = this.signupLastname
                let signEmail = this.signupEmail
                let signPass = this.signupPassword

                firebase.auth().createUserWithEmailAndPassword(signEmail, signPass).then((user) => {

                    firebase.auth().currentUser.updateProfile({ 
                        displayName: `${signFirstname} ${signLastname}`
                    
                    })

                    let uid = firebase.auth().currentUser.uid
                        firebase.database().ref(`Users/${uid}`).set({
                            firstname: signFirstname,
                            lastname: signLastname,
                            email: signEmail,
                            password: signPass
                    })
                
                });

                this.signupEmail = ""
                this.signupPassword = ""
                this.$refs.myModalRefSignup.hide()
            }
        }
    }

</script>



<style>

    .d-block text-center
    {
        width: 40%;
    }

    .fixed
    {
        background: linear-gradient(to right, #182848, #2b5876);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 99;
    }

    .text-light
    {
        margin: 0;
    }

    .spacing
    {
        margin: 10px;
    }

    .aboutTindog
    {
        text-align: center;
        font-size: 30px;
    }

    .aboutTindog .content
    {
        font-size: 20px;
    }

    .button
    {
        width: 100px;
    }

    .intro
    {
        margin-top: 30px;
        text-align: center;
    }

    .text-center
    {
        border-radius: 2em;
        width: 70%;
        margin: 0 auto;
        margin-top: 30px;
    }

    .style
    {    
        text-align: center;
        font-size: 50px;
        margin: 0 auto;  
    }

    #Logostyle
    {
        font-size: 30px;
        color: white;
    }

    .font
    {
        font-size: 30px;
    }

    .deckClass
    {
        margin-top:20px;
        margin-left:10px;
        margin-right:10px;
    }

    .d-block
    {
        text-align: center;
    }

    .Deck1
    {
        /* background: linear-gradient(to right, #4b6cb7); */
        background-color: #4b6cb7;
    }

   .Deck2
    {
        /* background: linear-gradient(to right, #182848); */
        background-color: #182848;
    }

    .Deck3
    {
        /* background: linear-gradient(to right, #2980B9); */
        background-color: #2980B9;
    }

    .deckClass header
    {
    font-size: 30px;
    }

</style>

