<template>
  <div>
    <div class="container">
    <button type="button" class="btn btn-default btn-lg" @click=toggle() >Login Form</button> 
     <br>
     <div v-if=isVisible>
        <label for="usrname"><span class="glyphicon glyphicon-user"></span>Email</label>
        <input type="text" class="form-control" id="usrname" v-model=email placeholder="Enter email">
                    
        <label for="psw"><span class="glyphicon glyphicon-eye-open"></span>Password</label>
        <input type="text" class="form-control" id="psw" v-model=password placeholder="Enter password">
        <br><br>
     </div>
    <button type="button" class="btn btn-default btn-lg" v-if=isVisible data-toggle="modal" @click=login>Login</button>           
  </div> 
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      isVisible: false,
      password: '',
      email: '',
      reminder: ''
    }
  },
  methods: {
    close () {
      this.toggle()
      this.reminder = ''
    },
    toggle () {
      this.isVisible = !this.isVisible
    },
    login () {      
        let self=this
        alert(this.email)
        alert(this.password)
        axios({
          method: 'post',
          url: 'http://localhost:3000/users/login',
          data: {
            email:self.email,
            password: self.password
          }
        })
        .then((data=>{
            self.token=data.data.token
            localStorage.setItem('token',self.token)
            location.reload()
        }))
        .catch((err)=>{
          if (!self.email) {
            self.reminder = 'email is required'
          } else if (!self.password) {
            self.reminder = 'password is required'
          } else {
            self.reminder = error.response.data.message
          }
        })
      }
    }
}
</script>

<style scoped>
.signup-btn {
  width: 100%;
  color: whitesmoke;
  background: dimgray;
}

.modal {
  position: fixed;
  left: 38%;
  top: 20%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 400px;
  height: fit-content;
  background: orange;
  border-radius: 10px;
  box-shadow: 0px 0px 0px 3000px rgba(52, 56, 60, 0.6);
}

.modal .modal-exit {
  position: absolute;
  right: 0;
  font-weight: bold;
  color: black;
}

.modal-message {
  margin: 5% auto 10%;
  width: 60%;
  color: whitesmoke;
}
.modal-message h2 {
  text-align: center;
  line-height: 3;
}
</style>
