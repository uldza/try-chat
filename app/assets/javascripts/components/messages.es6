(function(BaseComponent, Input) {

    class Messages extends BaseComponent
    {
        constructor(props)
        {
            super(props);
            this._bind('_send', '_messagesHtml');
        }

        render()
        {
            let messages = [];

            let name = this.state.activeChannel ? this.state.activeChannel.name : '';

            return (
                <div className='panel panel-default'>
                    <div className='panel-heading'>
                        <div className='row'>
                            <div className='col-md-9'>{name}</div>
                            <div className='row-md-3 user-count'>
                                <i className='fa fa-group'/>
                                <span>{this.props.translations.online_users} - {this.state.onlineUsers}</span>
                            </div>
                        </div>
                    </div>

                    <div className='panel-body'>
                        {this._messagesHtml()}
                    </div>

                    <div className='panel-footer'>
                        <Input onSubmit={this._send} large={true} label={this.props.translations.new_message} submit={this.props.translations.send_message}/>
                    </div>
                </div>
            );
        }

        _messagesHtml()
        {
            let list = null;

            if( this.state.activeChannel )
            {
                list = this.state.activeChannel.messages.map( (message) => {
                    return <li className='message' key={message.id}>{message.text}</li>
                });
            }

            return (
                <ul className='chat-messages'>
                    {list}
                </ul>
            );
        }

        _send(e, b)
        {
            console.log(e);
            console.log(b);
        }
    }

    window.Messages = Messages;

})(window.BaseComponent, window.Input);

