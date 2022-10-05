import { IfStmt } from "@angular/compiler";
import { Transport } from "./Transport";

export class Spend{
    public id : number | null = 0
    public cost : number | null= 0
    public date: string | null = null;
    public description : string | null = null
    public transport? : Transport

    public get getDate() : string | null{
        return "test"
    }

   

}