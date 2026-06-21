function analyzeMessage(){
    let text =document.getElementById("msg").value.toLowerCase();
    let score = 0;
    const suspiciousWords = [
        "otp",
        "bank",
        "verify",
        "urgent",
        "click",
        "gift",
        "winner",
        "account blocked",
        "prize",
        "free"
    ];
    suspiciousWords.forEach(word=>{
        if(text.includes(word)){
            score++;
        }
    });

    let result =document.getElementById("result");
    if(score >= 4){
        result.innerHTML="🚨 High Scam Risk";
        result.style.color="red";
    }
    else if(score>=2){
        result.innerHTML="⚠ Medium Scam Risk";
        result.style.color="orange";
    }
    else{
        result.innerHTML="✅ Low Scam Risk";
        result.style.color="lightgreen";
    }
}

function checkURL(){
    let url=document.getElementById("url").value.toLowerCase();
    let result=document.getElementById("urlResult");
    if( url.includes("@")||url.includes("bit.ly")||url.includes("tinyurl")||url.includes("verify")||url.includes("login")){
        result.innerHTML="⚠ Suspicious URL";
        result.style.color="orange";

    }
    else{
        result.innerHTML="✅ URL Looks Safe";
        result.style.color="lightgreen";
    }
}
letnewsData=[];
let currentindex=0;
async function getNews(){
    try{
        const response=await fetch("https://hn.algolia.com/api/v1/search?query=cybersecurity");
        const data=await response.json();
        newsData=data.hits.filter(article=>article.title && article.url);
        currentindex=0;
        showNews();
    }
    catch(error){
        document.getElementById("newsBox").innerHTML="Unable to fetch news.";
    }
    
}
function showNews(){
    if(newsData.length==0)return;
    let article=newsData[currentindex];
    document.getElementById("newsBox").innerHTML=`<h3>${article.title}</h3>
    <p>${article.summary}</p>
    <a href="${article.url}" target="_blank" style="color:#00ff99;">Read More</a>`;
}
function nextNews(){
    if(newsData.length==0){
    document.getElementById("newsBox").innerHTML=" Click Get Latest News first.";
    return;
    }
    currentindex++;
    if(currentindex>=newsData.length){
        currentindex=0;
    }   
    showNews();
}