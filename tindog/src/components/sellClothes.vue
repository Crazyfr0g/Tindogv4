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
                        
                        <div class="clothes-button">
                            <p>Price: {{ feed.productprice }} </p>
                        </div>
                    </div>
                
                    <div class="bcardContent2">  
                        <p>Product: <i>{{ feed.productype }}</i></p> 
                        <p>Name of Product: {{ feed.productname }} </p>
                        <p>Specific for: {{ feed.productspecificfor }} </p>
                        <p>Colors Avaible: {{ feed.productcolor }}</p>
                        <p>Size Available: {{ feed.productsize }} </p>
                        <p>Type of Clothes: {{ feed.productclothestype }}</p>
                        <p>Customizable: {{ feed.productcustom }}</p>
                        <div class="messageStyle">
                            <b-button class="messageOwner" @click="clickMessage(feed.uid)">Message owner</b-button>
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

                        <h3>Specific for</h3>
                        <b-form-select v-model="specificofClothes" :options="specificClothes" class="mb-3"></b-form-select>
    
                        <h3>Colors Available</h3>
                        <b-form-input id="" size="sm" type="text" placeholder="Enter colors avaible" v-model="colorsofProduct"></b-form-input>
    
                        <h3>Size Avaible</h3>
                        <b-form-input id="" size="sm" type="text" placeholder="Sizes avaible" v-model="availsizeofProduct"></b-form-input>

                        <h3>Customizable</h3>
                        <b-form-select v-model="customofClothes" :options="customClothes" class="mb-3"></b-form-select>
    
                        <h3>Type of clothes</h3>
                        <b-form-select v-model="typeofClothes" :options="typeClothes" class="mb-3"></b-form-select>
                        
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
            productSpecificfor: '',
            colorsofProduct: '',
            availsizeofProduct: '',
            customClothes: '',
            customofClothes: '',
            typeofClothes:'',
            typeClothes: '',
            priceofProduct: '',
            cancelPost:'',  
            text:'',
            messageContent: '',
            file: null,
            image: null,
            feeds: [],
            data:[],

            customClothes: [
                { value: 'Yes', text: 'Yes' },
                { value: 'No', text: 'No' },
                ],

            typeClothes: [
                { value: 'Cap', text: 'Cap' },
                { value: 'Shirt', text: 'Shirt' },
                { value: 'Short', text: 'Short' },
                { value: 'Shoes', text: 'Shoes' },
                { value: 'Hoody', text: 'Hoody' },
                ],

                
            specificClothes: [
            { value: 'Male', text: 'Male' },
            { value: 'Female', text: 'Female' },
            { value: 'Unisex', text: 'Unisex' },
            ],

            }
        },

        name: 'sell-clothes',

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
                let productType = "Clothes"
                let sellername = this.displayName
                let productName = this.nameofProduct
                let productSpecific = this.productSpecificfor
                let productColor = this.colorsofProduct
                let productSize = this.availsizeofProduct
                let productCustom = this.customofClothes
                let productclothesType = this.typeofClothes
                let productPrice = this.priceofProduct
                let imageUpload = this.image
                let uid = firebase.auth().currentUser.uid
                let date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila'})

                let newPostkey = firebase.database().ref(`Users/${uid}/AccessoriesPost/Clothes`).push({
                        Sellername: sellername,
                        Typeofproduct: productType,
                        Productname: productName,
                        Productspecificfor: productSpecific,
                        Productcolor: productColor,
                        Productsize: productSize,
                        ProductCustom: productCustom,    
                        ProductclothesType: productclothesType,
                        Productprice: productPrice,
                        uid,
                        date
                }).then(data => {
                    let key = data.key
                    var storageRef = firebase.storage().ref(`Images/Accessoriesfeed/Clothes/${key}`)
                        storageRef.put(imageUpload).then(function(url){
                            storageRef.getDownloadURL().then(function(url){
                            firebase.database().ref(`Accessories/Clothes/${key}`).set({ 
                            image: url,
                            Sellername: sellername,
                            Typeofproduct: productType,
                            Productname: productName,
                            Productspecificfor: productSpecific,
                            Productcolor: productColor,
                            Productsize: productSize,
                            ProductCustom: productCustom,
                            ProductclothesType: productclothesType,
                            Productprice: productPrice,
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
                    
                firebase.database().ref('Accessories/Clothes').on('value',snap => {
                    let feedArray = []
                    let promiseArr = []
                    snap.forEach(childSnap => {
                        let valSellername = childSnap.val().Sellername
                        let valProductype = childSnap.val().Typeofproduct
                        let valProductname = childSnap.val().Productname
                        let valProductspecificfor = childSnap.val().Productspecificfor
                        let valProductcolor = childSnap.val().Productcolor
                        let valProductsize = childSnap.val().Productsize
                        let valProductCustom = childSnap.val().ProductCustom
                        let valProductclothestype = childSnap.val().ProductclothesType
                        let valProductprice = childSnap.val().Productprice
                        let valDate = childSnap.val().date
                        let valId = childSnap.val().uid
                        let valImage = childSnap.val().image
                            feedArray.push({
                                key: childSnap.key,
                                image: valImage,
                                uid: valId,
                                date: valDate,
                                nameofseller: valSellername,
                                productype: valProductype,
                                productname: valProductname,
                                productspecificfor: valProductspecificfor,
                                productcolor: valProductcolor,
                                productsize: valProductsize,
                                productcustom: valProductCustom,
                                productclothestype:valProductclothestype,
                                productprice: valProductprice,
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
    
        .clothes-button
        {
            margin-top: 105px;
            font-weight: bold;
        }

        .formStyle
        {
            margin-top: 10px;
        }
        
</style>