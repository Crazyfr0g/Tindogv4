<template>
    <div class="fixed">
        <b-navbar toggleable="md">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                <b-navbar-brand href="#" id="LogoStyle" variant="dark">
                  <p class="text-light font" @click="HomePage">Tindog'Zamboanga &#128021;</p>
                </b-navbar-brand>
                    <b-collapse is-nav id="nav_collapse" type="dark">
                    <b-dropdown id="down-divider" :text="displayName" class="m-2" variant="light">

                            <b-dropdown-item-button @click="ProfilePage">Profile</b-dropdown-item-button>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item-button @click="logout">Log-out</b-dropdown-item-button>
                    </b-dropdown>
                   
                    
                    <b-navbar-nav class="ml-auto" variant="light">
                            <b-nav-item><p class="text-light" @click="HomePage">Newsfeed</p></b-nav-item>
                            <b-nav-item><p class="text-light" @click="SellingPage">Dog Store</p></b-nav-item>
                            <b-nav-item><p class="text-light" @click="AccessoriesPage">Accessories</p></b-nav-item> 
                            <b-nav-item><p class="text-light" @click="BreedingPage">Studding</p></b-nav-item> 
                    </b-navbar-nav>      
                     
                </b-collapse>
        </b-navbar>
    </div>
</template>

<script>

    import firebase from 'firebase'

     export default {
        
        data()
        {
            return{
                displayName: '',
                feeds: []
            }    
        },

        created()
        {
            // this.retrieveProfile()
            let displayName = firebase.auth().currentUser.displayName
            this.displayName = displayName
           
        },


        methods:
          {

            HomePage()
            {
                this.$router.push('/Home')
            },

            SellingPage ()
            {
                this.$router.push('/Selling')
            },

            ProfilePage()
            {
                this.$router.push('/Sample2')
            },

            BreedingPage()
            {
                this.$router.push('/Breeding')
            },

            NotificationPage()
            {
                this.$router.push('/Notification')
            },

            AccessoriesPage()
            {
                this.$router.push('/Accessories')
            },

            logout()
            {
                firebase.auth().signOut().then(() => {
                    this.$router.push('/')
                })
               
            },

            // retrieveProfile()
            // {
            //     this.uid = firebase.auth().currentUser.uid

            //     firebase.database().ref(`Users/${this.uid}`).on('value',snap => {
            //             let feedArray = []
            //             snap.forEach(childSnap => {
            //                 let valEmail = childSnap.val().email
            //                 let valFirstname = childSnap.val().firstname
            //                 let valLastname = childSnap.val().lastname
            //                 feedArray.push({ 
            //                     email: valEmail,
            //                     firstnames: valFirstname,
            //                     lastnames: valLastname,
            //                 }) 
            //             })
            //                 this.feeds = feedArray 
            //         })

            // }
            
          }
    }

</script>

<style>
    .ml-auto p:hover{
        transform: translate(0px, -2px);
    }

    .ml-auto p
    {
        transition: all 300ms ease-in-out;
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
</style>