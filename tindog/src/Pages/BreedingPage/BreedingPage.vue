<template>
    <div id="Style" class="paddingTop">
        <navbar/>
        <div class="textarea">
            <p class="titlePage">Available for Studding</p>
        </div>
        
        <div class="fixedIcon">
            <i class="fa fa-plus-circle fa-3x" aria-hidden="true" @click="addfeed"></i>
        </div>

        <b-form-input type="text" placeholder="Search breed of dog ..." v-model="searchDog" class="search" style=" width: 75%; margin: 0 auto; margin-bottom: 10px;"/>

        <b-modal ref="addNewfeeds" hide-footer title="Available for breeding" no-close-on-backdrop>
            <div class="d-block text-center">

                <h3>Name of dog</h3>
                <b-form-input id="" size="sm" type="text" placeholder="Enter name of dog" v-model="nameofDog"></b-form-input>
                
                <h3>Type of breed</h3>
                <b-form-select v-model="typeofBreed" :options="typeBreed" class="mb-3" text="aw"></b-form-select>

                <h3>Breed of dog</h3>
                <b-form-select v-model="breedofDog" :options="breedDog" class="mb-3" fluid v-b-scrollspy:scroll style="position:relative; overflow-y:scroll;"></b-form-select>

                <h3>Age of dog</h3>
                <b-form-input id="" size="sm" type="text" placeholder="Enter age of dog" v-model="ageofDog"></b-form-input>

                <h3>Sex</h3>
                <b-form-select v-model="sexofDog" :options="sexDog" class="mb-3"> </b-form-select>
            
                <b-form-textarea id=""
                    v-model="abouttheDog"
                    placeholder="Dog information"
                    :rows="3"
                    :max-rows="6"
                    class="textareaDesign">
                </b-form-textarea>

                <b-form-file v-model="image" :state="Boolean(file)" placeholder="Upload a photo.."></b-form-file>

                <div class="textarea-button">
                    <b-button class="d-inline" variant="outline-success" @click="postFeed">Post</b-button>
                    <b-button class="d-inline" variant="outline-danger" @click="cancelPost">Cancel</b-button>
                </div>
            </div>
        </b-modal>

        <b-card v-for='(feed, i) in feedList' :key="i" class="bcardStyle"> 
            <div class="clearfixMargin">

                <div class="bcardContent1"> 
                    <b-media> 
                        <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder" class="rounded-circle" />
                        <h5 class="mt-0"> {{ feed.nameofowner }}</h5>
                        <b-img center :src="feed.image" fluid alt="Fluid image" class="imageStyles"/>
                    </b-media> 
                </div>
            
                <div class="bcardContent2">  
                    <p>Name of dog: {{ feed.nameofdog }}</p>
                    <p>Breed of dog: {{ feed.breedofdog }}</p>
                    <p>Breed type of dog: {{ feed.breedtypeofdog }}</p>
                    <p>Age of dog: {{ feed.ageofdog }}</p>
                    <p>Sex: {{ feed.sexofdog }} </p>
                    <p>Information: {{ feed.infoofdog }}</p>
                    <p>Time & Date: {{ feed.date }}</p>  

                    <div class="ownerStyle">
                            <b-button class="messageOwner" @click="clickMessage(feed.uid)" style="width: 480px; margin: 0 auto; background-color: #2b5876;">Message owner</b-button>
                    </div> 
            
                    
                </div>      
            </div>

        </b-card>   

        <b-modal ref="messageSend" hide-footer title="Message Owner" no-close-on-backdrop>
                <div class="d-block text-center">
                    <b-form-textarea id=""
                        v-model="messageContent"
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
                feeds: [],
                nameofDog: '',
                breedofDog: '',
                ageofDog: '',
                sexofDog: '',
                abouttheDog:'',
                messageContent:'',
                typeBreed: '',
                breedDog: '',
                sexDog: '',
                file: null,
                image: null,
                typeofBreed: '',
                breedofDog: '',
                sexofDog: '',
                searchDog: '',

                typeBreed:[
                    { value: 'Pure breed', text: 'Pure breed' },
                    { value: 'Half breed', text: 'Half breed' },
                    { value: 'Mix breed', text: 'Mix breed' },
                ],

                breedDog: [
                    { value: 'American Bulldog', text: 'American Bulldog' },
                    { value: 'Alaskan Klee Kai', text: 'Alaskan Klee Kai' },
                    { value: 'American Eskimo', text: 'American Eskimo' },
                    { value: 'Basset Hound', text: 'Basset Hound' },
                    { value: 'Beagle', text: 'Beagle' },
                    { value: 'Beard Collie', text: 'Beard Collie' },
                    { value: 'Bloodhound', text: 'Bloodhound' },
                    { value: 'Boxer', text: 'Boxer' },
                    { value: 'Brittany', text: 'Brittany' },
                    { value: 'Bulldog', text: 'Bulldog' },
                    { value: 'Bullmastiff', text: 'Bullmastiff' },
                    { value: 'Husky', text: 'Husky' },
                    { value: 'Cesky Terrier', text: 'Cesky Terrier' },
                    { value: 'Chihuahua', text: 'Chihuahua' },
                    { value: 'Chinese Created', text: 'Chinese Created' },
                    { value: 'Chow chow', text: 'Chow chow' },
                    { value: 'Collie', text: 'Collie' },
                    { value: 'Coton de Tuclear', text: 'Coton de Tuclear' },
                    { value: 'Dachshund', text: 'Dachshund' },
                    { value: 'Dalmatian', text: 'Dalmatian' },
                    { value: 'Doberman Pinscher', text: 'Doberman Pinsche' },
                    { value: 'English Cocker Spaniel', text: 'English Cocker Spaniel' },
                    { value: 'English Foxhound', text: 'English Foxhound' },
                    { value: 'Field Spaniel', text: 'Field Spaniel' },
                    { value: 'Finnish Lapphund', text: 'Finnish Lapphund' },
                    { value: 'Finnish Spitz', text: 'Finnish Spitz' },
                    { value: 'German Pinscher', text: 'German Pinscher' },
                    { value: 'German Shepered Dog', text: 'German Shepered Dog' },
                    { value: 'German Shorthaired Pointer', text: 'German Shorthaired Pointer' },
                    { value: 'Goldador', text: 'Goldador' },
                    { value: 'Golden Retriever', text: 'Golden Retriever' },
                    { value: 'Goldendoodle', text: 'Goldendoodle' },
                    { value: 'Great Dane', text: 'Great Dane' },
                    { value: 'Greater Swiss Moutain Dog', text: 'Greater Swiss Moutain Dog' },
                    { value: 'Greyhound', text: 'Greyhound' },
                    { value: 'Japanese Spitz', text: 'Japanese Spitz' },
                    { value: 'Labradoodle', text: 'Labradoodle' },
                    { value: 'Labrador Retriever', text: 'Labrador Retriever' },
                    { value: 'Maltese', text: 'Maltese' },
                    { value: 'Maltese Shih Tzu', text: 'Maltese Shih Tzu' },
                    { value: 'Mastiff', text: 'Mastiff' },
                    { value: 'Miniature Pinscher', text: 'Miniature Pinscher' },
                    { value: 'Mutt', text: 'Mutt' },
                    { value: 'Old English Sheepdog', text: 'Old English Sheepdog' },
                    { value: 'Papillon', text: 'Papillon' },
                    { value: 'Pomeranian', text: 'Pomeranian' },
                    { value: 'Pomsky', text: 'Pomsky' },
                    { value: 'Poodle', text: 'Poodle' },
                    { value: 'Pug', text: 'Pug' },
                    { value: 'Puggle', text: 'Puggle' },
                    { value: 'Saint Bernard', text: 'Saint Bernard' },
                    { value: 'Shih Tzu', text: 'Shih Tzu' },
                    { value: 'Siberian Husky', text: 'Siberian Husky' },
                    { value: 'Yorkipoo', text: 'Yorkipoo' },
                    { value: 'Yorkshire Terrier', text: 'Yorkshire Terrie' },

                ],

                sexDog: [
                    { value: 'Male', text: 'Male' },
                    { value: 'Female', text: 'Female' },
                ],
            }
        },

        created()
        {
            this.date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila'})
            this.displayName  = firebase.auth().currentUser.displayName
            this.liveAddingPost()
        },
        
        computed:
        {
            feedList:function()
            {
                return this.feeds.filter((feed) => {
                    return feed.breedofdog.match(this.searchDog);
                }).reverse()
            }
        },

        methods:{

            searchbreedofDog()
            {   

            },

            clickMessage(uid)
            {
                this.uid = uid
                this.$refs.messageSend.show()
            },

            sendMessage()
            {
                let valmessage = this.messageContent  
                this.senderuid = firebase.auth().currentUser.uid

                firebase.database().ref(`Users/${this.uid}/RecieveMessages`).push({
                    Sender: this.displayName,
                    Message: valmessage,
                    DateandTime: this.date,
                    Senderuid: this.senderuid
                }).then(post => {
                    this.$refs.messageSend.hide()
                    this.messageContent = ''
                })    

                firebase.database().ref(`Users/${this.senderuid}/Messages/SentMessages`).push({
                    Sender: this.displayName,
                    Message: valmessage,
                    DateandTime: this.date,
                    Senderuid: this.senderuid
                }).then(post => {
                    this.$refs.messageSend.hide()
                    this.messageContent = ''
                })                      
            },

            addfeed()
            {
                this.$refs.addNewfeeds.show()
            },

            postFeed()
            {
                
                let dogOwner = this.displayName
                let dogName = this.nameofDog
                let dogBreedtype = this.typeofBreed
                let dogBreed = this.breedofDog
                let dogAge = this.ageofDog
                let dogSex = this.sexofDog
                let dogInformation = this.abouttheDog
                let imageUpload = this.image
                let uid = firebase.auth().currentUser.uid
                let date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila'})
                
                firebase.database().ref(`Users/${uid}/AvaibleforBreedingPost`).push({
                        Dogowner: dogOwner,
                        Nameofdog: dogName,
                        Breedofdog: dogBreed,
                        Breedtypeofdog: dogBreedtype,
                        Ageofdog: dogAge,
                        Sexofdog: dogSex,
                        Doginformation:dogInformation,
                        uid,
                        date
                }).then(data => {
                    let key = data.key
                    var storageRef = firebase.storage().ref(`Images/Breedingpost/${key}`)
                        storageRef.put(imageUpload).then(function(url){
                            storageRef.getDownloadURL().then(function(url){
                                firebase.database().ref(`AvailableforBreeding/${key}`).set({ 
                                image: url,
                                Dogowner: dogOwner,
                                Nameofdog: dogName,
                                Breedofdog: dogBreed,
                                Breedtypeofdog: dogBreedtype,
                                Ageofdog: dogAge,
                                Sexofdog: dogSex,
                                Doginformation:dogInformation,
                                uid,
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
            
                    

            liveAddingPost()
            {

                firebase.database().ref('AvailableforBreeding').on('value',snap => {
                    let feedArray = []
                    let promiseArr = []
                    snap.forEach(childSnap => {
                        let valDogowner = childSnap.val().Dogowner
                        let valContent = childSnap.val().Doginformation 
                        let valDate = childSnap.val().date                     
                        let valNameofDog = childSnap.val().Nameofdog
                        let valBreedofDog = childSnap.val().Breedofdog
                        let valBreedtypeofDog = childSnap.val().Breedtypeofdog
                        let valAgeofDog = childSnap.val().Ageofdog
                        let valSexofDog = childSnap.val().Sexofdog
                        let valId = childSnap.val().uid
                        let valImage = childSnap.val().image
                        feedArray.push({
                            infoofdog: valContent,
                            image: valImage,
                            date: valDate,
                            nameofowner: valDogowner,
                            nameofdog: valNameofDog,
                            breedofdog: valBreedofDog,
                            breedtypeofdog: valBreedtypeofDog,
                            ageofdog: valAgeofDog,
                            sexofdog: valSexofDog,
                            uid: valId
                        })
                    
                    }) 
                    this.feeds = feedArray 
                })
            },

            cancelPost()
                {
                    this.$refs.addNewfeeds.hide()
                },

            cancelMessage()
                {
                    this.$refs.messageSend.hide()
                },
        }
        
    }
</script>
    
<style>

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
        height: 200px;
        width: 500px;
    }


    .bcardContent2
    {
        width: 50%;
        padding-left: 50px; 
    }

    /* .ownerStyle .messageOwner
    {
        width: 75%;
        background: linear-gradient(to right, #2b5876);
    } */

    .messageOwner
    {
        margin: 0 auto;
    }

    .ownerStyle
    {
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
        width: 450px;
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
        margin-top: 10px;
    }

    .textarea-button
    {
        margin-top: 15px;
    }

    .media-button
    {
        margin: 0;
        margin-top: 75px;
    }
    
    /* .search
    {
        width: 75%;
        margin: 0 auto;
        margin-bottom: 10px;
    } */

</style>
    
