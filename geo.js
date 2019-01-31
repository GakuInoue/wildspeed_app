const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAoMX0o0ClpB7BGPn2XZaF4ilD2blTZJAA',
  Promise: Promise
});
 
var place = process.argv[2];
if(!place){
    console.log('Not Found place')
    return ;
}
googleMapsClient.geocode({address: place})
  .asPromise()
  .then((response) => {
    console.log(response.json.results[0].geometry.location);
  })
  .catch((err) => {
    console.log(err);
  });
