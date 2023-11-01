export interface IJwt{
    accesstoken: string;
    refreshtoken: string;
}

export interface IToken extends IJwt{
    id?:number;
    user_id:number;
    user_email?:string;
    created_at?: Date,
    updated_at?: Date
}



