import { attraction } from "./attraction";

export interface state {
  attractions_list: attraction[],
  categories: string[],
  stored_favorites: string[],
  filtered_attractions_list: attraction[],
  user_latitude: number,
  user_longitude: number
}