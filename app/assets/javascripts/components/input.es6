(function(BaseComponent) {

    class Input extends BaseComponent
    {
        constructor(props)
        {
            super(props);
            this.socket = null;
            this._bind('_send');
        }

        componentDidMount()
        {
            this.socket = new WebSocket("ws://" + window.location.host + '/socket');

            this.socket.onmessage = (event) => {
                console.log(event);
            };
        }

        render()
        {
            return (
                <div className='input-group input-group-lg'>
                    <div className='input-group-addon'>New message</div>
                    <input type='text' className='form-control' name='message' id='message' ref='message' />
                    <div className='input-group-btn'>
                        <button className='btn btn-default' type='button' onClick={this._send.bind(this)}>Send</button>
                    </div>
                </div>
            );
        }

        _send()
        {
            if( !this.socket ) return;

            let message = React.findDOMNode(this.refs.message);

            this.socket.send( message.value, 'aaa' );

            ChatActions.sendMessage( message.value );

            message.value = '';
        }
    }

    window.Input = Input;

})(window.BaseComponent);

