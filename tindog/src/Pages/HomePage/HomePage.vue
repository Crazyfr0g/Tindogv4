<template>
        <div id="Style" class="paddingTop">
            <navbar/>
            <div class="textarea">
                <p class="titlePage">Newsfeed</p>
            </div> 

            <div class="fixedIcon">
                <i class="fa fa-plus-circle fa-3x" aria-hidden="true" @click="addfeed"></i>
            </div>

            <b-modal ref="addNewfeeds" hide-footer title="Post News" no-close-on-backdrop>
                <div class="d-block text-center">
                    <b-form-textarea id=""
                        v-model="text"
                        placeholder="Enter something"
                        :rows="3"
                        :max-rows="6"
                        class="textareaDesign">
                    </b-form-textarea>
    
                    <b-form-file v-model="image" :state="Boolean(file)" placeholder="Upload a photo.. " accept=".jpg, .png, .gif" ></b-form-file>
    
                    <div class="textarea-button">
                        <b-button class="d-inline" variant="outline-success" @click="postFeed">Post</b-button>
                        <b-button class="d-inline" variant="outline-danger" @click="cancelPost">Cancel</b-button>
                    </div>
                </div>
            </b-modal>
           
            <div class="bcardstyle">
                <b-card class="bmediaStyle" v-for="(feed, i) in feedList" :key="feed.key">
                    <b-media>
                        <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder" class="rounded-circle" />
                            <h5 class="mt-0">{{ feed.name }}</h5>
                        <b-img center :src="feed.image" fluid alt="Fluid image" class="imageStyle"/>   
                            <pre class="preDesign"><i class="fa fa-quote-left" aria-hidden="true"></i> {{ feed.content }} <i class="fa fa-quote-right" aria-hidden="true"></i></pre>
                    </b-media>
                         
                    <div class="clearFixMargin">
                        <div class="media-button">
                            <b-button class="d-inline" variant="outline-success" >Like</b-button>
                            <b-button class="d-inline" variant="outline-danger" >Dislike</b-button>
                        </div>

                        <div class="media-button2">
                            <p class="Time">Date & Time:  {{ feed.date }}</p>
                        </div>
                    </div>
                </b-card>

            </div>
        </div>
</template>
    
<script>
    import firebase from 'firebase'
    import Navbar from '../../components/NavBar.vue'

    export default {

    components:
    {
        Navbar
    },
    
        data () 
        {
            return {
                text: '',
                feeds: [],
                image: null,
                file: ''
            }
        },

        created()
        {
            this.liveAddingPost()   
        },
        

        computed:
        {
            feedList()
            {
                console.log(this.feeds)
                return this.feeds.reverse()       
            }
        },

        methods:{

            addfeed()
            {
                this.$refs.addNewfeeds.show()
            },

            postFeed()
            {
                let messageFeed = this.text
                let name = this.displayName
                let email = this.displayEmail
                let uid = firebase.auth().currentUser.uid
                let imageUpload = this.image
                let date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila'})
                
               firebase.database().ref(`Users/${uid}/NewsfeedPost`).push({
                        content: messageFeed,
                        fullname: name,
                        date
                }).then(data => {
                    let key = data.key
                    var storageRef = firebase.storage().ref(`Images/Postfeed/${key}`)
                        storageRef.put(imageUpload).then(function(url){
                            storageRef.getDownloadURL().then(function(url){
                            firebase.database().ref(`Postfeed/${key}`).set({ 
                            image: url,
                            content: messageFeed,
                            fullname: name,
                            email: email,
                            date
                            })
                        })    
                    }).then(post => {
                            this.text = ''
                            this.image = ''
                            this.$refs.addNewfeeds.hide()         
                    })
                })        
                
            },

            cancelPost()
            {
                this.$refs.addNewfeeds.hide()
            },

            liveAddingPost()
            {
                let displayName = firebase.auth().currentUser.displayName
                let displayEmail = firebase.auth().currentUser.email

                this.displayEmail = displayEmail
                this.displayName = displayName

                firebase.database().ref('Postfeed').on('value',snap => {
                    let feedArray = []
                    let promiseArr = []
                    snap.forEach(childSnap => {
                        let valName = childSnap.val().fullname
                        let valContent = childSnap.val().content
                        let valDate = childSnap.val().date
                        let valImage = childSnap.val().image
                            feedArray.push({
                                name: valName,
                                content: valContent,
                                image: valImage,
                                date: valDate
                            })
                        })
                        this.feeds = feedArray
                    })
            }   
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
        width: 350px;
        margin-top: 40px;

    }

    .bcardstyle
    {
        width: 60%;
        margin: 0 auto;
    }

    .bcardstyle .bmediaStyle
    {
        margin-bottom: 20px;
    
    }

    .bmediaStyle
    {
        border-radius: 5px;
    }

    .textareaDesign
    {
        margin-bottom: 10px;
    }

    .textarea-button
    {
        margin-top: 15px;
    }

    .clearFixMargin
    {
        display: flex;
     
    }
    
    .media-button{
        width: 50%;
        margin-top: 10%;
    }

    .media-button2
    {
        width: 50%;
        text-align: right;
        margin-top: 90px;
    
    }

    .Time
    {
        margin-right: 20px;
    }

    .preDesign
    {
        font-size: 20px;
    }

</style>
    
    
    
    
    
