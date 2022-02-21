module.exports = class UnprocessableEntityError extends Error {
    constructor(payload = {}) {
        super();

        this.payload = payload;
        this.status = 422;
    }

    handle({ res }) {
        if (typeof this.payload === 'string') {
            this.payload = {
                message: this.payload
            };
        }
        
        return res.status(this.status).json(this.payload);
    }
}
