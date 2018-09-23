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
                            
                            <div class="tag-button">
                                <p>Price: </p>
                            </div>
                        </div>
                 
                        <div class="bcardContent2"> 
                            <p>Product: Tag </p> 
                            <p>Name of Product: Tag </p>
                            <p>Tag type:</p>
                            <p>Specific for: Beagle</p>
                            <p>Colors Avaible: 1 year 4 months</p>
                            <p>Size Available: Female </p>
                            <p>Customizable: Yes </p>
    
                            <div class="messageStyle">
                                <b-button class="messageOwner" @click="clickMessage">Message owner</b-button>
                            </div>    

                        </div>      
            
                </div>
            </b-card>
                    
        </div>
    </template>
    
    <script>
        export default
        {
            name: 'sell-tag'
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
               
            margin-top: 150px;
            font-weight: bold;

            }
        
          
    </style>