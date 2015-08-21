(function() {

    class ChatStore
    {
        constructor()
        {
            this.bindActions(ChatActions);
        }

        onSendMessage( payload )
        {
            console.log(payload);
        }
    }

    window.ChatStore = window.alt.createStore(ChatStore, 'ChatStore');

})();

