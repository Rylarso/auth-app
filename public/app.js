const app = require("../server/server");

const URL = "http://localhost:8080";

var app = new Vue({
    el: "#app",
    data: {
        test: "Is vue working?"
    },
    methods:{
        getSession: async function () {
            let response = await fetch(`${URL}/session`, {
                method: "GET",
                credentials: "include"
            });

            // Are we logged in?
            if (response.status == 200) {
                // logged in :)
                console.log("logged in");
                let data = await response.json();
                console.log(data);

                // send the user to the home page
                this.loadHomePage();
                return;

            } else if (response.status == 401) {
                // Not logged in :(
                console.log("Not logged in");
                let data = await response.json();
                console.log(data);

            } else {
                console.log("Some sort of error when GETTING /session:", response.status, response);
            }
        },
    },
    created: function (){
        this.getSession();
    }
})