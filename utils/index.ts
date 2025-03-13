import { CarProps, FilterProps } from "@types";

export async function fetchCars(filters: FilterProps) {
   const { manufacturer, year, model, limit, fuel } = filters;

   const headers = {
      'x-rapidapi-key': '180af2010cmshea5ba1a8a19c079p12c106jsn3c408d224c2c',
      'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
   };

   // Criar URL base
   const url = new URL("https://cars-by-api-ninjas.p.rapidapi.com/v1/cars");

   // Adicionar parâmetros apenas se forem fornecidos
   if (manufacturer) url.searchParams.append("make", manufacturer);
   if (year) url.searchParams.append("year", year.toString());
   if (model) url.searchParams.append("model", model);
   if (fuel) url.searchParams.append("fuel_type", fuel);

   // Removendo o parâmetro `limit` porque ele é apenas para usuários premium
   console.log("Fetching cars with URL:", url.toString());

   try {
      const response = await fetch(url.toString(), { headers });

      if (!response.ok) {
         throw new Error(`Erro ao buscar carros: ${response.statusText}`);
      }

      const result = await response.json(); // Converte a resposta em JSON
      console.log("API response:", result);

      return result; // Retorna os carros
   } catch (error) {
      console.error("Erro ao buscar carros:", error);
      return []; // Retorna uma lista vazia em caso de erro
   }
}


export const calculateCarRent = (city_mpg: number, year: number) => {
   const basePricePerDay = 50; // Base rental price per day in dollars
   const mileageFactor = 0.1; // Additional rate per mile driven
   const ageFactor = 0.05; // Additional rate per year of vehicle age
 
   // Calculate additional rate based on mileage and age
   const mileageRate = city_mpg * mileageFactor;
   const ageRate = (new Date().getFullYear() - year) * ageFactor;
 
   // Calculate total rental rate per day
   const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
 
   return rentalRatePerDay.toFixed(0);
 };
 

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
   const url = new URL("https://cdn.imagin.studio/getimage");
   const { make, model, year } = car;
 
   // used to 
   url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || '');
   url.searchParams.append('make', make);
   url.searchParams.append('modelFamily', model.split(" ")[0]);
   url.searchParams.append('zoomType', 'fullscreen');
   url.searchParams.append('modelYear', `${year}`);
   // url.searchParams.append('zoomLevel', zoomLevel);
   url.searchParams.append('angle', `${angle}`);
 
   return `${url}`;
} 

export const updateSearchParams = (key: string, value: string) => {
   const searchParams = new URLSearchParams(window.location.search);
   if (value) {
     searchParams.set(key, value);
   } else {
     searchParams.delete(key);
   }
   return `${window.location.pathname}?${searchParams.toString()}`;
 };
 
