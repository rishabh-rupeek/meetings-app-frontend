<template>
    <div>
        <div>
            <div class="input_section">
                <label>
                Name:
                </label>
                <input type="text" class="form-control" v-model="name">
            </div>
            <div class="input_section">
                <label>
                Short Name:
                </label>
                <input type="text" class="form-control" v-model="shortName">
            </div>
            <div class="input_section">
                <label>
                Description:
                </label>
                <b-form-textarea
                id="textarea"
                v-model="desc"
                class="form-control"
                placeholder="What is the agenda of the team?"
                rows="3"
                max-rows="6"
            ></b-form-textarea>    
            </div>
            <div class="input_section">
                <label>
                Email id's of the Team members:
                </label>
                <input type="text"
                id="textarea"
                v-model="members"
                class="form-control"
                placeholder="john@example.com,jane@example.com"
                size="100"
                >    
            </div>
            <button @click="add" class="btn btn-primary">Add Team</button>
        </div>
    </div>
</template>
<script>
import { addTeam } from '../services.js/teams'
import { sendNotification } from '../services.js/utils'

export default {
    name:'AddTeam',
    data(){
        return{
            name:"",
            shortName:"",
            desc:"",
            members:[]
        }
    },
    methods:{
        add(){
            const body = {
                name:this.name,
                shortName:this.shortName,
                description:this.desc,
                members: this.members.split(',')
            }
            body.members.push(localStorage.getItem('email'));
            console.log(body);
            addTeam(body)
                .then((response) => {
                    console.log(response);
                    sendNotification(`${body.name} team created!`,"success");
                    this.$emit('team-added');    
                }).catch((error) => {
                    console.log(error);
                })
            
        }
    }
}
</script>
<style scoped>
.input_section{
    margin-bottom: 20px;
}
</style>