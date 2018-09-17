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
    
            <!-- <div class="clearfixMargin"> -->
    
                <div class="ImageStyle">  
                    <b-img center src="https://picsum.photos/125/125/?image=58" class="rounded-circle" alt="center image" width="200" /> <br>
                    <p class="profile">{{ displayName }} &#x1F58B;</p>
                    <p class="profile">{{ displayEmail }}</p>
                    <p class="profile">Location: Zamboang(Tetuan)</p>   
                </div><br>
    
                <b-card class="bcardWidth">
                    <div class="editIcon">
                        <i class="fa fa-envelope fa-3x" aria-hidden="true"></i>
                    </div>

                    <p class="messageCenter"><i>Messages</i></p>
                        <hr width="250"/>
                    <div class="editIconArea">
                        <ul class="list-unstyled">

                            <b-media tag="li"class="my-4">
                                <b-img slot="aside" blank blank-color="#abc" width="64" alt="placeholder" />
                                    <h5 class="mt-0 mb-1">List-based media object</h5>
                                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                    ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus
                                    viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
                                    lacinia congue felis in faucibus.
                            </b-media>

                            <b-media tag="li" class="my-4">
                                <b-img slot="aside" blank blank-color="#cba" width="64" alt="placeholder" />
                                    <h5 class="mt-0 mb-1">List-based media object</h5>
                                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                    ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus
                                    viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
                                    lacinia congue felis in faucibus.
                            </b-media>

                            <b-media tag="li" class="my-4">
                                <b-img slot="aside" blank blank-color="#bac" width="64" alt="placeholder" />
                                    <h5 class="mt-0 mb-1">List-based media object</h5>
                                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                    ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus
                                    viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
                                    lacinia congue felis in faucibus.
                            </b-media>
                        </ul>          
                            <b-pagination-nav align="center" :link-gen="linkGen" :number-of-pages="10" v-model="currentPage"/>
                    </div>
                </b-card>

                <b-card class="bcardWidth">
                        <div class="editIcon">
                            <i class="fa fa-cog fa-3x" aria-hidden="true"></i> 
                        </div>
    
                        <p class="messageCenter"><i>Messages</i></p>
                            <hr width="250"/>
                        <div class="editIconArea">
                            <ul class="list-unstyled">
    
                                <b-media tag="li"class="my-4">
                                    <b-img slot="aside" blank blank-color="#abc" width="64" alt="placeholder" />
                                        <h5 class="mt-0 mb-1">List-based media object</h5>
                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                        ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus
                                        viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
                                        lacinia congue felis in faucibus.
                                </b-media>
    
                                <b-media tag="li" class="my-4">
                                    <b-img slot="aside" blank blank-color="#cba" width="64" alt="placeholder" />
                                        <h5 class="mt-0 mb-1">List-based media object</h5>
                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                        ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus
                                        viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
                                        lacinia congue felis in faucibus.
                                </b-media>
    
                                <b-media tag="li" class="my-4">
                                    <b-img slot="aside" blank blank-color="#bac" width="64" alt="placeholder" />
                                        <h5 class="mt-0 mb-1">List-based media object</h5>
                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                        ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus
                                        viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
                                        lacinia congue felis in faucibus.
                                </b-media>
                            </ul>          
                                <b-pagination-nav align="center" :link-gen="linkGen" :number-of-pages="10" v-model="currentPage"/>
                        </div>
                    </b-card>

                    <b-card class="bcardWidth">
                            <div class="editIcon">
                                <i class="fa fa-usd fa-3x" aria-hidden="true"></i>
                            </div>
        
                            <p class="messageCenter"><i>Messages</i></p>
                                <hr width="250"/>
                            <div class="editIconArea">
                                <ul class="list-unstyled">
        
                                    <b-media tag="li"class="my-4">
                                        <b-img slot="aside" blank blank-color="#abc" width="64" alt="placeholder" />
                                            <h5 class="mt-0 mb-1">List-based media object</h5>
                                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                            ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus
                                            viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
                                            lacinia congue felis in faucibus.
                                    </b-media>
        
                                    <b-media tag="li" class="my-4">
                                        <b-img slot="aside" blank blank-color="#cba" width="64" alt="placeholder" />
                                            <h5 class="mt-0 mb-1">List-based media object</h5>
                                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                            ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus
                                            viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
                                            lacinia congue felis in faucibus.
                                    </b-media>
        
                                    <b-media tag="li" class="my-4">
                                        <b-img slot="aside" blank blank-color="#bac" width="64" alt="placeholder" />
                                            <h5 class="mt-0 mb-1">List-based media object</h5>
                                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                            ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus
                                            viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec
                                            lacinia congue felis in faucibus.
                                    </b-media>
                                </ul>          
                                    <b-pagination-nav align="center" :link-gen="linkGen" :number-of-pages="10" v-model="currentPage"/>
                            </div>
                        </b-card>
               
        </div>
    </template>
    
    <script>
        
        import firebase from 'firebase'
        import Navbar from '../../components/NavBar.vue'
            export default {

                created()
                {
                    let displayName = firebase.auth().currentUser.displayName
                    let displayEmail = firebase.auth().currentUser.displayEmail

                    this.displayName = displayName
                    this.displayEmail = displayEmail

                    console.log(displayEmail)
                },

              data () 
              {
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

        .editIconArea
        {
            width: 75%;
            margin: 0 auto;
        }

        .messageIcon
        {
            text-align: center;
            margin-bottom: 5%;
            width: 75%;
            margin: 0 auto;

            margin-bottom: 5%;
        }

        .messageIcon i{
            margin-bottom: 3%;
        }
        
        .postIcon
        {
            /* text-align: center; */
            margin-bottom: 5%;
        }

        .editIcon
        {
            text-align: center;
            margin-bottom: 3%;
        }

        .messageStyle ul
        {
            width: 75%;
            margin: 0 auto;
        }

        .bcardWidth
        {
            width: 75%; 
            margin: 0 auto;
            margin-bottom: 5%;
        }

        .messageCenter
        {
            text-align: center;
            font-size: 20px;
        }

        .pageStyle
        {
            margin: 0 auto;
            text-align: center;
        }
        /* .clearfixMargin
        {
            display: flex;
        }
     */
        .ImageStyle
        {
            width: 75%;
           text-align: center;
           margin: 0 auto;
           margin-bottom: 5%;;
        }
    
        /* .ImageStyle2
        {
            width: 50%;
        } */
        
        .ImageStyle .profile
        {
            margin-top: 15px;
            text-align: center;
            font-size: 25px;
    
        }
        /* .ImageStyle2 i{
            padding-left: 50px;
        } */
    
    
        .message
        {
            width: 30%;
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
    
    
        .textarea
        {
            width: 75%;
            margin: 0 auto;
            margin-top: 40px;
            margin-bottom: 30px;
    
        }
    
    
        /* .tabStyle
        {
            width: 75%;
        } */
    </style>
    
    
    
    
    