<template>
    <div class="fixed">
        <b-navbar toggleable="md" type="dark" variant="dark">

            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            
                <b-navbar-brand href="#" id="LogoStyle" variant="dark">
                  <p class="text-light font">Tindog &#128021;</p>
                </b-navbar-brand>

            <b-collapse is-nav id="nav_collapse" type="dark">

                    <b-dropdown id="ddown-divider" text="Lix" class="m-2">
                            <b-dropdown-item-button @click="ProfilePage">Profile</b-dropdown-item-button>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item-button>Log-out</b-dropdown-item-button>
                    </b-dropdown>
                    
                    <b-navbar-nav class="ml-auto" variant="light">
                            <b-nav-item><p class="text-light">Newsfeed</p></b-nav-item>
                           <b-nav-item><p class="text-light" @click="SellingPage" to="/Selling">Selling/Buying</p></b-nav-item></router-link> 
                            <b-nav-item><p class="text-light">Breeding</p></b-nav-item> 
                    </b-navbar-nav>
                    
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        methods:
          {
            SellingPage ()
              {
                  this.$router.push('/Selling')
              },

            ProfilePage()
            {
                this.$router.push('/Profile')
            }
          }
    }

</script>

<style>
    .fixed
    {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 99;
    }
</style>