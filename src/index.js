import Post from "./Post"
import "./styles/style.css"
import json from "./assets/json"
import webpack__logo from "./assets/webpack-logo.png"

const post = new Post("First post", webpack__logo)

console.log("Post to string: ", post.toString())

console.log("JSON:", json)
