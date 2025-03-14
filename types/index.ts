import { MouseEventHandler } from "@node_modules/@types/react";

export interface CustomButtonProps {
   title: string;
   containerStyles?: string;
   handleClick?: MouseEventHandler<HTMLButtonElement> ;
   btnType?: "button" | "submit";
   textStyles?: string;
   rightIcon?: string;
   isDisabled?: boolean;
}


export interface SearchManufacturerProps {
   selected: string;
   setSelected: (selected: string) => void;
}

export interface CarProps {
   city_mpg:number,
   class:string,
   combination_mpg:number,
   cylinders:number,
   displacement:number,
   drive:string,
   fuel_type:string,
   highway_mpg:number,
   make:string,
   model:string,
   transmission:string,
   year:number,
}


export interface FilterProps {
   manufacturer:string,
   year:number | string | null,
   fuel:string,
   limit?:number |string |null,
   model:string,
}

export interface HomeProps {
   searchParams: FilterProps;
}

export interface OptionProps {
   title:string,
   value:string
}

export interface CustomFilterProps {
   title:string,
   options: OptionProps[],
}

export interface ShowMoreProps {
   pageNumber: number,
   isNext: boolean
}
