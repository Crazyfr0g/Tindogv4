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
                <b-card class="bmediaStyle" v-for="(feed, i) in feeds" :key="feed.key">
                    <b-media>
                        <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder" class="rounded-circle" />
                            <h5 class="mt-0">{{ feed.name }}</h5>
                        <b-img center :src="feed.image" fluid alt="Fluid image" class="imageStyle"/>   
                            <pre class="preDesign"> {{ feed.content }} </pre>
                    </b-media>
                         
                    <div class="clearFixMargin">
                        <div class="media-button">
                                <b-button class="d-inline" variant="outline-success">Like</b-button>
                                <b-button class="d-inline" variant="outline-danger">Dislike</b-button>
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
            // setTimeout(liveAddingPost,1000)
           
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
                
                let newPostkey = firebase.database().ref(`Users/${uid}/NewsfeedPost`).push({
                        content: messageFeed,
                        fullname: name,
                        date
                }).then(data => {
                    let key = data.key
                    firebase.storage().ref(`Images/Postfeed/${key}`).put(imageUpload)
                    firebase.database().ref(`Postfeed/${key}`).set({ 
                        content: messageFeed,
                        fullname: name,
                        email: email,
                        date
                    }).then(post => {
                        this.text = ''
                        this.image = null
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
                        let promise = firebase.storage().ref(`Images/Postfeed/${childSnap.key}`).getDownloadURL().then(url => {
                            return { 
                                key: childSnap.key,
                                name: valName,
                                content: valContent,
                                image: url,
                                date: valDate
                            }
                        })
                        promiseArr.push(promise)
                    })

                    Promise.all(promiseArr).then(values => {
                        values.sort(function(a, b) {
                            var dateA = new Date(a.date);
                            var dateB = new Date(b.date);
                            return dateA - dateB;                
                        }).reverse()
                        this.feeds = values
                    })  
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

    .titlePage
    {
        /* background: linear-gradient(to right, #ffffff, #ece9e6, #ffffff); */
        /* background-color: # */
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
        /* background: linear-gradient(to right, #ffffff, #ece9e6, #ffffff); */
        /* border-color: #b6fbff; */
        /* background-color: #fff; */
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
        margin-top: 0;
    }

    .media-button2
    {
        width: 50%;
        text-align: right;
        margin-top: 60px;
    
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
    
    
    
    
    
