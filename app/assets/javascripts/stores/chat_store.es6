(function(_) {

    class ChatStore
    {
        constructor()
        {
            this.bindActions(ChatActions);
            this.channels = null;
            this.activeChannel = null;
            this.onlineUsers = null;
        }

        onSendMessage( payload )
        {
            console.log(payload);
        }

        onRegisterBase( channels )
        {
            this.channels = channels;
            this.activeChannel = this.channels[0];
        }

        onNewSocketMsg( message )
        {
            console.log( message );
        }

        onCreateNewChannelOk( response )
        {
            console.log(response);
        }
    }

    window.ChatStore = window.alt.createStore(ChatStore, 'ChatStore');

})(window._);

