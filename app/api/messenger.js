export default ({ db }) => {
    return {
        async sendMessage( { text, userId, areaId } ) {
            console.log({ method: 'messenger.sendMessage', text, userId, areaId });
            return { status: 'ok' };
        },

        async editMessage( { messageId, text } ) {
            console.log({ method: 'messenger.edit', messageId, text });
            return { status: 'ok' };
        },

        async createArea( { name } ) {
            return { status: 'ok' };
        },

        async editArea( { areaId, name } ) {
            return { status: 'ok' };
        },

        async changeAreaStatus( { areaId, status } ) {
            return { status: 'ok' };
        },

        async addAreaUser( { areaId, userId } ) {
            return { status: 'ok' };
        },

        async removeAreaUser( { areaId, userId } ) {
            return { status: 'ok' };
        },

        async getAreaUsers( { areaId } ) {
            return { status: 'ok' };
        },

        async getAreaMessages( { areaId } ) {
            return { status: 'ok' };
        },
        
        async checkAreaAccess( { areaId, userId } ) {
            return { status: 'ok' };
        }
    }
}