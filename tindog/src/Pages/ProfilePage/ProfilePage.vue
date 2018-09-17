<template>
    <div id="Style">
        <navbar/>
        <b-navbar toggleable="md" type="dark" variant="dark">

            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            
                <b-navbar-brand href="#" id="LogoStyle" variant="dark">
                  <p class="text-light font">Tindog &#128021;</p>
                </b-navbar-brand>

            <b-collapse is-nav id="nav_collapse" type="dark">

                    <!-- <b-dropdown id="ddown-divider" text="Lix" class="m-2">
                            <b-dropdown-item-button>Profile</b-dropdown-item-button>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item-button variant="primary">Notifications<b-badge>4</b-badge></b-dropdown-item-button>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item-button>Log-out</b-dropdown-item-button> -->
                           
        
                            <!-- <div class="text-center">
                                <b-button variant="primary">
                                  Notifications <b-badge variant="light">4</b-badge>
                                </b-button>
                            </div> -->
                    </b-dropdown>
                    
                    <b-navbar-nav class="ml-auto" variant="light">
                            <b-nav-item><p class="text-light">Newsfeed</p></b-nav-item>
                            <b-nav-item><p class="text-light">Selling/Buying</p></b-nav-item>
                            <b-nav-item><p class="text-light">Breeding</p></b-nav-item> 
                    </b-navbar-nav>
                    
            </b-collapse>
        </b-navbar>

        <div class="textarea">
            <p class="titlePage">Profile</p>
        </div>

        <div class="clearfixMargin">

            <div class="ImageStyle">  
                <b-img center src="https://picsum.photos/125/125/?image=58" class="rounded-circle" alt="center image" width="200" /> <br>
                <p class="profile">Lix Cassidy Billones &#x1F58B;</p>
                <p class="profile">Email: lixsalvador18@gmail.com</p>
                <p class="profile">Location: Zamboang(Tetuan)</p>   
            </div>
            <!-- <p class="profile">Lix Cassidy Billones &#x1F58B;</p> -->

     
            <div class="ImageStyle2">  
                <!-- <b-img center src="https://picsum.photos/125/125/?image=58" class="rounded-circle" alt="center image" width="200" /> <br> -->
                    <i class="fa fa-envelope fa-3x" aria-hidden="true"></i>
                    <i class="fa fa-usd fa-3x" aria-hidden="true"></i>
                    <i class="fa fa-cog fa-3x" aria-hidden="true"></i>   
            </div>     
        </div>
       

        

        

    </div>
</template>

<script>

    import Navbar from '../../components/NavBar.vue'
        export default {
          data () {
            return {
              text: ''
            }
          },

          components:{
        
            Navbar
         }
        }
</script>

<style>

    .clearfixMargin
    {
        display: flex;
    }

    .ImageStyle
    {
        width: 50%;
        padding-left:50px; 
    }

    .ImageStyle2
    {
        width: 50%;
    }
    
    .ImageStyle .profile
    {
        margin-top: 15px;
        text-align: center;
        font-size: 25px;

    }
    .ImageStyle2 i{
        padding-left: 50px;
    }

    /* .ImageStyle2 .profile
    {
        margin-top: 15px;
        text-align: center;
        font-size: 25px;

    } */

    .message
    {
        width: 30%;
    }


     /* .ImageStyle2 .profile
    {
        margin-top: 15px;
        text-align: center;
        font-size: 25px;
    }
    .ImageStyle2
    {
        width: 50%;
    } */

    .textarea .titlePage
    {
        margin: 0 auto;
        margin-bottom: 50px;
        text-align: center;
        font-size: 30px;
        border-style: groove;
        width: 200px;
        border-radius: 5px;
    }
    .text-light
    {
        margin-right: 20px;
    }

    /* .style
    {
        margin-top: 30px;
    } */

    .textarea
    {
        width: 75%;
        margin: 0 auto;
        margin-top: 40px;
        margin-bottom: 30px;

    }

    /* .bcardstyle .bmediaStyle .imageStyle
    {
        margin: 0 auto;
        height: 200px;
        margin-bottom: 20px;

    }

    .bcardstyle
    {
        width: 75%;
        margin: 0 auto;
    }

    .bcardstyle .bmediaStyle
    {
        margin-bottom: 20px;
    }

    .textarea .textarea-button
    {
        margin-top: 10px;
    }

    .textareaDesign
    {
        margin-bottom: 3px;
    }
 */

 .tabStyle
 {
     width: 75%;
 }
</style>




