const http = require("http");
const url = require("url");
const fs = require("fs");
const lookup = require("mime-types").lookup;
const express = require("express");
const app = express();

app.use(express.static('dist'));
app.use('/IMAGE', express.static('IMAGE'));

//? Telling the express module that the dist dir has all of our site assets


const replace_Card = require(`${__dirname}/modules/replace_Card`);
const replace_News = require(`${__dirname}/modules/replace_News`);
const replace_Heading = require(`${__dirname}/modules/replace_Heading`);

//? Grabbing The Data as JSON
const JSON_DATA = fs.readFileSync(`${__dirname}/news.json`, 'utf-8');
const DATA = JSON.parse(JSON_DATA);

//? Grabbing Templates
const Navbar = fs.readFileSync(`${__dirname}/navbar.html`,'utf-8');
const About = fs.readFileSync(`${__dirname}/about.html`,'utf-8');
const Index = fs.readFileSync(`${__dirname}/index.html`,'utf-8');
const Template_Card = fs.readFileSync(`${__dirname}/template_card.html`,'utf-8');
const Template_News = fs.readFileSync(`${__dirname}/template_news.html`,'utf8');


const server = http.createServer((req,res) => {
               const {query, pathname} = url.parse(req.url, true);
               let PATH = pathname.toLowerCase();

               //! A Regex To test for a valid image url
               const regexALL = /\/image\/[A-Za-z0-9]+.(jpg|jpeg|webp|avif)$/g;
               const regexJPG = /\/image\/[A-Za-z0-9]+.(jpg)$/g;
               const regexJPEG = /\/image\/[A-Za-z0-9]+.(jpeg)$/g;
               const regexWEBP = /\/image\/[A-Za-z0-9]+.(webp)$/g;
               const regexAVIF = /\/image\/[A-Za-z0-9]+.(avif)$/g;
               
            
                 
               console.log(PATH);
                switch(PATH){
                    case "/css/output.css":
                         res.writeHead(200, {'Content-Type' : "text/css"});
                         break;
                    case "/newsletter" || "/":
                         res.writeHead(200, {'Content-Type' : "text/html"});
                         const Loaded_Cards = DATA.map(news => replace_Card(Template_Card,news)).join("");
                         const Items = {
                              navbar: Navbar,
                              cards: Loaded_Cards,
                              about: About
                         }
                         const Loaded_End = replace_Heading(Index,Items);
                         res.write(Loaded_End);
                         break;
                    case "/news":
                         res.writeHead(200, {'Content-Type' : 'text-html'});
                         if(query.id){
                              
                              const Items = {
                                   navbar: Navbar,
                                   about: About
                              }
                              const NewsData = DATA[query.id];
                              let Loaded_News = replace_News(Template_News, NewsData);
                              Loaded_News = replace_Heading(Loaded_News,Items); 
                              console.log(Loaded_News);
                              console.log(NewsData);
                              res.write(Loaded_News);
                         }
                         res.end("News : " + query.id);
                         break;
                    case "/api":
                         res.writeHead(200, {'Content-Type' : "application/json"});
                         res.end(JSON_DATA);
                         break;
                    case "/image/0.webp":
                         res.writeHead(200, {'Content-Type' : "image/webp"});
                         const image = fs.readFileSync(`${__dirname}/image/1.webp`,'utf8');
                         res.end(image);
                         break;
                    default:
                         res.writeHead(200,{'Content-Type' : "text/html"});
                         break;

               }
               res.end();                      
             
});
server.listen(1337,'localhost',() => {
     console.log("Listening on the port 1337");
});
