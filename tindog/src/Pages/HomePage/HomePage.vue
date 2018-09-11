<template>
    <div id="Style" class="paddingTop">
        <navbar/>
        <div class="textarea">
            <p class="titlePage">Newsfeed</p>
            <b-form-textarea id=""
                        v-model="text"
                        placeholder="Enter something"
                        :rows="3"
                        :max-rows="6"
                        class="textareaDesign">
            </b-form-textarea>

            <b-form-file v-model="file" :state="Boolean(file)" placeholder="Upload a photo.."></b-form-file>

            <div class="textarea-button">
                <b-button class="d-inline" variant="outline-success" @click="postFeed">Post</b-button>
                <b-button class="d-inline" variant="outline-danger">Cancel</b-button>
            </div>
        </div>        
       
        <div class="bcardstyle">
        <b-card class="bmediaStyle" v-for='feed in feeds'>
                <b-media>
                  <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder" />
                  <h5 class="mt-0">{{ feed.name }}</h5>
                  <b-img center src="https://picsum.photos/300/150/?image=41" fluid alt="Fluid image" class="imageStyle"/>

                    <p>{{ feed.content }}</p>

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
    import firebase from 'firebase'
    import Navbar from '../../components/NavBar.vue'

        export default {
        components:{
            Navbar
        },

          data () 
          {
            return {
              text: '',
              file: null,
              feeds: []
            }
          },

          created(){
              firebase.database().ref('Feeds').on('value',snap => {
                let feedArray = []
                  snap.forEach(childSnap => {
                    let valName = childSnap.val().name
                    let valContent = childSnap.val().content
                    feedArray.push({ 
                        name: valName,
                        content: valContent
                     })
                  })
                    this.feeds = feedArray
              })
          },

            methods:{
                postFeed(){
                    let messageFeed = this.text
                    let name = 'Cassidy'

                    firebase.database().ref('Feeds').push({ 
                       content: messageFeed,
                       name
                    }).then(post => {
                        console.log(post)
                    })

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




