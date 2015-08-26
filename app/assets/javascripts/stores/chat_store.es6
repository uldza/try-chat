(function(_) {

    class ChatStore
    {
        constructor()
        {
            this.bindActions(ChatActions);

            this.user = null;
            this.channels = [];
            this.activeChannel = null;
            this.onlineUsers = null;
        }

        onInitialize( payload )
        {
            this.user = payload.user;
            this.channels = payload.channels;
            this.activeChannel = this.channels[0];
        }

        onNewSocketMsg( message )
        {
            // I use sockets as signaling for actions
            if( message.data === 'update' )
            {
                ChatActions.getChannels();
            }
        }

        onGetChannelsOk( response )
        {
            this.channels = response.data;
            console.log(this.channels);
        }

        onNewChannelOk( response )
        {
            console.log(response);
        }

        onUpdateChannelOk( response )
        {
            console.log(response);
        }

        onDeleteChannelOk( response )
        {
            console.log(response);
        }

        onSendMessageOk( payload )
        {
            console.log(payload);
        }

        onUpdateMessageOk( payload )
        {
            console.log(payload);
        }

        onDeleteMessageOk( payload )
        {
            console.log(payload);
        }
    }

    window.ChatStore = window.alt.createStore(ChatStore, 'ChatStore');

})(window._);

