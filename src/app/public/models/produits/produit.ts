export interface Produit {
  idPrd: number;
  libePrd: string;
  souCat: string;
  description: string;
  prixLiv: number;
  prixEmp: number;
  prixProm: number;
  idMenu: number;
  idTaill: number;
  acti: boolean;
  idImg: number;
  imageName?:string;
}
