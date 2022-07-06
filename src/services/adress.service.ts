import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AdressDto } from "src/dtos/adress.dto";
import { Adress } from "src/interfaces/adress.interface";
import { Adress as AdressModel, AdressDocument } from "src/models/adress.model";

@Injectable()
export class AdressService {

	constructor(
		@InjectModel(AdressModel.name) private adressRepository: Model<AdressDocument>,
	) { }

    async create(adress: AdressDto, personId: string): Promise<AdressDocument> {
        const result = await new this.adressRepository(adress).save();

        if(!result) throw new HttpException(`Could not create adress`, HttpStatus.BAD_REQUEST);

        const updateFk = await this.adressRepository.findByIdAndUpdate(result.id, { personId: personId }, { new: true });

        if(!updateFk) throw new HttpException(`Could not updateFk`, HttpStatus.BAD_REQUEST);

        return updateFk;
    }

    async findAll(id: string): Promise<AdressDocument[]> {
        const result = await this.adressRepository.find({ personId: id });

        if(!result) throw new HttpException(`Could not find adresses`, HttpStatus.NOT_FOUND);

        return result;
    }

    async update(id: string, adress: Adress): Promise<AdressDocument> {
        const result = this.adressRepository.findByIdAndUpdate(id, {...adress}, { new: true });

        if(!result) throw new HttpException(`Could not find adresses`, HttpStatus.NOT_FOUND);

        return result;
    }

    async delete(id: string){
        const result = await this.adressRepository.remove({ _id: id });

        if(!result) throw new HttpException(`Could not delete adress`, HttpStatus.NOT_FOUND);

        return result;
    }
    


}