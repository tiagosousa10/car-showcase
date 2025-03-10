import { MouseEventHandler } from "@node_modules/@types/react";

export interface CustomButtonProps {
   title: string;
   containerStyles?: string;
   handleClick?: MouseEventHandler<HTMLButtonElement> ;
   btnType?: "button" | "submit";
}


export interface SearchManufacturerProps {
   manufacturer: string;
   setManufacturer: (manufacturer: string) => void;
}
