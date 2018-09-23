<template>
    <div id="Style" class="paddingTop">
        <navbar/>
        <div class="textarea">
            <p class="titlePage">Dogs</p>
        </div> 

        <div class="fixedIcon">
            <i class="fa fa-plus-circle fa-3x" aria-hidden="true" @click="addfeed"></i>
        </div>

        <b-modal ref="addNewfeeds" hide-footer title="Post News" no-close-on-backdrop>
            <div class="d-block text-center">
            
                <h3>Name of dog</h3>
                <b-form-input id="" size="sm" type="text" placeholder="Enter name of dog" v-model="nameofDog"></b-form-input>
    
                <h3>Breed of dog</h3>
                <b-form-input id="" size="sm" type="text" placeholder="Enter breed of dog" v-model="breedofDog"></b-form-input>

                <h3>Age of dog</h3>
                <b-form-input id="" size="sm" type="text" placeholder="Enter age of dog" v-model="ageofDog"></b-form-input>

                <h3>Sex</h3>
                <b-form-input id="" size="sm" type="text" placeholder="" v-model="sexofDog"></b-form-input>

                <h3>Price</h3>
                <b-form-input id="" size="sm" type="text" placeholder="" v-model="priceofDog"></b-form-input>

                <b-form-textarea id=""
                    v-model="abouttheDog"
                    placeholder="Enter something"
                    :rows="3"
                    :max-rows="6"
                    class="textareaDesign">
                </b-form-textarea>

                <b-form-file v-model="image" :state="Boolean(file)" placeholder="Upload a photo.." @change="getFileName"></b-form-file>

                <div class="textarea-button">
                    <b-button class="d-inline" variant="outline-success" @click="postFeed">Post</b-button>
                    <b-button class="d-inline" variant="outline-danger" @click="cancelPost">Cancel</b-button>
                </div>
            </div>
        </b-modal>

        <b-card v-for="(feed, i) in feeds" :key="feed" class="bcardStyle"> 
            <div class="clearfixMargin">

                <div class="bcardContent1"> 
                    <b-media> 
                        <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder" />
                        <h5 class="mt-0"> {{ feed.name }}</h5>
                        <b-img center :src="feed.image" fluid alt="Fluid image" class="imageStyles"/>
                    </b-media> 

                    
                    <div class="media-button">
                        <p>Price: {{ feed.priceofdog }}</p>
                    </div>
                </div>
         
                <div class="bcardContent2">  
                    <p>Name of dog: {{ feed.Nameofdog }} </p>
                    <p>Breed of dog: {{ feed.dogbreed }}</p>
                    <p>Age of dog: {{ feed.ageofdog }}</p>
                    <p>Sex: {{ feed.sexofdog }} </p>
                    <p>Information: {{ feed.content }} </p>

                    <div class="messageStyle">
                        <b-button class="messageOwner" @click="clickMessage">Message Seller</b-button>
                    </div>    
                </div>      
    
            </div>
        </b-card>   

        <!-- This is the modal of message seller section for dogs -->
        <b-modal ref="messageSend" hide-footer title="Message Owner" no-close-on-backdrop>
                <p>Seller ID: {{  }}</p>
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
        <!-- End of modal message seller for dogs -->
              

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
              file: null,
              feeds: [],
              abouttheDog:'',
              nameofDog:'',
              breedofDog:'',
              ageofDog:'',
              sexofDog:'',
              priceofDog:'',
              text:'',
              sendMessage:'',
              text:'',
              displayName:'',
              image: null
            }
          },

          created()
          {

            this.displayName  = firebase.auth().currentUser.displayName     

            this.liveAddingPost()

            let displayName = firebase.auth().currentUser.displayName
            this.displayName = displayName

           


              firebase.database().ref('DogsforSale').on('value',snap => {
                let feedArray = []
                  snap.forEach(childSnap => {
                    let valAgeofDog = childSnap.val().AgeofDog
                    let valBreedofDog = childSnap.val().BreedofDog
                    let valInfoofDog = childSnap.val().InformationofDog
                    let valNameofDog = childSnap.val().NameofDog
                    let valNameofOwner = childSnap.val().NameofOwner 
                    let valSexofDog = childSnap.val().SexofDog
                    let valPriceofDog = childSnap.val().PriceofDog
                    let valOwnerUid = childSnap.val().Uid
                    feedArray.push({ 
                        dogage: valAgeofDog,
                        dogbreed: valBreedofDog,
                        doginfo: valInfoofDog,
                        dogname: valNameofDog,
                        ownname: valNameofOwner,
                        dogsex: valSexofDog,
                        dogprice: valPriceofDog,
                        owneruid: valOwnerUid
                     })
                  })
                    this.feeds = feedArray
                    this.ui = feedArray
              })
          },

         methods:{

            addfeed()
                {
                    this.$refs.addNewfeeds.show()
                },

            postFeed()
                {   
                                      
                    let name = this.displayName
                    let dogOwner = this.displayName
                    let dogName = this.nameofDog
                    let dogBreed = this.breedofDog
                    let dogAge = this.ageofDog
                    let dogSex = this.sexofDog
                    let dogInformation = this.abouttheDog
                    let dogPrice = this.priceofDog
                    let uid = firebase.auth().currentUser.uid
                    let imageUpload = this.image
                    let date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila'})

                    var storageRef = firebase.storage().ref('images/samlple.jpg').put(this.file)
                  
                    firebase.database().ref('DogsforSale').push({ 
                        Uid: uid,
                        NameofOwner: dogOwner,
                        NameofDog: dogName,
                        BreedofDog: dogBreed,
                        AgeofDog: dogAge,
                        SexofDog: dogSex,
                        InformationofDog: dogInformation,
                        PriceofDog: dogPrice
                        })
                    
                //     let newPostkey = firebase.database().ref(`Users/${uid}/NewsDogPost`).push({
                //                 Dogowner: dogOwner,
                //                 Nameofdog: dogName,
                //                 Breedofdog: dogBreed,
                //                 Ageofdog: dogAge,
                //                 Sexofdog: dogSex,
                //                 Doginformation:dogInformation,
                //                 Priceofdog: dogPrice,
                //                 fullname: name,
                //                 date
                //         }).then(data => {
                //             let key = data.key
                //             firebase.storage().ref(`Images/${key}`).put(imageUpload)
                //             firebase.database().ref(`DogsforSale/${key}`).set({ 
                //                 Dogowner: dogOwner,
                //                 Nameofdog: dogName,
                //                 Breedofdog: dogBreed,
                //                 Ageofdog: dogAge,
                //                 Sexofdog: dogSex,
                //                 Doginformation:dogInformation,
                //                 Priceofdog: dogPrice,
                //                 fullname: name,
                //                 date
                //             }).then(post => {
                //                 this.text = ''
                //                 this.image = ''
                //                 this.$refs.addNewfeeds.hide()
                //             })
                //         })

                //     .then(post => {
                //         this.text = ''
                //         this.$refs.addNewfeeds.hide()
                //     })
                // },



                // liveAddingPost()
                // {

                //     firebase.database().ref('DogsforSale').on('value',snap => {
                //         let feedArray = []
                //         let promiseArr = []
                //         snap.forEach(childSnap => {
                //             let valName = childSnap.val().fullname
                //             let valContent = childSnap.val().Doginformation
                //             let valDate = childSnap.val().date
                //             let valNameofOwner = childSnap.val().Dogowner
                //             let valNameofDog = childSnap.val().Nameofdog
                //             let valBreedofDog = childSnap.val().Breedofdog
                //             let valAgeofDog = childSnap.val().Ageofdog
                //             let valSexofDog = childSnap.val().Sexofdog
                //             let valPriceofDog = childSnap.val().Priceofdog

                //             let promise = firebase.storage().ref(`Images/${childSnap.key}`).getDownloadURL().then(url => {
                //                 return { 
                //                     key: childSnap.key,
                //                     name: valName,
                //                     content: valContent,
                //                     image: url,
                //                     date: valDate,
                //                     nameofowner: valNameofOwner,
                //                     nameofdog: valNameofDog,
                //                     breedofdog: valBreedofDog,
                //                     ageofdog: valAgeofDog,
                //                     sexofdog: valSexofDog,
                //                     priceofdog: valPriceofDog
                //                 }
                //             })
                //             promiseArr.push(promise)
                //         })

                //         Promise.all(promiseArr).then(values => {
                //             values.sort(function(a, b) {
                //                 var dateA = new Date(a.date);
                //                 var dateB = new Date(b.date);
                //                 return dateA - dateB;
                //             }).reverse()
                //             this.feeds = values
                //         })
                     
                //     }) 
                // },

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

    .textarea
    {
        width: 75%;
        margin: 0 auto;
        margin-top: 40px;
        margin-bottom: 30px;
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

