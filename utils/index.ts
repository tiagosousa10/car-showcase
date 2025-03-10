export async function fetchCars() {
   const headers = {
      'x-rapidapi-key': '180af2010cmshea5ba1a8a19c079p12c106jsn3c408d224c2c',
      'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
   }

   const response = await fetch( 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla', {
      headers: headers,
   });

   const result = await response.json() // get the data to JSON

   return result; // return the cars

}
