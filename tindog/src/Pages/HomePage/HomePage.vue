<template>
        <div id="Style" class="paddingTop">
            <navbar/>
            <div class="textarea">
                <p class="titlePage">Newsfeed</p>
            </div> 

            <!-- <div class="fixedIcon">
                <i class="fa fa-plus-circle fa-3x" aria-hidden="true" @click="addfeed"></i>
            </div> -->

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
           
            <div class="bcardstyle">
                <b-card class="bmediaStyle" v-for='(feed, i) in feeds' :key="i">
                    <b-media>
                        <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder" class="rounded-circle" />
                            <h5 class="mt-0">{{ feed.name }}</h5>
                        <b-img center src="https://picsum.photos/300/150/?image=41" fluid alt="Fluid image" class="imageStyle"/>
    
                        <p>{{ feed.content }}</p>
                            
                    </b-media>

                    <div class="media-button">
                            <b-button class="d-inline" variant="outline-success">Like</b-button>
                            <b-button class="d-inline" variant="outline-danger">Dislike</b-button>
                    </div>
     
                </b-card>
            </div>
                  
    
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
        
                created()
                {
                    let displayName = firebase.auth().currentUser.displayName
                    let displayEmail = firebase.auth().currentUser.email

                    this.displayEmail = displayEmail
                    this.displayName = displayName

                    // firebase.database().ref('Feeds').on('value',snap => {
                    //     let feedArray = []
                    //     snap.forEach(childSnap => {
                    //         let valName = childSnap.val().name
                    //         let valContent = childSnap.val().content
                    //         feedArray.push({ 
                    //             name: valName,
                    //             content: valContent
                    //         })
                    //     })
                    //         this.feeds = feedArray
                    // }) 

                    firebase.database().ref('Postfeed').on('value',snap => {
                        let feedArray = []
                        snap.forEach(childSnap => {
                            let valName = childSnap.val().fullname
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
                            // let contentPicture = this.file
                            let messageFeed = this.text
                            let name = this.displayName
                            let email = this.displayEmail
                            let uid = firebase.auth().currentUser.uid
                            // console.log(this.file)
        
                            // var storageRef = firebase.storage().ref('images/samlple.jpg').put(this.file)
                            //     firebase.database().ref(`Postfeed/${uid}`).set({
                            //         content: messageFeed,
                            //         fullname: name,
                            //         email: email,
                            //  })
                            
                            firebase.database().ref('Postfeed').push({ 
                                    uid: uid,
                                    content: messageFeed,
                                    fullname: name,
                                    email: email,
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

                    getFileName() {
                            let file = document.getElementById('file')
                        //To display the file name
                            this.fileName = file.files[0].name
                            console.log(file)
                    },
    
            }
            
        }
    </script>
    
    <style>
    
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
        right: 20px;
        bottom: 20px;
        z-index: 99;
    
        }
    
        .textarea
        {
            width: 75%;
            margin: 0 auto;
            margin-top: 40px;
            margin-bottom: 30px;
    
        }
    
        .bcardstyle .bmediaStyle .imageStyle
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
    
        .textareaDesign
        {
            margin-bottom: 10px;
        }

        .textarea-button
        {
            margin-top: 15px;
        }
    
    </style>
    
    
    
    
    
