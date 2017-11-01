// Yelp API info
const clientId = '3J8nFC9uZd0AG2m6d0Ozeg';
const secret = '351otlNlsGG41ohFAEmC4ksTKkVk8X51ml7lRTn3lySCOvYKMTh9Xxc9ZxWEw5ry';
let accessToken;

const Yelp = {
  getAccessToken: () => {
    if(accessToken){
      return new Promise(resolve => resolve(accessToken));
    }
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, {
      method: 'POST',
      //body: JSON.stringify({id: '200'})
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      accessToken = jsonResponse.access_token;
    });
  },
  search: (term, location, sortBy) => {
    return Yelp.getAccessToken().then(() => {
      return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }).then(response => {
    return response.json();
  }).then(jsonResponse => {
      if(jsonResponse.businesses){
        console.log(jsonResponse.businesses);
        return jsonResponse.businesses.map(business => {
          console.log({});
          /*return {
            id: business.id,
            imageSrc: business.image_url,
            name: business.,
            address: business.,
            city: business.,
            state: business.,
            zipCode: business.,
            rating: business.,
            reviewCount: business.,*/
          };
        });
      }
    })
    ;
  },
}
