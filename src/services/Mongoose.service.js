class Mongoose {
    constructor (model) {
        this.model = model;
    }

    async create ( data ) {
        const result = await this.model.create(data)
        return result;
    } 
}

module.exports = Mongoose;