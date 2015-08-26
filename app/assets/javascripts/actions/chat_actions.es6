(function(axios) {

    class ChatActions
    {
        constructor()
        {
            this.generateActions(
                'sendMessage',
                'newSocketMsg',
                'getChannelsOk',
                'newChannelOk',
                'updateChannelOk',
                'deleteChannelOk',
                'sendNewMessageOk',
                'updateMessageOk',
                'deleteMessageOk'
            );

        }

        initialize( payload )
        {
            axios.interceptors.request.use( (config) => {
                config.headers['X-CSRF-TOKEN'] = payload.token;
                return config;
            });

            this.dispatch( payload );
        }

        getChannels()
        {
            let baseUrl = 'http://' + window.location.host;
            let url = baseUrl + '/api/v1/channels';

            axios.get( url ).
            then( (response) => {
                this.actions.getChannelsOk(response);
            }).
            catch( (response) => {
                console.error(response);
            });
        }

        newChannel( newName )
        {
            let baseUrl = 'http://' + window.location.host;
            let url = baseUrl + '/api/v1/channels';

            axios.post( url, {
                channel: {name: newName}
            }).
            then( (response) => {
                this.actions.newChannelOk(response);
            }).
            catch( (response) => {
                console.error(response);
            });
        }

        updateChannel( channelId, newName )
        {
            let baseUrl = 'http://' + window.location.host;
            let url = baseUrl + '/api/v1/channels/' + channelId;

            axios.put( url, {
                channel: {name: newName}
            }).
            then( (response) => {
                this.actions.updateChannelOk(response);
            }).
            catch( (response) => {
                console.error(response);
            });
        }

        deleteChannel( channelId )
        {
            let baseUrl = 'http://' + window.location.host;
            let url = baseUrl + '/api/v1/channels/' + channelId;

            axios.delete( url ).
            then( (response) => {
                this.actions.deleteChannelOk(response);
            }).
            catch( (response) => {
                console.error(response);
            });
        }

        sendNewMessage( channelId, messageText )
        {
            let baseUrl = 'http://' + window.location.host + '/api/v1/channels/' + channelId;
            let url = baseUrl + '/messages/';

            axios.post( url, {
                message: {text: messageText}
            }).
            then( (response) => {
                this.actions.sendNewMessageOk(response);
            }).
            catch( (response) => {
                console.error(response);
            });
        }

        updateMessage( channelId, messageId, messageText )
        {
            let baseUrl = 'http://' + window.location.host + '/api/v1/channels/' + channelId;
            let url = baseUrl + '/messages/' + messageId;

            axios.put( url, {
                message: {text: messageText}
            }).
            then( (response) => {
                this.actions.updateMessageOk(response);
            }).
            catch( (response) => {
                console.error(response);
            });
        }

        deleteMessage( channelId, messageId )
        {
            let baseUrl = 'http://' + window.location.host + '/api/v1/channels/' + channelId;
            let url = baseUrl + '/messages/' + messageId;

            axios.delete( url ).
            then( (response) => {
                this.actions.deleteMessageOk(response);
            }).
            catch( (response) => {
                console.error(response);
            });
        }
    }

    window.ChatActions = window.alt.createActions(ChatActions);

})(window.axios);
