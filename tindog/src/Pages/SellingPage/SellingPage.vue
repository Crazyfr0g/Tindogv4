<template>
        <div id="Style" class="paddingTop">
            <navbar/>
            <div class="textarea">
                <p class="titlePage">Dogs</p>
            </div> 

            <div class="fixedIcon">
                <i class="fa fa-plus-circle fa-3x" aria-hidden="true" @click="addfeed"></i>
            </div>

            <b-modal ref="addNewfeeds" hide-footer title="Post News">
                <div class="d-block text-center">
                    <b-form-textarea id=""
                        v-model="text"
                        placeholder="Enter something"
                        :rows="3"
                        :max-rows="6"
                        class="textareaDesign">
                    </b-form-textarea>
    
                    <b-form-file v-model="file" :state="Boolean(file)" placeholder="Upload a photo.." @change="getFileName"></b-form-file>
    
                    <div class="textarea-button">
                        <b-button class="d-inline" variant="outline-success" @click="postFeed">Post</b-button>
                        <b-button class="d-inline" variant="outline-danger" @click="cancelPost">Cancel</b-button>
                    </div>
                </div>
            </b-modal>

            <b-card v-for='(feed, i) in feeds' :key="i" class="bcardStyle"> 
                <div class="clearfixMargin">

                    <div class="bcardContent1"> 
                        <b-media> 
                            <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder" />
                            <h5 class="mt-0"> {{ feed.name }}</h5>
                            <b-img center src="https://picsum.photos/300/150/?image=41" fluid alt="Fluid image" class="imageStyles"/>
                        </b-media> 

                        
                        <div class="media-button">
                            <!-- <b-button class="d-inline" variant="outline-success">Like</b-button>
                            <b-button class="d-inline" variant="outline-danger">Dislike</b-button> -->
                            <p>Price:</p>
                        </div>
                    </div>
             
                    <div class="bcardContent2">  
                        <p>Name of dog: Andie </p>
                        <p>Breed of dog: Beagle</p>
                        <p>Age of dog: 1 year 4 months</p>
                        <p>Sex: Female </p>

                        <div class="messageStyle">
                            <b-button class="messageOwner" @click="clickMessage">Message owner</b-button>
                        </div>    
                    </div>      
        
                </div>
            </b-card>   

            <b-modal ref="messageSend" hide-footer title="Message Owner">
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
    
            export default {
            components:{
                Navbar
            },
    
              data () 
              {
                return {
                  text: '',
                  file: null,
                  feeds: []
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
    
             methods:{

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
                        .then(post => {
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

                getFileName() 
                    {
                        let file = document.getElementById('file')
                    //To display the file name
                        this.fileName = file.files[0].name
                        console.log(file)
                    },
            }
            
        }
    </script>
    
    <style>

        .media-button
        {

            margin-top: 10px;
           
        }

        .media-button p
        {
            margin-bottom: 0px;
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
            margin-bottom: 50px;
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
    
        /* .bmediaStyle
        {
            width: 75%;
            margin: 0 auto;
            margin-bottom: 20px;
            display: flex;
        }

        .bcardstyle .bmediaStyle
        {
            margin-bottom: 20px;
        } */
    
        .textareaDesign
        {
            margin-bottom: 10px;
        }

        .textarea-button
        {
            margin-top: 15px;
        }
    
    </style>
    
