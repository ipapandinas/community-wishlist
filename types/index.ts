import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Wish = {
  id: string;
  author: string;
  counter: number;
  date: string;
  description: string;
  resource: string;
  title: string;
};

export type WishRequest = {
  author?: string;
  description?: string;
  resource?: string;
  title: string;
};

export type WishResponse = {
  id: string;
  author?: string;
  counter: number;
  date: string;
  description?: string;
  resource?: string;
  title: string;
};

export type CustomDataResponse<TData> = {
  data: TData[];
};
