class CrudService {
    constructor(repository) {
        this.repository = repository;
    }

    async create(data) {
        try {
            return await this.repository.create(data);
        } catch (error) {
            logger.error('Error in CrudService.create:', error);
            throw new Error('Could not create resource');
        }
    }

    async destroy(id) {
        try {
            return await this.repository.destroy(id);
        } catch (error) {
            logger.error('Error in CrudService.destroy:', error);
            throw new Error('Could not delete resource');
        }
    }

    async get(id) {
        try {
            return await this.repository.get(id);
        } catch (error) {
            logger.error('Error in CrudService.get:', error);
            throw new Error('Could not get resource');
        }
    }

    async getAll() {
        try {
            return await this.repository.getAll();
        } catch (error) {
            logger.error('Error in CrudService.getAll:', error);
            throw new Error('Could not get resources');
        }
    }

    async update(id, data) {
        try {
            return await this.repository.update(id, data);
        } catch (error) {
            logger.error('Error in CrudService.update:', error);
            throw new Error('Could not update resource');
        }
    }
}

module.exports = CrudService;
