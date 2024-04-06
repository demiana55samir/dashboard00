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
  rating:number;
  ratingQuantity:number;
  sku:string;
  subCategoryId:string;
  thumbnail:string;

}

