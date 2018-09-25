<template>
        <div id="Style" class="paddingTop">
            <navbar/>   
            <div class="textarea">
                <p class="titlePage">Dog Accessories</p>
            </div> 

            <b-navbar toggleable="md" class="navbarStyle">             
                <b-navbar-nav class="navStyle">
                        <!-- <div class="navStyle"> -->
                            <b-nav-item><p class="text-dark" @click="sellCage">Cage</p></b-nav-item>
                            <b-nav-item><p class="text-dark" @click="sellFood">Food</p></b-nav-item>
                            <b-nav-item><p class="text-dark" @click="sellTag">Tag</p></b-nav-item> 
                            <b-nav-item><p class="text-dark" @click="sellChain">Chain</p></b-nav-item>
                            <b-nav-item><p class="text-dark" @click="sellClothes">Clothes</p></b-nav-item> 
                        <!-- </div>   -->
                </b-navbar-nav>
            </b-navbar>

            <!-- <navbar/> -->
            <sell-cage v-if="sellcageDisplay"/> 
            <sell-food v-if="sellfoodDisplay"/> 
            <sell-chain v-if="sellchainDisplay"/> 
            <sell-tag v-if="selltagDisplay"/>
            <sell-clothes v-if="sellclothesDisplay"/>

            <b-modal ref="messageSend" hide-footer title="Message Owner" no-close-on-backdrop>
                    <div class="d-block text-center">
                        <b-form-textarea id=""
                            v-model="text"
                            placeholder="Enter something"
                            :rows="3"
                            :max-rows="6"
                            class="textareaDesign">
                        </b-form-textarea>
        
                        <div class="textarea-button">
                            <b-button class="d-inline" variant="outline-success" @click="sendMessage">Send</b-button>
                            <b-button class="d-inline" variant="outline-danger" @click="cancelMessage">Cancel</b-button>
                        </div>
                    </div>
            </b-modal>
                  
    
        </div>
    </template>
    
    <script>
        import firebase from 'firebase'
        import Navbar from '../../components/NavBar.vue'
        import SellCage from '../../components/sellCage.vue'
        import SellFood from '../../components/sellFood.vue'
        import SellTag from '../../components/sellTag.vue'
        import SellChain from '../../components/sellChain.vue'
        import SellClothes from '../../components/sellClothes.vue'

        // import NavbarAccessories from '../../components/NavbarAccessories.vue'
    
        export default {
        components:{
            Navbar,
            SellCage,
            SellFood,
            SellTag,
            SellChain,
            SellClothes
        },

            data () 
            {
                return {
                    text: '',
                    file: null,
                    feeds: [],
                    sendMessage: '',
                    sellcageDisplay: true,
                    sellfoodDisplay: false,
                    sellchainDisplay: false,
                    selltagDisplay: false,
                    sellclothesDisplay: false
                    
                }
            },

            created(){
                firebase.database().ref('Feeds').on('value',snap => {
                let feedArray = []
                    snap.forEach(childSnap => {
                    let valName = childSnap.val().name
                    let valContent = childSnap.val().content
                    feedArray.push({ 
                        name: valName,
                        content: valContent
                        })
                    })
                    this.feeds = feedArray
                })
            },

            methods:
            {

            addfeed()
                {
                    this.$refs.addNewfeeds.show()
                },

            postFeed()
                {
                    let contentPicture = this.file
                    let messageFeed = this.text
                    let name = 'Cassidy'
                    console.log(this.file)

                    var storageRef = firebase.storage().ref('images/samlple.jpg').put(this.file)

                    firebase.database().ref('Feeds').push({ 
                        
                        content: messageFeed,
                        name
                    })
                    .then(post => 
                    {
                        this.text = ''
                        this.$refs.addNewfeeds.hide()
                    })
                },

            cancelPost()
                {
                    this.$refs.addNewfeeds.hide()
                },

            clickMessage()
                {
                    this.$refs.messageSend.show()
                },

            cancelMessage()
                {
                    this.$refs.messageSend.hide()
                },

            sellCage()
                {
                this.sellcageDisplay = true
                this.sellfoodDisplay = false
                this.sellchainDisplay = false
                this.selltagDisplay = false
                this.sellclothesDisplay = false
                },
            sellFood()
                {
                this.sellfoodDisplay = true
                this.sellcageDisplay = false
                this.sellchainDisplay = false
                this.selltagDisplay = false
                this.sellclothesDisplay = false
                },
            sellTag()
                {
                this.selltagDisplay = true
                this.sellfoodDisplay = false
                this.sellchainDisplay = false
                this.sellcageDisplay = false
                this.sellclothesDisplay = false
                },
            sellChain()
                {
                this.sellchainDisplay = true
                this.sellfoodDisplay = false
                this.sellcageDisplay = false
                this.selltagDisplay = false
                this.sellclothesDisplay = false
                },
            sellClothes()
                {
                this.sellclothesDisplay = true
                this.sellchainDisplay = false
                this.sellfoodDisplay = false
                this.sellcageDisplay = false
                this.selltagDisplay = false
                },           
            }
    }
    </script>
    
    <style>

        .navbarStyle
        {
            border-style:groove; 
            width: 700px;
            margin: 0 auto;
            border-radius: 5px;
            text-align: center;
            margin-bottom: 20px;
        }

        .navStyle
        {
            margin:0 auto;
        }

        .navbarStyle p
        {
            margin-bottom: 0px;
        }
        .navStyle p
        {
            margin-right: 30px;
            margin-left: 30px;
            text-decoration: none;
            color: black;
            font-size: 20px;
        }

        .navStyle .text-dark:hover
        {
            transform: translate(0px, -2px);
        }

        .navStyle .text-dark
        {
            transition: all 300ms ease-in-out;
        }

        .bcardStyle
        {
            width: 75%;
            margin: 0 auto;
            margin-bottom: 20px;
           
        }

        .clearfixMargin
        {
            display: flex;
        }

        .bcardContent1
        {
            width: 50%;

        }

        .bcardContent1 .imageStyles
        {
            padding-left:50px; 
        }


        .bcardContent2
        {
            width: 50%;
            padding-left: 50px; 
        }


        .messageStyle .messageOwner
        {
            width: 480px;
            margin: 0 auto;
        }

        .bcardContent2 p
        {
            font-weight: bold;
        }
    
    
        .textarea .titlePage
        {
            margin: 0 auto;
            margin-bottom: 20px;
            text-align: center;
            font-size: 30px;
            border-style: groove;
            width: 300px;
            border-radius: 5px;
        }
        .text-light
        {
            margin-right: 20px;
        }
    

        .fixedIcon i:hover{
            transform: translate(0px, -2px);
        }

        .fixedIcon i
        {
            transition: all 300ms ease-in-out;
        }

        .fixedIcon
        {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 99;
            margin-top: 45%;
            margin-right: 30px;
            text-align: right;
        }
    
        .textarea
        {
            width: 75%;
            margin: 0 auto;
            margin-top: 40px;
            margin-bottom: 30px;
        }
    
        .bmediaStyle
        {
            width: 75%;
            margin: 0 auto;
            margin-bottom: 20px;
            display: flex;
        }

        .bcardstyle .bmediaStyle
        {
            margin-bottom: 20px;
        }
    
        .textareaDesign
        {
            margin-bottom: 10px;
        }

        .textarea-button
        {
            margin-top: 15px;
        }
    
    </style>
    
