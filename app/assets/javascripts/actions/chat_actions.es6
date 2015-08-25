(function(axios) {

    class ChatActions
    {
        constructor() {
            this.generateActions(
                'sendMessage',
                'newSocketMsg',
                'createNewChannelOk'
            );

        }

        registerBase( payload )
        {
            axios.interceptors.request.use( (config) => {
                config.headers['X-CSRF-TOKEN'] = payload.token;
                return config;
            });

            this.dispatch( payload.channels );
        }

        createNewChannel( newChannelName ) {
            let baseUrl = 'http://' + window.location.host;
            let url = baseUrl + '/api/v1/channels';

            axios.post( url, {
                channel: {name: newChannelName}
            }).
            then( (response) => {
                this.actions.createNewChannelOk(response);
            }).
            catch( (response) => {
                console.error(response);
            });
        }

        sendNewMessage( channelId, message )
        {
            console.log(message);
        }

    }

    window.ChatActions = window.alt.createActions(ChatActions);
})(window.axios);
