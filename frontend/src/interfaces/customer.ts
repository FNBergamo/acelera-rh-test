export interface Customer {
  id: number
  name: string
  salary: number
  companyValue: number
}

export interface CreateCustomerDto {
  name: string
  salary: number
  companyValue: number
}

export interface UpdateCustomerDto {
  name?: string
  salary?: number
  companyValue?: number
}
