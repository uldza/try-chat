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
            return (
                <div className='panel panel-default'>
                    <div className='panel-heading'>{this.props.translations.channels_title}</div>

                    <div className='panel-body'>
                        {this._channelsHtml()}
                    </div>

                    <div className='panel-footer'>
                        <Input onSubmit={this._create} placeholder="Channel name" submit="New" label="" />
                    </div>
                </div>
            );
        }

        _channelsHtml()
        {
            let list = this.state.channels.map( (channel) => {

                let input = null;

                let name = <span>{channel.name}</span>;
                let classes = ['channel'];

                if(channel.user.id === this.state.user.id || this.state.user.permission_group === 'admin')
                {
                    name = null;
                    classes.push('clickable');

                    input = (
                        <div>
                            <input type='text' ref={'input-'+channel.id} defaultValue={channel.name}/>
                            <i className='fa fa-check' onClick={this._update.bind(null, channel.id)}/>
                            <i className='fa fa-times' onClick={ChatActions.deleteChannel.bind(null, channel.id)}/>
                        </div>
                    );
                }

                return (
                    <li className={classes.join(' ')} key={channel.id}>
                        {input}
                        {name}
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
            console.log(input.value.length);
            if( input.value.length > 0 ) ChatActions.updateChannel(channelId, input.value);
        }


        _create( newName )
        {
            ChatActions.newChannel( newName );
        }
    }

    window.Channels = Channels;

})(window.BaseComponent, window.Input);

