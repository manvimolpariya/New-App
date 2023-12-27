let apiKey ='08c203dc594345f49ed975da18826889';
const container =document.querySelector(".container");
const optionsContainer =document.querySelector(".options-container");
const country='in';
const options=['general','entertainment','health','science','sports','technology'];
let requestURL;
const generateUI=(articles)=>{
      for(let item of articles){
        let card=document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML=`<div class="news-image-container">
        <img src=${item.urlToImage} || "./newspaper.jpg" alt="" />
        </div>
        <div class='news-content'>
            <div class="news-title">${item.title}</div>
            <div class="news-description">${item.description || item.content || ""}</div>
            <a href="${item.url}" target="_blank" class="view-button">Read More</a>
        </div>`;
        container.appendChild(card);
      }
};
const getNews =async ()=>{
    container.innerHTML= "";
    let response =await fetch(requestURL);
    if(!response.ok){
        alert("Data unavailable at the moment. Please try again later");
        return false;
    }
    let data =await response.json();
    generateUI(data.articles);
};
const init=()=>{
    optionsContainer.innerHTML='';
    getNews();
    createOptions();
}
window.onload=()=>{
    requestURL=`https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
    init();
}
//category section
const selectCategory =(e, category) =>{
    let options= document.querySelectorAll(".options");
    options.forEach((element)=> {
       element.classList.remove("active"); 
    });
    requestURL =`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  getNews();
};
//options button
const createOptions =()=>{
    for (let i of options){
        optionsContainer.innerHTML += `<button class="options ${i=="general" ? "active" :""}" onclick="selectCategory(event,'${i}')">${i}</button>`
    }
}