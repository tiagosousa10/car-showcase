"use client"
import { useSearchParams } from "next/navigation";
import {useState, useEffect} from 'react'
import { fuels, yearsOfProduction } from "../constants";
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "../components";
import { fetchCars } from "../utils";
import Image from "next/image";

export default function Home() {
  const searchParams = useSearchParams();
  const [manufacturer, setManufacturer] = useState(searchParams.get("manufacturer") || "");
  const [model,setModel] = useState(searchParams.get("model") || "")
  const [year,setYear] = useState(searchParams.get("year") || "")
  const [limit, setLimit] = useState(10);
  const [fuel,setFuel] = useState(searchParams.get("fuel") || "")

  const [allCars, setAllCars] = useState([]); 
  const [loading, setLoading] = useState(false);


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
          <SearchBar
            setManufacturer={setManufacturer}
            setModel={setModel}
            setLimit={limit}
          />

          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} setFilter={setFuel} />
            <CustomFilter title='year' options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>

        {allCars.length > 0  ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car,index) => (
                <div key={index}  >
                  <CarCard car={car} />                 
                </div>
              ))}
            </div>

            {loading && (
              <div className="mt-16 w-full flex-center">
                <Image
                  src="/loader.svg"
                  alt="loader"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            )}

            <ShowMore
              pageNumber={limit  / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
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
