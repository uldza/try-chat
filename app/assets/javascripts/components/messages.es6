(function(BaseComponent, Input, moment) {

    class Messages extends BaseComponent
    {
        constructor(props)
        {
            super(props);
            this._bind('_send', '_messagesHtml', '_headerHtml', '_update');
        }

        componentDidUpdate()
        {
            window.scrollTo(0,document.body.scrollHeight);
            let input = React.findDOMNode(this.refs.input);
            if( input && this.state.activeChannel) input.value = this.state.activeChannel.name;
        }

        render()
        {
            let messages = [];

            let input = null;

            if( this.state.user && this._canEdit(this.state.user) )
            {
                input = <Input onSubmit={this._send} large={true} label={this.props.translations.new_message} submit={this.props.translations.send_message}/>;
            }

            return (
                <div className='messages panel panel-info'>
                    <div className='panel-heading'>
                        {this._headerHtml()}
                    </div>

                    <div className='panel-body'>
                        {this._messagesHtml()}
                    </div>

                    <div className='panel-footer'>
                        {input}
                    </div>
                </div>
            );
        }

        _headerHtml()
        {
            if( !this.state.activeChannel )
            {
                return <h4>{this.props.translations.no_active_channel}</h4>
            }

            if( !this._canEditChannel( this.state.activeChannel ) )
            {
                return <div className='channel-name'>{this.state.activeChannel.name}</div>;
            }

            let channel = this.state.activeChannel;

            return (
                <div className='row'>
                    <div className='col-md-9'>
                        <input className='form-control' ref='input' type='text'/>
                    </div>

                    <div className='buttons col-md-3'>
                        <button className='btn btn-success' type='button' onClick={this._update.bind(null, channel.id)}>
                            <i className='fa fa-check' />
                        </button>
                        <button className='btn btn-danger' type='button' onClick={ChatActions.deleteChannel.bind(null, channel.id)}>
                            <i className='fa fa-times' />
                        </button>
                    </div>
                </div>
            );
        }

        _canEditChannel( channel )
        {
            return (channel.user.id === this.state.user.id || this.state.user.permission_group === 'admin');
        }

        _canEditMessage( message )
        {
            return (message.user.id === this.state.user.id || this.state.user.permission_group === 'admin');
        }


        _update( channelId )
        {
            let input = React.findDOMNode(this.refs.input);
            if( input.value.length > 0 ) ChatActions.updateChannel(channelId, input.value);
        }

        _messagesHtml()
        {
            let list = null;

            if( this.state.activeChannel )
            {
                let classes = ['panel', 'panel-default'];

                list = this.state.activeChannel.messages.map( (message) => {
                    let remove = null;

                    if(this._canEditMessage( message ))
                    {
                        remove = <div className='remove col-md-1 pull-right'><i className='fa fa-times' onClick={ChatActions.deleteMessage.bind(null, this.state.activeChannel.id, message.id)}/></div>;
                    }

                    return (
                        <li className='message' key={message.id}>
                            <div className={classes.join(' ')}>
                                <div className='row'>
                                    {remove}
                                    <div className='user col-md-2'>
                                        <div>{message.user.email}</div>
                                        <div>{moment(message.created_at).format('hh:mm DD/MM/YYYY')}</div>
                                    </div>
                                    <div className='col-md-9'>{message.text}</div>
                                </div>
                            </div>
                        </li>
                    );
                });
            }

            return (
                <ul className='messages'>
                    {list}
                </ul>
            );
        }

        _send( message )
        {
            ChatActions.sendNewMessage(this.state.activeChannel.id, message);
        }
    }

    window.Messages = Messages;

})(window.BaseComponent, window.Input, window.moment);

