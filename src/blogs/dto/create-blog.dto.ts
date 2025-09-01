import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateBlogDto {
    @IsString()
    @IsNotEmpty()
    title:string
    @IsString()
    @IsNotEmpty()
    content:string
    @IsString()
    @IsNotEmpty()
    author:string
    @IsString()
    @IsOptional()
    email:string
    @IsString()
    @IsOptional()
    @MaxLength(10)
    @MinLength(10)
    phonenumber:string


}
