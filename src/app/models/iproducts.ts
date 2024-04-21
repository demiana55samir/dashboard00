export interface Iproduct {
  id:string;
  ar:{
    brand:string;
    description:string;
    title:string;
  };
  categoryId:string;
  discountPercentage:number;
  en:{
    brand:string;
    description:string;
    title:string;
  };
  images:string[];
  proId:string;
  price:number;
  quantityInStock:string;
  rating: {
    [key: string]: {
      ReviewTitle: string;
      ReviewTitleDetail: string;
      date: string;
      name: string;
      rate: string;
    };
  };
  ratingQuantity:number;
  sku:string;
  subCategoryId:string;
  thumbnail:string;

}

