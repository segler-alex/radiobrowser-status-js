var app = new Vue({
    el: '#app',
    data: {
      items: [
      ]
    }
  });

function StringSort(str1,str2){
    return str1 < str2 ? -1 : str1 > str2;
}

axios.get('https://api.radio-browser.info/json/servers')
.then(function (response) {
    app.items = response.data;
    app.items.sort(function(a,b){return StringSort(a.name,b.name);});
})
.catch(function (error) {
    console.log(error);
});