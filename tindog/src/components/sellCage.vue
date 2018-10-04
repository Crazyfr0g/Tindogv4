<template>
    <div>
        <div class="fixedIcon">
                <i class="fa fa-plus-circle fa-3x" aria-hidden="true" @click="addfeed"></i>
        </div>

        <b-card v-for="(feed, i) in feedList" :key="feed.key" class="bcardStyle" > 
            <div class="clearfixMargin">
                <div class="bcardContent1"> 
                    <b-media> 
                        <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder" />
                        <h5 class="mt-0"> {{ feed.nameofseller }}</h5>
                        <b-img center :src="feed.image" fluid alt="Fluid image" class="imageStyles"/>
                    </b-media> 
                    
                    <div class="cage-button">
                        <p>Price:{{ feed.productprice }}</p>
                    </div>
                </div>
            
                <div class="bcardContent2">  
                    <p>Product:<i> {{ feed.productype }}</i></p>
                    <p>Name of Product: {{ feed.productname }} </p>
                    <p>Colors Avaible: {{ feed.productcolor }}</p>
                    <p>Size Available: {{ feed.productsize }} </p>
                    <p>Product Specifications: {{ feed.productspec }}</p>
                    <p>Time & Date: {{ feed.date }}</p>

                    <div class="messageStyle" @click="clickMessage(feed.uid)">
                        <b-button class="messageOwner">Message Seller</b-button>
                    </div>                      
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
                    <b-button class="d-inline" variant="outline-danger">Cancel</b-button>
                </div>
            </div>
        </b-modal>

        <b-modal ref="addNewfeeds" title="Post Accessories"  hide-footer>
                <div class="d-block text-center">

                    <h3>Name of Product</h3>
                    <b-form-input id="" size="sm" type="text" placeholder="Enter name of product" v-model="nameofProduct"></b-form-input>

                    <h3>Colors Available</h3>
                    <b-form-input id="" size="sm" type="text" placeholder="Enter colors avaible" v-model="availcolorofProduct"></b-form-input>

                    <h3>Size Avaible:</h3>
                    <b-form-input id="" size="sm" type="text" placeholder="Sizes avaible" v-model="availsizeofProduct"></b-form-input>

                    <h3>Price</h3>
                    <b-form-input id="" size="sm" type="text" placeholder="Price" v-model="priceofProduct"></b-form-input>

                    <b-form-textarea id=""
                        v-model="specificationProduct"
                        placeholder="Enter specifications of the product:"
                        :rows="3"
                        :max-rows="6"
                        class="textareaDesign">
                    </b-form-textarea>
    
                    <b-form-file v-model="image" :state="Boolean(file)" placeholder="Upload a photo.."></b-form-file>
    
                    <div class="textarea-button">
                        <b-button class="d-inline" variant="outline-success" @click="postFeed">Post</b-button>
                        <b-button class="d-inline" variant="outline-danger">Cancel</b-button>
                    </div>
                </div>
        </b-modal>

                
    </div>
</template>

<script>
import firebase from 'firebase'
export default
{
    name: 'sell-cage',
    
    data () 
    {
        return{
            typeofProduct:'',
            nameofProduct: '',
            abouttheDog: '',
            specificationProduct: '',
            priceofProduct: '',
            availsizeofProduct: '',
            availcolorofProduct: '',
            cancelPost:'',  
            text:'',
            messageContent:'',
            file: null,
            image: null,
            feeds: [],
            data:[],
        }
    },

    created()
    {
        this.date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila'})
        this.displayName = firebase.auth().currentUser.displayName
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

    methods:
    {
        addfeed()
        {
            this.$refs.addNewfeeds.show()
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

        postFeed()
        {
            let productType = "Cage"
            let sellername = this.displayName
            let productName = this.nameofProduct
            let productColor = this.availcolorofProduct
            let productSize = this.availsizeofProduct
            let productPrice = this.priceofProduct
            let productSpecification = this.specificationProduct
            let imageUpload = this.image
            let uid = firebase.auth().currentUser.uid
            let date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila'})

            firebase.database().ref(`Users/${uid}/AccessoriesPost/Cages`).push({
                    Sellername: sellername,
                    Typeofproduct: productType,
                    Productname: productName,
                    Productcolor: productColor,
                    Productsize: productSize,
                    Productprice: productPrice,
                    Productspecification: productSpecification,
                    uid,
                    date
            }).then(data => {
                let key = data.key
                var storageRef = firebase.storage().ref(`Images/Accessoriesfeed/Cages/${key}`)
                    storageRef.put(imageUpload).then(function(url){
                        storageRef.getDownloadURL().then(function(url){
                        firebase.database().ref(`Accessories/Cages/${key}`).set({ 
                        image: url,
                        Sellername: sellername,
                        Typeofproduct: productType,
                        Productname: productName,
                        Productcolor: productColor,
                        Productsize: productSize,
                        Productprice: productPrice,
                        Productspecification: productSpecification,
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
            firebase.database().ref('Accessories/Cages').on('value',snap => {
                let feedArray = []
                let promiseArr = []
                snap.forEach(childSnap => {
                    let valSellername = childSnap.val().Sellername
                    let valProductype = childSnap.val().Typeofproduct
                    let valProductname = childSnap.val().Productname
                    let valProductcolor = childSnap.val().Productcolor
                    let valProductsize = childSnap.val().Productsize
                    let valProductprice = childSnap.val().Productprice
                    let valProductSpec = childSnap.val().Productspecification
                    let valDate = childSnap.val().date
                    let valId = childSnap.val().uid
                    let valImage = childSnap.val().image
                        feedArray.push({
                            image: valImage,
                            uid: valId,
                            date: valDate,
                            nameofseller: valSellername,
                            productype: valProductype,
                            productname: valProductname,
                            productcolor: valProductcolor,
                            productsize: valProductsize,
                            productprice: valProductprice,
                            productspec: valProductSpec
                        })
                })
                this.feeds = feedArray
            }) 
        }
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

    .fixedIcon i:hover
    {
        transform: translate(0px, -2px);
    }

    .fixedIcon i
    {
        transition: all 300ms ease-in-out;
    }

    .fixedIcon
    {
        position: fixed;
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 99;
    }

    .cage-button
    {
        margin-top: 50px;
        font-weight: bold;
    }

    .textareaDesign
    {
        margin-top: 10px;
    }

    .imageStyles
    {
        height: 200px;
        width: 350px;
        margin-top: 30px;
    }
      
</style>