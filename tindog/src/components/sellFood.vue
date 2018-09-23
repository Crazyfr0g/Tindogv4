<template>
        <div>
            <b-card  class="bcardStyle"> 
                    <div class="fixedIcon">
                        <i class="fa fa-plus-circle fa-3x" aria-hidden="true" @click="addfeed"></i>
                    </div>
                <div class="clearfixMargin">
                        <div class="bcardContent1"> 
                            <b-media> 
                                <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder" />
                                <h5 class="mt-0"></h5>
                                <b-img center src="https://picsum.photos/300/150/?image=41" fluid alt="Fluid image" class="imageStyles"/>
                            </b-media> 
                            
                            <div class="food-button">
                                <p>Price: </p>
                            </div>
                        </div>
                 
                        <div class="bcardContent2">  
                            <p>Product: Food </p>
                            <p>Name of Product: Food </p>
                            <p>Specific for: Beagle</p>
                            <p>Food Contains: 1 year 4 months</p>
                            <p>Package Size: Female </p>
    
                            <div class="messageStyle">
                                <b-button class="messageOwner" @click="clickMessage">Message owner</b-button>
                            </div>    
                        </div>      
            
                </div>
            </b-card>

            <b-modal ref="addNewfeeds" hide-footer title="Post News">
                <div class="d-block text-center">

                    <h3>Product:</h3>
                    <b-form-input id="" size="sm" type="text" placeholder="Enter name of dog" v-model="nameofDog"></b-form-input>

                    <h3>Name of Product:</h3>
                    <b-form-input id="" size="sm" type="text" placeholder="Enter name of dog" v-model="nameofDog"></b-form-input>
        
                    <h3>Specific for:</h3>
                    <b-form-input id="" size="sm" type="text" placeholder="Product is specific for" v-model="breedofDog"></b-form-input>

                    <h3>Food Contains:</h3>
                    <b-form-input id="" size="sm" type="text" placeholder="Enter colors avaible" v-model="ageofDog"></b-form-input>

                    <h3>Size Avaible:</h3>
                    <b-form-input id="" size="sm" type="text" placeholder="Sizes avaible" v-model="sexofDog"></b-form-input>

                    <b-form-textarea id=""
                        v-model="text"
                        placeholder="Enter specifications of the product:"
                        :rows="3"
                        :max-rows="6"
                        class="textareaDesign">
                    </b-form-textarea>
    
                    <b-form-file v-model="file" :state="Boolean(file)" placeholder="Upload a photo.." @change="getFileName"></b-form-file>
    
                    <div class="textarea-button">
                        <b-button class="d-inline" variant="outline-success" @click="postFeed">Post</b-button>
                        <b-button class="d-inline" variant="outline-danger" @click="cancelPost">Cancel</b-button>
                    </div>
                </div>
            </b-modal>
                    
        </div>
    </template>
    
    <script>
        export default
        {
            name: 'sell-food',

            methods:
            {
                addfeed()
                {
                    this.$refs.addNewfeeds.show()
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

               .food-button
            {
                margin-top: 65px;
                font-weight: bold;
            }
        
          
    </style>