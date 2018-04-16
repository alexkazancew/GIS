var key = "ruqqpo1879"
var url = `http://catalog.api.2gis.ru/2.0/catalog/branch/search?key=${key}&format=json&region_id=1`

var rubricItemsUrl = `http://catalog.api.2gis.ru/2.0/catalog/branch/search?key=${key}&region_id=16&format=json&page_size=50&fields=items.point`

var rubricUrl = `http://catalog.api.2gis.ru/2.0/catalog/rubric/list?key=${key}&region_id=16&format=json`

var urlRegion = `http://catalog.api.2gis.ru/2.0/geo/list?key=${key}&region_id=16&type=adm_div.district&fields=items.geometry.selection`

function getRubricItems(rubricName, districtId, page, allItems){

    var newRubricItemsUrl = rubricItemsUrl + "&district_id=" + districtId  + "&q=" + rubricName + "&page=" + page;
    return fetch(newRubricItemsUrl, {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
     },
   }).then(response => response.json()).then(data => {
     allItems = allItems.concat(data.result.items);
     var total = data.result.total
     var ceil = Math.ceil(total/50);

     if(ceil == page){
       return allItems;
     }
     else {
        var nextPage = page + 1;
        return getRubricItems(rubricName, districtId, nextPage, allItems);
     }
});
}

function getRubrics(callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", rubricUrl, true);
    xhr.onload = function(){
      callback(JSON.parse(xhr.responseText));
    }
    xhr.send();

}

function getRegions(callback){

  var xhr = new XMLHttpRequest();
  xhr.open("GET", urlRegion, true);
  xhr.onload = function(){
    callback(xhr.responseText);
  }
  xhr.send();
}
