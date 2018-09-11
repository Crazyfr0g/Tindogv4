<template>
    <div id="Style">
        <b-navbar toggleable="md" type="dark" variant="dark">

            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            
                <b-navbar-brand href="#" id="LogoStyle" variant="dark">
                  <p class="text-light font">Tindog &#128021;</p>
                </b-navbar-brand>

            <b-collapse is-nav id="nav_collapse" type="dark">

                    <b-dropdown id="ddown-divider" text="Lix" class="m-2">
                            <b-dropdown-item-button>Profile</b-dropdown-item-button>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item-button>Log-out</b-dropdown-item-button>
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

        <div class="ImageStyle">  
            <b-img center src="https://picsum.photos/125/125/?image=58" class="rounded-circle" alt="center image" width="200" /> 
            <p class="profileName">Lix Cassidy Billones &#x1F58B;</p>
        </div>
              
        

    </div>
</template>

<script>
        export default {
          data () {
            return {
              text: ''
            }
          }
        }
</script>

<style>
    
    .ImageStyle .profileName
    {
        margin-top: 15px;
        text-align: center;
        font-size: 25px;

    }

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




