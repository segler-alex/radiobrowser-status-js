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
    var names = response.data.map(function(item){
        return item.name;
    });
    var filtered = [];
    for (var i=0;i<names.length;i++){
        if (filtered.indexOf(names[i]) < 0) {
            filtered.push(names[i]);
        }
    }

    app.items = filtered.map(function(name){
        return {name, status: 'WAITING', started: Date.now()};
    });
    app.items.sort(function(a,b){return StringSort(a.name,b.name);});

    var list = app.items.map(function(item){
        return axios.get('https://'+item.name+'/json/servers')
        .then(function(result){
            item.status = 'OK';
            item.time = (Date.now() - item.started)/1000;
        }).catch(function(err){
            item.status = 'NOK';
            item.time = (Date.now() - item.started)/1000;
        });
    });
    return Promise.all(list);
})
.catch(function (error) {
    console.log(error);
});