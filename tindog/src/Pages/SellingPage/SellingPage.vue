<template>
        <div id="Style">
            <b-navbar toggleable="md" type="dark" variant="dark">
    
                <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                
                    <b-navbar-brand href="#" id="LogoStyle" variant="dark">
                      <p class="text-light font">Tindog &#128021;</p>
                    </b-navbar-brand>
    
                <b-collapse is-nav id="nav_collapse" type="dark">
    
                        <b-dropdown id="ddown-divider" text="Lix" class="m-2">
                                <b-dropdown-item-button>Profile</b-dropdown-item-button>
                                <b-dropdown-divider></b-dropdown-divider>
                                <b-dropdown-item-button>Log-out</b-dropdown-item-button>
                        </b-dropdown>
    
                        
                        <b-navbar-nav class="ml-auto" variant="light">
                                <b-nav-item><p class="text-light">Newsfeed</p></b-nav-item>
                                <b-nav-item><p class="text-light">Selling</p></b-nav-item>
                                <b-nav-item><p class="text-light">Breeding</p></b-nav-item> 
                        </b-navbar-nav>
                        
                </b-collapse>
            </b-navbar>
    
            <div class="textarea">
                <p class="titlePage">Selling</p>
                <b-form-textarea id=""
                            state=""
                            v-model.trim="text"
                            placeholder="Enter something"
                            :rows="3"
                            :max-rows="6"
                            class="textareaDesign">
                </b-form-textarea>
    
                <b-form-file v-model="file" :state="Boolean(file)" placeholder="Upload a photo.." variant="success"></b-form-file>
    
                <div class="textarea-button">
                    <b-button class="d-inline" variant="outline-success">Post</b-button>
                    <b-button class="d-inline" variant="outline-danger">Cancel</b-button>
                </div>
            </div>        
           
            <div class="bcardstyle">
            <b-card class="bmediaStyle">
                    <b-media>
                      <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder" />
                      <h5 class="mt-0">Lix</h5>
                      <b-img center src="https://picsum.photos/300/150/?image=41" fluid alt="Fluid image" class="imageStyle"/>
                      <p>
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                        sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
                        Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis
                        in faucibus.
                      </p>
                      <p>
                        Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum
                        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                      </p>
    
                      <div class="media-button">
                            <b-button class="d-inline" variant="outline-success">Like</b-button>
                            <b-button class="d-inline" variant="outline-danger">Dislike</b-button>
                      </div>
                    </b-media>
                    
            </b-card>
    
            <b-card class="bmediaStyle">
                    <b-media>
                      <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder" />
                      <h5 class="mt-0">Lix  </h5>
                      <b-img center src="https://picsum.photos/300/150/?image=41" fluid alt="Fluid image" class="imageStyle"/>
                      <p>
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                        sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
                        Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis
                        in faucibus.
                      </p>
                      <p>
                        Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum
                        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                      </p>
    
                      <div class="media-button">
                            <b-button class="d-inline" variant="outline-success">Like</b-button>
                            <b-button class="d-inline" variant="outline-danger">Dislike</b-button>
                      </div>
                    </b-media>
        
            </b-card>
            </div>
                  
    
        </div>
    </template>
    
    <script>
            export default {
              data () {
                return {
                  text: ''
                }
              }
            }
            </script>
    
    <style>
    
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
    
        /* .style
        {
            margin-top: 30px;
        } */
    
        .textarea
        {
            width: 75%;
            margin: 0 auto;
            margin-top: 40px;
            margin-bottom: 30px;
    
        }
    
        .bcardstyle .bmediaStyle .imageStyle
        {
            margin: 0 auto;
            height: 200px;
            margin-bottom: 20px;
    
        }
    
        .bcardstyle
        {
            width: 75%;
            margin: 0 auto;
        }
    
        .bcardstyle .bmediaStyle
        {
            margin-bottom: 20px;
        }
    
        .textarea .textarea-button
        {
            margin-top: 10px;
        }
    
        .textareaDesign
        {
            margin-bottom: 3px;
        }
    
    </style>
    
    
    
    
    