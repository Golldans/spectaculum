import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CinemaRepository } from '../infra/repository/cinema.repository';
import { ICreateCinema } from '../interfaces/ICreateCinema';
import { IUpdateCinema } from '../interfaces/IUpdateCinema';

interface ViaCepResponse {
    cep?: string;
    logradouro?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
    erro?: boolean;
}

@Injectable()
export class CinemaService {
    constructor(private readonly cinemaRepository: CinemaRepository) {}

    private normalizeCep(value: string): string {
        const digits = value.replace(/\D/g, '');
        if (digits.length !== 8) {
            throw new BadRequestException('CEP inválido. Informe 8 dígitos.');
        }
        return digits;
    }

    private formatCep(cep: string): string {
        return `${cep.slice(0, 5)}-${cep.slice(5)}`;
    }

    async lookupCep(cep: string) {
        const normalizedCep = this.normalizeCep(cep);

        const response = await fetch(`https://viacep.com.br/ws/${normalizedCep}/json/`);

        if (!response.ok) {
            throw new BadRequestException('Não foi possível consultar o CEP.');
        }

        const data = (await response.json()) as ViaCepResponse;
        if (data.erro || !data.localidade || !data.uf) {
            throw new BadRequestException('CEP não encontrado.');
        }

        return {
            cep: normalizedCep,
            street: data.logradouro?.trim() || undefined,
            neighborhood: data.bairro?.trim() || undefined,
            city: data.localidade,
            state: data.uf,
        };
    }

    private buildLocation(data: {
        street?: string;
        number?: string;
        neighborhood?: string;
        city: string;
        state: string;
        cep: string;
        complement?: string;
    }): string {
        const firstPart = data.street?.trim()
            ? `${data.street.trim()}, ${data.number?.trim() || 'S/N'}`
            : data.number?.trim()
                ? `Nº ${data.number.trim()}`
                : '';

        const complementPart = data.complement?.trim();
        const neighborhoodPart = data.neighborhood?.trim();
        const cityStatePart = `${data.city}/${data.state}`;
        const cepPart = `CEP ${this.formatCep(data.cep)}`;

        return [firstPart, complementPart, neighborhoodPart, cityStatePart, cepPart]
            .filter(Boolean)
            .join(' - ');
    }

    private async withAddressFromCep<T extends ICreateCinema | IUpdateCinema>(data: T): Promise<T> {
        if (!data.cep) {
            const hasAddressFields = Boolean(data.street || data.number || data.neighborhood || data.city || data.state);
            if (hasAddressFields) {
                throw new BadRequestException('Informe um CEP válido para preencher o endereço.');
            }
            return data;
        }

        if (!data.number?.trim() && data.street?.trim()) {
            throw new BadRequestException('Número do endereço é obrigatório quando CEP é informado.');
        }

        const address = await this.lookupCep(data.cep);
        return {
            ...data,
            cep: address.cep,
            street: address.street,
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state,
            location: this.buildLocation({
                ...address,
                number: data.number?.trim(),
                complement: data.complement,
            }),
        } as T;
    }

    findAll(name?: string, location?: string) {
        return this.cinemaRepository.findAll(
            name || location ? { name, location } : undefined,
        );
    }

    async findOne(id: number) {
        const cinema = await this.cinemaRepository.findOne({ id });
        if (!cinema) throw new NotFoundException('Cinema não encontrado');
        return cinema;
    }

    async create(data: ICreateCinema) {
        const normalized = await this.withAddressFromCep(data);
        if (!normalized.location?.trim()) {
            throw new BadRequestException('Informe um endereço válido (via CEP) ou localização.');
        }
        return this.cinemaRepository.create(normalized);
    }

    async update(data: IUpdateCinema) {
        const existing = await this.cinemaRepository.findOne({ id: data.id });
        if (!existing) throw new NotFoundException('Cinema não encontrado');

        const mergedData = { ...existing, ...data };
        const normalized = await this.withAddressFromCep(mergedData);

        const cinema = await this.cinemaRepository.update({
            id: data.id,
            name: normalized.name,
            location: normalized.location,
            cep: normalized.cep,
            street: normalized.street,
            number: normalized.number,
            neighborhood: normalized.neighborhood,
            city: normalized.city,
            state: normalized.state,
            complement: normalized.complement,
        });
        if (!cinema) throw new NotFoundException('Cinema não encontrado');
        return cinema;
    }

    async remove(id: number) {
        const deleted = await this.cinemaRepository.softDelete({ id });
        if (!deleted) throw new NotFoundException('Cinema não encontrado');
        return { message: 'Cinema removido' };
    }
}
