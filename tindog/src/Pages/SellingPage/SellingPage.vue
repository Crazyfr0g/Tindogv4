<template>
        <div id="Style" class="paddingTop">
            <navbar/>
            <div class="textarea">
                <p class="titlePage">Dogs for Sale</p>
            </div> 

            <div class="fixedIcon">
                <i class="fa fa-plus-circle fa-3x" aria-hidden="true" @click="addfeed"></i>
            </div>

            <b-form-input type="text" placeholder="Search breed of dog ..." v-model="searchDog" class="search"></b-form-input>

            <b-modal ref="addNewfeeds" hide-footer title="Post News" no-close-on-backdrop>
                <div class="d-block text-center">
                
                    <h3>Name of dog</h3>
                    <b-form-input  size="sm" type="text" placeholder="Enter name of dog" v-model="nameofDog"></b-form-input>
                    
                    <h3>Type of breed</h3>
                    <b-form-select v-model="typeofBreed" :options="typeBreed" class="mb-3" text="aw"></b-form-select>

                    <h3>Breed of dog</h3>
                    <b-form-select v-model="breedofDog" :options="breedDog" class="mb-3"></b-form-select>

                    <h3>Age of dog</h3>
                    <b-form-input size="sm" type="text" placeholder="Enter age of dog" v-model="ageofDog"></b-form-input>

                    <h3>Sex</h3>
                    <b-form-select v-model="sexofDog" :options="sexDog" class="mb-3"> </b-form-select>

                    <h3>Price</h3>
                    <b-form-input  size="sm" type="text" placeholder="Price" v-model="priceofDog"></b-form-input>

                    <b-form-textarea id=""
                        v-model="abouttheDog"
                        placeholder="Enter something"
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

            <b-card v-for="(feed, i) in feedList" :key="feed.key" class="bcardStyle"> 
                <div class="clearfixMargin">

                    <div class="bcardContent1"> 
                        <b-media> 
                            <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder" />
                            <h5 class="mt-0"> {{ feed.nameofowner }}</h5>
                            <b-img center :src="feed.image" fluid alt="Fluid image" class="imageStyles"/>
                        </b-media> 

                        
                        <div class="media-button">
                            <p>Price: {{ feed.priceofdog }}</p>
                        </div>
                        
                    </div>
             
                    <div class="bcardContent2">  
                        <p>Name of dog: {{ feed.nameofdog }} </p>
                        <p>Breed of dog: {{ feed.breedofdog }}</p>
                        <p>Age of dog: {{ feed.ageofdog }}</p>
                        <p>Sex: {{ feed.sexofdog }} </p>
                        <p>Information: {{ feed.content }} </p>
                        <p>Time & Date: {{ feed.date }} </p>
                        <!-- <p>uid: {{ feed.uid }} </p> -->

                        <div class="messageStyle">
                            <b-button class="messageOwner" @click="clickMessage(feed.uid)">Message Seller</b-button>
                        </div>    
                    </div>      
        
                </div>
            </b-card>   

            <!-- This is the modal of message seller section for dogs -->
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
            <!-- End of modal message seller for dogs -->
                  
    
        </div>
    </template>
    
<script>
import firebase from 'firebase'
import Navbar from '../../components/NavBar.vue'

    export default 
    {

        components:
        {
            Navbar
        },

        data () 
        {
        return {
         
            feeds: [],
            abouttheDog:'',
            nameofDog:'',
            breedofDog:'',
            ageofDog:'',
            sexofDog:'',
            priceofDog:'',
            text:'',
            text:'',
            displayName:'',
            messageContent: '',
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

        methods:
        {
            clickMessage(uid)
            {
                this.uid = uid
                console.log(uid)
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
                    let name = this.displayName
                    let dogOwner = this.displayName
                    let dogName = this.nameofDog
                    let dogBreedtype = this.typeofBreed
                    let dogBreed = this.breedofDog
                    let dogAge = this.ageofDog
                    let dogSex = this.sexofDog
                    let dogInformation = this.abouttheDog
                    let dogPrice = this.priceofDog
                    let uid = firebase.auth().currentUser.uid
                    let imageUpload = this.image
                    let date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila'})
                    
                    firebase.database().ref(`Users/${uid}/NewsDogPost`).push({
                                Dogowner: dogOwner,
                                Nameofdog: dogName,
                                Breedofdog: dogBreed,
                                Breedtypeofdog: dogBreedtype,
                                Ageofdog: dogAge,
                                Sexofdog: dogSex,
                                Doginformation:dogInformation,
                                Priceofdog: dogPrice,
                                date,
                                uid
                        }).then(data => {
                            let key = data.key
                            var storageRef = firebase.storage().ref(`Images/Sellingfeed/${key}`)
                                storageRef.put(imageUpload).then(function(url){
                                    storageRef.getDownloadURL().then(function(url){
                                        firebase.database().ref(`DogsforSale/${key}`).set({ 
                                        image: url,
                                        Dogowner: dogOwner,
                                        Nameofdog: dogName,
                                        Breedofdog: dogBreed,
                                        Breedtypeofdog: dogBreedtype,
                                        Ageofdog: dogAge,
                                        Sexofdog: dogSex,
                                        Doginformation:dogInformation,
                                        Priceofdog: dogPrice,
                                        date,
                                        uid
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
                firebase.database().ref('DogsforSale').on('value',snap => {
                    let feedArray = []
                    let promiseArr = []
                    snap.forEach(childSnap => {
                        let valContent = childSnap.val().Doginformation
                        let valDate = childSnap.val().date
                        let valNameofOwner = childSnap.val().Dogowner
                        let valNameofDog = childSnap.val().Nameofdog
                        let valBreedofDog = childSnap.val().Breedofdog
                        let valBreedtypeofDog = childSnap.val().Breedtypeofdog
                        let valAgeofDog = childSnap.val().Ageofdog
                        let valSexofDog = childSnap.val().Sexofdog
                        let valPriceofDog = childSnap.val().Priceofdog
                        let valId = childSnap.val().uid
                        let valImage = childSnap.val().image
                        feedArray.push({
                            image: valImage,
                            content: valContent,
                            date: valDate,
                            nameofowner: valNameofOwner,
                            nameofdog: valNameofDog,
                            breedofdog: valBreedofDog,
                            breedtypeofdog: valBreedtypeofDog,
                            ageofdog: valAgeofDog,
                            sexofdog: valSexofDog,
                            priceofdog: valPriceofDog,
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

        .media-button
        {

            margin-top: 60px;
            font-weight: bold;
           
        }

        .media-button p
        {
            margin-bottom: 0px;
            color: black;
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
            height: 200px;
            width: 400px;
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
            background: linear-gradient(to right, #2b5876);
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
            right: 20px;
            bottom: 20px;
            z-index: 99;
        }

        .search
        {
            width: 75%;
            margin: 0 auto;
            margin-bottom: 10px;
        }
    </style>
    
