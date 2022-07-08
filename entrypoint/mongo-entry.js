var db = connect(`mongodb+srv://Rylarso:codeschool@cluster0.er7oi.mongodb.net/?retryWrites=true&w=majority`);
db = db.getSiblingsDB("auth-app");

db.createUser({
    user: "new_user",
    pwd: "password",
    roles: [{role: "readWrite", db: "auth-app"}],
    passwordDigestior: "server",
});