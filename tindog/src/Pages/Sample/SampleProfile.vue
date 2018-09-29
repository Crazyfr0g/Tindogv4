<template>
        <div id="Style" class="paddingTop">
            <navbar/>
            <div class="textarea">
                <p class="titlePage">Profile</p>
            </div>
            <div class="ImageStyle">  
                <b-img center src="https://picsum.photos/125/125/?image=58" class="rounded-circle" alt="center image" width="200" /> <br>
                <p class="profile">{{ displayName }} &#x1F58B;</p>
                <p class="profile">{{ displayEmail }}</p>
            </div><br>

            <div class="buttonStyle">
            <b-button class="d-inline" variant="outline-success" @click="RecievedMessages">RecievedMessages</b-button>
            <b-button class="d-inline" variant="outline-danger" @click="SentMessages">SentMessages</b-button>
            </div>

            <recieve-Messages v-if="recieveDisplay"/> 
            <sent-Messages v-if="sentDisplay"/> 

            <b-modal ref="messageSend" title="Message Owner" no-close-on-backdrop  hide-footer>
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

            
            <b-modal ref="messageDelete" title="Delete Message" no-close-on-backdrop  hide-footer>
                <div class="d-block text-center">
                    <b-alert show variant="danger">
                      Are you sure to <a href="#" class="alert-link">delete</a> this message?
                    </b-alert>
                    <div  class="textarea-button">
                        <b-button class="d-inline" variant="outline-success" @click="proceedDelete">Yes</b-button>
                        <b-button class="d-inline" variant="outline-danger" @click="abortDelete">Cancel</b-button>
                    </div>
                </div>
            </b-modal>

            <b-card class="bcardWidth">
                    <p class="messageCenter"><i>Previous Feed</i></p>
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
                        </ul>      
                    </div>
            </b-card> 
            
        </div>
    </template>
    
    <script>
        
        import firebase from 'firebase'
        import SentMessages from '../../components/sentMessages.vue'
        import RecieveMessages from '../../components/recieveMessages.vue'
        import Navbar from '../../components/NavBar.vue'
        
            export default 
            {

                components:
                {
                    Navbar,
                    SentMessages,
                    RecieveMessages
                },

                data()
                {
                    return{
                        feeds: [],
                        displayEmail: '',
                        displayName: '',
                        currentPage: null,
                        messageContent:'',
                        recieveDisplay: true,
                        sentDisplay: false
                        
                    }
                },

                created()
                {
                    this.gettingMessages()
                },

                computed:
                {
                    feedList()
                    {
                        console.log(this.feeds)
                        return this.feeds.reverse()       
                    }
                },


                methods:
                {
                    RecievedMessages()
                    {
                        this.recieveDisplay = true
                        this.sentDisplay = false
                    },

                    SentMessages()
                    {
                        this.sentDisplay = true
                        this.recieveDisplay = false
                    },

                    sendReply(senderuid)
                    {
                        console.log(senderuid)
                        this.recieve = senderuid
                        this.$refs.messageSend.show() 
                    },

                    cancelMessage()
                    {
                        this.$refs.messageSend.hide() 
                    },

                    deleteReply(senderuid)
                    {
                        console.log(senderuid)
                    },

                    sendMessage()
                    {
                        let valmessage = this.messageContent  
                        this.senderuid = firebase.auth().currentUser.uid

                        firebase.database().ref(`Users/${this.recieve}/RecieveMessages`).push({
                            Sender: this.displayName,
                            Message: valmessage,
                            DateandTime: this.date,
                            Senderuid: this.senderuid
                            }).then(post => {
                                this.$refs.messageSend.hide()
                                this.messageContent = ''
                        }) 

                        
                        firebase.database().ref(`Users/${this.senderuid}/SentMessages`).push({
                            Sender: this.displayName,
                            Message: valmessage,
                            DateandTime: this.date,
                            Senderuid: this.senderuid
                            }).then(post => {
                                this.$refs.messageSend.hide()
                                this.messageContent = ''
                        }) 


                    },

                    gettingMessages()
                    {
                    
                        this.displayName = firebase.auth().currentUser.displayName
                        this.displayEmail= firebase.auth().currentUser.email
                        this.uid = firebase.auth().currentUser.uid
                        this.date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila'})
                
                           firebase.database().ref(`Users/${this.uid}/RecieveMessages`).on('value',snap => {
                               

                            let feedArray = []
                            snap.forEach(childSnap => {
                                let valSender = childSnap.val().Sender
                                let valMessage = childSnap.val().Message
                                let valDateandTime = childSnap.val().DateandTime        
                                let valSenderuid = childSnap.val().Senderuid
                                feedArray.push({ 
                                    date: valDateandTime,
                                    sender: valSender,
                                    message: valMessage,
                                    senderuid: valSenderuid
                                }) 
                            })
                                this.feeds = feedArray 
                        })
                    },
                }
    
            }
    </script>
    
    <style>

        .buttonStyle
        {
            text-align: center;
        }

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
            width: 60%; 
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

        .ImageStyle
        {
            width: 75%;
           text-align: center;
           margin: 0 auto;
           margin-bottom: 5%;;
        }
  
        .ImageStyle .profile
        {
            margin-top: 15px;
            text-align: center;
            font-size: 25px;
        }

    
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
        
    </style>
    
    
    
    
    