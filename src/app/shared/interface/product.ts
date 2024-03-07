export interface Product {
    image:string[];
    name:string
    _id:string;
    imageCover:string;
    title : string;
    description : string;
    category : {name:string};
    price:number;
    ratingsAverage:number;
}
