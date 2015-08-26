(function() {

    class BaseComponent extends React.Component {
        constructor( props )
        {
            super(props);
            this.package = {};
            this.state = ChatStore.getState();
            this._bind('_onChange', '_canEdit');
        }

        componentDidMount() {
            ChatStore.listen( this._onChange );
        }

        componentWillUnmount() {
            ChatStore.unlisten( this._onChange );
        }

        /* private */
        _bind(...methods)
        {
            methods.forEach( (method) => this[method] = this[method].bind(this) );
        }

        _onChange( state )
        {
            this.setState(state);
        }

        _canEdit( user )
        {
            return (user.permission_group === 'admin' || user.permission_group === 'user');
        }
    }

    window.BaseComponent = BaseComponent;

})();
