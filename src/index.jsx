import * as $ from "jquery"
import Post from "@models/Post"
import "@/styles/style.css"
import "@/styles/style.less"
import "@/styles/style.scss"
import json from "@assets/json"
import xml from "@assets/data.xml"
import csv from "@assets/data.csv"
import webpack__logo from "@assets/webpack-logo.png"
import "@/babel"
import React from 'react'
import { createRoot } from "react-dom/client"

const post = new Post("First post", webpack__logo)

// console.log("Post to string: ", post.toString())

// console.log("JSON:", json)
// console.log("XML:", xml)
// console.log("CSV:", csv)

$("pre").html(post.toString())

const App = () => {
  return (
    <div className="container">
      <h1>Webpack</h1>

      <hr />

      <div className="bg"></div>

      {/* <hr /> */}

      {/* <pre></pre>  */}

      <hr />

      <div className="less-box"><h2>This is a Less box</h2></div>

      <hr />

      <div className="scss-box"><h2>This is a Scss box</h2></div>
    </div>)
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
