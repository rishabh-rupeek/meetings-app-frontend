<template>
    <div>
        Create a new Team
        <div>
            <div>
                Name:
                <input type="text" v-model="name">
            </div>
            <div>
                Short Name:
                <input type="text" v-model="shortName">
            </div>
            <div>
                Description
                <b-form-textarea
                id="textarea"
                v-model="desc"
                placeholder="What is the agenda of the team?"
                rows="3"
                max-rows="6"
            ></b-form-textarea>    
            </div>
            <div>
                Email id's of the Team members:
                <input type="text"
                id="textarea"
                v-model="members"
                placeholder="john@example.com,jane@example.com"
                size="100"
                >    
            </div>
            <button @click="add">Add Team</button>
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