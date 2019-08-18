var apiKey = 'ee3e79af312ca516fdb59c77386b9038145a087cee13911d566f01f93925c968';
var url = 'https://cse104.kraigh.com/recommendations';

var form = document.getElementById("recommendations");
form.addEventListener("submit", sendRecommendation);

function sendRecommendation(event) {
  event.preventDefault();

  var name = form.elements.namedItem("name").value;
  var text = form.elements.namedItem("text").value;

  console.log(name + ', ' +text);

  var submitAJAX = new XMLHttpRequest();
  submitAJAX.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.readyState);
      console.log(this.status);
      console.log(this.responseText);
      renderRecommendations(name, text);
    }

  }

  submitAJAX.open("POST", url, true);
  submitAJAX.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  submitAJAX.send("api_key="+apiKey+"&name="+name+"&text="+text);

}

var getAJAX = new XMLHttpRequest();
getAJAX.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var recommendations = JSON.parse(this.responseText);
        console.log(recommendations);
        for (i = 0; i < recommendations.length; i++) {
          console.log(recommendations[i]);
          var item = recommendations[i];
          renderRecommendations(item.name, item.text);
        }
    }
};
getAJAX.open("GET", "https://cse104.kraigh.com/recommendations?api_key="+apiKey, true);
getAJAX.send();

function renderRecommendations(name, text) {
  var recommendation = document.createElement("blockquote");
  recommendation.setAttribute("class", "recommendation");
  recommendation.innerHTML = "<h3>"+name+"</h3>"+"<p>"+text+"</p>";
  document.getElementById("all-recommendations").appendChild(recommendation);
}
