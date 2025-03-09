import { MouseEventHandler } from "@node_modules/@types/react";

export interface CustomButtonProps {
   title: string;
   containerStyles?: string;
   handleClick?: MouseEventHandler<HTMLButtonElement> ;
   btnType?: "button" | "submit";
}
