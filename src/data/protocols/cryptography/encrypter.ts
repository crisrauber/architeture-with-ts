import { Interface } from 'readline'

export interface Encrypter{
  encrypt: (value: string) => Promise<string>
}
