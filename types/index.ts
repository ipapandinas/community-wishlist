import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type WishRequest = {
  author?: string;
  description?: string;
  resource?: string;
  title: string;
};

export type WishResponse = {
  id: number;
  author: string | null;
  counter: number;
  date: Date;
  description: string | null;
  resource: string | null;
  title: string;
};

export type CustomDataResponse<TData> = {
  data: TData[];
};
