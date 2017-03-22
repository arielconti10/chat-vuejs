var chatComponent = Vue.extend({
    template: `
                <style type="text/css" scoped>
                    div{
                        color: red;
                    }
                    .chat {
                        padding: 0;
                    }
                    .chat li {
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                    }
                    .chat li.left .chat-body {
                        margin-left: 100px;
                    }
                    .chat li.right .chat-body {
                        text-align: right;
                        margin-right: 100px;
                    }
                    .panel-body {
                        overflow-y: scroll;
                        height: 400px;
                    }
                </style>
                <div class="panel panel-primary">
                    <div class="panel-heading">Chat</div>
                    <div class="panel-body">
                        <ul class="chat list-unstyled">
                            <li class="clearfix"
                                v-bind:class="{left: !isUser(o.email), right: isUser(o.email)}" v-for="o in chat.messages">
                                <span v-bind:class="{'pull-left': !isUser(o.email), 'pull-right' : isUser(o.email)}">
                                    <img v-bind:src="o.photo" class="img-circle"/>
                                </span>
                                <div class="chat-body">
                                    <strong>{{ o.name }}</strong>
                                    <p>{{o.text}}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="panel-footer">
                        <div class="input-group">
                            <input type="text" class="form-control input-md"
                                   placeholder="Digite sua mensagem" v-model="message" @keyup.enter="sendMessage"/>
                            <span class="input-group-btn">
                                <button class="btn btn-success btn-md" @click="sendMessage">Enviar</button>
                            </span>
                        </div>
                    </div>
                </div>
       `,
    data: function(){
        return {
            user: {
                name: "Ariel",
                email: "ariel@gmail.com"
            },
            chat: {
                messages:[
                    {
                        email: "fulano@gmail.com",
                        text: "Olá eu sou o Fulano",
                        name: "Fulano",
                        photo: "http://placehold.it/50x50"
                    },
                    {
                        email: "ariel@gmail.com",
                        text: "Olá eu sou o Ariel, eu to bem pra caramba",
                        name: "Ariel",
                        photo: "http://placehold.it/50x50"
                    },
                    {
                        email: "ariel@gmail.com",
                        text: "Eu não te conheço",
                        name: "Ariel",
                        photo: "http://placehold.it/50x50"
                    }
                ]

            }
        }
    },
    methods: {
        isUser: function(email){
            return this.user.email == email;
        }
    }
});

var roomsComponent = Vue.extend({
    template: `
        <div class="col-md-4" v-for="o in rooms">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    {{o.name}}
                </div>
                <div class="panel-body">
                    {{o.description}}
                    <br/><br /><br />
                    <a href="javascript:void(0)" @click="goToChat(o)" class="btn btn-primary">Entrar</a>
                </div>
            </div>
        </div>
    `,
    data: function(){
        return {
            rooms: [
                {id: "001", name: "PHP", description:"Entusiasta do PHP, Laravel rules everithing in dis world"},
                {id: "002", name: "Java", description:"Java é bom, só espera o Eclipse destravar que te mostro"},
                {id: "003", name: "Javascript", description:"Web na veia só muleque galudao ecmascript 6"},
                {id: "004", name: "Vue.JS", description:"Os caras do data-binding vuejs bolado renderiza tudo dinamico"},
                {id: "005", name: "Vue.JS", description:"Os caras do data-binding vuejs bolado renderiza tudo dinamico"},
                {id: "006", name: "Vue.JS", description:"Os caras do data-binding vuejs bolado renderiza tudo dinamico"}
            ]
        };
    },
    methods: {
        goToChat: function(room){
            this.$route.router.go('/chat/'+room.id);
        }
    }
});

var appComponent = Vue.extend({});

Vue.component('chat', chatComponent);
Vue.component('rooms', roomsComponent);


var chat = new Vue({
    el: "#chat",
});

var router = new VueRouter();

router.map({
    '/chat/:room':{
        component: chatComponent
    },
    '/rooms':{
        component: roomsComponent
    }
});

router.start(appComponent, "#app");