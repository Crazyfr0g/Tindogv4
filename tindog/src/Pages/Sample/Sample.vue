<template>
        <div id="Style" class="paddingTop">
            <navbar/>
            <div class="textarea">
                <p class="titlePage">Breeding</p>
            </div> 

            <div class="fixedIcon">
                <i class="fa fa-plus-circle fa-3x" aria-hidden="true" @click="addfeed"></i>
            </div>

            <b-modal ref="addNewfeeds" hide-footer title="Available for breeding">
                <div class="d-block text-center">

                    <h3>Name of dog</h3>
                    <b-form-input id="" size="sm" type="text" placeholder="Enter name of dog" v-model="nameofDog"></b-form-input>
        
                    <h3>Breed of dog</h3>
                    <b-form-input id="" size="sm" type="text" placeholder="Enter breed of dog" v-model="breedofDog"></b-form-input>

                    <h3>Age of dog</h3>
                    <b-form-input id="" size="sm" type="text" placeholder="Enter age of dog" v-model="ageofDog"></b-form-input>

                    <h3>Sex</h3>
                    <b-form-input id="" size="sm" type="text" placeholder="" v-model="sexofDog"></b-form-input>
                    <!-- <b-dropdown id="down-divider" text="Sex" class="m-2" variant="light" v-model="dropdownValue">
                            <b-dropdown-item-button @click="ProfilePage">Male</b-dropdown-item-button>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item-button>Female</b-dropdown-item-button>
                    </b-dropdown>
                    <b-form-input id="" size="sm" type="text" placeholder="Enter age of dog">
                         {{ dropdownValue }}
                            <option v-for="option in eventTypeOptions" :value="option.text">
                                {{option.text}}
                            </option>
                    </b-form-input> -->
                   
                    <b-form-textarea id=""
                        v-model="abouttheDog"
                        placeholder="Dog information"
                        :rows="3"
                        :max-rows="6"
                        class="textareaDesign">
                    </b-form-textarea>

                    <!-- <b-form-file v-model="file" :state="Boolean(file)" placeholder="Upload a photo.." @change="getFileName"></b-form-file> -->
    
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
                            <h5 class="mt-0"> {{ feed.ownname }}</h5>
                            <b-img center src="https://picsum.photos/300/150/?image=41" fluid alt="Fluid image" class="imageStyles"/>
                        </b-media> 

                        
                        <div class="media-button">
                            <b-button class="d-inline" variant="outline-success">Like</b-button>
                            <b-button class="d-inline" variant="outline-danger">Dislike</b-button>
                        </div>
                    </div>
             
                    <div class="bcardContent2">  
                        <p>Name of dog: {{ feed.dogname }}</p>
                        <p>Breed of dog: {{ feed.dogbreed }}</p>
                        <p>Age of dog: {{ feed.dogage }}</p>
                        <p>Sex: {{ feed.dogsex }} </p>

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
                    abouttheDog: '',
                    file: null,
                    feeds: [],

                }
                console.log(dropdownValue)
              },
    
              created()
              {

                    let displayName = firebase.auth().currentUser.displayName
                    this.displayName = displayName


                  firebase.database().ref('AvailforBreeding').on('value',snap => {
                    let feedArray = []
                      snap.forEach(childSnap => {
                        let valAgeofDog = childSnap.val().AgeofDog
                        let valBreedofDog = childSnap.val().BreedofDog
                        let valInfoofDog = childSnap.val().InformationofDog
                        let valNameofDog = childSnap.val().NameofDog
                        let valNameofOwner = childSnap.val().NameofOwner 
                        let valSexofDog = childSnap.val().SexofDog
                        feedArray.push({ 
                            dogage: valAgeofDog,
                            dogbreed: valBreedofDog,
                            doginfo: valInfoofDog,
                            dogname: valNameofDog,
                            ownname: valNameofOwner,
                            dogsex: valSexofDog
                         })
                      })
                        this.feeds = feedArray
                        console.log(feeds)
                  })
              },
    
             methods:{

                addfeed()
                    {
                        this.$refs.addNewfeeds.show()
                    },

                postFeed()
                    {
                        // let name = this.displayName
                        // let contentPicture = this.file
                        // let name = 'Cassidy'
                        // console.log(this.file)
                        let dogOwner = this.displayName
                        let dogName = this.nameofDog
                        let dogBreed = this.breedofDog
                        let dogAge = this.ageofDog
                        let dogSex = this.sexofDog
                        let dogInformation = this.abouttheDog
                        let uid = firebase.auth().currentUser.uid
                        
                        // var storageRef = firebase.storage().ref('images/samlple.jpg').put(this.file)
    
                        firebase.database().ref('AvailforBreeding').push({ 

                                Uid: uid,
                                NameofOwner: dogOwner,
                                NameofDog: dogName,
                                BreedofDog: dogBreed,
                                AgeofDog: dogAge,
                                SexofDog: dogSex,
                                InformationofDog: dogInformation
                        })

                        //   firebase.database().ref(`AvailforBreeding/${uid}`).set({

                        //         Uid: uid,
                        //         NameofOwnwer: dogOwner,
                        //         NameofDog: dogName,
                        //         BreedofDog: dogBreed,
                        //         AgeofDog: dogAge,
                        //         SexofDog: dogSex,
                        //         InformationofDog: dogInformation
                        // })

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
            padding-top: 20px;
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
    
    </style>
    
