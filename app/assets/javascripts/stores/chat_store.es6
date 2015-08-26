(function(_) {

    class ChatStore
    {
        constructor()
        {
            this.bindActions(ChatActions);

            this.user = null;
            this.channels = [];
            this.activeChannel = null;
        }

        onInitialize( payload )
        {
            this.user = payload.user;
            this.channels = payload.channels;
            this.activeChannel = this.channels[0];
        }

        onChangeChannel( payload )
        {
            let activeChannelId = payload[0];
            this.activeChannel = _.findWhere(this.channels, {id: activeChannelId});
        }

        onNewSocketMsg( message )
        {
            // I use sockets as signaling for actions
            switch( message.data )
            {
                case 'update':
                    ChatActions.getChannels();
            }
        }

        onGetChannelsOk( response )
        {
            this.channels = response.data;

            if( this.activeChannel === undefined )
            {
                this.activeChannel = this.channels[0];
            }
            else
            {
                this.activeChannel = _.findWhere(this.channels, {id: this.activeChannel.id});
            }
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

