(function(BaseComponent, Input) {

    class App extends BaseComponent
    {
        constructor(props)
        {
            super(props);
            this.socket = null;
            ChatActions.registerBase( {channels: this.props.channels, token: this.props.token} );
        }

        componentDidMount()
        {
            super.componentDidMount();

            this.socket = new WebSocket("ws://" + window.location.host + '/socket');

            this.socket.onmessage = (event) => {
                ChatActions.newSocketMsg( event );
            };
        }

        render()
        {
            return (
                <div className='row'>
                    <div className='sidebar col-md-3'>
                        <Channels channels={this.props.channels} translations={this.props.translations.channels} />
                    </div>
                    <div className='content col-md-9'>
                        <Messages translations={this.props.translations.messages} />
                    </div>
                </div>
            );
        }
    }

    window.App = App;

})(window.BaseComponent, window.Channels, window.Messages);

