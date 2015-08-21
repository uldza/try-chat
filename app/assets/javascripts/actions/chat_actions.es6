(function() {

    class ChatActions
    {
        constructor() {
            this.generateActions(
                'sendMessage'
            );
        }
    }

    window.ChatActions = window.alt.createActions(ChatActions);
})();
