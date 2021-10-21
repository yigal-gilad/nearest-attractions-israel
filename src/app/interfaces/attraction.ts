export interface attraction {
  Id: number,
  Name: string,
  Product_Url: string,
  Attraction_Type: string,
  Opening_Hours: string,
  Address: string,
  pos: {
    type: string,
    coordinates: number[]
  }
}