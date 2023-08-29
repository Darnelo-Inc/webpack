import * as $ from "jquery"
import Post from "@models/Post"
import "@/styles/style.css"
import json from "@assets/json"
import xml from "@assets/data.xml"
import csv from "@assets/data.csv"
import webpack__logo from "@assets/webpack-logo.png"

const post = new Post("First post", webpack__logo)

// console.log("Post to string: ", post.toString())

// console.log("JSON:", json)
// console.log("XML:", xml)
// console.log("CSV:", csv)

$("pre").html(post.toString())
