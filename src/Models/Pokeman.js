export class Pokeman {
  constructor (data) {
    this.id = data.id || ''
    this.name = data.name
    this.weight = data.weight
    this.height = data.height
    this.nickName = "LIL JEREMY"
    this.types = data.types
    this.user = data.user || null
    this.img = data.img || data.sprites.other.official&artwork.front_default
  }
}