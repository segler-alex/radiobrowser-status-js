var app = new Vue({
    el: '#app',
    data: {
      items: [
        { message: 'Foo' },
        { message: 'Bar' }
      ]
    }
  });
app.items[0].message = "NUUU";

axios.get('https://api.radio-browser.info/json/servers')
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
});