import axios from "axios";
import { Truyen } from "../Components/types";

const apiUrl = 'http://localhost:4000';

export async function getPageTruyen(page: number) {
  try {
    const response = await axios.get<Array<Pick<Truyen, "url" | "slug" | "title" | "cover">>>(`${apiUrl}/page/${page}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function getCount() {
  try {
    const response = await axios.get<{ total: number }>(`${apiUrl}/count`)
    return response.data.total;
  } catch (e) {
    console.log(e);
    return NaN;
  }
}

export async function getTruyen(slug: string) {
  try {
    const response = await axios.get<Truyen>(`${apiUrl}/truyen-tranh/${slug}`);
    return response.data;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}