// @flow

export type Model<O: Object> = {
  pk: string,
  data: O
}

export type Product = {
  id?: string,
  name: string,
  price: number,
  preview: string,
  image: string,
}

export type ProductPreview = {
  name: string,
  price: number,
}

export type Entity<M: Model<*>> = {
  name: string,
  data: M[]
}

export type DB = {
  entities: Entity<*>[]
}
