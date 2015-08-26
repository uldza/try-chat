(function(BaseComponent, Input) {

    class Channels extends BaseComponent
    {
        constructor(props)
        {
            super(props);
            this._bind('_create', '_channelsHtml', '_update');
        }

        render()
        {
            let input = null;
            if( this.state.user && this._canEdit(this.state.user) )
            {
                input = <Input onSubmit={this._create} placeholder="Channel name" submit="New" label="" />;
            }

            return (
                <div className='panel panel-default'>
                    <div className='panel-heading'>{this.props.translations.channels_title}</div>

                    <div className='panel-body'>
                        {this._channelsHtml()}
                    </div>

                    <div className='panel-footer'>
                        {input}
                    </div>
                </div>
            );
        }

        _channelsHtml()
        {
            let list = this.state.channels.map( (channel) => {

                let classes = ['panel', 'panel-default'];

                if(channel.id === this.state.activeChannel.id) classes.push('panel-primary');

                return (
                    <li className='channel' key={channel.id}>
                        <div className={classes.join(' ')} onClick={ChatActions.changeChannel.bind(null, channel.id)}>{channel.name}</div>
                    </li>
                );
            });

            return (
                <ul className='channels'>
                    {list}
                </ul>
            );
        }

        _update( channelId )
        {
            let input = React.findDOMNode(this.refs['input-'+channelId]);
            if( input.value.length > 0 ) ChatActions.updateChannel(channelId, input.value);
        }


        _create( newName )
        {
            ChatActions.newChannel( newName );
        }
    }

    window.Channels = Channels;

})(window.BaseComponent, window.Input);

