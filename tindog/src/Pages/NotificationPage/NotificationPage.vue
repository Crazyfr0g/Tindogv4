<template>
    <div class="paddingTop">
            <navbar/>
        <b-button @click="showModal">
            Open Modal
          </b-button>
          <b-modal ref="myModalRef" hide-footer title="Using Component Methods">
            <div class="d-block text-center">
              <h3>Hello From My Modal!</h3>
            </div>
            <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-btn>
          </b-modal>
    </div>
</template>

<script>
    import Navbar from '../../components/NavBar.vue'

    export default {
                
        components: {
        
                 Navbar
                }
            }

</script>