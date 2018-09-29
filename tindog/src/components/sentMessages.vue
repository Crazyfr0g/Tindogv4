<template>
    <div id="Style" class="paddingTop">
        <b-card class="bcardWidth" fluid v-b-scrollspy:scroll style="position:relative; height:500px; overflow-y:scroll;">               
            <div id="scroll">
                <p class="messageCenter"><i>Sent Messages</i></p>
                <hr width="250"/>
                <div v-for="(feed, i) in feedList" :key="feed.key" class="editIconArea">
                    <ul class="list-unstyled">
                        <b-media tag="li"class="my-6">
                            <b-img slot="aside" blank blank-color="#abc" width="64" alt="placeholder" />
                                <h5 class="mt-0 mb-1"> {{ feed.sender }}</h5>
                                <h6 class="mt-0 mb-1"> {{ feed.date }}</h6>
                                <p> {{ feed.message }} </p>
                        </b-media>
                    </ul>  
                    <b-button class="d-inline" variant="outline-success" @click="sendReply(feed.senderuid)">Reply</b-button>
                    <b-button class="d-inline" variant="outline-danger" @click="deleteReply(feed.senderuid)">Delete</b-button>
                    <hr width="600"/>
                </div>
            </div>
        </b-card>


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
    </div>
</template>

<script>
    
    import firebase from 'firebase'
    // import Navbar from '../../components/NavBar.vue'
        export default 
        {
            name: 'sent-Messages',

            components:
            {
                // Navbar
            },

            data()
            {
                return{
                    feeds: [],
                    displayEmail: '',
                    displayName: '',
                    currentPage: null,
                    messageContent:'',
                    
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
            
                       firebase.database().ref(`Users/${this.uid}/SentMessages`).on('value',snap => {
                           

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

    .d-inline
    {
        margin-top: 15px;
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




