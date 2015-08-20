(function() {

    class BaseComponent extends React.Component {
        /* private */
        _bind(...methods)
        {
            methods.forEach( (method) => this[method] = this[method].bind(this) );
        }
    }

    window.BaseComponent = BaseComponent;

})();
