(function(BaseComponent, Input) {

    class Channels extends BaseComponent
    {
        constructor(props)
        {
            super(props);
            this._bind('_create', '_channelsHtml');
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
                return <li className='channel' key={channel.id}>{channel.name}</li>
            });

            return (
                <ul className='channels'>
                    {list}
                </ul>
            );
        }

        _create( newName )
        {
            ChatActions.createNewChannel( newName );
        }
    }

    window.Channels = Channels;

})(window.BaseComponent, window.Input);

