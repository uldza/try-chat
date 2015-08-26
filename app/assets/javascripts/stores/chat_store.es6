(function(_) {

    class ChatStore
    {
        constructor()
        {
            this.bindActions(ChatActions);

            this.userId = null;
            this.channels = [];
            this.activeChannel = null;
            this.onlineUsers = null;
        }

        onInitialize( payload )
        {
            this.userId = payload.userId;
            this.channels = payload.channels;
            this.activeChannel = this.channels[0];
        }

        onNewSocketMsg( message )
        {
            //TODO handle socket as signaling for futher actions
            console.log( message );
        }

        onGetChannelsOk( response )
        {
            console.log( response );
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

