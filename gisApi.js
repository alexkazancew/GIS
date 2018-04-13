var url = "http://catalog.api.2gis.ru/2.0/catalog/branch/search?key=ruqqpo1879&format=json&region_id=1"

function getResponses(name, region, callback){
    var xhr = new XMLHttpRequest();
    url += "&q=" + name + " " + region;
    xhr.open("GET", url, true);
    xhr.onload = function(){
      console.log(this.responseText)
    }
    xhr.send();





}
