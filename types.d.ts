// this type definition file is used to define the types of the data that is returned from the API for the houseplant data
// do not remove this or you will be google searching for the types of the data for a long time
// intead keep this and vscode will help you with the types of the data through the intellisense

declare module HousePlant {
  interface PlantItem {
    Categories: string;
    Disease: string;
    Img: string;
    Use: string[];
    "Latin name": string;
    Insects: string[];
    Avaibility: string;
    Style: string;
    Bearing: string;
    "Light tolered": null | string;
    "Height at purchase": {
      M: number;
      CM: number;
    };
    "Light ideal": string;
    "Width at purchase": {
      M: number;
      CM: number;
    };
    id: string;
    Appeal: string;
    Perfume: string;
    Growth: string;
    "Width potential": {
      M: number;
      CM: number;
    };
    "Common name (fr.)": string;
    Pruning: string;
    Family: string;
    "Height potential": {
      M: number;
      CM: number;
    };
    Origin: string[];
    Description: string | null;
    "Temperature max": {
      F: number;
      C: number;
    };
    "Blooming season": string;
    Url: string;
    "Color of leaf": string[];
    Watering: string;
    "Color of blooms": string;
    Zone: string[];
    "Common name": string[];
    "Available sizes (Pot)": string;
    "Other names": string | null;
    "Temperature min": {
      F: number;
      C: number;
    };
    "Pot diameter (cm)": {
      M: number;
      CM: number;
    };
    Climat: string;
  }

  export interface PlantData {
    item: PlantItem;
    refIndex: number;
  }

  interface ApiResponse {
    status: string;
    message: string;
    plants: PlantData[];
  }
}
