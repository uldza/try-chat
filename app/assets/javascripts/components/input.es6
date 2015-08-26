(function(BaseComponent) {

    class Input extends React.Component
    {
        constructor(props)
        {
            super(props);
            this._send.bind(this);
            this._labelHtml.bind(this);
            this._keypress.bind(this);
        }

        render()
        {
            let classes = ['input-group'];

            if( this.props.large ) classes.push('input-group-lg');

            return (
                <div className={classes.join(' ')}>
                    {this._labelHtml()}

                    <input type='text' className='form-control' onKeyDown={this._keypress.bind(this)} name='input' ref='input' placeholder={this.props.placeholder} />

                    <div className='input-group-btn'>
                        <button className='btn btn-primary' type='button' onClick={this._send.bind(this)}>{this.props.submit || 'Submit'}</button>
                    </div>
                </div>
            );
        }

        _keypress(e)
        {
            if( e.keyCode === 13 ) this._send();
        }

        _labelHtml()
        {
            let label = null;
            if( this.props.label )
            {
                label = <div className='input-group-addon'>{this.props.label}</div>;
            }

            return label;
        }

        _send()
        {
            let input = React.findDOMNode(this.refs.input);
            this.props.onSubmit(input.value);
            input.value = '';
        }
    }

    window.Input = Input;

})(window.BaseComponent);

