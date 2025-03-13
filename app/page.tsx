"use client"
import { useSearchParams } from "next/navigation";
import {useState, useEffect} from 'react'
import { fuels, yearsOfProduction } from "../constants";
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "../components";
import { fetchCars } from "../utils";

export default function Home() {
  const searchParams = useSearchParams();
  const manufacturer = searchParams.get("manufacturer") || "";
  const model = searchParams.get("model") || "";
  const fuel = searchParams.get("fuel") || "";
  const year = searchParams.get("year") || "";
  const [allCars, setAllCars] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true);
    try {
      const result = await fetchCars({
        manufacturer,
        model,
        fuel,
        year,
        limit: limit || null,
      });

      setAllCars(result);
    } catch (error) {
      console.log('Not able to fetch the cars',error);
    } finally {
      setLoading(false);
    }
  };

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;


  useEffect(() => {
    getCars();
  }, [manufacturer, model, fuel, year, limit]);

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar />

          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(limit || 10) / 10}
              isNext={(limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
