<template>
    <div class="fixed">
        <b-navbar toggleable="md" type="dark" variant="info">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                <!-- <div class="fixedIcon">
                    <i class="fa fa-plus-circle fa-3x" aria-hidden="true" @click="addfeed"></i>
                </div> -->
                <b-navbar-brand href="#" id="LogoStyle" variant="dark">
                  <p class="text-light font" @click="HomePage">Tindog &#128021;</p>
                </b-navbar-brand>

            <b-collapse is-nav id="nav_collapse" type="dark">

                    <b-dropdown id="down-divider" :text="displayName" class="m-2" variant="light">

                            <b-dropdown-item-button @click="ProfilePage">Profile</b-dropdown-item-button>
                            <b-dropdown-divider></b-dropdown-divider>
                            <!-- <b-dropdown-item-button @click="NotificationPage">Notifications<b-badge>4</b-badge></b-dropdown-item-button> -->
                            <b-dropdown-item-button>Log-out</b-dropdown-item-button>
                    </b-dropdown>

                    
                    <b-navbar-nav class="ml-auto" variant="light">
                        <!-- <div class="navStyle"> -->
                            <b-nav-item><p class="text-light" @click="HomePage">Newsfeed</p></b-nav-item>
                            <b-nav-item><p class="text-light" @click="SellingPage">Dog Store</p></b-nav-item>
                            <b-nav-item><p class="text-light" @click="AccessoriesPage">Accessories</p></b-nav-item> 
                            <b-nav-item><p class="text-light" @click="BreedingPage">Breeding</p></b-nav-item> 
                        <!-- </div>   -->
                    </b-navbar-nav>
                    
            </b-collapse>
        </b-navbar>

        <!-- <notification-page/> -->
    </div>
</template>

<script>

    import firebase from 'firebase'

     export default {
        
        data()
        {
            return{
                displayName: '',
                displayEmail: ''
            }    
        },

        created()
        {
            let displayName = firebase.auth().currentUser.displayName
            if(displayName)
            {
                this.displayName = displayName
            }
           
        
        },

        // created()
        // {
        //     let displayEmail = firebase.auth().currentUser.displayEmail
        //     this.displayEmail = displayEmail
        // },

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
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 99;
    }

    /* .fixedIcon i:hover
    {
    transform: translate(0px, -2px);
    }

    .fixedIcon i
    {
    transition: all 300ms ease-in-out;
    }

    .fixedIcon
    {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 99;

    } */
</style>