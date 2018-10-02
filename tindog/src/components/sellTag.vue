<template>
        <div>
            <div class="fixedIcon">
                <i class="fa fa-plus-circle fa-3x" aria-hidden="true" @click="addfeed"></i>
            </div> 
            <b-card v-for="(feed, i) in feeds" :key="feed.key" class="bcardStyle">
                <div class="clearfixMargin">
                    <div class="bcardContent1"> 
                        <b-media> 
                            <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder" />
                            <h5 class="mt-0"> {{ feed.nameofseller }}</h5>
                            <b-img center :src="feed.image" fluid alt="Fluid image" class="imageStyles"/>
                        </b-media> 
                        
                        <div class="tag-button">
                            <p>Price: {{ feed.productprice }} </p>
                        </div>
                    </div>
                
                    <div class="bcardContent2"> 
                        <p>Product: {{ feed.productype }} </p> 
                        <p>Name of Product: {{ feed.productname }} </p>
                        <p>Tag type: {{ feed.producttagtype }}</p>
                        <p>Colors Avaible: {{ feed.productcolor }}</p>
                        <p>Size Available: {{ feed.productsize }} </p>
                        <p>Customizable: {{ feed.productcustom }} </p>

                        <div class="messageStyle">
                            <b-button class="messageOwner" @click="clickMessage(feed.uid)">Message Seller</b-button>
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

            <b-modal ref="addNewfeeds" hide-footer title="Post News">
                    <div class="d-block text-center">

                        <h3>Name of Product</h3>
                        <b-form-input id="" size="sm" type="text" placeholder="Enter name of product" v-model="nameofProduct"></b-form-input>
            
                        <h3>Type of tag</h3>
                        <b-form-input id="" size="sm" type="text" placeholder="Enter type of tag" v-model="typetagofProduct"></b-form-input>
    
                        <h3>Colors Available</h3>
                        <b-form-input id="" size="sm" type="text" placeholder="Enter colors avaible" v-model="colorsofProduct"></b-form-input>
    
                        <h3>Size Avaible</h3>
                        <b-form-input id="" size="sm" type="text" placeholder="Sizes avaible" v-model="availsizeofProduct"></b-form-input>
    
                        <h3>Customizable</h3>
                        <b-form-select v-model="customofTag" :options="customTag" class="mb-3"></b-form-select>
                        
                        <h3>Price</h3>
                        <b-form-input id="" size="sm" type="text" placeholder="Price" v-model="priceofProduct"></b-form-input>
        
                        <b-form-file v-model="image" :state="Boolean(file)" placeholder="Upload a photo.." class="formStyle"></b-form-file>
        
                        <div class="textarea-button">
                            <b-button class="d-inline" variant="outline-success" @click="postFeed">Post</b-button>
                            <b-button class="d-inline" variant="outline-danger" @click="cancelPost">Cancel</b-button>
                        </div>
                    </div>
            </b-modal>
                    
        </div>
    </template>
    
<script>
    import firebase from 'firebase'
    export default
    {
        data () 
        {
        return{
            typeofProduct:'',
            nameofProduct: '',
            typetagofProduct: '',
            colorsofProduct: '',
            availsizeofProduct: '',
            customizableProduct: '',
            priceofProduct: '',
            cancelPost:'',  
            text:'',
            messageContent:'',
            customofTag: '',
            customTag: '',
            file: null,
            image: null,
            feeds: [],
            data:[],

            customTag: [
                { value: 'Yes', text: 'Yes' },
                { value: 'No', text: 'No' },
            ],
            }
        },
        
        name: 'sell-tag',

        created()
        {
            this.date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila'})
            this.displayName = firebase.auth().currentUser.displayName
            this.liveAddingPost()
        },

        methods:
        {
            addfeed()
            {
                this.$refs.addNewfeeds.show()
            },


            cancelPost()
            {
                this.$refs.addNewfeeds.hide()
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
                let productType = "Tag"
                let sellername = this.displayName
                let productName = this.nameofProduct
                let producttagType = this.typetagofProduct
                let productColor = this.colorsofProduct
                let productSize = this.availsizeofProduct
                let productCustom = this.customofTag
                let productPrice = this.priceofProduct
                let imageUpload = this.image
                let uid = firebase.auth().currentUser.uid
                let date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila'})

                let newPostkey = firebase.database().ref(`Users/${uid}/AccessoriesPost/Tag`).push({
                        Sellername: sellername,
                        Typeofproduct: productType,
                        Productname: productName,
                        Producttagtype: producttagType,
                        Productcolor: productColor,
                        Productsize: productSize,
                        ProductCustom: productCustom,
                        Productprice: productPrice,
                        uid,
                        date
                }).then(data => {
                    let key = data.key
                    firebase.storage().ref(`Images/Accessoriesfeed/Tag/${key}`).put(imageUpload)
                    firebase.database().ref(`Accessories/Tag/${key}`).set({ 
                        Sellername: sellername,
                        Typeofproduct: productType,
                        Productname: productName,
                        Producttagtype: producttagType,
                        Productcolor: productColor,
                        Productsize: productSize,
                        ProductCustom: productCustom,
                        Productprice: productPrice,
                        uid,
                        date
                    }).then(post => {
                        this.text = ''
                        this.image = ''
                        this.$refs.addNewfeeds.hide()
                    })
                })

            },

            liveAddingPost()
            {
                    
                firebase.database().ref('Accessories/Tag').on('value',snap => {
                    let feedArray = []
                    let promiseArr = []
                    snap.forEach(childSnap => {
                        let valSellername = childSnap.val().Sellername
                        let valProductype = childSnap.val().Typeofproduct
                        let valProductname = childSnap.val().Productname
                        let valProducttagtype = childSnap.val().Producttagtype
                        let valProductcolor = childSnap.val().Productcolor
                        let valProductsize = childSnap.val().Productsize
                        let valProductCustom = childSnap.val().ProductCustom
                        let valProductprice = childSnap.val().Productprice
                        let valDate = childSnap.val().date
                        let valId = childSnap.val().uid

                        let promise = firebase.storage().ref(`Images/Accessoriesfeed/Tag/${childSnap.key}`).getDownloadURL().then(url => {
                            return { 
                                key: childSnap.key,
                                image: url,
                                uid: valId,
                                date: valDate,
                                nameofseller: valSellername,
                                productype: valProductype,
                                productname: valProductname,
                                producttagtype: valProducttagtype,
                                productcolor: valProductcolor,
                                productsize: valProductsize,
                                productcustom: valProductCustom,
                                productprice: valProductprice,
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

        .tag-button
        { 
            margin-top: 60px;
            font-weight: bold;
        }
    
        
</style>